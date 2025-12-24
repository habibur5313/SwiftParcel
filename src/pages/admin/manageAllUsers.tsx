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
import {
  useToggleUserStatusMutation,
  useUsersQuery,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { UserTableRow } from "@/components/modules/user/UserTableRow";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IUserResponse } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { roleOptions } from "@/constants";

const ManageAllUsers = () => {
  useEffect(() => {
    document.title = "Dashboard | SwiftParcel ";
  }, []);
  const [toggleStatus] = useToggleUserStatusMutation();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  console.log(roleFilter)

  const { data, isLoading } = useUsersQuery<IUserResponse>({
    page,
    limit,
    role: roleFilter !== "ALL" ? roleFilter : undefined,
    searchTerm: debouncedSearch || undefined,
  });

  const allUsers = useMemo(() => data?.data || [], [data]);

  const handleToggle = async (id: string, status: string) => {
    let newStatus = "ACTIVE";

    if (status === "ACTIVE") {
      newStatus = "BLOCKED"; // Active → Block
    } else if (status === "BLOCKED") {
      newStatus = "ACTIVE"; // Blocked → Active
    } else if (status === "INACTIVE") {
      newStatus = "ACTIVE"; // Inactive → Active
    }
    const res = await toggleStatus({ id, isActive: newStatus });
    if (res.data.success) {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">👥 Manage All Users</h1>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search by  Name & Email"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />

        <Select
          value={roleFilter}
          onValueChange={(val) => {
            setRoleFilter(val);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectItem value="ALL">All</SelectItem>
            {roleOptions.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* table */}

      <Table>
        <TableCaption className="sr-only">A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allUsers.length > 0 ? (
            allUsers?.map((user: any) => (
              <UserTableRow
                key={user._id}
                user={user}
                handleToggle={handleToggle}
                isLoading={isLoading}
              ></UserTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                {isLoading ? "Loading..." : "No users found"}
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

export default ManageAllUsers;
