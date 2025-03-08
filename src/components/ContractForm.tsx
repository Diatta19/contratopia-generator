
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
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onFormSubmit: (data: any) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEndDate, setShowEndDate] = useState(true);
  
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contractType: "",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "",
      contractAmount: "",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      installments: 2,
      firstPaymentPercent: 50,
    },
  });

  const isInstallmentPayment = form.watch("isInstallmentPayment");
  const installments = form.watch("installments");
  const firstPaymentPercent = form.watch("firstPaymentPercent");
  const contractAmount = form.watch("contractAmount");
  const currency = form.watch("currency");
  const startDate = form.watch("startDate");

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
      ...Array.from({ length: installments - 1 }, (_, i) => ({
        number: i + 2,
        percent: ((100 - firstPaymentPercent) / (installments - 1)).toFixed(1),
        amount: installmentAmount.toFixed(2),
        date: `${30 * (i + 1)} jours après la signature`,
      })),
    ];
  };

  const onSubmit = async (data: ContractFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Préparer les données pour le contrat
      const formattedData = {
        ...data,
        paymentSchedule: {
          installments: data.isInstallmentPayment ? data.installments : 1,
          firstPaymentPercent: data.firstPaymentPercent,
          installmentDates: calculateInstallments().map(item => item.date),
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
