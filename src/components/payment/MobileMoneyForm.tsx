
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { UseFormReturn } from "react-hook-form";

interface MobileMoneyFormProps {
  form: UseFormReturn<any>;
  paymentCode: string;
}

const MobileMoneyForm: React.FC<MobileMoneyFormProps> = ({ form, paymentCode }) => {
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
};

export default MobileMoneyForm;
