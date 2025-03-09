
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { contractTemplates } from "@/data/contractTemplates";

const Templates = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Tous nos modèles de contrats
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Découvrez notre bibliothèque complète de modèles de contrats professionnels. 
              Sélectionnez celui qui correspond à vos besoins et personnalisez-le facilement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contractTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <Link 
                      to="/generate" 
                      state={{ templateId: template.id }}
                    >
                      Utiliser ce modèle
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
