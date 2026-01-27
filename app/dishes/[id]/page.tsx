import { getDishById } from "@/src/entities/dish/api";
import { AddToCartButton } from "@/src/features/cart/ui/add-to-cart-button";
import { Button, MainWrapper } from "@/src/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DishDetailPage({ params }: PageProps) {
  // Simulate network delay for skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) {
    notFound();
  }

  const [intPrice, decimalPrice] = dish.price.toFixed(2).split(".");

  return (
    <MainWrapper className="px-4 sm:px-8 min-h-screen">
      <Link
        href="/dishes"
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
      >
        <FaChevronLeft className="h-2 w-2" />
        Retour aux résultats
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Image Section - Left (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-4 h-fit">
          <div className="relative aspect-square w-full overflow-hidden bg-muted flex items-center justify-center p-8 rounded-lg border border-border">
            <Image
              src={dish.imgUrl}
              alt={dish.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Center Section (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <h1 className="text-2xl font-medium text-foreground leading-tight">
            {dish.title}
          </h1>
          <div className="flex items-center gap-1 text-sm text-primary border-b border-border pb-4">
            <div className="flex text-accent">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>☆</span>
            </div>
            <span className="hover:underline cursor-pointer">
              123 évaluations
            </span>
          </div>

          <div className="py-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-destructive">-5%</span>
              <span className="flex items-baseline">
                <span className="text-sm align-top relative top-[0.2em] font-medium">
                  €
                </span>
                <span className="text-3xl font-medium leading-none text-foreground">
                  {intPrice}
                </span>
                <span className="text-sm align-top relative top-[0.2em] font-medium">
                  {decimalPrice}
                </span>
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Prix conseillé :{" "}
              <span className="line-through">
                {(dish.price * 1.05).toFixed(2)}€
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Tous les prix incluent la TVA.
            </div>
          </div>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
              <span className="font-bold text-foreground">Catégories</span>
              <div className="flex flex-wrap gap-1">
                {dish.categories.map((c) => (
                  <span
                    key={c}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
              <span className="font-bold text-foreground">Description</span>
              <span className="text-foreground">{dish.description}</span>
            </div>
            {dish.standardQuantity && (
              <div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
                <span className="font-bold text-foreground">Quantité</span>
                <span className="text-foreground">{dish.standardQuantity}</span>
              </div>
            )}
          </div>
        </div>

        {/* Buy Box - Right (3 cols) */}
        <div className="lg:col-span-3">
          <div className="border border-border rounded-lg p-4 space-y-4 shadow-sm bg-card">
            <div className="flex items-baseline">
              <span className="text-sm align-top relative top-[0.2em] font-medium">
                €
              </span>
              <span className="text-2xl font-medium leading-none text-foreground">
                {intPrice}
              </span>
              <span className="text-sm align-top relative top-[0.2em] font-medium">
                {decimalPrice}
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              <span className="text-primary hover:underline cursor-pointer">
                Livraison GRATUITE
              </span>{" "}
              pour votre première commande.
            </div>
            <div className="text-lg text-primary font-medium">En stock</div>

            <AddToCartButton
              dish={dish}
              buttonClassName="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent rounded-full shadow-sm"
              className="w-full"
            />
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground border border-primary rounded-full shadow-sm h-10">
              Acheter maintenant
            </Button>

            <div className="text-xs text-muted-foreground mt-2">
              <div className="grid grid-cols-[80px_1fr] gap-1">
                <span>Expédié par</span> <span>Damoya</span>
                <span>Vendu par</span> <span>Damoya</span>
              </div>
            </div>

            <div className="text-sm text-primary hover:underline cursor-pointer pt-2">
              Politique de retour : Retournable sous 30 jours
            </div>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
