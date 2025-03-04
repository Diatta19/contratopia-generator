
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContractForm from "@/components/ContractForm";
import ContractPreview from "@/components/ContractPreview";
import { Toaster } from "sonner";

interface ContractData {
  contractType: string;
  clientName: string;
  clientAddress: string;
  providerName: string;
  providerAddress: string;
  projectDescription: string;
  contractAmount: string;
  startDate: string;
  endDate: string;
}

const Generate = () => {
  const [contractData, setContractData] = useState<ContractData | null>(null);

  const handleFormSubmit = (data: ContractData) => {
    setContractData(data);
    
    // Scroll to contract preview on mobile
    if (window.innerWidth < 768) {
      const previewElement = document.getElementById("contract-preview");
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-3">
              Générez votre contrat
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour créer votre contrat personnalisé. Un aperçu sera généré automatiquement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-card border rounded-lg p-6 shadow-soft">
              <ContractForm onFormSubmit={handleFormSubmit} />
            </div>
            
            <div id="contract-preview" className="bg-card border rounded-lg p-6 shadow-soft min-h-[600px] flex flex-col">
              <ContractPreview contractData={contractData} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Generate;
