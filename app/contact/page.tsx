import { MainWrapper } from "@shared/ui";
import Link from "next/link";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export default function ContactPage() {
  return (
    <MainWrapper>
      {/* Header Section */}
      <section className="bg-secondary py-20 text-white text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Contactez-nous
        </h1>
        <p className="font-sans text-lg opacity-90">
          Nous sommes à votre écoute pour réaliser votre événement
        </p>
      </section>

      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 overflow-hidden bg-white rounded-2xl shadow-xl">
          {/* Contact Info */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark mb-6">
              Créons Ensemble Votre Événement
            </h2>

            <p className="font-sans text-text-body text-lg mb-10 leading-relaxed">
              Parlez-nous de votre projet et recevez une proposition culinaire
              personnalisée. Que ce soit pour un mariage, une Bar Mitzvah ou un
              événement professionnel, nous sommes là pour vous accompagner.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-white flex items-center justify-center shrink-0">
                  <LuPhone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-text-dark mb-1">
                    Téléphone
                  </h3>
                  <p className="font-sans text-text-body">01 86 95 92 92</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-white flex items-center justify-center shrink-0">
                  <LuMail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-text-dark mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:info@damoyatraiteur.fr"
                    className="font-sans text-text-body hover:text-primary transition-colors"
                  >
                    info@damoyatraiteur.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-warm-white flex items-center justify-center shrink-0">
                  <LuMapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-text-dark mb-1">
                    Adresse
                  </h3>
                  <p className="font-sans text-text-body">
                    123 Rue de la Gastronomie, 75000 Paris
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="mailto:info@damoyatraiteur.fr"
              className="inline-block bg-primary hover:bg-[#b89345] text-white text-center px-8 py-4 rounded font-sans font-bold transition-colors duration-300 w-full sm:w-auto"
            >
              Demander un devis
            </Link>
          </div>

          {/* Map Section */}
          <div className="relative min-h-100 lg:min-h-full bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647526543210!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              style={{ border: 0, position: "absolute", inset: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Damoya Traiteur Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
