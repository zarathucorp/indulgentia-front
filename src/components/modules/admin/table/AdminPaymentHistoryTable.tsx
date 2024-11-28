"use client"

import * as React from "react"
import Link from "next/link"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UUID } from "crypto";
import { DataTableFacetedFilter } from "@/components/modules/admin/table/FacetedFilter";
import ColumnFilterSwitch from "@/components/modules/admin/table/ColumnFilterSwitch";


export type Order = {
  id: UUID
  team_id: UUID
  order_no: string
  status: string // READY, IN_PROGRESS, WAITING_FOR_DEPOSIT, DONE, CANCELED, PARTIAL_CANCELED, ABORTED, EXPIRES
  payment_key: string
  purchase_datetime: Date
  is_canceled: boolean
  total_amount: number
  purchase_user_id: UUID
  payment_method: string
  currency: string
  notes: string
  created_at: Date
  updated_at: Date
}

const statusOptions = [
  { label: "READY", value: "READY" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "WAITING_FOR_DEPOSIT", value: "WAITING_FOR_DEPOSIT" },
  { label: "DONE", value: "DONE" },
  { label: "CANCELED", value: "CANCELED" },
  { label: "PARTIAL_CANCELED", value: "PARTIAL_CANCELED" },
  { label: "ABORTED", value: "ABORTED" },
  { label: "EXPIRES", value: "EXPIRES" },
]

const isCanceledOptions = [
  { label: "취소", value: true },
  { label: "-", value: false },
]

const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "KRW", value: "KRW" },
  { label: "-", value: "" },
]

const paymentMethodOptions = [
  { label: "간편결제", value: "간편결제" },
  { label: "-", value: "" },
]

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: "order_no",
    header: "주문 번호",
    cell: ({ row }) => <div className="">{row.getValue("order_no")}</div>,
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "payment_key",
    header: "결제 키",
    cell: ({ row }) => <div className="">{row.getValue("payment_key")}</div>,
  },
  {
    accessorKey: "purchase_datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          결제일
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const purchaseDatetime = new Date(row.getValue("purchase_datetime"));
      const localDateString = purchaseDatetime.toLocaleString();
      return <div className="">{localDateString}</div>;
    },
  },
  {
    accessorKey: "is_canceled",
    header: "취소 여부",
    cell: ({ row }) => {
      if (row.getValue("is_canceled")) {
        return <div className="text-red-500">취소</div>;
      }
      return <div className="">-</div>;
    },
  },
  {
    accessorKey: "total_amount",
    header: "총 금액",
    cell: ({ row }) => {
      const totalAmount: number = row.getValue("total_amount");
      return <div className="">{totalAmount.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "currency",
    header: "통화",
    cell: ({ row }) => <div className="">{row.getValue("currency")}</div>,
  },
  {
    accessorKey: "team_id",
    header: "팀 ID",
    cell: ({ row }) => (
      <Link href={`/admin/team?id=${row.getValue("team_id")}`}>{(row.getValue("team_id") as string).slice(0, 4)}...</Link>
    ),
  },
  {
    accessorKey: "purchase_user_id",
    header: "구매자 ID",
    cell: ({ row }) => (
      <Link href={`/admin/user?id=${row.getValue("purchase_user_id")}`}>{(row.getValue("purchase_user_id") as string).slice(0, 4)}...</Link>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "결제 방법",
    cell: ({ row }) => <div className="">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "notes",
    header: "비고",
    cell: ({ row }) => <div className="">{row.getValue("notes")}</div>,
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
      )
    },
    cell: ({ row }) => {
      if (!row.getValue("created_at")) return <div className="lowercase">-</div>;
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
      )
    },
    cell: ({ row }) => {
      if (!row.getValue("updated_at")) return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("updated_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

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
            {/* <DropdownMenuItem><Link href={``}>자세히</Link></DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              ID 복사
            </DropdownMenuItem>
            {/* <DropdownMenuItem>노트 이력</DropdownMenuItem>
            <DropdownMenuItem>이메일 발송</DropdownMenuItem>
            <DropdownMenuItem>관리자 권한 토글</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AdminPaymentHistoryTable({
  data,
  mutate,
}: {
  data: Order[];
  mutate: () => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const params = useSearchParams();
  const { team_id, user_id } = params.get("team_id") || params.get("user_id") ? { team_id: params.get("team_id"), user_id: params.get("user_id") } : { team_id: null, user_id: null };

  const [filteredData, setFilteredData] = React.useState(data);
  const [searchColumn, setSearchColumn] = React.useState("order_no");

  React.useEffect(() => {
    let filtered = data;
    if (team_id) {
      filtered = filtered.filter((order) => order.team_id === team_id);
    }
    if (user_id) {
      filtered = filtered.filter((order) => order.purchase_user_id === user_id);
    }
    setFilteredData(filtered);
  }, [team_id, user_id, data]);
  

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
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-0">
              검색 기준 <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "order_no"}
              onCheckedChange={() => setSearchColumn("order_no")}
            >
              주문 번호
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "status"}
              onCheckedChange={() => setSearchColumn("status")}
            >
              상태
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "payment_key"}
              onCheckedChange={() => setSearchColumn("payment_key")}
            >
              결제 키
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "notes"}
              onCheckedChange={() => setSearchColumn("notes")}
            >
              비고
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder="검색.."
          value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="상태"
            options={statusOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
          />
        )}
        {table.getColumn("currency") && (
          <DataTableFacetedFilter
            column={table.getColumn("currency")}
            title="통화"
            options={currencyOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
          />
        )}
        {table.getColumn("payment_method") && (
          <DataTableFacetedFilter
            column={table.getColumn("payment_method")}
            title="결제 방법"
            options={paymentMethodOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
          />
        )}
        {table.getColumn("is_canceled") && (
          <ColumnFilterSwitch
            column={table.getColumn("is_canceled")}
            title="취소 여부"
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
                )
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
                  )
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
  )
}
