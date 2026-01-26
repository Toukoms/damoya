import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UsePaginationOptions {
  defaultPage?: number;
  defaultSize?: number;
  paramName?: string;
}

export function usePagination({
  defaultPage = 1,
  defaultSize = 9,
  paramName = "page",
}: UsePaginationOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current page from URL or default
  const page = Number(searchParams.get(paramName)) || defaultPage;
  const size = Number(searchParams.get("size")) || defaultSize;

  // Calculate start and end indices for slicing data
  const start = (page - 1) * size;
  const end = start + size;

  // Function to set a new page
  const setPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === defaultPage) {
        params.delete(paramName);
      } else {
        params.set(paramName, newPage.toString());
      }
      
      router.push(`${pathname}?${params.toString()}`);
    },
    [defaultPage, paramName, pathname, router, searchParams]
  );

  return {
    page,
    size,
    start,
    end,
    setPage,
  };
}
