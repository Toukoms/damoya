"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { cn } from "../lib/tailwind";

type Props = LinkProps & ComponentProps<"a">;

export function NavLink(props: Props) {
  const { className, children, ...linkProps } = props;
  const path = usePathname();
  const isActive = path === props.href;

  return (
    <Link
      {...linkProps}
      className={cn(
        "text-secondary rounded-md py-2 px-3 font-mono hover:bg-primary/80 hover:text-white transition-colors duration-200",
        isActive && "font-bold",
        className,
      )}
    >
      {children}
    </Link>
  );
}
