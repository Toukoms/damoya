"use client";

import { findDishes } from "@entities/dish/api";
import { sortDishes } from "@entities/dish/lib/sort";
import { Category } from "@entities/dish/model/categories";
import { Dish } from "@entities/dish/model/dish";
import { DishCard } from "@entities/dish/ui/dish-card";
import { DishListSkeleton } from "@entities/dish/ui/dish-skeleton";
import { DishFilters } from "@features/dish/ui/dish-filters";
import { usePagination } from "@shared/lib/hooks/use-pagination";
import { Button } from "@shared/ui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DishCatalog() {
  const searchParams = useSearchParams();
  const { page, size, start, end, setPage } = usePagination({
    defaultSize: 12,
  });
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSortDishes = async () => {
      setLoading(true);
      //FIXME: just to show the loading ui
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const categoryKey = searchParams.get("category") || "";

      const fetchedDishes = await findDishes({
        category: categoryKey as Category,
        query: searchParams.get("query") || "",
      });

      // Sort Logic
      const sort = searchParams.get("sort") || "name";
      const order = searchParams.get("order") || "asc";
      const sortedDishes = sortDishes(fetchedDishes, sort, order);

      setDishes(sortedDishes);
      setLoading(false);
    };

    fetchAndSortDishes();
  }, [searchParams]);

  // Pagination Logic
  const paginatedDishes = dishes.slice(start, end);
  const totalPages = Math.ceil(dishes.length / size);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <DishFilters />

      {/* Grid */}
      {loading ? (
        <DishListSkeleton />
      ) : paginatedDishes.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedDishes.map((dish, index) => (
            <DishCard key={`${dish.title}-${index}`} {...dish} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
          Aucun plat ne correspond à vos critères.
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            Précédent
          </Button>
          <span className="flex items-center px-2 text-xs font-medium sm:px-4 sm:text-sm">
            Page {page} sur {totalPages}
          </span>
          <Button
            variant="outline"
            className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  );
}
