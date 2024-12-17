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

export type User = {
  id: UUID;
  team_id: UUID;
  has_signature: boolean;
  is_admin: boolean;
  first_name: string;
  last_name: string;
  email: string;
  github_token: string;
  created_at: Date;
  last_sign_in_at: Date;
  last_note_created_at: Date;
  // avatar_url: string
};

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "avatar_url",
    header: "프로필",
    cell: ({ row }) => (
      <div className="lowercase">
        <i>미구현</i>
      </div>
    ),
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          성
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("last_name")}</div>,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이름
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("first_name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          계정 이메일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "team_id",
    header: "팀 id",
    cell: ({ row }) => {
      if (row.getValue("team_id") === null) {
        return <div className="lowercase">-</div>;
      }
      return (
        <Link href={`/admin/user?team_id=${row.getValue("team_id")}`}>
          {(row.getValue("team_id") as string).slice(0, 4)}...
        </Link>
      );
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
    accessorKey: "last_sign_in_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          마지막 접속일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("last_sign_in_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("last_sign_in_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    accessorKey: "last_note_created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          마지막 노트 생성일
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (!row.getValue("last_note_created_at"))
        return <div className="lowercase">-</div>;
      const createdAt = new Date(row.getValue("last_note_created_at"));
      const localDateString = createdAt.toLocaleString(); // 로컬 시간으로 변환
      return <div className="lowercase">{localDateString}</div>;
    },
  },
  {
    accessorKey: "has_signature",
    header: "서명 여부",
    cell: ({ row }) => {
      if (row.getValue("has_signature")) {
        return <div className="text-green-500">예</div>;
      }
      return <div className="text-red-500">아니오</div>;
    },
  },
  {
    accessorKey: "is_admin",
    header: "관리자 여부",
    cell: ({ row }) => {
      if (row.getValue("is_admin")) {
        return <div className="text-green-500">예</div>;
      }
      return <div className="text-red-500">아니오</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
            <Link href={`/admin/user?id=${user.id}`}>
              <DropdownMenuItem>자세히</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              ID 복사
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/user/${user.id}/create-team`
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("임시 팀 생성에 성공하였습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("임시 팀 생성에 실패하였습니다.");
                }
              }}
            >
              임시 팀 생성
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/user/reset-password`,
                    { email: user.email }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert(
                      `비밀번호를 "${user.email}"로 초기화에 성공하였습니다.`
                    );
                  }
                } catch (error) {
                  console.error(error);
                  alert("비밀번호 초기화에 실패하였습니다.");
                }
              }}
            >
              비밀번호 초기화
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/user/${user.id}/set-admin`,
                    { email: user.email, is_admin: !user.is_admin }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("관리자 권한 토글에 성공하였습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("관리자 권한 토글에 실패하였습니다.");
                }
              }}
            >
              관리자 권한 토글
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL + `/admin/user/delete`,
                    { email: user.email }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("유저 삭제에 성공하였습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("유저 삭제에 실패하였습니다.");
                }
              }}
            >
              유저 삭제
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/admin/note-history?user_id=${user.id}`}>
              <DropdownMenuItem>노트 이력</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>
              <i>*이메일 발송</i>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <i>*회원가입 인증 메일 재발송</i>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  const axiosData: AxiosResponse = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL +
                      `/admin/user/send-reset-password-email`,
                    { email: user.email }
                  );
                  if (axiosData.data.status === "succeed") {
                    alert("비밀번호 변경 메일 발송에 성공하였습니다.");
                  }
                } catch (error) {
                  console.error(error);
                  alert("비밀번호 변경 메일 발송에 실패하였습니다.");
                }
              }}
            >
              비밀번호 변경 메일
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AdminUserTable({
  data,
  mutate,
}: {
  data: User[];
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
  const { id } = params.get("id") ? { id: params.get("id") } : { id: null };

  const [filteredData, setFilteredData] = React.useState(data);
  const [searchColumn, setSearchColumn] = React.useState("email");

  React.useEffect(() => {
    let filtered = data;
    if (team_id) {
      filtered = filtered.filter((user) => user.team_id === team_id);
    }
    if (id) {
      filtered = filtered.filter((user) => user.id === id);
    }
    setFilteredData(filtered);
  }, [team_id, id, data]);

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
      columnFilters: [
        ...(team_id ? [{ id: "team_id", value: team_id }] : []),
        ...(id ? [{ id: "id", value: id }] : []),
      ],
    },
  });

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
              checked={searchColumn === "email"}
              onCheckedChange={() => setSearchColumn("email")}
            >
              이메일
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "last_name"}
              onCheckedChange={() => setSearchColumn("last_name")}
            >
              성
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchColumn === "first_name"}
              onCheckedChange={() => setSearchColumn("first_name")}
            >
              이름
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder="검색.."
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
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
