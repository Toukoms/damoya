import { ComponentProps } from "react";
import { Dish } from "../model/dish";

type Props = Dish & ComponentProps<"div">;

export const DishCard = (props: Props) => {
  //TODO: Implement DishCard UI
  const {
    name,
    description,
    price,
    img,
    categories,
    createdAt,
    updatedAt,
    ...rest
  } = props;
  return <div {...rest}>{name}</div>;
};
