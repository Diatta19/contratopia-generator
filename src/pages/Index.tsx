
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const features = [
  {
    title: "Génération facile",
    description: "Créez des contrats professionnels en quelques minutes grâce à notre interface intuitive.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Modèles juridiques",
    description: "Accédez à des modèles de contrats vérifiés par des professionnels du droit.",
    icon: <Check className="h-5 w-5" />,
  },
  {
    title: "Personnalisation complète",
    description: "Adaptez chaque contrat à vos besoins spécifiques avec nos options de personnalisation.",
    icon: <FileText className="h-5 w-5" />,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6 animate-in fade-in-0">
              <span>Simplifiez vos démarches administratives</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 animate-in fade-in-25 slide-in-from-bottom-4">
              Créez des contrats professionnels en quelques minutes
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 animate-in fade-in-50 slide-in-from-bottom-4">
              Contratopia vous permet de générer des contrats professionnels sur mesure, facilement et rapidement, sans expertise juridique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-75 slide-in-from-bottom-4">
              <Button size="lg" asChild>
                <Link to="/generate">
                  Créer mon contrat
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 bg-dot-pattern">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre plateforme simplifie la création de contrats tout en garantissant leur validité juridique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border rounded-lg p-6 hover:shadow-soft transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Prêt à simplifier vos contrats ?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Commencez dès maintenant et créez votre premier contrat professionnel en quelques minutes.
                </p>
                <Button size="lg" asChild>
                  <Link to="/generate">
                    Créer mon contrat
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm aspect-[3/4] bg-white rounded-lg border shadow-soft overflow-hidden">
                  <div className="p-5 border-b">
                    <div className="w-full h-6 bg-primary/10 rounded-md mb-4"></div>
                    <div className="w-2/3 h-4 bg-muted rounded-md"></div>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      <div className="w-full h-4 bg-muted rounded-md"></div>
                      <div className="w-full h-4 bg-muted rounded-md"></div>
                      <div className="w-3/4 h-4 bg-muted rounded-md"></div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="w-full h-4 bg-muted rounded-md"></div>
                      <div className="w-full h-4 bg-muted rounded-md"></div>
                      <div className="w-1/2 h-4 bg-muted rounded-md"></div>
                    </div>
                    <div className="mt-10 pt-6 border-t flex justify-between">
                      <div className="w-1/3 h-10 bg-muted rounded-md"></div>
                      <div className="w-1/3 h-10 bg-primary/30 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
