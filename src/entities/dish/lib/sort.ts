import { Dish } from "../model/dish";

export function sortDishes(dishes: Dish[], sort: string, order: string): Dish[] {
  const sorted = [...dishes];

  sorted.sort((a, b) => {
    let comparison = 0;
    switch (sort) {
      case "price":
        comparison = a.price - b.price;
        break;
      case "updatedAt":
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case "name":
      default:
        comparison = a.title.localeCompare(b.title);
        break;
    }
    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}
