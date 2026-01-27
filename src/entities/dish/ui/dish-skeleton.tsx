import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/src/shared/ui";

export const DishSkeleton = () => {
  return (
    <Card className="flex flex-col overflow-hidden h-full">
      {/* Image Skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />

      {/* Content Skeleton */}
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>

      <CardFooter className="mt-auto p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
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
