"use client";

import { useDishCategories } from "@/src/entities/dish/lib/use-dish-categories";
import { cn } from "@/src/shared/lib/tailwind";
import { Button, LabeledSelect } from "@/src/shared/ui";
import { GlobalSearch } from "@features/search";
import { SearchInput } from "@shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { FaArrowDown, FaArrowUp, FaFilter } from "react-icons/fa";

const sortOptions = [
  { value: "name", label: "Nom" },
  { value: "price", label: "Prix" },
  { value: "updatedAt", label: "Date" },
];

export const DishFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "name";
  const currentOrder = searchParams.get("order") || "asc";

  const {
    rootNode,
    subNode,
    optionNode,
    rootOptions,
    subOptions,
    optionOptions,
  } = useDishCategories(currentCategory);

  const [showFilters, setShowFilters] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      // Reset page when filtering/sorting
      if (name === "category" || name === "sort" || name === "order") {
        params.delete("page");
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (value: string) => {
    // If "all" is selected (empty string or specific key for "all"), handle it
    // For root level, "all" means removing category param
    const newValue = value === "all" ? "" : value;
    router.push(`?${createQueryString("category", newValue)}`);
  };

  const handleSortChange = (value: string) => {
    router.push(`?${createQueryString("sort", value)}`);
  };

  const toggleOrder = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    router.push(`?${createQueryString("order", newOrder)}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 md:hidden">
        <div className="flex-1">
          <Suspense fallback={<SearchInput />}>
            <GlobalSearch className="w-full" />
          </Suspense>
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
        </Button>
      </div>

      <div
        className={cn(
          "flex flex-col lg:flex-row gap-4",
          !showFilters && "hidden md:flex",
        )}
      >
        {/* Sort Controls */}
        <div className="flex w-full gap-2 items-end md:w-fit">
          <LabeledSelect
            id="sort-select"
            className="flex-1 w-full"
            label="Trier par :"
            value={currentSort}
            onValueChange={handleSortChange}
            options={sortOptions}
          />

          <Button
            variant="outline"
            size="icon"
            onClick={toggleOrder}
            title={
              currentOrder === "asc" ? "Ordre croissant" : "Ordre décroissant"
            }
            className="mb-0.5" // Align with input
          >
            {currentOrder === "asc" ? (
              <FaArrowUp className="h-4 w-4" />
            ) : (
              <FaArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Level 1: Categories */}
          <LabeledSelect
            id="category-select"
            className="w-full md:w-64"
            label="Catégorie :"
            value={rootNode?.key || "all"}
            onValueChange={handleCategoryChange}
            placeholder="Toutes les catégories"
            options={rootOptions}
          />

          {/* Level 2: Sub-categories */}
          {rootNode?.children && (
            <LabeledSelect
              id="subcategory-select"
              className="w-full md:w-64"
              label="Sous-catégorie :"
              value={subNode?.key || rootNode.key}
              onValueChange={handleCategoryChange}
              placeholder={`Tout ${rootNode.label}`}
              options={subOptions}
            />
          )}

          {/* Level 3: Options */}
          {subNode?.children && (
            <LabeledSelect
              id="option-select"
              className="w-full md:w-64"
              label="Option :"
              value={optionNode?.key || subNode.key}
              onValueChange={handleCategoryChange}
              placeholder={`Tout ${subNode.label}`}
              options={optionOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};
