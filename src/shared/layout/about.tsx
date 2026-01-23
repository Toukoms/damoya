import Image from "next/image";

export function About() {
  return (
    <section className="bg-warm-white section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop"
              alt="Chef préparant un plat gastronomique"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Column */}
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6">
              Une Passion pour l’Excellence Cacher
            </h2>
            
            <div className="font-sans text-text-body text-lg leading-relaxed space-y-6">
              <p>
                Depuis plus de 15 ans, <span className="font-semibold text-text-dark">Damoya Traiteur</span> sublime la gastronomie cacher à travers un équilibre exigeant entre tradition, créativité et précision.
              </p>
              
              <p>
                Notre équipe élabore des menus élégants à partir de produits rigoureusement sélectionnés, offrant une diversité de saveurs adaptée à vos envies. Fidèles à un savoir-faire artisanal, nous innovons continuellement afin de répondre aux attentes les plus élevées en matière de goût, de présentation et de conformité cacher.
              </p>
              
              <p>
                Qu’il s’agisse d’un événement intime ou d’une réception d’envergure, chaque prestation Damoya est pensée avec rigueur, élégance et sens du détail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
