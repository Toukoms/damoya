import Link from "next/link";
import { ComponentProps } from "react";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { cn } from "@shared/lib/tailwind";
import { Logo } from "@shared/ui";

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer
      className={cn("bg-secondary text-white pt-16 pb-8", className)}
      {...props}
    >
      <div className="container-custom">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          {/* Column 1: Brand Info */}
          <div>
            <Logo className="w-48 mb-6" />
            <p className="font-sans text-white/80 mb-6 leading-relaxed">
              Gastronomie cacher haut de gamme pour vos événements privés et
              professionnels.
            </p>
            <p className="font-sans font-bold text-primary">
              Sous le contrôle du Beth Din de Paris – Glatt Halak Beth Yossef
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">Navigation</h3>
            <ul className="space-y-3 font-sans text-white/80">
              <li>
                <Link
                  href="/#hero"
                  className="hover:text-primary transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-primary transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/#explore"
                  className="hover:text-primary transition-colors"
                >
                  Prestations
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-primary transition-colors"
                >
                  Menus & Formules
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="hover:text-primary transition-colors"
                >
                  Témoignages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Prestations */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">Prestations</h3>
            <ul className="space-y-3 font-sans text-white/80">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Mariages & Réceptions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Bar & Bat Mitsva
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Shabbat & Fêtes
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Événements professionnels
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Repas d’affaires
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-4 mb-8 font-sans text-white/80">
              <div className="flex items-center gap-3">
                <LuPhone className="text-primary w-5 h-5" />
                <span className="font-bold text-white">01 86 95 92 92</span>
              </div>
              <div className="flex items-center gap-3">
                <LuMail className="text-primary w-5 h-5" />
                <a
                  href="mailto:info@damoyatraiteur.fr"
                  className="font-bold text-white hover:text-primary transition-colors"
                >
                  info@damoyatraiteur.fr
                </a>
              </div>
              <div className="flex items-center gap-3">
                <LuMapPin className="text-primary w-5 h-5" />
                <span>Livraison en France</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-[#b89345] text-white px-6 py-3 rounded font-sans font-semibold transition-colors duration-300"
            >
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 font-sans">
          <p>© 2026 Damoya Traiteur — Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
