
import React from "react";
import { Check, Loader2 } from "lucide-react";

interface PaymentStatusProps {
  isProcessing: boolean;
  isComplete: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  isProcessing, 
  isComplete 
}) => {
  if (isComplete) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium mb-2">Paiement réussi !</h3>
        <p className="text-muted-foreground">Votre option premium est maintenant activée.</p>
      </div>
    );
  }
  
  if (isProcessing) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
        <h3 className="text-lg font-medium mb-2">Traitement du paiement...</h3>
        <p className="text-muted-foreground">Veuillez patienter pendant que nous traitons votre paiement.</p>
      </div>
    );
  }
  
  return null;
};

export default PaymentStatus;
