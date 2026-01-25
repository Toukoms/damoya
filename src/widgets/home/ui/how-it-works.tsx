import {
  LuChefHat,
  LuFileDigit,
  LuMessageSquare,
  LuTruck,
} from "react-icons/lu";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Partagez Votre Projet",
      description:
        "Présentez-nous votre événement, vos attentes et vos préférences.",
      icon: LuMessageSquare,
    },
    {
      id: 2,
      title: "Proposition Culinaire Sur Mesure",
      description:
        "Nous concevons un menu personnalisé, adapté à votre style, à vos invités et à l’occasion.",
      icon: LuFileDigit,
    },
    {
      id: 3,
      title: "Préparation d’Excellence",
      description:
        "Nos chefs réalisent chaque plat avec précision, dans le respect strict des normes cacher et gastronomiques.",
      icon: LuChefHat,
    },
    {
      id: 4,
      title: "Livraison et Service Maîtrisés",
      description:
        "De la cuisine à la présentation, nous assurons une expérience fluide et parfaitement orchestrée.",
      icon: LuTruck,
    },
  ];

  return (
    <section id="how-it-works" className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark">
            Comment Ça Fonctionne
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-warm-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon
                    className="w-10 h-10 text-secondary"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="mb-2 font-serif text-secondary text-xl font-bold">
                  {step.id}.
                </div>

                <h3 className="font-sans font-semibold text-lg text-text-dark mb-3">
                  {step.title}
                </h3>

                <p className="font-sans text-text-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
