
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/data/paymentOptions";

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onMethodSelect: (id: string) => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  methods,
  selectedMethod,
  onMethodSelect,
}) => {
  return (
    <div className="py-4">
      <h3 className="text-sm font-medium mb-3">Choisissez votre mode de paiement :</h3>
      <RadioGroup value={selectedMethod} onValueChange={onMethodSelect}>
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center space-x-2 mb-4 p-3 border rounded-md hover:bg-gray-50"
          >
            <RadioGroupItem value={method.id} id={method.id} />
            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                {method.icon}
                <span className="font-medium">{method.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodList;
