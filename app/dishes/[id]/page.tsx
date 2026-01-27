import { getDishById } from "@/src/entities/dish/api";
import { AddToCartButton } from "@/src/features/cart/ui/add-to-cart-button";
import { Badge, MainWrapper } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DishDetailPage({ params }: PageProps) {
  //FIXME: juste to show the loading ui
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <MainWrapper>
      <div className="container mx-auto px-4">
        <Link
          href="/dishes"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <FaChevronLeft className="h-3 w-3" />
          Retour aux plats
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted lg:aspect-square">
            <Image
              src={dish.imgUrl}
              alt={dish.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {dish.title}
              </h1>
              <div className="mt-4 text-2xl font-bold text-primary">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(dish.price)}
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {dish.categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none text-muted-foreground">
              <p>{dish.description}</p>
            </div>

            {dish.standardQuantity && (
              <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                <span className="font-semibold">Quantité standard :</span>{" "}
                {dish.standardQuantity}
              </div>
            )}
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
