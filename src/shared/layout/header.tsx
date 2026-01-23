import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { cn } from "../lib/tailwind";
import { SearchInput } from "../ui";
import { NavLink } from "../ui/nav-link";

export function Header({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      className={cn("mb-4 flex justify-between items-center", className)}
      {...props}
    >
      <div className="flex gap-8 items-center mb-2">
        <Link
          href="/"
          className="block w-30 md:w-36 lg:w-42 aspect-video relative"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            className="absolute object-contain"
            fill
          />
        </Link>

        <nav className="flex gap-2 items-center">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/dishes">Menus</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <SearchInput />
        <Link
          href={"/orders"}
          className="border border-secondary p-2 rounded-sm cursor-pointer"
        >
          <FiShoppingCart size={24} className="text-secondary" />
        </Link>
      </div>
    </header>
  );
}
