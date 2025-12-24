import { ParcelCard } from "@/components/modules/Parcel/ParcelCard";
import { ParcelsPageSkeleton } from "@/components/modules/skeleton/ParcelsPageSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statusOptions } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { useParcelsQuery } from "@/redux/features/Parcel/parcel.api";
import type { IParcelResponse } from "@/types";
import { useEffect, useState } from "react";

export default function ParcelsPage  ()  {
    useEffect(() => {
        document.title = "Dashboard | SwiftParcel ";
      }, []);
  const [page, setPage] = useState(1);
  const limit = 8;
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isError, isLoading } = useParcelsQuery<IParcelResponse>({
    page,
    limit,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    searchTerm: debouncedSearch || undefined,
  });

if (isLoading) {
    // Optionally toggle action button skeletons based on pathname
    const pathname = window.location.pathname;
    const showCancelButton = pathname === "/sender/cancel-parcel";
    const showConfirmButton = pathname === "/receiver/confirm-parcels";

    return (
      <ParcelsPageSkeleton
        showCancelButton={showCancelButton}
        showConfirmButton={showConfirmButton}
      />
    );
  }

  if (isError) return <div>Error loading parcels</div>;

  const parcels = data.data;

  return (
    <div className="px-6 pt-20 pb-10 rounded-2xl shadow-md space-y-4 container mx-auto">
     <h1 className="text-2xl font-semibold mb-4">📦 All Parcels</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search by Tracking ID, Name, City..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />

        <Select
          value={statusFilter}
          onValueChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectItem value="ALL">All</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {parcels?.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parcels.map((parcel: any) => (
          <ParcelCard key={parcel._id} parcel={parcel}></ParcelCard>
        ))
      ) : (
        <div>No parcels found</div>
      )}
      </div>
      {/* Pagination */}
      {data?.meta?.totalPage > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>

            <span className="px-4 py-2">
              Page {data?.meta?.page} of {data?.meta?.totalPage}
            </span>

            <PaginationItem>
              <Button
                variant="outline"
                disabled={page === data?.meta?.totalPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                <PaginationNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
