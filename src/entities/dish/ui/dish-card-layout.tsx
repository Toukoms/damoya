import { cn } from "@/src/shared/lib";
import { Card } from "@/src/shared/ui";
import { ComponentProps, ReactNode } from "react";

interface DishCardLayoutProps extends ComponentProps<typeof Card> {
  image: ReactNode;
  info: ReactNode;
}

export const DishCardLayout = ({
  image,
  info,
  className,
  ...props
}: DishCardLayoutProps) => {
  return (
    <Card
      className={cn("group overflow-hidden flex-row sm:flex-col", className)}
      {...props}
    >
      <div className="w-1/3 sm:w-full relative aspect-video bg-muted overflow-hidden">
        {image}
      </div>

      <div className="w-2/3 sm:w-full h-full sm:h-48 flex flex-col gap-2 py-4">
        {info}
      </div>
    </Card>
  );
};
