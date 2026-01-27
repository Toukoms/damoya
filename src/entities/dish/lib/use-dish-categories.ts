import { useMemo } from "react";
import { categoryTree } from "../model/categories";

export function useDishCategories(currentCategory: string) {
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

  return {
    rootNode,
    subNode,
    optionNode,
    rootOptions,
    subOptions,
    optionOptions,
  };
}
