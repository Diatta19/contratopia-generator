
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Check, Search, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { contractTemplates } from "@/data/contractTemplates";

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

const contractTemplates = [
  {
    id: 1,
    title: "Contrat de prestation de service",
    description: "Idéal pour les freelances et consultants proposant des services.",
    image: "/lovable-uploads/e49af7c4-b475-4344-b25f-fedf5ece490a.png"
  },
  {
    id: 2,
    title: "Contrat de travail CDI",
    description: "Pour établir une relation d'emploi à durée indéterminée conforme au droit.",
    image: "/lovable-uploads/056e5996-57ab-428b-b0ff-d66f5f0167ac.png"
  },
  {
    id: 3,
    title: "Contrat de bail commercial",
    description: "Encadre la location d'un local à usage professionnel ou commercial.",
    image: "/lovable-uploads/439eaccd-7f11-4c2a-9b85-1c9de108cf8f.png"
  },
  {
    id: 4,
    title: "Contrat de vente",
    description: "Sécurise les transactions entre vendeurs et acheteurs.",
    image: "/lovable-uploads/b7ae53b0-09b9-4e5a-a8b7-9d581160839d.png"
  },
  {
    id: 5,
    title: "Accord de confidentialité",
    description: "Protège les informations sensibles échangées entre parties.",
    image: "/lovable-uploads/473b3ec1-c30f-4634-b5c9-b700422e9626.png"
  },
  {
    id: 6,
    title: "Contrat de partenariat",
    description: "Encadre la collaboration entre deux ou plusieurs parties pour un projet commun.",
    image: "/lovable-uploads/dc3cefa8-0b03-4692-b9a5-41c099597f81.png"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section avec bannière inspirée de l'image */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-6 animate-in fade-in-0">
                <span>Solution n°1 de création de contrats en France</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl mb-6 animate-in fade-in-25 slide-in-from-bottom-4">
                Créez vos contrats professionnels en quelques clics
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mb-10 animate-in fade-in-50 slide-in-from-bottom-4">
                ContratPro vous permet de générer des contrats sur mesure, juridiquement fiables, facilement et rapidement, sans expertise juridique préalable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-75 slide-in-from-bottom-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/generate">
                    Créer mon contrat
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Découvrir nos modèles
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/lovable-uploads/e49af7c4-b475-4344-b25f-fedf5ece490a.png" 
                alt="ContratPro - Création de contrats professionnels"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Pourquoi nous choisir */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Pourquoi choisir ContratPro ?
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
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Section des modèles de contrat */}
      <section className="py-16 md:py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Nos modèles de contrats professionnels
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection de modèles prêts à l'emploi, conçus par des experts juridiques pour répondre à tous vos besoins professionnels.
            </p>
          </div>
          
          {/* Filtres */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Button variant="outline" className="rounded-full">Tous</Button>
            <Button variant="outline" className="rounded-full">Services</Button>
            <Button variant="outline" className="rounded-full">Emploi</Button>
            <Button variant="outline" className="rounded-full">Commercial</Button>
            <Button variant="outline" className="rounded-full">Confidentialité</Button>
          </div>
          
          {/* Grille de modèles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contractTemplates.slice(0, 6).map((template) => (
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
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/templates">
                Voir tous les modèles
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Section détaillée sur le site */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                ContratPro : La solution complète pour vos documents contractuels
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full text-blue-600">
                    <Search className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Gagnez du temps et de l'argent</h3>
                    <p className="text-muted-foreground">
                      Plus besoin de consulter un avocat pour chaque contrat. Notre plateforme vous propose des modèles juridiquement solides à une fraction du coût.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full text-blue-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expertise juridique intégrée</h3>
                    <p className="text-muted-foreground">
                      Nos modèles sont créés et régulièrement mis à jour par des professionnels du droit pour garantir leur conformité avec la législation en vigueur.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full text-blue-600">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sécurité et confidentialité</h3>
                    <p className="text-muted-foreground">
                      Vos données sont chiffrées et sécurisées. Nous respectons scrupuleusement les normes RGPD pour protéger vos informations confidentielles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Comment ça fonctionne ?</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Choisissez votre modèle</h4>
                    <p className="text-muted-foreground">Sélectionnez le type de contrat qui correspond à votre besoin parmi notre bibliothèque de modèles.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Personnalisez-le</h4>
                    <p className="text-muted-foreground">Remplissez le formulaire avec vos informations spécifiques pour adapter le contrat à votre situation.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">Téléchargez et utilisez</h4>
                    <p className="text-muted-foreground">Obtenez immédiatement votre contrat au format PDF, prêt à être signé et utilisé.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/generate">
                    Commencer maintenant
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Prêt à simplifier vos démarches contractuelles ?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
              Rejoignez les milliers de professionnels qui font confiance à ContratPro pour leurs documents juridiques.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link to="/generate">
                Créer mon premier contrat
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
