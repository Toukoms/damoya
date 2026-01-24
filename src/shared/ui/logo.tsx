import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { ComponentProps } from "react";
import { cn } from "../lib/tailwind";

type LogoProps = ComponentProps<"a"> &
  Omit<LinkProps, "href"> & {
    href?: string;
  };

export function Logo({ className, href = "/", ...props }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("block relative aspect-video", className)}
      {...props}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        className="absolute object-contain"
        fill
      />
    </Link>
  );
}
