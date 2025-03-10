
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        {
          "bg-white/80 backdrop-blur-md shadow-sm": scrolled || isOpen,
          "bg-transparent": !scrolled && !isOpen,
        }
      )}
    >
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-blue-600">
              ContratPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Accueil
            </Link>
            <Link
              to="/generate"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/generate")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Générer
            </Link>
            <Link
              to="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/dashboard")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Dashboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <Link to="/generate">Créer un contrat</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={cn(
                  "text-sm font-medium py-2 transition-colors",
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                Accueil
              </Link>
              <Link
                to="/generate"
                className={cn(
                  "text-sm font-medium py-2 transition-colors",
                  isActive("/generate") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                Générer
              </Link>
              <Link
                to="/dashboard"
                className={cn(
                  "text-sm font-medium py-2 transition-colors",
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                )}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Button
                className="w-full justify-center mt-2"
                asChild
              >
                <Link to="/generate" onClick={closeMenu}>
                  Créer un contrat
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
