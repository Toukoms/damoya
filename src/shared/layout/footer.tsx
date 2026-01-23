import { ComponentProps } from "react";
import { cn } from "../lib/tailwind";

export function Footer({ className, ...props }: ComponentProps<"footer">) {
  return (
    <footer className={cn(className)} {...props}>
      Footer
    </footer>
  );
}
