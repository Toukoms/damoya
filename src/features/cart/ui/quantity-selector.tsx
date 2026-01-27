"use client";

import { Button } from "@/src/shared/ui";
import { cn } from "@/src/shared/lib/tailwind";
import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  className,
}: QuantitySelectorProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <FaMinus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center text-lg font-medium">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
      >
        <FaPlus className="h-3 w-3" />
      </Button>
    </div>
  );
};
