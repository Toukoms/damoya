import { BiSolidQuoteAltLeft } from "react-icons/bi";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote:
        "Damoya Traiteur a transformé notre mariage en une expérience gastronomique exceptionnelle. Chaque plat était raffiné, élégant et parfaitement exécuté.",
      author: "Sarah & David Lévy",
      role: "Mariage, Paris",
    },
    {
      id: 2,
      quote:
        "Une qualité remarquable, un service irréprochable et une tranquillité totale. Nos invités ont été impressionnés du début à la fin.",
      author: "Événement professionnel",
      role: "Paris",
    },
  ];

  return (
    <section id="testimonials" className="bg-light-neutral section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark">
            Ils Nous Ont Fait Confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 md:p-10 rounded-lg shadow-sm relative"
            >
              <BiSolidQuoteAltLeft className="text-primary/20 text-6xl absolute top-6 left-6 z-0" />

              <div className="relative z-10">
                <blockquote className="font-serif italic text-xl md:text-2xl text-text-dark mb-6 leading-relaxed">
                  « {testimonial.quote} »
                </blockquote>

                <div className="border-t border-gray-100 pt-6">
                  <p className="font-sans font-semibold text-text-dark text-lg">
                    {testimonial.author}
                  </p>
                  <p className="font-sans text-text-body text-sm uppercase tracking-wide">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
