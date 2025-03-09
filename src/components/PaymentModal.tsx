
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import PaymentOptionList from "@/components/payment/PaymentOptionList";
import PaymentMethodList from "@/components/payment/PaymentMethodList";
import PaymentStatus from "@/components/payment/PaymentStatus";
import { paymentOptions, paymentMethods } from "@/data/paymentOptions";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (optionId: string) => void;
  contractData?: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onPaymentSuccess,
  contractData
}) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("mobile-money");
  const [selectedMobileProvider, setSelectedMobileProvider] = useState<string>("orange");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [step, setStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  
  const { currentUser } = useAuth();

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id);
  };
  
  const handlePaymentMethodSelect = (id: string) => {
    setSelectedPaymentMethod(id);
  };

  // Déterminer si on doit afficher l'input de code de paiement
  const shouldShowPaymentCodeInput = () => {
    if (selectedPaymentMethod !== "mobile-money") return false;
    
    // Vérifier le mobile provider à partir de l'étape de paiement
    return selectedMobileProvider === "orange" || 
           selectedMobileProvider === "free" || 
           selectedMobileProvider === "mtn";
  };

  // Récupérer le provider mobile
  const handleMobileProviderChange = (provider: string) => {
    setSelectedMobileProvider(provider);
  };

  // Gérer le changement de code de paiement
  const handlePaymentCodeChange = (code: string) => {
    setPaymentCode(code);
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

  const handlePaymentSubmit = () => {
    if (!selectedOption || !selectedPaymentMethod) {
      toast.error("Veuillez sélectionner une option et un mode de paiement");
      return;
    }

    // Vérifier si un code de paiement est requis mais non fourni
    if (shouldShowPaymentCodeInput() && !paymentCode) {
      toast.error("Veuillez entrer le code de paiement temporaire");
      return;
    }

    const selectedPaymentOption = paymentOptions.find(option => option.id === selectedOption);
    if (!selectedPaymentOption) return;

    // Close the modal
    onClose();
    
    // Navigate to payment details page with payment information and contract data
    navigate("/payment-details", {
      state: {
        method: selectedPaymentMethod,
        amount: selectedPaymentOption.price,
        paymentOption: selectedOption,
        mobileProvider: selectedMobileProvider,
        paymentCode: paymentCode,
        contractData: contractData // Pass contract data to maintain state
      }
    });
  };
  
  const resetModal = () => {
    setStep(1);
    setSelectedOption(null);
    setSelectedPaymentMethod("mobile-money");
    setSelectedMobileProvider("orange");
    setPaymentCode("");
  };

  // When modal is closed, reset the form
  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // Handle payment success from other components
  useEffect(() => {
    const handleStorageChange = () => {
      const paymentSuccess = sessionStorage.getItem('paymentSuccess');
      const paymentOption = sessionStorage.getItem('paymentOption');
      
      if (paymentSuccess && paymentOption) {
        // Clear storage
        sessionStorage.removeItem('paymentSuccess');
        sessionStorage.removeItem('paymentOption');
        
        // Call success callback
        onPaymentSuccess(paymentOption);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onPaymentSuccess]);

  const renderContent = () => {
    if (isProcessing || isComplete) {
      return <PaymentStatus isProcessing={isProcessing} isComplete={isComplete} />;
    }

    if (step === 1) {
      return (
        <>
          <PaymentOptionList 
            options={paymentOptions}
            selectedOption={selectedOption}
            onOptionSelect={handleOptionSelect}
          />
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={proceedToPayment} disabled={!selectedOption}>
              Procéder au paiement
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <PaymentMethodList 
          methods={paymentMethods}
          selectedMethod={selectedPaymentMethod}
          onMethodSelect={handlePaymentMethodSelect}
          showPaymentCodeInput={shouldShowPaymentCodeInput()}
          paymentCodeProvider={selectedMobileProvider}
          paymentCode={paymentCode}
          onPaymentCodeChange={handlePaymentCodeChange}
        />
        
        <div className="flex justify-between gap-3 mt-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Retour
          </Button>
          <Button 
            onClick={handlePaymentSubmit} 
            disabled={!selectedPaymentMethod || (shouldShowPaymentCodeInput() && !paymentCode)}
          >
            Continuer
          </Button>
        </div>
      </>
    );
  };

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
          
          {renderContent()}
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
