
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentOption } from "@/data/paymentOptions";

interface PaymentOptionListProps {
  options: PaymentOption[];
  selectedOption: string | null;
  onOptionSelect: (id: string) => void;
}

const PaymentOptionList: React.FC<PaymentOptionListProps> = ({
  options,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="py-4">
      <h3 className="text-sm font-medium mb-3">Sélectionnez une option :</h3>
      <RadioGroup value={selectedOption || ""} onValueChange={onOptionSelect}>
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-2 mb-4 p-3 border rounded-md hover:bg-gray-50"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border" 
                  style={{ backgroundColor: option.color }}
                />
                <span className="font-medium">{option.name}</span>
                <span className="ml-auto text-sm font-semibold text-blue-600">{option.price} FCF</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentOptionList;
