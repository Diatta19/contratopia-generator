import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, LoaderCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { useForm } from "react-hook-form";
import { initiatePayment, verifyPayment } from "@/utils/lygosPayment";
import { useAuth } from "@/contexts/AuthContext";
import { currencies } from "@/data/paymentOptions";

interface PaymentDetailsProps {}

const PaymentDetails: React.FC<PaymentDetailsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCode, setPaymentCode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  const { method, amount, paymentOption, currency = "fcf" } = location.state || {};
  
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
  
  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      cardNumber: "",
      cardExpiry: "",
      cvv: "",
      mobileProvider: "orange",
      walletProvider: "paypal",
      email: currentUser?.email || "",
    }
  });
  
  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setPaymentError(null);
    
    try {
      let paymentData = {
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
        } else if (data.mobileProvider === "free") {
          setPaymentCode("#555*4*3#");
        } else if (data.mobileProvider === "mtn") {
          setPaymentCode("#126#");
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
      
      const paymentResult = await initiatePayment(paymentData as any);
      
      if (paymentResult.success) {
        if (method === "mobile-money" && data.mobileProvider === "wave") {
          window.location.href = `wave://payment?phone=${data.phoneNumber}&amount=${amount}`;
          return;
        }
        
        const verified = await verifyPayment(paymentResult.transactionId || "");
        
        if (verified) {
          setPaymentStatus('success');
          toast.success("Paiement réussi !");
          
          sessionStorage.setItem('paymentSuccess', 'true');
          sessionStorage.setItem('paymentOption', paymentOption);
          
          window.dispatchEvent(new Event('storage'));
          
          setTimeout(() => {
            navigate("/generate");
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
  
  const renderPaymentForm = () => {
    switch (method) {
      case "mobile-money":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="mobileProvider"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choisissez votre opérateur</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="orange" id="orange" />
                        <Label htmlFor="orange">Orange Money</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="free" id="free" />
                        <Label htmlFor="free">Free Money</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn">MTN Money</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="wave" id="wave" />
                        <Label htmlFor="wave">Wave</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <PhoneInput 
                      value={field.value} 
                      onChange={field.onChange}
                      placeholder="Votre numéro de téléphone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {paymentCode && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <h3 className="font-medium text-blue-800">Code de paiement:</h3>
                <p className="text-xl font-bold mt-2 text-center">{paymentCode}</p>
                <p className="text-sm text-blue-600 mt-2">
                  Composez ce code sur votre téléphone pour finaliser le paiement
                </p>
              </div>
            )}
          </div>
        );
        
      case "card":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de carte</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="1234 5678 9012 3456" 
                      maxLength={19}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '');
                        const formattedValue = value
                          .replace(/\D/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim();
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'expiration</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="MM/YY" 
                        maxLength={5} 
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 2) {
                            field.onChange(value);
                          } else {
                            field.onChange(
                              `${value.slice(0, 2)}/${value.slice(2, 4)}`
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="password" 
                        placeholder="123" 
                        maxLength={3}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
        
      case "wallet":
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="walletProvider"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choisissez votre portefeuille électronique</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="stripe" id="stripe" />
                        <Label htmlFor="stripe">Stripe</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-md">
                        <RadioGroupItem value="skrill" id="skrill" />
                        <Label htmlFor="skrill">Skrill</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="votre@email.com" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      default:
        return <p>Méthode de paiement non prise en charge</p>;
    }
  };
  
  const getMethodTitle = () => {
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
  };

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
            {paymentStatus === 'error' && paymentError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {paymentError}
                </AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderPaymentForm()}
                
                <CardFooter className="flex justify-end px-0 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isProcessing || paymentStatus === 'success'}
                    className="w-full"
                  >
                    {isProcessing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    {paymentStatus === 'success' ? 'Paiement confirmé' : 'Confirmer le paiement'}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetails;
