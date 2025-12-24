import React from "react";

// Reusable skeleton block
export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} />
);

/**
 * Skeleton for the search input and status filter row
 */
export const SearchFilterSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
      <Skeleton className="h-10 w-full max-w-sm" />
      <Skeleton className="h-10 w-[180px]" />
    </div>
  );
};

/**
 * Skeleton for a single ParcelCard. 
 * You can control conditional action areas via props.
 */
export const ParcelCardSkeleton: React.FC<{
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}> = ({ showCancelButton = false, showConfirmButton = false }) => {
  return (
    <div className="w-full max-w-md mx-auto my-4 border rounded-lg p-4">
      {/* Header */}
      <div className="mb-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56 mt-2" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Status row */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Sender */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Delivery Location */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full" />
        </div>

        {/* Weight & Cost */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Action area */}
        {(showCancelButton || showConfirmButton) && (
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-9 w-36" />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Skeleton grid for the parcel list
 */
export const ParcelsGridSkeleton: React.FC<{
  count?: number;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}> = ({ count = 8, showCancelButton = false, showConfirmButton = false }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ParcelCardSkeleton
          key={i}
          showCancelButton={showCancelButton}
          showConfirmButton={showConfirmButton}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton for pagination controls
 */
export const PaginationSkeleton: React.FC = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-9 w-24" />
    </div>
  );
};

/**
 * Full-page skeleton matching your layout and classes
 */
export const ParcelsPageSkeleton: React.FC<{
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}> = ({ showCancelButton = false, showConfirmButton = false }) => {
  return (
    <div className="px-6 pt-20 pb-10 rounded-2xl shadow-md space-y-4 container mx-auto">
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-9" />
        <Skeleton className="h-7 w-32" />
      </div>

      <SearchFilterSkeleton />

      <ParcelsGridSkeleton
        count={8}
        showCancelButton={showCancelButton}
        showConfirmButton={showConfirmButton}
      />

      <PaginationSkeleton />
    </div>
  );
};