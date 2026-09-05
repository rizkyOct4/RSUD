import { Skeleton } from "@/components/ui/skeleton";

type CarCardSkeletonProps = {
  length?: number;
};

const CarCardSkeleton = ({ length = 4 }: CarCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <article
          key={index}
          className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
        >
          {/* Car Header */}
          <div className="mb-5 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price */}
          <div className="mb-5 flex border-t border-zinc-100 pt-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          {/* Action */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </article>
      ))}
    </>
  );
};

export default CarCardSkeleton;
