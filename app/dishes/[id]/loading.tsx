import { MainWrapper, Skeleton } from "@/src/shared/ui";

export default function Loading() {
  return (
    <MainWrapper className="px-8">
      <Skeleton className="mb-6 h-4 w-32" />
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Image Section Skeleton */}
        <div className="lg:col-span-4 lg:sticky lg:top-4 h-fit">
          <Skeleton className="aspect-square w-full rounded-lg" />
        </div>

        {/* Content Section Skeleton */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex gap-2 items-center border-b pb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <Skeleton className="h-4 w-20" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Buy Box Skeleton */}
        <div className="lg:col-span-3">
          <div className="border rounded-lg p-4 space-y-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-full rounded-full" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}
