

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ParcelDetailsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-6">
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Address Section Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {[1, 2].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-3/6" />
            </CardContent>
          </Card>
        ))}

      </div>

      {/* Timeline Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
    </div>
  );
}
