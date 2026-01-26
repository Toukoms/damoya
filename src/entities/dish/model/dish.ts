import { Category } from "./categories";

export type Dish = {
  id: string;
  title: string;
  description: string;
  price: number;
  standardQuantity?: string;
  imgUrl: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
};
