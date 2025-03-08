
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import MobileMoneyForm from "./MobileMoneyForm";
import CardPaymentForm from "./CardPaymentForm";
import WalletPaymentForm from "./WalletPaymentForm";
import PaymentErrorAlert from "./PaymentErrorAlert";

interface PaymentFormProps {
  method: string;
  isProcessing: boolean;
  paymentStatus: 'idle' | 'processing' | 'success' | 'error';
  paymentError: string | null;
  paymentCode: string;
  currentUserEmail: string;
  onSubmit: (data: any) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  method,
  isProcessing,
  paymentStatus,
  paymentError,
  paymentCode,
  currentUserEmail,
  onSubmit
}) => {
  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      cardNumber: "",
      cardExpiry: "",
      cvv: "",
      mobileProvider: "orange",
      walletProvider: "paypal",
      email: currentUserEmail || "",
    }
  });

  const renderPaymentMethodForm = () => {
    switch (method) {
      case "mobile-money":
        return <MobileMoneyForm form={form} paymentCode={paymentCode} />;
      case "card":
        return <CardPaymentForm form={form} />;
      case "wallet":
        return <WalletPaymentForm form={form} />;
      default:
        return <p>Méthode de paiement non prise en charge</p>;
    }
  };

  return (
    <>
      <PaymentErrorAlert error={paymentError} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderPaymentMethodForm()}
          
          <div className="flex justify-end px-0 pt-4">
            <Button 
              type="submit" 
              disabled={isProcessing || paymentStatus === 'success'}
              className="w-full"
            >
              {isProcessing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {paymentStatus === 'success' ? 'Paiement confirmé' : 'Confirmer le paiement'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PaymentForm;
