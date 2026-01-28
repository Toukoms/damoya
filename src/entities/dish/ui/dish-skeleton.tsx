import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/src/shared/ui";

export const DishSkeleton = () => {
  return (
    <Card className="py-4 group">
      <CardHeader>
        <div className="relative aspect-video w-full bg-muted overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>

        <div className="my-2">
          <Skeleton className="h-4 w-5/6" />
        </div>

        <Skeleton className="h-7 w-24" />
      </CardContent>

      <CardFooter className="mt-auto">
        <Skeleton className="h-9 w-full rounded-full" />
      </CardFooter>
    </Card>
  );
};

export const DishListSkeleton = () => {
  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <DishSkeleton key={i} />
      ))}
    </div>
  );
};
