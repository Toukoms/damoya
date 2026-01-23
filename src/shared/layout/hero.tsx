import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop"
          alt="Plat gastronomique cacher raffiné"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          L’Excellence de la Gastronomie <br className="hidden md:block" />
          Cacher pour Vos Événements
        </h1>
        
        <p className="font-sans text-lg md:text-xl font-bold tracking-wide uppercase mb-4 opacity-90">
          Cuisine raffinée. Certification cacher stricte. Expériences inoubliables.
        </p>

        <p className="font-sans text-base md:text-lg max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
          Damoya Traiteur conçoit des expériences culinaires cacher haut de gamme pour vos événements privés et professionnels, sous le contrôle du Beth Din de Paris – Glatt Halak Beth Yossef.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-primary hover:bg-[#b89345] text-white px-8 py-4 rounded font-sans font-semibold transition-colors duration-300"
          >
            Demander un devis
          </Link>
          <Link
            href="#explore"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded font-sans font-semibold transition-colors duration-300"
          >
            Découvrir nos prestations
          </Link>
        </div>
      </div>
    </section>
  );
}
