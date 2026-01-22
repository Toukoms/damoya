import { FiSearch } from "react-icons/fi";

export function SearchInput() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-secondary px-4 py-2 shadow-sm transition-all duration-200 hover:border-primary/60 focus-within:border-primary focus-within:shadow-md">
      <input
        type="search"
        placeholder="Recherche"
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
      <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200 flex items-center justify-center">
        <FiSearch />
      </button>
    </div>
  );
}
