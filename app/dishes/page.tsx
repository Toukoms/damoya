import { DishListSkeleton } from "@entities/dish/ui/dish-skeleton";
import { MainWrapper } from "@shared/ui";
import { DishCatalog } from "@widgets/dish-catalog";
import { Suspense } from "react";

export default function DishesPage() {
  return (
    <MainWrapper>
      <div className="flex flex-col gap-8 px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Nos Plats & Formules
          </h1>
          <p className="text-muted-foreground">
            Découvrez notre sélection de plats faits maison pour tous vos
            événements.
          </p>
        </div>

        <Suspense fallback={<DishListSkeleton />}>
          <DishCatalog />
        </Suspense>
      </div>
    </MainWrapper>
  );
}
