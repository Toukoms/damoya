import { CardContent, CardFooter, CardHeader, Skeleton } from "@/src/shared/ui";
import { DishCardLayout } from "./dish-card-layout";

export const DishSkeleton = () => {
  return (
    <DishCardLayout
      image={<Skeleton className="h-full w-full" />}
      info={
        <>
          <CardHeader className="block">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <Skeleton className="h-7 w-24" />
          </CardContent>

          <CardFooter className="mt-auto">
            <Skeleton className="h-9 w-full rounded-md" />
          </CardFooter>
        </>
      }
    />
  );
};

export const DishListSkeleton = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <DishSkeleton key={i} />
      ))}
    </div>
  );
};
