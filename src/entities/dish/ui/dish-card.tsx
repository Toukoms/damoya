import { cn } from "@/src/shared/lib/tailwind";

import { AddToCartButton } from "@/src/features/cart/ui/add-to-cart-button";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { Dish } from "../model/dish";

type Props = Dish & ComponentProps<"div">;

export const DishCard = (props: Props) => {
  const {
    id,
    title,
    description,
    price,
    imgUrl,
    className,
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
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all hover:shadow-md pb-4",
        className,
      )}
      {...rest}
    >
      {/* Image Container */}
      <Link
        href={`/dishes/${id}`}
        className="relative aspect-video w-full overflow-hidden bg-muted block"
      >
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Header with Title and Price */}
      <CardHeader className="pt-4 block">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/dishes/${id}`} className="hover:underline">
            <CardTitle className="line-clamp-1 text-lg font-semibold tracking-tight">
              {title}
            </CardTitle>
          </Link>
          <Badge variant="secondary" className="shrink-0 font-bold">
            {new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "EUR",
            }).format(price)}
          </Badge>
        </div>
      </CardHeader>

      {/* Description */}
      <CardContent className="line-clamp-2 text-sm text-muted-foreground">
        {description}
      </CardContent>

      {/* Footer with Action Button */}
      <CardFooter className="mt-auto flex items-center w-full gap-2">
        <AddToCartButton dish={props} showQuantity={false} />
        <Button variant="outline" asChild>
          <Link href={`/dishes/${id}`}>Voir détails</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
