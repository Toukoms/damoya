import { Skeleton } from "@/src/shared/ui";
import { ComponentProps } from "react";

export function OrderCardSkeleton({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={`py-6 flex flex-col sm:flex-row gap-4 ${className || ""}`}
      {...rest}
    >
      {/* Image */}
      <div className="shrink-0 mx-auto sm:mx-0">
        <Skeleton className="h-44 w-44 rounded-md" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            {/* Title */}
            <Skeleton className="h-7 w-3/4 sm:w-1/2" />
            {/* Stock */}
            <Skeleton className="h-4 w-16" />
            {/* Shipping */}
            <Skeleton className="h-4 w-32" />
            {/* Options */}
            <Skeleton className="h-4 w-48" />
          </div>
          {/* Mobile Price */}
          <Skeleton className="h-7 w-20 sm:hidden" />
        </div>

        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {/* Quantity Selector */}
          <Skeleton className="h-10 w-28" />
          
          <div className="h-4 w-px bg-border hidden sm:block"></div>
          
          {/* Remove Button */}
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      {/* Price Desktop */}
      <div className="hidden sm:block w-32">
        <Skeleton className="h-7 w-24 ml-auto" />
      </div>
    </div>
  );
}
