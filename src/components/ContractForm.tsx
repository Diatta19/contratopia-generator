
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { currencies } from "@/data/paymentOptions";
import { PhoneInput } from "@/components/ui/phone-input";

const contractFormSchema = z.object({
  contractType: z.string({
    required_error: "Veuillez sélectionner un type de contrat",
  }),
  contractSubtype: z.string().optional(),
  clientName: z.string().min(2, {
    message: "Le nom du client doit contenir au moins 2 caractères",
  }),
  clientAddress: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  clientPhone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères",
  }),
  providerName: z.string().min(2, {
    message: "Le nom du prestataire doit contenir au moins 2 caractères",
  }),
  providerAddress: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  providerPhone: z.string().min(8, {
    message: "Le numéro de téléphone doit contenir au moins 8 caractères",
  }),
  projectDescription: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  contractDetails: z.string().optional(),
  contractAmount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Le montant doit être un nombre valide",
  }),
  currency: z.string({
    required_error: "Veuillez sélectionner une devise",
  }),
  startDate: z.string(),
  endDate: z.string().optional(),
  isInstallmentPayment: z.boolean().default(false),
  installments: z.number().min(1).default(2),
  firstPaymentPercent: z.number().min(1).max(99).default(50),
  paymentIntervals: z.array(z.object({
    interval: z.string(),
    unit: z.string(),
  })).optional(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onFormSubmit: (data: any) => void;
}

const getSubtypeOptions = (contractType: string) => {
  switch (contractType) {
    case "serviceAgreement":
      return [
        { value: "consulting", label: "Consultation" },
        { value: "development", label: "Développement" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "maintenance", label: "Maintenance" },
        { value: "other", label: "Autre" },
      ];
    case "workContract":
      return [
        { value: "cdi", label: "CDI - Contrat à Durée Indéterminée" },
        { value: "cdd", label: "CDD - Contrat à Durée Déterminée" },
        { value: "freelance", label: "Freelance / Indépendant" },
        { value: "internship", label: "Stage" },
        { value: "apprenticeship", label: "Apprentissage" },
        { value: "other", label: "Autre" },
      ];
    case "nda":
      return [
        { value: "unilateral", label: "Unilatéral" },
        { value: "bilateral", label: "Bilatéral" },
        { value: "employee", label: "Employé" },
        { value: "consultant", label: "Consultant" },
        { value: "other", label: "Autre" },
      ];
    case "saleContract":
      return [
        { value: "goods", label: "Vente de biens" },
        { value: "services", label: "Vente de services" },
        { value: "digitalProducts", label: "Produits numériques" },
        { value: "realEstate", label: "Immobilier" },
        { value: "vehicle", label: "Véhicule" },
        { value: "other", label: "Autre" },
      ];
    case "rentalContract":
      return [
        { value: "residential", label: "Résidentiel" },
        { value: "commercial", label: "Commercial" },
        { value: "equipment", label: "Équipement" },
        { value: "vehicle", label: "Véhicule" },
        { value: "other", label: "Autre" },
      ];
    case "partnershipContract":
      return [
        { value: "joint", label: "Entreprise commune" },
        { value: "distribution", label: "Distribution" },
        { value: "licensing", label: "Licence" },
        { value: "franchising", label: "Franchise" },
        { value: "strategic", label: "Alliance stratégique" },
        { value: "other", label: "Autre" },
      ];
    default:
      return [];
  }
};

const timeUnits = [
  { value: "days", label: "Jours" },
  { value: "weeks", label: "Semaines" },
  { value: "months", label: "Mois" },
  { value: "years", label: "Années" },
];

const ContractForm: React.FC<ContractFormProps> = ({ onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEndDate, setShowEndDate] = useState(true);
  const [paymentIntervals, setPaymentIntervals] = useState<Array<{interval: string, unit: string}>>([]);
  
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contractType: "",
      contractSubtype: "",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "",
      contractDetails: "",
      contractAmount: "",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      installments: 2,
      firstPaymentPercent: 50,
    },
  });

  const contractType = form.watch("contractType");
  const isInstallmentPayment = form.watch("isInstallmentPayment");
  const installments = form.watch("installments");
  const firstPaymentPercent = form.watch("firstPaymentPercent");
  const contractAmount = form.watch("contractAmount");
  const currency = form.watch("currency");
  const startDate = form.watch("startDate");

  // Initialiser et mettre à jour les délais de paiement quand le nombre d'installments change
  useEffect(() => {
    if (isInstallmentPayment && installments > 1) {
      const newIntervals = Array(installments - 1).fill(null).map((_, i) => ({
        interval: "30",
        unit: "days",
      }));
      setPaymentIntervals(newIntervals);
    }
  }, [isInstallmentPayment, installments]);

  // Calculer les montants des versements
  const calculateInstallments = () => {
    if (!contractAmount || isNaN(Number(contractAmount))) return [];
    
    const totalAmount = Number(contractAmount);
    const firstAmount = (totalAmount * firstPaymentPercent) / 100;
    const remainingAmount = totalAmount - firstAmount;
    const installmentAmount = remainingAmount / (installments - 1);
    
    return [
      {
        number: 1,
        percent: firstPaymentPercent,
        amount: firstAmount.toFixed(2),
        date: "À la signature",
      },
      ...Array.from({ length: installments - 1 }, (_, i) => {
        const interval = paymentIntervals[i]?.interval || "30";
        const unit = paymentIntervals[i]?.unit || "days";
        
        let dateLabel = "";
        switch (unit) {
          case "days":
            dateLabel = `${interval} jours après la signature`;
            break;
          case "weeks":
            dateLabel = `${interval} semaine${parseInt(interval) > 1 ? 's' : ''} après la signature`;
            break;
          case "months":
            dateLabel = `${interval} mois après la signature`;
            break;
          case "years":
            dateLabel = `${interval} an${parseInt(interval) > 1 ? 's' : ''} après la signature`;
            break;
        }
        
        return {
          number: i + 2,
          percent: ((100 - firstPaymentPercent) / (installments - 1)).toFixed(1),
          amount: installmentAmount.toFixed(2),
          date: dateLabel,
        };
      }),
    ];
  };

  const handleIntervalChange = (index: number, value: string) => {
    const newIntervals = [...paymentIntervals];
    newIntervals[index] = { ...newIntervals[index], interval: value };
    setPaymentIntervals(newIntervals);
  };

  const handleUnitChange = (index: number, value: string) => {
    const newIntervals = [...paymentIntervals];
    newIntervals[index] = { ...newIntervals[index], unit: value };
    setPaymentIntervals(newIntervals);
  };

  const onSubmit = async (data: ContractFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Préparer les données pour le contrat
      const installmentSchedule = calculateInstallments();
      const formattedData = {
        ...data,
        paymentSchedule: {
          installments: data.isInstallmentPayment ? data.installments : 1,
          firstPaymentPercent: data.firstPaymentPercent,
          installmentDates: installmentSchedule.map(item => item.date),
          paymentIntervals: paymentIntervals
        },
      };
      
      // Simuler un délai de serveur
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onFormSubmit(formattedData);
      toast.success("Formulaire soumis avec succès!");
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour obtenir le champ de détails spécifique au type de contrat
  const renderContractSpecificFields = () => {
    if (!contractType) return null;
    
    const subtypeOptions = getSubtypeOptions(contractType);
    
    return (
      <div className="space-y-6">
        {subtypeOptions.length > 0 && (
          <FormField
            control={form.control}
            name="contractSubtype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type spécifique</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sous-type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subtypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="contractDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Détails spécifiques</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ajoutez des détails spécifiques à ce type de contrat..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {getContractDetailsPlaceholder(contractType)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  // Fonction pour obtenir le placeholder selon le type de contrat
  const getContractDetailsPlaceholder = (type: string) => {
    const placeholders: Record<string, string> = {
      serviceAgreement: "Précisez les livrables, les délais de livraison, les critères de qualité, etc.",
      workContract: "Précisez les horaires, les avantages, les conditions particulières, etc.",
      nda: "Précisez la durée de confidentialité, les informations concernées, les exceptions, etc.",
      saleContract: "Précisez les caractéristiques du bien/service, les garanties, les conditions de livraison, etc.",
      rentalContract: "Précisez les conditions d'utilisation, l'état du bien, les responsabilités, etc.",
      partnershipContract: "Précisez les responsabilités de chaque partie, la répartition des bénéfices, etc.",
    };
    
    return placeholders[type] || "Ajoutez des détails supplémentaires concernant ce contrat...";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Informations du contrat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contractType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de contrat</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type de contrat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="serviceAgreement">Contrat de prestation de service</SelectItem>
                      <SelectItem value="workContract">Contrat de travail</SelectItem>
                      <SelectItem value="nda">Accord de confidentialité</SelectItem>
                      <SelectItem value="saleContract">Contrat de vente</SelectItem>
                      <SelectItem value="rentalContract">Contrat de location</SelectItem>
                      <SelectItem value="partnershipContract">Contrat de partenariat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel htmlFor="showEndDate">Date de fin</FormLabel>
                  <Switch 
                    id="showEndDate" 
                    checked={showEndDate} 
                    onCheckedChange={setShowEndDate} 
                  />
                </div>
                {showEndDate && (
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          
          {contractType && renderContractSpecificFields()}
        </div>

        <div className="space-y-5 animate-in fade-in-25 slide-in-from-bottom-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Informations du client
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du client</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom complet ou raison sociale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du client</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone du client</FormLabel>
                  <FormControl>
                    <PhoneInput 
                      id="clientPhone"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Numéro de téléphone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-5 animate-in fade-in-50 slide-in-from-bottom-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Informations du prestataire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="providerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du prestataire</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom complet ou raison sociale" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du prestataire</FormLabel>
                  <FormControl>
                    <Input placeholder="Adresse complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone du prestataire</FormLabel>
                  <FormControl>
                    <PhoneInput 
                      id="providerPhone"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Numéro de téléphone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-5 animate-in fade-in-75 slide-in-from-bottom-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Détails du projet
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du projet</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez le projet ou le service"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contractAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant du contrat</FormLabel>
                    <FormControl>
                      <Input placeholder="Montant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devise</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une devise" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="payment-options">
                <AccordionTrigger>Options de paiement</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="isInstallmentPayment"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Paiement échelonné
                            </FormLabel>
                            <FormDescription>
                              Payer en plusieurs versements au lieu d'un seul paiement.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {isInstallmentPayment && (
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="installments"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre de versements</FormLabel>
                              <FormControl>
                                <Select 
                                  value={field.value.toString()} 
                                  onValueChange={(value) => field.onChange(parseInt(value))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choisir le nombre" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[2, 3, 4, 5, 6].map((num) => (
                                      <SelectItem key={num} value={num.toString()}>
                                        {num} versements
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription>
                                En combien de fois souhaitez-vous échelonner le paiement?
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="firstPaymentPercent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Premier versement: {field.value}%</FormLabel>
                              <FormControl>
                                <Slider
                                  min={10}
                                  max={90}
                                  step={5}
                                  value={[field.value]}
                                  onValueChange={(values) => field.onChange(values[0])}
                                />
                              </FormControl>
                              <FormDescription>
                                Pourcentage du montant total à payer lors du premier versement.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        {installments > 1 && (
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium">Délais de paiement</h3>
                            {Array.from({ length: installments - 1 }, (_, i) => (
                              <div key={i} className="flex items-center gap-4 border p-3 rounded-md">
                                <div className="font-medium text-sm">Versement #{i + 2}:</div>
                                <div className="flex flex-1 items-center gap-2">
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder="30"
                                    className="w-20"
                                    value={paymentIntervals[i]?.interval || "30"}
                                    onChange={(e) => handleIntervalChange(i, e.target.value)}
                                  />
                                  <Select
                                    value={paymentIntervals[i]?.unit || "days"}
                                    onValueChange={(value) => handleUnitChange(i, value)}
                                  >
                                    <SelectTrigger className="w-36">
                                      <SelectValue placeholder="Unité" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {timeUnits.map(unit => (
                                        <SelectItem key={unit.value} value={unit.value}>
                                          {unit.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <div className="text-sm text-muted-foreground">
                                    après la signature
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {contractAmount && !isNaN(Number(contractAmount)) && (
                          <div className="mt-4 space-y-4">
                            <h3 className="text-sm font-medium">Échéancier de paiement</h3>
                            <div className="rounded-md border">
                              <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b text-sm">
                                <div>Versement</div>
                                <div>Pourcentage</div>
                                <div>Montant</div>
                                <div>Échéance</div>
                              </div>
                              <div className="divide-y">
                                {calculateInstallments().map((item) => (
                                  <div key={item.number} className="grid grid-cols-4 gap-4 p-4 text-sm">
                                    <div>#{item.number}</div>
                                    <div>{item.percent}%</div>
                                    <div>{item.amount} {currencies.find(c => c.id === currency)?.symbol}</div>
                                    <div>{item.date}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Génération en cours..." : "Générer le contrat"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContractForm;
