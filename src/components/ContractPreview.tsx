
import React from "react";
import { Download, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContractData {
  contractType: string;
  clientName: string;
  clientAddress: string;
  providerName: string;
  providerAddress: string;
  projectDescription: string;
  contractAmount: string;
  startDate: string;
  endDate: string;
}

interface ContractPreviewProps {
  contractData: ContractData | null;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const getContractTypeName = (contractType: string) => {
  const types: Record<string, string> = {
    serviceAgreement: "Contrat de prestation de service",
    workContract: "Contrat de travail",
    nda: "Accord de confidentialité",
    saleContract: "Contrat de vente",
  };
  return types[contractType] || contractType;
};

const ContractPreview: React.FC<ContractPreviewProps> = ({ contractData }) => {
  if (!contractData) {
    return (
      <div className="flex min-h-[600px] items-center justify-center text-center p-10 border rounded-lg bg-muted/20">
        <div className="max-w-md mx-auto">
          <FileCheck className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Aperçu du contrat
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Remplissez le formulaire pour générer un aperçu de votre contrat professionnel.
          </p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Cette fonctionnalité téléchargerait le contrat en PDF dans une application réelle.");
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Aperçu du contrat
        </h2>
        <Button variant="default" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          Télécharger
        </Button>
      </div>
      
      <Card className="flex-1 overflow-auto">
        <CardContent className="p-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h1 className={cn(
                "text-2xl font-bold mb-3",
                contractData.contractType === "nda" && "uppercase"
              )}>
                {getContractTypeName(contractData.contractType)}
              </h1>
              <div className="text-muted-foreground text-sm">
                Contrat établi le {new Date().toLocaleDateString("fr-FR")}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Entre les soussignés :</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="border-l-2 pl-4">
                    <h3 className="font-medium mb-2">LE CLIENT</h3>
                    <p className="text-sm text-foreground mb-1">{contractData.clientName}</p>
                    <p className="text-sm text-muted-foreground">{contractData.clientAddress}</p>
                  </div>
                  
                  <div className="border-l-2 pl-4">
                    <h3 className="font-medium mb-2">LE PRESTATAIRE</h3>
                    <p className="text-sm text-foreground mb-1">{contractData.providerName}</p>
                    <p className="text-sm text-muted-foreground">{contractData.providerAddress}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 1 - Objet du contrat</h2>
                <p className="text-sm leading-relaxed">{contractData.projectDescription}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 2 - Durée</h2>
                <p className="text-sm leading-relaxed">
                  Le présent contrat prend effet à compter du {formatDate(contractData.startDate)} et se termine le {formatDate(contractData.endDate)}.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 3 - Rémunération</h2>
                <p className="text-sm leading-relaxed">
                  En contrepartie des prestations définies à l'article 1, le client versera au prestataire la somme de {contractData.contractAmount} euros.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 4 - Conditions de paiement</h2>
                <p className="text-sm leading-relaxed">
                  Le paiement s'effectuera selon les modalités suivantes : 30% à la signature du contrat, 70% à la livraison.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-10">
                  Fait en deux exemplaires originaux, à ____________, le ____________
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">Pour le client</p>
                    <p className="text-sm text-muted-foreground">Signature précédée de la mention "Lu et approuvé"</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">Pour le prestataire</p>
                    <p className="text-sm text-muted-foreground">Signature précédée de la mention "Lu et approuvé"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractPreview;
