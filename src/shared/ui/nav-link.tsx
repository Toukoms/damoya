"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { cn } from "../lib/tailwind";

type Props = LinkProps &
  ComponentProps<"a"> & {
    isScrolled?: boolean;
  };

export function NavLink(props: Props) {
  const { className, children, isScrolled, ...linkProps } = props;
  const path = usePathname();
  const isActive = path === props.href;

  return (
    <Link
      {...linkProps}
      className={cn(
        "text-foreground rounded-md font-mono px-3 py-2 hover:bg-primary/80 hover:text-primary-foreground transition-colors duration-200",
        isActive && "font-bold",
        isScrolled !== undefined &&
          isScrolled === false &&
          path === "/" &&
          "text-background",
        className,
      )}
    >
      {children}
    </Link>
  );
}
