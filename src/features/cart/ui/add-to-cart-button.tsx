"use client";

import { Dish } from "@/src/entities/dish/model/dish";
import { useOrder } from "@/src/entities/order";
import { cn } from "@/src/shared/lib/tailwind";
import { Badge, Button } from "@/src/shared/ui";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "sonner";
import { QuantitySelector } from "./quantity-selector";

interface AddToCartButtonProps {
  dish: Dish;
  className?: string;
  showQuantity?: boolean;
}

export const AddToCartButton = ({
  dish,
  className,
  showQuantity = true,
}: AddToCartButtonProps) => {
  const { addDishToOrder, orders, updateDishQuantity } = useOrder();

  const existingOrder = orders.find((o) => o.dishId === dish.id);
  const inCartQuantity = existingOrder ? existingOrder.quantity : 0;

  const [quantity, setQuantity] = useState(
    inCartQuantity > 0 ? inCartQuantity : 1,
  );

  const handleClick = () => {
    if (showQuantity && inCartQuantity > 0) {
      updateDishQuantity(dish.id, quantity);
      toast.success("Panier mis à <jour");
    } else {
      const qty = showQuantity ? quantity : 1;
      addDishToOrder(dish, qty);
      toast.success("Produit ajouté au panier");
    }
  };

  const isUpdateMode = showQuantity && inCartQuantity > 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showQuantity && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Quantité :
          </span>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>
      )}

      <Button
        className="w-fit gap-2 relative overflow-visible"
        size={showQuantity ? "lg" : "sm"}
        onClick={handleClick}
      >
        <FaCartPlus className={cn(showQuantity ? "h-5 w-5" : "h-4 w-4")} />
        <span className="font-bold">
          {isUpdateMode ? "Mettre à jour" : "Ajouter au panier"}
        </span>

        {/* Show price if in detail mode (showQuantity=true) */}
        {showQuantity && (
          <span className="ml-auto italic">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(dish.price * quantity)}
          </span>
        )}

        {/* Show count if in compact mode and already in cart */}
        {!showQuantity && inCartQuantity > 0 && (
          <Badge
            variant={"secondary"}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full flex items-center justify-center"
          >
            {inCartQuantity}
          </Badge>
        )}
      </Button>
    </div>
  );
};
