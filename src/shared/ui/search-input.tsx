import { FiSearch } from "react-icons/fi";

export function SearchInput() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-secondary/60 shadow-sm transition-all duration-200 hover:border-primary/60 focus-within:border-primary focus-within:shadow-md overflow-hidden">
      <input
        type="search"
        placeholder="Recherche"
        className="w-full px-4 py-2 bg-transparent outline-none placeholder-secondary"
      />
      <button className="text-background cursor-pointer bg-primary px-4 py-2 h-full transition-colors duration-200 flex items-center justify-center">
        <FiSearch />
      </button>
    </div>
  );
}
