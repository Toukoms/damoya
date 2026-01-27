import { cn } from "@/src/shared/lib/tailwind";

import { AddToCartButton } from "@/src/features/cart/ui/add-to-cart-button";
import { Card, CardContent } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { Dish } from "../model/dish";

type Props = Dish & ComponentProps<"div">;

export const DishCard = (props: Props) => {
  const {
    id,
    title,
    price,
    imgUrl,
    className,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    description,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    standardQuantity,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    categories,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createdAt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatedAt,
    ...rest
  } = props;

  const [intPrice, decimalPrice] = price.toFixed(2).split(".");

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden h-full border-none shadow-none hover:shadow-lg transition-shadow rounded-none bg-card pb-2",
        className,
      )}
      {...rest}
    >
      <Link
        href={`/dishes/${id}`}
        className="relative flex items-center justify-center aspect-square w-full overflow-hidden bg-muted p-4"
      >
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <CardContent className="p-4 flex flex-col flex-1 gap-1">
        <Link
          href={`/dishes/${id}`}
          className="hover:text-primary hover:underline decoration-primary"
        >
          <h3 className="line-clamp-3 text-base font-medium text-foreground leading-snug">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-sm text-primary">
          <div className="flex text-accent">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
          </div>
          <span className="text-xs hover:underline cursor-pointer text-primary">
            123
          </span>
        </div>

        <div className="mt-1 flex items-baseline">
          <span className="text-xs align-top relative top-[0.1em] font-medium">
            €
          </span>
          <span className="text-2xl font-medium leading-none text-foreground">
            {intPrice}
          </span>
          <span className="text-xs align-top relative top-[0.1em] font-medium">
            {decimalPrice}
          </span>
        </div>

        <div className="text-xs text-muted-foreground mt-1">
          Livraison à 0,01€ pour votre première commande
        </div>

        <div className="mt-auto pt-4">
          <AddToCartButton
            dish={props}
            showQuantity={false}
            buttonClassName="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent rounded-full h-8 text-sm shadow-sm"
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
