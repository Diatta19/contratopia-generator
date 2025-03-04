
import React from "react";
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
  const [selectedColor, setSelectedColor] = React.useState(currentColor || "default");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  
  const handleColorSelect = (value: string) => {
    setSelectedColor(value);
  };
  
  const handleConfirm = () => {
    const selected = colorOptions.find(option => option.value === selectedColor);
    
    if (selected?.isPaid) {
      // In a real app, this would open a payment modal
      toast.info("Option payante - 200 FCF", {
        description: "Cette option nécessite un paiement de 200 FCF.",
        action: {
          label: "Payer",
          onClick: () => {
            // Simulate successful payment
            setTimeout(() => {
              toast.success("Paiement réussi !");
              onColorChange(selectedColor);
              setIsDialogOpen(false);
            }, 1500);
          },
        },
      });
    } else {
      onColorChange(selectedColor);
      setIsDialogOpen(false);
    }
  };
  
  return (
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
  );
};

export default ColorSelector;
