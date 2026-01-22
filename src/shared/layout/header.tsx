import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { SearchInput } from "../ui";

export function Header() {
  return (
    <header>
      <div className="flex gap-8 items-center mb-4">
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
          <button className="border border-secondary p-2 rounded-sm cursor-pointer">
            <FiShoppingCart size={24} className="text-secondary" />
          </button>
        </div>
      </div>

      <nav className="bg-primary px-8 py-4 flex gap-8 rounded-md">
        <Link href="/">Accueil</Link>
        <Link href="/dishes">Menus</Link>
        <Link href="/about">A propos</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
