import { ComponentProps } from "react";
import { FiSearch } from "react-icons/fi";
import { cn } from "../lib";

type Props = {
  containerClassName?: string;
  onSearch?: (value: string) => void;
} & ComponentProps<"input">;

export function SearchInput({
  className,
  containerClassName,
  onSearch,
  ...inputProps
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      const formData = new FormData(e.currentTarget);
      const query = formData.get("search") as string;
      onSearch(query);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center h-10 gap-2 bg-background rounded-md border border-primary/60 shadow-sm transition-all duration-200 hover:border-secondary focus-within:border-primary focus-within:shadow-md overflow-hidden",
        containerClassName,
      )}
    >
      <input
        type="search"
        name="search"
        placeholder="Recherche"
        className={cn(
          "w-full px-4 py-2 bg-transparent outline-none placeholder-foreground/60",
          className,
        )}
        {...inputProps}
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-4 h-full cursor-pointer hover:bg-primary/90 transition-colors"
      >
        <FiSearch />
      </button>
    </form>
  );
}
