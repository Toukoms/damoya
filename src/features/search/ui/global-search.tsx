"use client";

import { SearchInput } from "@shared/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function GlobalSearch({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  const handleSearch = (value: string) => {
    const isDishesPage = pathname === "/dishes";
    const params = isDishesPage
      ? new URLSearchParams(searchParams.toString())
      : new URLSearchParams();

    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }

    if (params.get("category")) {
      params.delete("category");
    }

    if (params.get("page")) {
      params.delete("page");
    }

    router.push(`/dishes?${params.toString()}`);
  };

  return (
    <SearchInput
      containerClassName={className}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        if (e.target.value === "") {
          handleSearch("");
        }
      }}
      onSearch={handleSearch}
    />
  );
}
