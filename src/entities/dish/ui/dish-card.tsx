import { AddToCartButton } from "@/src/features/cart/ui/add-to-cart-button";
import { CardContent, CardFooter, CardHeader, Price } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { Dish } from "../model/dish";
import { DishCardLayout } from "./dish-card-layout";

type Props = Dish & ComponentProps<"div">;

export const DishCard = (props: Props) => {
  const {
    id,
    title,
    price,
    imgUrl,
    className,
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

  return (
    <DishCardLayout
      className={className}
      {...rest}
      image={
        <Link href={`/dishes/${id}`} className="block w-full h-full relative">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      }
      info={
        <>
          <CardHeader className="block">
            <Link
              href={`/dishes/${id}`}
              className="hover:text-primary hover:underline decoration-primary"
            >
              <h3 className="line-clamp-1 text-lg font-medium text-foreground leading-snug">
                {title}
              </h3>
            </Link>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="line-clamp-2 text-sm text-foreground/70">
              {description}
            </p>

            <Price amount={price} variant="split" className="text-accent" />
          </CardContent>

          <CardFooter className="mt-auto">
            <AddToCartButton
              dish={props}
              showQuantity={false}
              buttonClassName="w-full bg-accent"
              className="w-full"
            />
          </CardFooter>
        </>
      }
    />
  );
};
