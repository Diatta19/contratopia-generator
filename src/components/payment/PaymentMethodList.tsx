
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/data/paymentOptions";
import { Input } from "@/components/ui/input";

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onMethodSelect: (id: string) => void;
  showPaymentCodeInput?: boolean;
  paymentCodeProvider?: string;
  paymentCode?: string;
  onPaymentCodeChange?: (code: string) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  methods,
  selectedMethod,
  onMethodSelect,
  showPaymentCodeInput = false,
  paymentCodeProvider = "",
  paymentCode = "",
  onPaymentCodeChange = () => {},
}) => {
  // Instructions de code selon l'opérateur de mobile money
  const getPaymentInstructions = (provider: string) => {
    switch (provider) {
      case "orange":
        return "Composez le #144*391# sur votre téléphone pour générer un code temporaire.";
      case "free":
        return "Composez le #555*4*3# sur votre téléphone pour générer un code temporaire.";
      case "mtn":
        return "Composez le #126# sur votre téléphone pour générer un code temporaire.";
      default:
        return "";
    }
  };

  return (
    <div className="py-4">
      <h3 className="text-sm font-medium mb-3">Choisissez votre mode de paiement :</h3>
      <RadioGroup value={selectedMethod} onValueChange={onMethodSelect}>
        {methods.map((method) => {
          // Create icon component dynamically
          const IconComponent = method.icon;
          
          return (
            <div
              key={method.id}
              className="flex items-center space-x-2 mb-4 p-3 border rounded-md hover:bg-gray-50"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{method.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {showPaymentCodeInput && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-700 font-medium">
              {getPaymentInstructions(paymentCodeProvider)}
            </p>
          </div>
          <div>
            <Label htmlFor="payment-code">Code de paiement temporaire</Label>
            <Input
              id="payment-code"
              type="text"
              placeholder="Entrez le code temporaire reçu"
              value={paymentCode}
              onChange={(e) => onPaymentCodeChange(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodList;
