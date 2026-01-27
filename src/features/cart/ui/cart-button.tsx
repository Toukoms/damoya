"use client";

import { useOrder } from "@entities/order";
import { Badge } from "@shared/ui";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export function CartButton() {
  const { orders } = useOrder();
  const totalItems = orders.reduce((acc, order) => acc + order.quantity, 0);

  return (
    <Link
      href={"/orders"}
      className="bg-background p-2 rounded-sm cursor-pointer relative"
    >
      <FiShoppingCart size={20} className="text-secondary" />
      <Badge
        variant="destructive"
        className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
      >
        {totalItems}
      </Badge>
    </Link>
  );
}
