import { Category } from "../model/categories";
import { Dish } from "../model/dish";
import { mock_dishes } from "./mock-data";

export const findDishes = async (options: {
  query?: string;
  categories?: Category;
}): Promise<Dish[]> => {
  const { query, categories } = options;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let result = [...mock_dishes];

  if (categories && categories.length > 0) {
    result = result.filter((dish) =>
      dish.categories.some((cat) => categories.includes(cat)),
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    result = result.filter(
      (dish) =>
        dish.title.toLowerCase().includes(lowerQuery) ||
        dish.description.toLowerCase().includes(lowerQuery),
    );
  }

  return result;
};
