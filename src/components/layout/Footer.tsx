
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-white text-lg font-bold mb-4">ContratPro</h2>
            <p className="text-sm mb-4">
              La plateforme de référence pour la création de contrats professionnels sur mesure et juridiquement fiables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/generate" className="hover:text-white transition-colors">Créer un contrat</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Modèles</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Tarifs</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Blog juridique</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Notre équipe</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">CGU</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                <span>+221 78 169 88 58</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                <span>contact@contratpro.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 text-gray-400" />
                <span>123 Avenue de la République, Dakar, Sénégal</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} ContratPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
