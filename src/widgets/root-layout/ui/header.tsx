"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { CartButton } from "@features/cart";
import { GlobalSearch } from "@features/search";
import { cn } from "@shared/lib/tailwind";
import { useMobile } from "@shared/lib/useMobile";
import { Button, Logo, SearchInput } from "@shared/ui";
import { NavLink } from "@shared/ui/nav-link";
import { usePathname } from "next/navigation";
import { ComponentProps, Suspense, useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

interface HeaderProps extends ComponentProps<"header"> {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

export function Header(props: ComponentProps<"header">) {
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isMobile ? (
    <MobileHeader isScrolled={isScrolled} isHomePage={isHomePage} {...props} />
  ) : (
    <DesktopHeader isScrolled={isScrolled} isHomePage={isHomePage} {...props} />
  );
}

function HeaderLogo({ isScrolled, isHomePage }: HeaderProps) {
  return (
    <Logo
      className={cn(
        "w-30 md:w-36 lg:w-42 hue-rotate-180 invert",
        isHomePage && !isScrolled && "invert-0 hue-rotate-0",
      )}
    />
  );
}

function MobileHeader({
  isScrolled,
  isHomePage,
  className,
  ...props
}: HeaderProps) {
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
            className={cn(
              "transition-colors",
              isHomePage && !isScrolled
                ? "bg-transparent text-background hover:bg-background/20 hover:text-foreground"
                : "bg-background text-foreground",
            )}
          >
            <LuMenu className="w-6 h-6" />
          </Button>
          <HeaderLogo isScrolled={isScrolled} isHomePage={isHomePage} />
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
        <div
          className="fixed inset-0 z-50 bg-foreground/50"
          onClick={toggleMenu}
        >
          <div
            className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background shadow-xl p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <Logo className="w-24 invert hue-rotate-180" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="rounded-full hover:bg-foreground/5"
              >
                <LuX className="w-6 h-6" />
              </Button>
            </div>

            <div className="w-full">
              <GlobalSearch className="w-full" />
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
                    <Button>Se connecter</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button variant="outline">S&apos;inscrire</Button>
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

function DesktopHeader({
  isScrolled,
  isHomePage,
  className,
  ...props
}: HeaderProps) {
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
        <HeaderLogo isScrolled={isScrolled} isHomePage={isHomePage} />

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
        <Suspense fallback={<SearchInput />}>
          <GlobalSearch />
        </Suspense>
        <SignedOut>
          <SignInButton>
            <Button>Se connecter</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <CartButton />
      </div>
    </header>
  );
}
