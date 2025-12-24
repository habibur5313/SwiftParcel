/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useBlockParcelMutation,
  useParcelsQuery,
  useUnblockParcelMutation,
} from "@/redux/features/Parcel/parcel.api";
import { toast } from "sonner";
import { useEffect, useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { IParcel, IParcelResponse } from "@/types";
import { ParcelTableRow } from "@/components/modules/Parcel/ParcelTableRow";
import { statusOptions } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";

const Parcels = () => {
  useEffect(() => {
    document.title = "Dashboard | SwiftParcel ";
  }, []);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading } = useParcelsQuery<IParcelResponse>({
    page,
    limit,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    searchTerm: debouncedSearch || undefined,
  });

  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();

  const parcels = useMemo(() => data?.data || [], [data]);

  const handleBlock = async (id: string) => {
    try {
      const res: any = await blockParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to block parcel");
      }
    } catch (err: any) {
      toast.error(
        err.data?.message || "Something went wrong while blocking parcel"
      );
    }
  };

  const handleUnblock = async (id: string) => {
    try {
      const res: any = await unblockParcel(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Failed to unblock parcel");
      }
    } catch (err: any) {
      toast.error(
        err.data?.message || "Something went wrong while unblocking parcel"
      );
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md space-y-4">
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

      {/* Table */}
      <Table>
        <TableCaption className="sr-only">A list of all parcels.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {parcels.length > 0 ? (
            parcels.map((parcel: IParcel) => (
              <ParcelTableRow
                parcel={parcel}
                key={parcel._id}
                handleBlock={handleBlock}
                handleUnblock={handleUnblock}
              ></ParcelTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                {isLoading ? "Loading..." : "No parcels found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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

export default Parcels;
