
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CardPaymentFormProps {
  form: UseFormReturn<any>;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({ form }) => {
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
};

export default CardPaymentForm;
