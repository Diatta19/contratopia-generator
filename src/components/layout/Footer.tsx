
import React from "react";
import { Link } from "react-router-dom";
import { FileText, Github, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t pt-12 pb-8 bg-background">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary font-medium mb-4"
            >
              <FileText className="w-5 h-5" />
              <span className="text-lg font-medium">Contratopia</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-md">
              Contratopia simplifie la création de contrats professionnels avec une expérience utilisateur intuitive et élégante.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/generate"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Créer un contrat
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
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Contratopia. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
