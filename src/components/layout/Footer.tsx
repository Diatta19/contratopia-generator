import React from "react";
import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t pt-12 pb-8 bg-gray-50">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 font-medium mb-4"
            >
              <FileText className="w-5 h-5" />
              <span className="text-lg font-medium">ContratPro</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              ContratPro simplifie la création de contrats professionnels avec une expérience utilisateur intuitive et des modèles juridiquement fiables.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/generate"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Créer un contrat
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Modèles de contrats
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-4">Légal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@contratpro.fr"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@contratpro.fr
                </a>
              </li>
              <li>
                <a
                  href="tel:+221781698858"
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  +221 78 169 88 58
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} ContratPro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
