import { Skeleton } from './ui/skeleton';

export default function SkeletonLoader() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 2 }).map((_, eventIndex) => {
        return (
          <div key={eventIndex} className="mb-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div key={cardIndex} className="bg-white rounded-xl shadow-md p-4">
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-4 w-40 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}