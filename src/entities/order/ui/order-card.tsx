import { ComponentProps } from "react";
import { Order } from "../model/order";

type Props = Order & ComponentProps<"div">;

export function OrderCard(props: Props) {
  const { id, dishId, totalAmount, createdAt, ...rest } = props;
  return <div {...rest}></div>;
}
