"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ComponentProps, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { LuMenu, LuX } from "react-icons/lu";
import { cn } from "../lib/tailwind";
import { useMobile } from "../lib/useMobile";
import { Button, Logo, SearchInput } from "../ui";
import { NavLink } from "../ui/nav-link";

interface HeaderProps extends ComponentProps<"header"> {
  isScrolled: boolean;
}

export function Header(props: ComponentProps<"header">) {
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isMobile ? (
    <MobileHeader isScrolled={isScrolled} {...props} />
  ) : (
    <DesktopHeader isScrolled={isScrolled} {...props} />
  );
}

function CartButton() {
  return (
    <Link
      href={"/orders"}
      className="bg-background p-2 rounded-sm cursor-pointer"
    >
      <FiShoppingCart size={20} className="text-secondary" />
    </Link>
  );
}

function MobileHeader({ isScrolled, className, ...props }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 py-2 z-40 flex justify-between items-center w-full px-4 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md " : "bg-transparent",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="bg-background"
          >
            <LuMenu className="w-6 h-6" />
          </Button>
          <Logo
            className={cn("w-24", !isScrolled && "hue-rotate-180 invert")}
          />
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleMenu}>
          <div
            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background shadow-xl p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <Logo className="w-24" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-full hover:bg-black/5"
              >
                <LuX className="w-6 h-6" />
              </Button>
            </div>

            <div className="w-full">
              <SearchInput className="w-full" />
            </div>

            <nav className="flex flex-col gap-4">
              <NavLink href="/" onClick={toggleMenu}>
                Accueil
              </NavLink>
              <NavLink href="/dishes" onClick={toggleMenu}>
                Menus
              </NavLink>
              <NavLink href="/contact" onClick={toggleMenu}>
                Contact
              </NavLink>
              <SignedOut>
                <div className="flex flex-col gap-2 mt-4">
                  <SignInButton>
                    <Button variant="primary">Se connecter</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="primary">S&apos;inscrire</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function DesktopHeader({ isScrolled, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 py-2 z-50 flex justify-between items-center w-full px-4 md:px-8 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md " : "bg-transparent",
        className,
      )}
      {...props}
    >
      <div className="flex gap-8 items-center">
        <Logo
          className={cn(
            "w-30 md:w-36 lg:w-42",
            !isScrolled && "hue-rotate-180 invert",
          )}
        />

        <nav className="flex gap-3 md:gap-6 items-center">
          <NavLink href="/" isScrolled={isScrolled}>
            Accueil
          </NavLink>
          <NavLink href="/dishes" isScrolled={isScrolled}>
            Menus
          </NavLink>
          <NavLink href="/contact" isScrolled={isScrolled}>
            Contact
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <SearchInput />
        <CartButton />
        <SignedOut>
          <SignInButton>
            <Button variant="primary">Se connecter</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
