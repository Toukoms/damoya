import { ComponentProps } from "react";
import { FiSearch } from "react-icons/fi";
import { cn } from "../lib";
import { Button } from "./button";

type Props = {
  containerClassName?: string;
} & ComponentProps<"input">;

export function SearchInput({
  className,
  containerClassName,
  ...inputProps
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-background rounded-md border border-secondary/60 shadow-sm transition-all duration-200 hover:border-primary/60 focus-within:border-primary focus-within:shadow-md overflow-hidden",
        containerClassName,
      )}
    >
      <input
        type="search"
        placeholder="Recherche"
        className={cn(
          "w-full px-4 py-2 bg-transparent outline-none placeholder-secondary",
          className,
        )}
        {...inputProps}
      />
      <Button className="rounded-none px-4" variant="primary">
        <FiSearch />
      </Button>
    </div>
  );
}
