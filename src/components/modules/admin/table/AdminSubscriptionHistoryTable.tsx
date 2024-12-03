"use client";

import * as React from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UUID } from "crypto";
import { DataTableFacetedFilter } from "@/components/modules/admin/table/FacetedFilter";
import ColumnFilterSwitch from "@/components/modules/admin/table/ColumnFilterSwitch";

const isActionOptions = [
  { label: "활성", value: true },
  { label: "비활성", value: false },
];

export type Subscription = {
  id: UUID;
  team_id: UUID;
  started_at: Date;
  expired_at: Date;
  max_members: number;
  is_active: boolean;
  order_no: string;
  created_at: Date;
  updated_at: Date;
};

export const columns: ColumnDef<Subscription>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "id",
    cell: ({ row }) => (
      <div className="">{(row.getValue("id") as string).slice(0, 4)}...</div>
    ),
  },
  {
    accessorKey: "team_id",
    header: "팀 ID",
    cell: ({ row }) => {
      if (!row.getValue("team_id")) return <div className="lowercase">-</div>;
      return (
        <Link href={`/admin/team?id=${row.getValue("team_id")}`}>
          {(row.getValue("team_id") as string).slice(0, 4)}...
        </Link>
      );
    },
  },
  {
    accessorKey: "started_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          시작일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("started_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("started_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    accessorKey: "expired_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          만료일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("created_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("expired_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    accessorKey: "max_members",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          최대 인원
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("max_members")}</div>,
  },
  {
    accessorKey: "is_active",
    header: "활성 여부",
    cell: ({ row }) => {
      if (row.getValue("is_active")) {
        return <div className="text-green-500">활성</div>;
      }
      return <div className="text-red-500">비활성</div>;
    },
  },
  {
    accessorKey: "order_no",
    header: "주문 번호",
    cell: ({ row }) => {
      return <div className="">{row.getValue("order_no")}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          생성일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("created_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("created_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          수정일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("updated_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("updated_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subscription = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(subscription.id)}
            >
              ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const newExpiredAt = new Date(subscription.expired_at);
                  newExpiredAt.setFullYear(newExpiredAt.getFullYear() + 1);

                  const axiosData: AxiosResponse = await axios.put(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/payment/subscription/${subscription.id}`,
                    {
                      team_id: subscription.team_id,
                      started_at: subscription.started_at,
                      expired_at: newExpiredAt.toISOString(), // ISO 문자열로 변환
                      max_members: subscription.max_members,
                      is_active: subscription.is_active,
                      order_no: subscription.order_no,
                    }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("1년 구독이 추가되었습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("1년 구독 추가에 실패하였습니다.");
                }
              }}
            >
              1년 추가
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.put(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/payment/subscription/${subscription.id}`,
                    {
                      team_id: subscription.team_id,
                      started_at: subscription.started_at,
                      expired_at: subscription.expired_at,
                      max_members: subscription.max_members,
                      is_active: !subscription.is_active,
                      order_no: subscription.order_no,
                    }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("활성 상태가 수정되었습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("활성 상태 수정이 실패하였습니다.");
                }
              }}
            >
              활성 토글
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AdminSubscriptionHistoryTable({
  data,
  mutate,
}: {
  data: Subscription[];
  mutate: () => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const params = useSearchParams();
  const { team_id } = params.get("team_id")
    ? { team_id: params.get("team_id") }
    : { team_id: null };

  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
    let filtered = data;
    if (team_id) {
      filtered = filtered.filter(
        (subscription) => subscription.team_id === team_id
      );
    }
    setFilteredData(filtered);
  }, [team_id, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      columnFilters: team_id ? [{ id: "team_id", value: team_id }] : [],
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="주문 번호로 검색.."
          value={
            (table.getColumn("order_no")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("order_no")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getColumn("is_active") && (
          <ColumnFilterSwitch
            column={table.getColumn("is_active")}
            title="활성 여부"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
