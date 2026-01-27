"use client";

import { useOrder } from "@/src/entities/order";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export function CartButton() {
  const { orders } = useOrder();
  const totalItems = orders.reduce((acc, order) => acc + order.quantity, 0);

  return (
    <Link
      href={"/orders"}
      className="relative flex items-center p-2 cursor-pointer hover:opacity-80 transition-opacity gap-1"
    >
      <div className="relative flex items-center justify-center">
        <FiShoppingCart
          size={32}
          className="text-foreground"
          strokeWidth={1.5}
        />
        <span className="absolute -top-3 left-1/2 font-bold text-accent text-lg w-full leading-none">
          {totalItems}
        </span>
      </div>
      <div className="hidden md:flex flex-col leading-tight pb-1">
        <span className="text-xs text-foreground font-normal">Votre</span>
        <span className="font-bold text-sm text-foreground">Panier</span>
      </div>
    </Link>
  );
}
