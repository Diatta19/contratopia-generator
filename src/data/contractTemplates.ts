
export interface ContractTemplate {
  id: number;
  title: string;
  description: string;
  image: string;
  contractType: string;
  contractSubtype?: string;
  templateData: any;
}

export const contractTemplates: ContractTemplate[] = [
  {
    id: 1,
    title: "Contrat de prestation de service",
    description: "Idéal pour les freelances et consultants proposant des services.",
    image: "/lovable-uploads/e49af7c4-b475-4344-b25f-fedf5ece490a.png",
    contractType: "serviceAgreement",
    contractSubtype: "consulting",
    templateData: {
      contractType: "serviceAgreement",
      contractSubtype: "consulting",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Prestation de conseil en stratégie d'entreprise incluant une analyse de marché, recommandations stratégiques et plan d'action personnalisé.",
      contractDetails: "Le prestataire s'engage à fournir un rapport détaillé, à effectuer un minimum de 3 réunions de suivi, et à être disponible par email pour répondre aux questions pendant toute la durée du contrat.",
      penalties: "En cas de retard de livraison supérieur à 15 jours, une pénalité de 5% du montant total sera appliquée par semaine de retard, dans la limite de 20% du montant total.",
      contractAmount: "5000",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: true,
      installments: 2,
      firstPaymentPercent: 50,
      paymentSchedule: {
        installments: 2,
        firstPaymentPercent: 50,
        installmentDates: ["À la signature", "30 jours après la signature"],
        paymentIntervals: [{interval: "30", unit: "days"}]
      }
    }
  },
  {
    id: 2,
    title: "Contrat de travail CDI",
    description: "Pour établir une relation d'emploi à durée indéterminée conforme au droit.",
    image: "/lovable-uploads/056e5996-57ab-428b-b0ff-d66f5f0167ac.png",
    contractType: "workContract",
    contractSubtype: "cdi",
    templateData: {
      contractType: "workContract",
      contractSubtype: "cdi",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Contrat à durée indéterminée pour le poste de [Titre du poste] au sein de l'entreprise, avec les responsabilités suivantes : [Listez les principales responsabilités].",
      contractDetails: "Horaires de travail : 40 heures par semaine, du lundi au vendredi. Avantages : assurance maladie, 25 jours de congés payés par an, plan de retraite d'entreprise.",
      penalties: "En cas de non-respect des obligations professionnelles, l'employeur peut appliquer les sanctions disciplinaires prévues par le règlement intérieur, pouvant aller jusqu'au licenciement pour faute grave.",
      contractAmount: "500000",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      paymentSchedule: {
        installments: 1,
        firstPaymentPercent: 100,
        installmentDates: ["Mensuel, le dernier jour du mois"]
      }
    }
  },
  {
    id: 3,
    title: "Contrat de bail commercial",
    description: "Encadre la location d'un local à usage professionnel ou commercial.",
    image: "/lovable-uploads/439eaccd-7f11-4c2a-9b85-1c9de108cf8f.png",
    contractType: "rentalContract",
    contractSubtype: "commercial",
    templateData: {
      contractType: "rentalContract",
      contractSubtype: "commercial",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Location d'un local commercial de [superficie] m² situé à [adresse complète] pour une activité de [type d'activité].",
      contractDetails: "Le locataire est autorisé à effectuer des aménagements à condition d'obtenir l'accord écrit préalable du propriétaire. Le local est loué en l'état. Un état des lieux sera effectué à l'entrée et à la sortie.",
      penalties: "Tout retard de paiement entraînera une pénalité de 10% du montant dû. En cas de dégradation du local, les frais de remise en état seront à la charge du locataire.",
      contractAmount: "150000",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      paymentSchedule: {
        installments: 1,
        firstPaymentPercent: 100,
        installmentDates: ["Mensuel, le 5 de chaque mois"]
      }
    }
  },
  {
    id: 4,
    title: "Contrat de vente",
    description: "Sécurise les transactions entre vendeurs et acheteurs.",
    image: "/lovable-uploads/b7ae53b0-09b9-4e5a-a8b7-9d581160839d.png",
    contractType: "saleContract",
    contractSubtype: "goods",
    templateData: {
      contractType: "saleContract",
      contractSubtype: "goods",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Vente de [description du bien] en l'état, avec les caractéristiques suivantes : [listez les caractéristiques principales].",
      contractDetails: "Le vendeur garantit être le propriétaire légitime du bien vendu et qu'il est libre de tout gage ou hypothèque. La livraison sera effectuée à l'adresse de l'acheteur dans un délai de 15 jours après paiement complet.",
      penalties: "En cas d'annulation par l'acheteur après signature, un montant forfaitaire de 15% sera retenu. En cas de non-livraison dans les délais convenus, l'acheteur pourra annuler la vente et être intégralement remboursé.",
      contractAmount: "100000",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: true,
      installments: 2,
      firstPaymentPercent: 50,
      paymentSchedule: {
        installments: 2,
        firstPaymentPercent: 50,
        installmentDates: ["À la signature", "À la livraison"],
        paymentIntervals: [{interval: "15", unit: "days"}]
      }
    }
  },
  {
    id: 5,
    title: "Accord de confidentialité",
    description: "Protège les informations sensibles échangées entre parties.",
    image: "/lovable-uploads/473b3ec1-c30f-4634-b5c9-b700422e9626.png",
    contractType: "nda",
    contractSubtype: "bilateral",
    templateData: {
      contractType: "nda",
      contractSubtype: "bilateral",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Accord de confidentialité concernant l'échange d'informations sensibles dans le cadre du projet [nom du projet].",
      contractDetails: "Les informations confidentielles comprennent: documents techniques, données clients, stratégies commerciales, codes sources, et toute autre information marquée comme confidentielle. La durée de confidentialité s'étend à 5 ans après la fin de la collaboration.",
      penalties: "Toute violation de cet accord entraînera le paiement de dommages et intérêts d'un montant minimum de 5 000 000 FCFA, sans préjudice du droit à réclamer l'indemnisation du préjudice réellement subi.",
      contractAmount: "0",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      paymentSchedule: {
        installments: 1,
        firstPaymentPercent: 100,
        installmentDates: ["Non applicable"]
      }
    }
  },
  {
    id: 6,
    title: "Contrat de partenariat",
    description: "Encadre la collaboration entre deux ou plusieurs parties pour un projet commun.",
    image: "/lovable-uploads/dc3cefa8-0b03-4692-b9a5-41c099597f81.png",
    contractType: "partnershipContract",
    contractSubtype: "strategic",
    templateData: {
      contractType: "partnershipContract",
      contractSubtype: "strategic",
      clientName: "",
      clientAddress: "",
      clientPhone: "",
      providerName: "",
      providerAddress: "",
      providerPhone: "",
      projectDescription: "Partenariat stratégique entre les deux parties pour le développement et la commercialisation de [produit/service].",
      contractDetails: "Les deux parties s'engagent à contribuer aux ressources suivantes: [partie 1] apportera [ressources], [partie 2] apportera [ressources]. La répartition des bénéfices sera effectuée à hauteur de [pourcentage] pour [partie 1] et [pourcentage] pour [partie 2].",
      penalties: "En cas de non-respect des engagements, la partie défaillante devra verser une indemnité compensatoire de 20% de la valeur estimée du projet. La résiliation anticipée sans motif valable entraînera le versement d'une indemnité forfaitaire de 3 000 000 FCFA.",
      contractAmount: "0",
      currency: "fcf",
      startDate: "",
      endDate: "",
      isInstallmentPayment: false,
      paymentSchedule: {
        installments: 1,
        firstPaymentPercent: 100,
        installmentDates: ["Selon la répartition des bénéfices"]
      }
    }
  }
];
