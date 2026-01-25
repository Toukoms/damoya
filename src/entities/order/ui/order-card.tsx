import { ComponentProps } from "react";
import { Order } from "../model/order";

type Props = Order & ComponentProps<"div">;

export function OrderCard(props: Props) {
  const { id, dishId, quantity, createdAt, updatedAt, ...rest } = props;
  return <div {...rest}></div>;
}
