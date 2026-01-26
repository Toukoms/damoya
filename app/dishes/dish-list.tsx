"use client";

import { findDishes } from "@/src/entities/dish/api";
import { Category } from "@/src/entities/dish/model/categories";
import { Dish } from "@/src/entities/dish/model/dish";
import { DishCard } from "@/src/entities/dish/ui/dish-card";
import { DishFilters } from "@/src/features/dish/ui/dish-filters";
import { usePagination } from "@/src/shared/lib/hooks/use-pagination";
import { Button } from "@/src/shared/ui";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DishList() {
  const searchParams = useSearchParams();
  const { page, size, start, end, setPage } = usePagination({
    defaultSize: 12,
  });
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSortDishes = async () => {
      setLoading(true);

      const categoryKey = searchParams.get("category") || "";

      const fetchedDishes = await findDishes({
        category: categoryKey as Category,
        query: searchParams.get("query") || "",
      });

      // Sort Logic
      const sort = searchParams.get("sort") || "name";
      const order = searchParams.get("order") || "asc";

      fetchedDishes.sort((a, b) => {
        let comparison = 0;
        switch (sort) {
          case "price":
            comparison = a.price - b.price;
            break;
          case "updatedAt":
            comparison =
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            break;
          case "name":
          default:
            // Using title as per Dish type definition
            comparison = a.title.localeCompare(b.title);
            break;
        }
        return order === "asc" ? comparison : -comparison;
      });

      setDishes(fetchedDishes);
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
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : paginatedDishes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
