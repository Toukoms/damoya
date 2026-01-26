export interface Prestation {
  id: string;
  title: string;
  href: string;
  image: string;
}

export const PRESTATIONS: Prestation[] = [
  {
    id: "menu",
    title: "À La Carte",
    href: "/dishes?category=menu",
    image:
      "https://images.unsplash.com/photo-1551489186-c892fa1428c9?q=80&w=687&auto=format&fit=crop",
  },
  {
    id: "shabbat",
    title: "Commandez Votre Shabbat",
    href: "/dishes?category=shabbat",
    image:
      "https://images.unsplash.com/photo-1674758420736-553c480e3f62?q=80&w=1171&auto=format&fit=crop",
  },
];
