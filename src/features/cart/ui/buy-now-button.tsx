"use client";

import { Dish } from "@/src/entities/dish";
import { useOrder } from "@/src/entities/order";
import { Button } from "@/src/shared/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { cn } from "@shared/lib";
import { useRouter } from "next/navigation";

interface BuyNowButtonProps {
  dish: Dish;
  className?: string;
}

export function BuyNowButton({ dish, className }: BuyNowButtonProps) {
  const { addDishToOrder } = useOrder();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const clerk = useClerk();

  const handleBuyNow = () => {
    addDishToOrder(dish, 1);
    if (!isSignedIn) {
      clerk.openSignIn();
      return;
    }
    router.push("/checkout");
  };

  return (
    <Button
      className={cn(
        "bg-primary hover:bg-primary/90 text-primary-foreground border border-primary rounded-full shadow-sm h-10",
        className,
      )}
      onClick={handleBuyNow}
    >
      Acheter maintenant
    </Button>
  );
}
