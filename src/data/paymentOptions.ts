
import React from "react";
import { Smartphone, CreditCard, Wallet } from "lucide-react";

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  price: number;
  color?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export interface Currency {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

export const paymentOptions: PaymentOption[] = [
  { 
    id: "color-blue", 
    name: "Thème Bleu Professionnel", 
    description: "Donnez à votre contrat un aspect professionnel avec cette teinte bleue élégante", 
    price: 200,
    color: "#D3E4FD" 
  },
  { 
    id: "color-green", 
    name: "Thème Vert Élégant", 
    description: "Un style vert doux pour vos contrats liés à l'environnement ou la santé", 
    price: 200,
    color: "#F2FCE2" 
  },
  { 
    id: "color-peach", 
    name: "Thème Pêche Premium", 
    description: "Une teinte chaleureuse et accueillante pour vos contrats", 
    price: 200,
    color: "#FDE1D3" 
  },
  { 
    id: "color-purple", 
    name: "Thème Violet Distinctif", 
    description: "Un style unique et mémorable pour vos contrats importants", 
    price: 200,
    color: "#E5DEFF" 
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "mobile-money",
    name: "Mobile Money",
    description: "Paiement via Orange Money, Wave, ou Free Money",
    icon: <Smartphone className="h-5 w-5" />
  },
  {
    id: "card",
    name: "Carte Bancaire",
    description: "Paiement sécurisé par carte bancaire",
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: "wallet",
    name: "Portefeuille Électronique",
    description: "PayPal, Skrill ou autre portefeuille électronique",
    icon: <Wallet className="h-5 w-5" />
  }
];

export const currencies: Currency[] = [
  { id: "fcf", name: "Franc CFA (FCFA)", symbol: "FCFA", code: "XOF" },
  { id: "eur", name: "Euro (€)", symbol: "€", code: "EUR" },
  { id: "usd", name: "Dollar US ($)", symbol: "$", code: "USD" },
  { id: "gbp", name: "Livre Sterling (£)", symbol: "£", code: "GBP" },
  { id: "mad", name: "Dirham Marocain (MAD)", symbol: "MAD", code: "MAD" },
  { id: "dzd", name: "Dinar Algérien (DZD)", symbol: "DZD", code: "DZD" },
  { id: "tnd", name: "Dinar Tunisien (TND)", symbol: "TND", code: "TND" },
  { id: "kes", name: "Shilling Kényan (KES)", symbol: "KES", code: "KES" },
  { id: "ngn", name: "Naira Nigérian (₦)", symbol: "₦", code: "NGN" },
  { id: "zar", name: "Rand Sud-Africain (R)", symbol: "R", code: "ZAR" },
  { id: "cad", name: "Dollar Canadien (CA$)", symbol: "CA$", code: "CAD" },
  { id: "chf", name: "Franc Suisse (CHF)", symbol: "CHF", code: "CHF" },
];
