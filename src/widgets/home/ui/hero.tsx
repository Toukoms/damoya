import { cn } from "@shared/lib/tailwind";
import { buttonVariants } from "@shared/ui";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-dvh min-h-180 flex md:items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1594046243098-0fceea9d451e?q=80&w=1170&auto=format&fit=crop"
          alt="Plat gastronomique cacher raffiné"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute bottom-0 left-0 right-0 h-50 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-background pt-32 md:pt-0">
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          L&apos;Excellence de la Gastronomie <br className="hidden md:block" />
          Cacher pour Vos Événements
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl font-bold tracking-wide uppercase mb-4 opacity-90">
          Cuisine raffinée. Certification cacher stricte. Expériences
          inoubliables.
        </p>

        <p className="font-sans font-medium text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
          Damoya Traiteur conçoit des expériences culinaires cacher haut de
          gamme pour vos événements privés et professionnels, sous le contrôle
          du Beth Din de Paris – Glatt Halak Beth Yossef.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className={buttonVariants({ size: "xl" })}>
            Demander un devis
          </Link>
          <Link
            href="/dishes"
            className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          >
            Découvrir nos Plats
          </Link>
        </div>
      </div>
    </section>
  );
}
