
import React, { useState } from "react";
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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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
  providerName: z.string().min(2, {
    message: "Le nom du prestataire doit contenir au moins 2 caractères",
  }),
  providerAddress: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  projectDescription: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  contractAmount: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Le montant doit être un nombre valide",
  }),
  startDate: z.string(),
  endDate: z.string(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onFormSubmit: (data: ContractFormValues) => void;
}

const ContractForm: React.FC<ContractFormProps> = ({ onFormSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      contractType: "",
      clientName: "",
      clientAddress: "",
      providerName: "",
      providerAddress: "",
      projectDescription: "",
      contractAmount: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data: ContractFormValues) => {
    try {
      setIsSubmitting(true);
      // Simulate server delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onFormSubmit(data);
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
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <FormField
              control={form.control}
              name="contractAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant du contrat (€)</FormLabel>
                  <FormControl>
                    <Input placeholder="Montant en euros" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
