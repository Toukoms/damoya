import { Category } from "./categories";

export type Dish = {
  title: string;
  description: string;
  price: number;
  standardQuantity?: string;
  imgUrl: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
};
