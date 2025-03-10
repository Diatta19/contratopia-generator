
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";
import { Settings, Users, CreditCard, Activity } from "lucide-react";
import SettingsForm from "@/components/dashboard/SettingsForm";
import PaymentSettings from "@/components/dashboard/PaymentSettings";
import FeedbackList from "@/components/dashboard/FeedbackList";
import PaymentHistory from "@/components/dashboard/PaymentHistory";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-6 pt-24">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Paiements totaux</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,000 FCFA</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Contrats générés</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">450</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avis clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="settings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
              <TabsTrigger value="feedback">Avis clients</TabsTrigger>
              <TabsTrigger value="history">Historique des paiements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <SettingsForm />
            </TabsContent>
            
            <TabsContent value="payments" className="space-y-4">
              <PaymentSettings />
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-4">
              <FeedbackList />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <PaymentHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
