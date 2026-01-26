"use client";

import { categoryTree } from "@/src/entities/dish/model/categories";
import { Button, LabeledSelect } from "@/src/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

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

  // Find the current category node and its path to reconstruct the selection state
  const { path } = categoryTree.findNode(currentCategory) || { path: [] };
  // path[0] is root, path[1] is Level 1, path[2] is Level 2, etc.
  const rootNode = path[1];
  const subNode = path[2];
  const optionNode = path[3];

  const rootOptions = useMemo(
    () => [
      { value: "all", label: "Toutes les catégories" },
      ...(categoryTree.root.children?.map((child) => ({
        value: child.key,
        label: child.label,
      })) || []),
    ],
    [],
  );

  const subOptions = useMemo(
    () =>
      rootNode
        ? [
            { value: rootNode.key, label: `Tout ${rootNode.label}` },
            ...(rootNode.children?.map((child) => ({
              value: child.key,
              label: child.label,
            })) || []),
          ]
        : [],
    [rootNode],
  );

  const optionOptions = useMemo(
    () =>
      subNode
        ? [
            { value: subNode.key, label: `Tout ${subNode.label}` },
            ...(subNode.children?.map((child) => ({
              value: child.key,
              label: child.label,
            })) || []),
          ]
        : [],
    [subNode],
  );

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
      {/* Sort Controls */}
      <div className="flex w-fit gap-2 items-end">
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
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        {/* Level 1: Categories */}
        <LabeledSelect
          id="category-select"
          className="w-full sm:w-64"
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
            className="w-full sm:w-64"
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
            className="w-full sm:w-64"
            label="Option :"
            value={optionNode?.key || subNode.key}
            onValueChange={handleCategoryChange}
            placeholder={`Tout ${subNode.label}`}
            options={optionOptions}
          />
        )}
      </div>
    </div>
  );
};
