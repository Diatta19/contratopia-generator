
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { initiatePayment, verifyPayment } from "@/utils/lygosPayment";
import { currencies } from "@/data/paymentOptions";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentStatus from "@/components/payment/PaymentStatus";

interface PaymentData {
  amount: number;
  description: string;
  currency: string;
  paymentMethod: string;
  customerPhone?: string;
  provider?: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
  };
  email?: string;
}

const PaymentDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [pendingAuthCode, setPendingAuthCode] = useState(false);
  
  const { method, amount, paymentOption, currency = "fcf", contractData } = location.state || {};
  
  const currencySymbol = currencies.find(c => c.id === currency)?.symbol || currency.toUpperCase();
  const currencyCode = currencies.find(c => c.id === currency)?.code || currency.toUpperCase();
  
  useEffect(() => {
    if (!method || !amount || !paymentOption) {
      toast.error("Informations de paiement manquantes");
      navigate("/generate");
    }
    
    if (!currentUser) {
      toast.error("Veuillez vous connecter pour effectuer un paiement");
      navigate("/generate");
    }
  }, [method, amount, paymentOption, currentUser, navigate]);
  
  const handleSubmit = async (data: any) => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setPaymentError(null);
    
    try {
      let paymentData: PaymentData = {
        amount,
        description: `ContratPro - ${paymentOption}`,
        currency: currencyCode,
        paymentMethod: method
      };
      
      if (method === "mobile-money") {
        paymentData = {
          ...paymentData,
          customerPhone: data.phoneNumber,
          provider: data.mobileProvider
        };
        
        if (data.mobileProvider === "orange") {
          setPaymentCode("#144*391#");
          setPendingAuthCode(true);
        } else if (data.mobileProvider === "free") {
          setPaymentCode("#555*4*3#");
          setPendingAuthCode(true);
        } else if (data.mobileProvider === "mtn") {
          setPaymentCode("#126#");
          setPendingAuthCode(true);
        } else if (data.mobileProvider === "wave") {
          window.location.href = `wave://payment?phone=${data.phoneNumber}&amount=${amount}`;
          return;
        }
      } else if (method === "card") {
        paymentData = {
          ...paymentData,
          cardDetails: {
            number: data.cardNumber.replace(/\s/g, ''),
            expiry: data.cardExpiry,
            cvv: data.cvv
          }
        };
      } else if (method === "wallet") {
        paymentData = {
          ...paymentData,
          email: data.email,
          provider: data.walletProvider
        };
      }
      
      const paymentResult = await initiatePayment(paymentData);
      
      if (paymentResult.success) {
        if (method === "mobile-money" && (data.mobileProvider === "orange" || 
                                        data.mobileProvider === "free" || 
                                        data.mobileProvider === "mtn")) {
          // For these providers, we need an auth code, so we stay in the pending state
          setIsProcessing(false);
          return;
        }
        
        const verified = await verifyPayment(paymentResult.transactionId || "");
        
        if (verified) {
          setPaymentStatus('success');
          toast.success("Paiement réussi !");
          
          // Store payment success data in sessionStorage
          sessionStorage.setItem('paymentSuccess', 'true');
          sessionStorage.setItem('paymentOption', paymentOption);
          
          // Dispatch storage event to be detected by other components
          window.dispatchEvent(new Event('storage'));
          
          // Navigate back to generate page with contractData if available
          setTimeout(() => {
            navigate("/generate", {
              state: { 
                paymentSuccess: true, 
                selectedOption: paymentOption,
                contractData: contractData // Pass contract data back if available
              }
            });
          }, 1500);
        } else {
          setPaymentStatus('error');
          setPaymentError("La vérification du paiement a échoué");
          toast.error("La vérification du paiement a échoué");
        }
      } else {
        setPaymentStatus('error');
        setPaymentError(paymentResult.error || "Le paiement a échoué");
        toast.error(paymentResult.error || "Le paiement a échoué");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus('error');
      setPaymentError("Une erreur est survenue lors du paiement");
      toast.error("Une erreur est survenue lors du paiement");
    } finally {
      setIsProcessing(false);
    }
  };
  
  function getMethodTitle() {
    switch (method) {
      case "mobile-money":
        return "Mobile Money";
      case "card":
        return "Carte Bancaire";
      case "wallet":
        return "Portefeuille Électronique";
      default:
        return "Paiement";
    }
  }

  function renderContent() {
    if (paymentStatus === 'success') {
      return <PaymentStatus isProcessing={false} isComplete={true} />;
    }
    
    if (paymentStatus === 'error' && paymentError) {
      return <PaymentStatus isProcessing={false} isComplete={false} error={paymentError} />;
    }
    
    if (pendingAuthCode) {
      return <PaymentStatus isProcessing={false} isComplete={false} pendingAuthCode={true} />;
    }
    
    if (paymentStatus === 'processing') {
      return <PaymentStatus isProcessing={true} isComplete={false} />;
    }
    
    return (
      <PaymentForm 
        method={method}
        isProcessing={isProcessing}
        paymentStatus={paymentStatus}
        paymentError={paymentError}
        paymentCode={paymentCode}
        currentUserEmail={currentUser?.email || ""}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Paiement par {getMethodTitle()}</CardTitle>
            <CardDescription>
              Complétez vos informations pour finaliser votre paiement de {amount} {currencySymbol}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetails;
