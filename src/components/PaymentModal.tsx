
import React, { useState } from "react";
import { Check, Loader2, CreditCard, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { initiatePayment, verifyPayment } from "@/utils/lygosPayment";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  price: number;
  color?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
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

const paymentMethods: PaymentMethod[] = [
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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (optionId: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("mobile-money");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { currentUser } = useAuth();

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
  };
  
  const handlePaymentMethodSelect = (id: string) => {
    setSelectedPaymentMethod(id);
  };

  const proceedToPayment = () => {
    if (!selectedOption) {
      toast.error("Veuillez sélectionner une option");
      return;
    }
    
    // If user is not authenticated, prompt to login
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    
    // If authenticated, move to payment step
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedOption || !selectedPaymentMethod) {
      toast.error("Veuillez sélectionner une option et un mode de paiement");
      return;
    }

    if (selectedPaymentMethod === "mobile-money" && !phoneNumber.trim()) {
      toast.error("Veuillez saisir votre numéro de téléphone");
      return;
    }

    const selectedPaymentOption = paymentOptions.find(option => option.id === selectedOption);
    if (!selectedPaymentOption) return;

    setIsProcessing(true);

    try {
      const paymentResult = await initiatePayment({
        amount: selectedPaymentOption.price,
        description: `ContratPro - ${selectedPaymentOption.name}`,
        customerPhone: phoneNumber,
        currency: "FCF"
      });

      if (paymentResult.success) {
        const verified = await verifyPayment(paymentResult.transactionId || "");
        
        if (verified) {
          setIsComplete(true);
          setTimeout(() => {
            onPaymentSuccess(selectedOption);
            toast.success("Paiement réussi !");
            setIsProcessing(false);
            setIsComplete(false);
            setStep(1);
            onClose();
          }, 1500);
        } else {
          toast.error("La vérification du paiement a échoué");
          setIsProcessing(false);
        }
      } else {
        toast.error(paymentResult.error || "Le paiement a échoué");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Une erreur est survenue lors du paiement");
      setIsProcessing(false);
    }
  };
  
  const resetModal = () => {
    setStep(1);
    setSelectedOption(null);
    setSelectedPaymentMethod("mobile-money");
    setPhoneNumber("");
  };

  // When modal is closed, reset the form
  React.useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Options premium</DialogTitle>
            <DialogDescription>
              Améliorez votre contrat avec nos options premium. Un paiement de 200 FCF sera nécessaire pour activer l'option sélectionnée.
            </DialogDescription>
          </DialogHeader>
          
          {!isProcessing && !isComplete ? (
            step === 1 ? (
              <>
                <div className="py-4">
                  <h3 className="text-sm font-medium mb-3">Sélectionnez une option :</h3>
                  <RadioGroup value={selectedOption || ""} onValueChange={handleOptionSelect}>
                    {paymentOptions.map((option) => (
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
                
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline" onClick={onClose}>
                    Annuler
                  </Button>
                  <Button onClick={proceedToPayment} disabled={!selectedOption}>
                    Procéder au paiement
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="py-4">
                  <h3 className="text-sm font-medium mb-3">Choisissez votre mode de paiement :</h3>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={handlePaymentMethodSelect}>
                    {paymentMethods.map((method) => (
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
                
                {selectedPaymentMethod === "mobile-money" && (
                  <div className="space-y-3">
                    <PhoneInput
                      label="Numéro de téléphone pour le paiement"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      placeholder="Votre numéro de téléphone"
                    />
                    <p className="text-xs text-muted-foreground">
                      Le paiement sera traité via Lygos sur ce numéro
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Retour
                  </Button>
                  <Button 
                    onClick={handlePaymentSubmit} 
                    disabled={
                      !selectedPaymentMethod || 
                      (selectedPaymentMethod === "mobile-money" && !phoneNumber.trim())
                    }
                  >
                    Payer {paymentOptions.find(o => o.id === selectedOption)?.price} FCF
                  </Button>
                </div>
              </>
            )
          ) : isComplete ? (
            <div className="py-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">Paiement réussi !</h3>
              <p className="text-muted-foreground">Votre option premium est maintenant activée.</p>
            </div>
          ) : (
            <div className="py-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Traitement du paiement...</h3>
              <p className="text-muted-foreground">Veuillez patienter pendant que nous traitons votre paiement.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default PaymentModal;
