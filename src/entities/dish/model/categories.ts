export type Category =
  | "root"
  | "menu"
  | "breakfast"
  | "savory-platters"
  | "mixed-platters"
  | "pizza"
  | "navettes"
  | "mini-bagels"
  | "mini-burgers"
  | "hot-dogs"
  | "club-sandwiches"
  | "fricassee"
  | "carpaccio"
  | "fish"
  | "tunisian-specialties"
  | "wraps"
  | "puff-pastries"
  | "vegan"
  | "quiches"
  | "canapes"
  | "charcuterie"
  | "bakery"
  | "drinks"
  | "turnovers"
  | "choux"
  | "sweet-platters"
  | "petits-fours"
  | "tarts"
  | "tarts-10"
  | "entremets"
  | "oriental-cakes"
  | "dry-cakes"
  | "sweet-boxes"
  | "macarons"
  | "mounted-pieces"
  | "mignardises"
  | "viennoiseries"
  | "honey-balls"
  | "challah"
  | "candy-apples"
  | "fresh-fruits"
  | "meal-trays"
  | "shabbat"
  | "formulas"
  | "appetizers"
  | "starters-fish"
  | "kemias"
  | "catering-dishes"
  | "sides"
  | "desserts"
  | "shabbat-times"
  | "delivery";

export class CategoryNode {
  constructor(
    public key: string,
    public label: string,
    public children?: CategoryNode[],
    public keywords: string[] = [],
  ) {}
}

export class CategoryTree {
  constructor(public root: CategoryNode) {}

  findNode(
    key: string,
  ): { node: CategoryNode; path: CategoryNode[] } | undefined {
    const queue: { node: CategoryNode; path: CategoryNode[] }[] = [
      { node: this.root, path: [this.root] },
    ];

    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
      if (node.key === key) {
        return { node, path };
      }
      if (node.children) {
        for (const child of node.children) {
          queue.push({ node: child, path: [...path, child] });
        }
      }
    }
    return undefined;
  }

  getAllDescendantKeys(key: string): string[] {
    const result: string[] = [];
    const found = this.findNode(key);
    if (!found) return result;

    const stack = [found.node];
    while (stack.length > 0) {
      const node = stack.pop()!;
      result.push(node.key);
      if (node.children) {
        for (const child of node.children) {
          stack.push(child);
        }
      }
    }
    return result;
  }

  getCategory(key: string): CategoryNode | undefined {
    return this.findNode(key)?.node;
  }
}

export const categoryTree = new CategoryTree(new CategoryNode("root", "Tous"));

categoryTree.root.children = [
  new CategoryNode("menu", "À La Carte", [
    new CategoryNode("breakfast", "Petit déjeuner"),
    new CategoryNode("savory-platters", "Plateaux salés", [
      new CategoryNode("mixed-platters", "Plateaux Mélangés"),
      new CategoryNode("pizza", "Pizza"),
      new CategoryNode("navettes", "Navette"),
      new CategoryNode("mini-bagels", "Mini Bagel"),
      new CategoryNode("mini-burgers", "Mini Burger"),
      new CategoryNode("hot-dogs", "Hot Dog"),
      new CategoryNode("club-sandwiches", "Club Sandwich"),
      new CategoryNode("fricassee", "Fricassé"),
      new CategoryNode("carpaccio", "Carpaccio"),
      new CategoryNode("fish", "Poissons"),
      new CategoryNode(
        "tunisian-specialties",
        "Banatage / Brick / Sandwich Tunisien",
      ),
      new CategoryNode("wraps", "Wrap's"),
      new CategoryNode("puff-pastries", "Feuilleté"),
      new CategoryNode("vegan", "Vegan"),
      new CategoryNode("quiches", "Quiche"),
      new CategoryNode("canapes", "Canapés"),
      new CategoryNode("charcuterie", "Charcuteries & Foie haché"),
      new CategoryNode("bakery", "Ma Boulangerie"),
      new CategoryNode("drinks", "Boisson"),
    ]),
    new CategoryNode("sweet-platters", "Plateaux sucrés", [
      new CategoryNode("petits-fours", "Petits Fours"),
      new CategoryNode("tarts", "Tartes pour 8 personnes"),
      new CategoryNode("entremets", "Entremets pour 8 personnes"),
      new CategoryNode("oriental-cakes", "Gâteaux secs orientaux"),
      new CategoryNode("sweet-boxes", "Boxs sucrées (4 Pièces)"),
      new CategoryNode("macarons", "Macarons"),
      new CategoryNode("mounted-pieces", "Pièces Montée"),
      new CategoryNode("mignardises", "Mignardises"),
      new CategoryNode("viennoiseries", "Viennoiseries & Chouquettes"),
      new CategoryNode("honey-balls", "Boules au Miel"),
      new CategoryNode("challah", "Halottes"),
      new CategoryNode("candy-apples", "Pomme d'Amour"),
      new CategoryNode("fresh-fruits", "Fruits frais de saison"),
    ]),
    new CategoryNode("meal-trays", "Plateaux repas"),
  ]),
  new CategoryNode("shabbat", "Commandez Votre Shabbat", [
    new CategoryNode("formulas", "Formules"),
    new CategoryNode("appetizers", "Mises en bouche"),
    new CategoryNode("starters-fish", "Entrées & Poissons"),
    new CategoryNode("kemias", "Kémias"),
    new CategoryNode("catering-dishes", "Plats Traiteur"),
    new CategoryNode("sides", "Accompagnements"),
    new CategoryNode("savory-platters", "Plateaux salés", [
      new CategoryNode("mixed-platters", "Plateaux Mélangés"),
      new CategoryNode("pizza", "Pizza"),
      new CategoryNode("navettes", "Navette"),
      new CategoryNode("mini-bagels", "Mini Bagel"),
      new CategoryNode("mini-burgers", "Mini Burger"),
      new CategoryNode("hot-dogs", "Hot Dog"),
      new CategoryNode("canapes", "Canapés"),
      new CategoryNode("club-sandwiches", "Club Sandwich"),
      new CategoryNode("fricassee", "Fricassé"),
      new CategoryNode("carpaccio", "Carpaccio"),
      new CategoryNode("fish", "Poissons"),
      new CategoryNode(
        "tunisian-specialties",
        "Banatage / Brick / Sandwich Tunisien",
      ),
      new CategoryNode("charcuterie", "Charcuteries & Foie haché"),
      new CategoryNode("turnovers", "Chaussons"),
      new CategoryNode("choux", "Choux"),
      new CategoryNode("wraps", "Wrap's"),
      new CategoryNode("puff-pastries", "Feuilleté"),
      new CategoryNode("vegan", "Vegan"),
      new CategoryNode("quiches", "Quiche"),
      new CategoryNode("bakery", "Ma Boulangerie"),
      new CategoryNode("drinks", "Boisson"),
    ]),
    new CategoryNode("desserts", "Desserts", [
      new CategoryNode("tarts-10", "Nos Tartes - 10 personnes"),
      new CategoryNode("entremets", "Entremets pour 8 personnes"),
      new CategoryNode("dry-cakes", "Gâteaux Secs"),
      new CategoryNode("sweet-boxes", "Boxs sucrées (4 Pièces)"),
      new CategoryNode("macarons", "Macarons"),
      new CategoryNode("mounted-pieces", "Pièces Montée"),
      new CategoryNode("petits-fours", "Petits Fours"),
      new CategoryNode("viennoiseries", "Viennoiseries & Chouquettes"),
      new CategoryNode("honey-balls", "Boules au Miel"),
      new CategoryNode("mignardises", "Mignardises"),
      new CategoryNode("candy-apples", "Pomme d'Amour"),
      new CategoryNode("fresh-fruits", "Fruits Frais de saison"),
    ]),
    new CategoryNode("challah", "Halottes"),
    new CategoryNode("shabbat-times", "Horraire Chabbat"),
    new CategoryNode("delivery", "Livraison"),
  ]),
];
