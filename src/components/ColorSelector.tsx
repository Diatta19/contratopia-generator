
import React, { useState } from "react";
import { Palette } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import PaymentModal from "./PaymentModal";

const colorOptions = [
  { value: "default", label: "Standard (Gratuit)", color: "#ffffff", isPaid: false },
  { value: "blue", label: "Bleu Professionnel", color: "#D3E4FD", isPaid: true },
  { value: "green", label: "Vert Élégant", color: "#F2FCE2", isPaid: true },
  { value: "peach", label: "Pêche Premium", color: "#FDE1D3", isPaid: true },
  { value: "purple", label: "Violet Distinctif", color: "#E5DEFF", isPaid: true },
];

interface ColorSelectorProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ currentColor, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(currentColor || "default");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingColorChoice, setPendingColorChoice] = useState<string | null>(null);
  
  const handleColorSelect = (value: string) => {
    setSelectedColor(value);
  };
  
  const handleConfirm = () => {
    const selected = colorOptions.find(option => option.value === selectedColor);
    
    if (selected?.isPaid) {
      setPendingColorChoice(selectedColor);
      setIsDialogOpen(false);
      setIsPaymentModalOpen(true);
    } else {
      onColorChange(selectedColor);
      setIsDialogOpen(false);
    }
  };
  
  const handlePaymentSuccess = (optionId: string) => {
    if (pendingColorChoice) {
      onColorChange(pendingColorChoice);
      setPendingColorChoice(null);
    }
  };
  
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Palette className="h-4 w-4" />
            Changer la couleur
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Personnaliser la couleur du contrat</DialogTitle>
            <DialogDescription>
              Choisissez une couleur pour votre contrat. Les options premium nécessitent un paiement de 200 FCF.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={selectedColor} onValueChange={handleColorSelect}>
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 mb-3"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                    <div 
                      className="w-6 h-6 rounded border border-gray-300" 
                      style={{ backgroundColor: option.color }}
                    />
                    <span>{option.label}</span>
                    {option.isPaid && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">200 FCF</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirm}>
              Confirmer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default ColorSelector;
