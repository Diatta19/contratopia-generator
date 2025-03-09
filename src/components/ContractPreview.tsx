import React, { useState } from "react";
import { Download, FileCheck, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ColorSelector from "./ColorSelector";
import FeedbackForm from "./FeedbackForm";
import PaymentModal from "./PaymentModal";
import { currencies } from "@/data/paymentOptions";

interface ContractData {
  contractType: string;
  contractSubtype?: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  providerName: string;
  providerAddress: string;
  providerPhone: string;
  projectDescription: string;
  contractDetails?: string;
  penalties?: string;
  contractAmount: string;
  currency: string;
  startDate: string;
  endDate?: string;
  paymentSchedule: {
    installments: number;
    firstPaymentPercent: number;
    installmentDates: string[];
    paymentIntervals?: Array<{interval: string, unit: string}>;
  };
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
    rentalContract: "Contrat de location",
    partnershipContract: "Contrat de partenariat",
  };
  return types[contractType] || contractType;
};

const getContractSubtypeName = (contractType: string, contractSubtype?: string) => {
  if (!contractSubtype) return "";
  
  const subtypes: Record<string, Record<string, string>> = {
    serviceAgreement: {
      consulting: "Consultation",
      development: "Développement",
      design: "Design",
      marketing: "Marketing",
      maintenance: "Maintenance",
      other: "Autre",
    },
    workContract: {
      cdi: "CDI - Contrat à Durée Indéterminée",
      cdd: "CDD - Contrat à Durée Déterminée",
      freelance: "Freelance / Indépendant",
      internship: "Stage",
      apprenticeship: "Apprentissage",
      other: "Autre",
    },
    nda: {
      unilateral: "Unilatéral",
      bilateral: "Bilatéral",
      employee: "Employé",
      consultant: "Consultant",
      other: "Autre",
    },
    saleContract: {
      goods: "Vente de biens",
      services: "Vente de services",
      digitalProducts: "Produits numériques",
      realEstate: "Immobilier",
      vehicle: "Véhicule",
      other: "Autre",
    },
    rentalContract: {
      residential: "Résidentiel",
      commercial: "Commercial",
      equipment: "Équipement",
      vehicle: "Véhicule",
      other: "Autre",
    },
    partnershipContract: {
      joint: "Entreprise commune",
      distribution: "Distribution",
      licensing: "Licence",
      franchising: "Franchise",
      strategic: "Alliance stratégique",
      other: "Autre",
    },
  };
  
  return subtypes[contractType]?.[contractSubtype] || contractSubtype;
};

const getCurrencySymbol = (currencyId: string) => {
  const currency = currencies.find(c => c.id === currencyId);
  return currency ? currency.symbol : currencyId.toUpperCase();
};

const getColorStyle = (colorKey: string) => {
  const colorMap: Record<string, { background: string; border: string }> = {
    default: { background: "bg-white", border: "border-gray-200" },
    blue: { background: "bg-blue-50", border: "border-blue-100" },
    green: { background: "bg-green-50", border: "border-green-100" },
    peach: { background: "bg-orange-50", border: "border-orange-100" },
    purple: { background: "bg-purple-50", border: "border-purple-100" },
  };
  
  return colorMap[colorKey] || colorMap.default;
};

const getSignatoryTitles = (contractType: string): { first: string; second: string } => {
  switch (contractType) {
    case "workContract":
      return { first: "Pour l'employeur", second: "Pour l'employé" };
    case "nda":
      return { first: "Pour le divulgateur", second: "Pour le récepteur" };
    case "saleContract":
      return { first: "Pour le vendeur", second: "Pour l'acheteur" };
    case "rentalContract":
      return { first: "Pour le bailleur", second: "Pour le locataire" };
    case "partnershipContract":
      return { first: "Pour le partenaire 1", second: "Pour le partenaire 2" };
    default:
      return { first: "Pour le prestataire", second: "Pour le client" };
  }
};

const ContractPreview: React.FC<ContractPreviewProps> = ({ contractData }) => {
  const [color, setColor] = useState<string>("default");
  const [hasDownloaded, setHasDownloaded] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  
  const colorStyle = getColorStyle(color);
  
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
    if (color === "default") {
      downloadContract();
    } else {
      setIsPaymentModalOpen(true);
    }
  };
  
  const downloadContract = () => {
    toast.success("Contrat téléchargé avec succès", {
      description: "Le contrat a été téléchargé au format PDF.",
    });
    setHasDownloaded(true);
  };
  
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    toast.success("Couleur appliquée avec succès !");
  };
  
  const handlePaymentSuccess = (optionId: string) => {
    downloadContract();
  };
  
  const handleFeedbackSubmit = (data: { rating: number; comment: string }) => {
    console.log("Feedback submitted:", data);
    toast.success("Merci pour votre feedback !", {
      description: "Votre avis nous aide à améliorer notre service."
    });
  };

  const renderPaymentSchedule = () => {
    if (contractData.paymentSchedule.installments <= 1) {
      return (
        <p className="text-sm leading-relaxed">
          Le paiement s'effectuera en une seule fois à la signature du contrat, pour un montant total de {contractData.contractAmount} {getCurrencySymbol(contractData.currency)}.
        </p>
      );
    }
    
    const totalAmount = Number(contractData.contractAmount);
    const firstAmount = (totalAmount * contractData.paymentSchedule.firstPaymentPercent) / 100;
    const remainingAmount = totalAmount - firstAmount;
    const installmentAmount = remainingAmount / (contractData.paymentSchedule.installments - 1);
    
    return (
      <div className="space-y-2">
        <p className="text-sm leading-relaxed">
          Le paiement s'effectuera en {contractData.paymentSchedule.installments} versements selon l'échéancier suivant:
        </p>
        <ul className="text-sm space-y-1 list-disc pl-5">
          <li>
            <strong>Premier versement:</strong> {firstAmount.toFixed(2)} {getCurrencySymbol(contractData.currency)} ({contractData.paymentSchedule.firstPaymentPercent}%) à la signature du contrat
          </li>
          {Array.from({ length: contractData.paymentSchedule.installments - 1 }, (_, i) => (
            <li key={i}>
              <strong>Versement #{i + 2}:</strong> {installmentAmount.toFixed(2)} {getCurrencySymbol(contractData.currency)} ({((100 - contractData.paymentSchedule.firstPaymentPercent) / (contractData.paymentSchedule.installments - 1)).toFixed(1)}%) {contractData.paymentSchedule.installmentDates[i + 1]}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderContractSpecificContent = () => {
    if (!contractData.contractDetails) return null;
    
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Détails spécifiques</h2>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {contractData.contractDetails}
        </p>
      </div>
    );
  };

  const signatoryTitles = getSignatoryTitles(contractData.contractType);

  return (
    <div className="flex flex-col h-full animate-in fade-in-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Aperçu du contrat
        </h2>
        <div className="flex gap-2">
          <ColorSelector currentColor={color} onColorChange={handleColorChange} />
          <Button variant="default" size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </div>
      
      <Card className={cn("flex-1 overflow-auto", colorStyle.background, colorStyle.border)}>
        <CardContent className="p-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h1 className={cn(
                "text-2xl font-bold mb-3",
                contractData.contractType === "nda" && "uppercase"
              )}>
                {getContractTypeName(contractData.contractType)}
                {contractData.contractSubtype && (
                  <span className="text-lg block mt-1">
                    {getContractSubtypeName(contractData.contractType, contractData.contractSubtype)}
                  </span>
                )}
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
                    <p className="text-sm text-muted-foreground mb-1">{contractData.clientAddress}</p>
                    <p className="text-sm text-muted-foreground">{contractData.clientPhone}</p>
                  </div>
                  
                  <div className="border-l-2 pl-4">
                    <h3 className="font-medium mb-2">LE PRESTATAIRE</h3>
                    <p className="text-sm text-foreground mb-1">{contractData.providerName}</p>
                    <p className="text-sm text-muted-foreground mb-1">{contractData.providerAddress}</p>
                    <p className="text-sm text-muted-foreground">{contractData.providerPhone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 1 - Objet du contrat</h2>
                <p className="text-sm leading-relaxed">{contractData.projectDescription}</p>
              </div>

              {renderContractSpecificContent()}

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 2 - Durée</h2>
                <p className="text-sm leading-relaxed">
                  Le présent contrat prend effet à compter du {formatDate(contractData.startDate)}
                  {contractData.endDate ? ` et se termine le ${formatDate(contractData.endDate)}` : ", pour une durée indéterminée"}.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 3 - Rémunération</h2>
                <p className="text-sm leading-relaxed">
                  En contrepartie des prestations définies à l'article 1, le client versera au prestataire la somme de {contractData.contractAmount} {getCurrencySymbol(contractData.currency)}.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 4 - Modalités de paiement</h2>
                {renderPaymentSchedule()}
              </div>

              {contractData.penalties && (
                <div className="space-y-4">
                  <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Article 5 - Sanctions en cas de non-respect</h2>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {contractData.penalties}
                  </p>
                </div>
              )}

              <div className="mt-16 pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-10">
                  Fait en deux exemplaires originaux, à ____________, le ____________
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">{signatoryTitles.first}</p>
                    <p className="text-sm text-muted-foreground mb-6">Signature précédée de la mention "Lu et approuvé"</p>
                    <div className="h-24 border-b border-dashed border-gray-300 mb-2"></div>
                    <p className="text-xs text-muted-foreground">Nom et signature</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">{signatoryTitles.second}</p>
                    <p className="text-sm text-muted-foreground mb-6">Signature précédée de la mention "Lu et approuvé"</p>
                    <div className="h-24 border-b border-dashed border-gray-300 mb-2"></div>
                    <p className="text-xs text-muted-foreground">Nom et signature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {hasDownloaded && (
        <div className="mt-4 text-center">
          <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
        </div>
      )}
      
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        contractData={contractData}
      />
    </div>
  );
};

export default ContractPreview;
