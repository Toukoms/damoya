import { cn } from "@/src/shared/lib/tailwind";

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
import { ComponentProps } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Dish } from "../model/dish";

type Props = Dish & ComponentProps<"div">;

export const DishCard = (props: Props) => {
  const {
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
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={imgUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Header with Title and Price */}
      <CardHeader className="pt-4 block">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="line-clamp-1 text-lg font-semibold tracking-tight">
            {title}
          </CardTitle>
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
      <CardFooter className="mt-auto">
        <Button className="w-full gap-2" size="sm">
          <FaCartPlus className="h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
};
