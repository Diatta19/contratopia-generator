
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        isScrolled
          ? "glass-effect backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-medium"
          >
            <FileText className="w-5 h-5" />
            <span className="text-lg font-medium">ContratPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/generate"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Créer un contrat
            </Link>
            <Link
              to="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Modèles
            </Link>
            <Link
              to="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Tarifs
            </Link>
            <Link
              to="#"
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/generate">Commencer</Link>
            </Button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto p-6 flex flex-col gap-6 text-center">
          <Link
            to="/"
            className="py-3 text-foreground hover:text-blue-600 transition-colors text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/generate"
            className="py-3 text-foreground hover:text-blue-600 transition-colors text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Créer un contrat
          </Link>
          <Link
            to="#"
            className="py-3 text-foreground hover:text-blue-600 transition-colors text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Modèles
          </Link>
          <Link
            to="#"
            className="py-3 text-foreground hover:text-blue-600 transition-colors text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tarifs
          </Link>
          <Link
            to="#"
            className="py-3 text-foreground hover:text-blue-600 transition-colors text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/generate" onClick={() => setIsMobileMenuOpen(false)}>
              Commencer
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
