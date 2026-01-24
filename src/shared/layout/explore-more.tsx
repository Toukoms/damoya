import Image from "next/image";
import Link from "next/link";

export function ExploreMore() {
  const categories = [
    {
      id: 1,
      title: "Mariages & Réceptions",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=687&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Bar & Bat Mitsva",
      image:
        "https://plus.unsplash.com/premium_photo-1677000666461-fbefa43c2c7f?q=80&w=687&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Shabbat & Fêtes",
      image:
        "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Événements Professionnels",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section id="explore" className="bg-white section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
            Explorez Nos Prestations
          </h2>
          <p className="font-sans text-text-body text-lg max-w-2xl mx-auto">
            Des menus conçus avec élégance et créativité pour sublimer chaque
            moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative h-87.5 rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 transition-transform duration-300">
                <h3 className="font-sans font-semibold text-xl md:text-2xl mb-2">
                  {category.title}
                </h3>
                <div className="h-1 w-12 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/dishes"
            className="bg-primary hover:bg-[#b89345] text-white px-8 py-4 rounded font-sans font-semibold transition-colors duration-300"
          >
            Explorer nos saveurs
          </Link>
        </div>
      </div>
    </section>
  );
}
