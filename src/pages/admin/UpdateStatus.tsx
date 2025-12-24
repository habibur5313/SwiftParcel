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
// import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import {
  useParcelsQuery,
} from "@/redux/features/Parcel/parcel.api";
import { toast } from "sonner";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusOptions } from "@/constants";
import type { IParcelResponse } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";

const UpdateStatus = () => {
  useEffect(() => {
    document.title = "Dashboard | SwiftParcel";
  }, []);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading,refetch } = useParcelsQuery<IParcelResponse>({
    page,
    limit,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    searchTerm: debouncedSearch || undefined,
  });

  const parcels = useMemo(() => data?.data || [], [data]);

  const handleStatusChange = async (parcelId: string, status: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/parcels/update-status/${parcelId}`,
        { status }, // body object
        {
          withCredentials: true, // ✅ browser cookies পাঠানোর জন্য
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        refetch();
        toast.success("Parcel status updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update parcel status.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">📦 Update Parcels Status</h1>
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search by Tracking ID, Sender, receiver"
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
      <Table>
        <TableCaption className="sr-only">A list of all parcels.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Tracking ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {parcels.length > 0 ? (
            parcels?.map((parcel: any) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">
                  {parcel.trackingId}
                </TableCell>
                <TableCell>{parcel?.name}</TableCell>
                <TableCell>{parcel.senderInfo.name || "N/A"}</TableCell>
                <TableCell>{parcel.deliveryLocation.name || "N/A"}</TableCell>
                <TableCell>
                  <select
                    value={parcel.status}
                    onChange={(e) =>
                      handleStatusChange(parcel._id, e.target.value)
                    }
                    className="px-2 py-1 rounded-md border border-gray-300"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
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

export default UpdateStatus;
