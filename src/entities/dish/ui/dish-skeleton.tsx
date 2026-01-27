import { Card, CardContent, Skeleton } from "@/src/shared/ui";

export const DishSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden h-full border-none shadow-none rounded-none bg-card pb-2">
      {/* Image Skeleton */}
      <div className="relative flex items-center justify-center aspect-square w-full overflow-hidden bg-muted p-4">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content Skeleton */}
      <CardContent className="p-4 flex flex-col flex-1 gap-1">
        {/* Title */}
        <div className="mb-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3 mt-1" />
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-1">
          <Skeleton className="h-7 w-20" />
        </div>

        {/* Delivery text */}
        <div className="mt-1">
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Add to cart button */}
        <div className="mt-auto pt-4">
          <Skeleton className="h-8 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export const DishListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <DishSkeleton key={i} />
      ))}
    </div>
  );
};
