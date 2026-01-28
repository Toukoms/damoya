import { Dish } from "@/src/entities/dish/model/dish";
import { Price, QuantitySelector } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { Order } from "../model/order";

interface Props extends ComponentProps<"div"> {
  order: Order;
  dish: Dish;
  onRemove: (dishId: string) => void;
  onUpdateQuantity: (dishId: string, quantity: number) => void;
}

export function OrderCard({
  order,
  dish,
  onRemove,
  onUpdateQuantity,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={`py-6 flex flex-col sm:flex-row gap-4 ${className || ""}`}
      {...rest}
    >
      {/* Image */}
      <Link href={`/dishes/${dish.id}`} className="shrink-0 mx-auto sm:mx-0">
        <div className="relative h-44 w-44 overflow-hidden">
          <Image
            src={dish.imgUrl}
            alt={dish.title}
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link
              href={`/dishes/${dish.id}`}
              className="text-lg font-medium text-foreground hover:underline leading-snug line-clamp-2"
            >
              {dish.title}
            </Link>
            <div className="text-xs text-primary mt-1">En stock</div>
            <div className="text-xs text-muted-foreground">
              Expédié par Damoya
            </div>
            <div className="text-xs text-muted-foreground font-bold">
              Options :{" "}
              <span className="font-normal text-muted-foreground line-clamp-1">
                {dish.description}
              </span>
            </div>
          </div>
          <div className="text-lg font-bold text-foreground text-right sm:hidden">
            <Price amount={dish.price} />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <QuantitySelector
            quantity={order.quantity}
            onIncrease={() => onUpdateQuantity(dish.id, order.quantity + 1)}
            onDecrease={() =>
              onUpdateQuantity(dish.id, Math.max(1, order.quantity - 1))
            }
          />
          <div className="h-4 w-px bg-border hidden sm:block"></div>
          <button
            onClick={() => onRemove(dish.id)}
            className="text-primary text-sm hover:underline"
          >
            Supprimer
          </button>
        </div>
      </div>

      {/* Price Desktop */}
      <div className="text-lg font-bold text-foreground text-right hidden sm:block w-32">
        <Price amount={dish.price} />
      </div>
    </div>
  );
}
