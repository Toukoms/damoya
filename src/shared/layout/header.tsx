import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { SearchInput } from "../ui";

export function Header() {
  return (
    <header>
      <div className="flex justify-between items-center mb-4">
        <div className="w-32 md:w-48 lg:w-60 aspect-video relative">
          <Image
            src="/logo.png"
            alt="Logo"
            className="absolute object-contain"
            fill
          />
        </div>

        <div className="flex gap-4 lg:gap-6">
          <SearchInput />
          <button className="border border-secondary p-2 rounded-sm">
            <FiShoppingCart size={24} className="text-secondary" />
          </button>
        </div>
      </div>

      <nav className="bg-primary px-8 py-4 flex gap-8 rounded-md">
        <a href="">Accueil</a>
        <a href="">Menus</a>
        <a href="">A propos</a>
        <a href="">Contact</a>
      </nav>
    </header>
  );
}
