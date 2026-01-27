import { Category } from "../model/categories";
import { Dish } from "../model/dish";
import { mock_dishes } from "./mock-data";

export const findDishes = async (options: {
  query?: string;
  category: Category;
}): Promise<Dish[]> => {
  const { query, category } = options;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let result = [...mock_dishes];

  if (category) {
    result = result.filter((dish) =>
      dish.categories.some((cat) => cat === category),
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

export const getDishById = async (id: string): Promise<Dish | undefined> => {;
  return mock_dishes.find((dish) => dish.id === id);
};
