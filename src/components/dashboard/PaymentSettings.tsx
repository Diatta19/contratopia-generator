
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PaymentSettings = () => {
  const handleSave = () => {
    toast.success("Paramètres de paiement mis à jour");
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Orange Money</CardTitle>
          <CardDescription>Configuration du paiement via Orange Money</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="orange-money">Activer Orange Money</Label>
            <Switch id="orange-money" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orange-merchant">Numéro marchand</Label>
            <Input id="orange-merchant" placeholder="Entrez votre numéro marchand" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orange-key">Clé API</Label>
            <Input id="orange-key" type="password" placeholder="Entrez votre clé API" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wave</CardTitle>
          <CardDescription>Configuration du paiement via Wave</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="wave">Activer Wave</Label>
            <Switch id="wave" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wave-merchant">Identifiant marchand</Label>
            <Input id="wave-merchant" placeholder="Entrez votre identifiant marchand" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wave-key">Clé secrète</Label>
            <Input id="wave-key" type="password" placeholder="Entrez votre clé secrète" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Free Money</CardTitle>
          <CardDescription>Configuration du paiement via Free Money</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="free-money">Activer Free Money</Label>
            <Switch id="free-money" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-merchant">Numéro marchand</Label>
            <Input id="free-merchant" placeholder="Entrez votre numéro marchand" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-key">Clé API</Label>
            <Input id="free-key" type="password" placeholder="Entrez votre clé API" />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Enregistrer les modifications</Button>
    </div>
  );
};

export default PaymentSettings;
