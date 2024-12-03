"use client";

import * as React from "react";
import Link from "next/link";
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
  Row,
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
import { mkConfig, generateCsv, download } from "export-to-csv";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export type Note = {
  id: UUID;
  user_id: UUID;
  bucket_id: UUID;
  title: string;
  timestamp_transaction_id: string;
  is_github: boolean;
  github_type: string | null;
  github_link: string | null;
  pdf_hash: string;
  created_at: Date;
  updated_at: Date;
};

export const columns: ColumnDef<Note>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
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
    accessorKey: "user_id",
    header: "유저 id",
    cell: ({ row }) => (
      <Link href={`/admin/user?id=${row.getValue("user_id")}`}>
        {(row.getValue("user_id") as string).slice(0, 4)}...
      </Link>
    ),
  },
  {
    accessorKey: "bucket_id",
    header: "버켓 ID",
    cell: ({ row }) => (
      <div className="">
        {(row.getValue("bucket_id") as string).slice(0, 4)}...
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          제목
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "timestamp_transaction_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transaction ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">{row.getValue("timestamp_transaction_id")}</div>
    ),
  },
  {
    accessorKey: "is_github",
    header: "GitHub 노트 여부",
    cell: ({ row }) => {
      if (row.getValue("is_github")) {
        return <div className="text-green-500">예</div>;
      }
      return <div className="text-red-500">아니오</div>;
    },
  },
  {
    accessorKey: "github_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          GitHub 타입
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("github_type")) {
        return <div className="lowercase">-</div>;
      } else if (row.getValue("github_type") === "Commit") {
        return <div className="text-blue-500">Commit</div>;
      } else if (row.getValue("github_type") === "Issue") {
        return <div className="text-yellow-500">Issue</div>;
      } else if (row.getValue("github_type") === "PR") {
        return <div className="text-green-500">PR</div>;
      } else {
        return (
          <div className="text-red-500">{row.getValue("github_type")}</div>
        );
      }
    },
  },
  {
    accessorKey: "github_link",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          GitHub 링크
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("github_link")}</div>,
  },
  {
    accessorKey: "pdf_hash",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PDF 해시값
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("pdf_hash")}</div>,
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
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const note = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           {/* <DropdownMenuItem><Link href={``}>자세히</Link></DropdownMenuItem>
  //           <DropdownMenuSeparator /> */}
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(note.id)}
  //           >
  //             ID 복사
  //           </DropdownMenuItem>
  //           {/* <DropdownMenuItem>노트 이력</DropdownMenuItem>
  //           <DropdownMenuItem>이메일 발송</DropdownMenuItem>
  //           <DropdownMenuItem>관리자 권한 토글</DropdownMenuItem> */}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
];

export function AdminNoteHistoryTable({
  data,
  mutate,
}: {
  data: Note[];
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
  const { team_id, user_id } =
    params.get("team_id") || params.get("user_id")
      ? { team_id: params.get("team_id"), user_id: params.get("user_id") }
      : { team_id: null, user_id: null };

  const [filteredData, setFilteredData] = React.useState(data);

  // 현재 시간을 "YYYYMMDD_HHmmss GMT+0900" 형식으로 포맷
  const current_time = format(new Date(), "yyyyMMdd_HHmmss GMT+0900", {
    locale: ko,
  });

  // csv 다운로드 설정
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: `Note-history_${current_time}`, // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  // export function
  // Note: change _ in Row<_>[] with your Typescript type.
  const exportExcel = (rows: Row<Note>[]) => {
    const rowData: any = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  React.useEffect(() => {
    let filtered = data;
    if (user_id) {
      filtered = filtered.filter((note) => note.user_id === user_id);
    }
    setFilteredData(filtered);
  }, [user_id, data]);

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
      pagination: {
        pageSize: 100,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="노트 타이틀로 검색.."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex ml-auto space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Rows per page <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[100, 500, 1000].map((pageSize) => (
                <DropdownMenuCheckboxItem
                  key={pageSize}
                  className="capitalize"
                  checked={table.getState().pagination.pageSize === pageSize}
                  onCheckedChange={() => table.setPageSize(pageSize)}
                >
                  {pageSize}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            onClick={() => exportExcel(table.getFilteredRowModel().rows)}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            다운로드
          </Button>
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
