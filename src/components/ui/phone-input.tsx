
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  id?: string;
}

interface CountryCode {
  code: string;
  country: string;
  dial_code: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  className,
  placeholder = "Numéro de téléphone",
  label,
  id = "phone",
}) => {
  // Split the input value into dial code and number
  const [selectedDialCode, setSelectedDialCode] = useState("+221"); // Default to Senegal
  const [phoneNumber, setPhoneNumber] = useState("");

  // Common country codes with emphasis on francophone and anglophone countries
  const countryCodes: CountryCode[] = useMemo(() => [
    { code: "SN", country: "Sénégal", dial_code: "+221" },
    { code: "FR", country: "France", dial_code: "+33" },
    { code: "CA", country: "Canada", dial_code: "+1" },
    { code: "US", country: "États-Unis", dial_code: "+1" },
    { code: "BE", country: "Belgique", dial_code: "+32" },
    { code: "CH", country: "Suisse", dial_code: "+41" },
    { code: "CI", country: "Côte d'Ivoire", dial_code: "+225" },
    { code: "CM", country: "Cameroun", dial_code: "+237" },
    { code: "MA", country: "Maroc", dial_code: "+212" },
    { code: "DZ", country: "Algérie", dial_code: "+213" },
    { code: "TN", country: "Tunisie", dial_code: "+216" },
    { code: "ML", country: "Mali", dial_code: "+223" },
    { code: "NE", country: "Niger", dial_code: "+227" },
    { code: "BF", country: "Burkina Faso", dial_code: "+226" },
    { code: "GN", country: "Guinée", dial_code: "+224" },
    { code: "BJ", country: "Bénin", dial_code: "+229" },
    { code: "TG", country: "Togo", dial_code: "+228" },
    { code: "CG", country: "Congo", dial_code: "+242" },
    { code: "CD", country: "RD Congo", dial_code: "+243" },
    { code: "GB", country: "Royaume-Uni", dial_code: "+44" },
    { code: "DE", country: "Allemagne", dial_code: "+49" },
    { code: "ES", country: "Espagne", dial_code: "+34" },
    { code: "IT", country: "Italie", dial_code: "+39" },
    { code: "PT", country: "Portugal", dial_code: "+351" },
    { code: "NG", country: "Nigeria", dial_code: "+234" },
    { code: "GH", country: "Ghana", dial_code: "+233" },
    { code: "KE", country: "Kenya", dial_code: "+254" },
    { code: "ZA", country: "Afrique du Sud", dial_code: "+27" },
    { code: "MG", country: "Madagascar", dial_code: "+261" },
    { code: "MU", country: "Maurice", dial_code: "+230" },
    // More countries can be added as needed
  ], []);

  // Effect when component mounts to parse any existing value
  React.useEffect(() => {
    if (value) {
      // Try to match a dial code at the beginning of the value
      const dialCodeMatch = countryCodes.find(cc => value.startsWith(cc.dial_code));
      if (dialCodeMatch) {
        setSelectedDialCode(dialCodeMatch.dial_code);
        setPhoneNumber(value.substring(dialCodeMatch.dial_code.length).trim());
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  // When phone number or dial code changes, update the parent component
  React.useEffect(() => {
    onChange(`${selectedDialCode} ${phoneNumber}`.trim());
  }, [selectedDialCode, phoneNumber, onChange]);

  return (
    <div className="space-y-1">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex space-x-2">
        <Select
          value={selectedDialCode}
          onValueChange={(newDialCode) => setSelectedDialCode(newDialCode)}
        >
          <SelectTrigger className="w-[120px] flex-shrink-0">
            <SelectValue placeholder="Indicatif" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {countryCodes.map((cc) => (
              <SelectItem key={cc.code} value={cc.dial_code}>
                {cc.country} ({cc.dial_code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          id={id}
          type="tel"
          className={cn("flex-1", className)}
          placeholder={placeholder}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </div>
  );
};

export { PhoneInput };
