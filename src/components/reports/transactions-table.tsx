"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/types/dashboard";
import { format } from "date-fns";

// Mock Data
const data: Transaction[] = [
  {
    type: "income",
    IncomeID: 1,
    IncomeDate: "2024-01-15T10:00:00Z",
    Amount: 1500,
    IncomeDetail: "Web Development",
    category: {
      CategoryID: 1,
      CategoryName: "Freelance",
      IsIncome: true,
      IsExpense: false,
    },
    project: { ProjectID: 101, ProjectName: "Client A" },
  },
  {
    type: "expense",
    ExpenseID: 10,
    ExpenseDate: "2024-01-16T14:30:00Z",
    Amount: 85.5,
    ExpenseDetail: "Hosting Fee",
    category: {
      CategoryID: 5,
      CategoryName: "Software",
      IsIncome: false,
      IsExpense: true,
    },
  },
  {
    type: "income",
    IncomeID: 2,
    IncomeDate: "2024-01-20T09:00:00Z",
    Amount: 3200,
    IncomeDetail: "Salary",
    category: {
      CategoryID: 6,
      CategoryName: "Salary",
      IsIncome: true,
      IsExpense: false,
    },
  },
  {
    type: "expense",
    ExpenseID: 11,
    ExpenseDate: "2024-01-21T19:00:00Z",
    Amount: 450,
    ExpenseDetail: "Team Dinner",
    category: {
      CategoryID: 3,
      CategoryName: "Food",
      IsIncome: false,
      IsExpense: true,
    },
    project: { ProjectID: 102, ProjectName: "Internal" },
  },
];

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "date",
    accessorFn: (row) =>
      row.type === "expense" ? row.ExpenseDate : row.IncomeDate,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-primary/10 hover:text-primary"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium text-muted-foreground">
        {format(new Date(row.getValue("date")), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    id: "detail",
    accessorFn: (row) =>
      row.type === "expense" ? row.ExpenseDetail : row.IncomeDetail,
    header: "Detail",
    cell: ({ row }) => (
      <span className="font-semibold text-white/90">
        {row.getValue("detail")}
      </span>
    ),
  },
  {
    id: "category",
    accessorFn: (row) => row.category?.CategoryName,
    header: "Category",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-white/10 bg-white/5 font-normal text-muted-foreground hover:bg-white/10"
      >
        {row.getValue("category") || "Uncategorized"}
      </Badge>
    ),
  },
  {
    id: "project",
    accessorFn: (row) => row.project?.ProjectName,
    header: "Project",
    cell: ({ row }) => {
      const project = row.getValue("project");
      return project ? (
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/20"
        >
          {project as any}
        </Badge>
      ) : (
        <span className="text-xs italic text-muted-foreground/50">
          No Project
        </span>
      );
    },
  },
  {
    accessorKey: "Amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Amount"));
      const isExpense = row.original.type === "expense";
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div
          className={`text-right font-bold ${isExpense ? "text-rose-400" : "text-sky-400"
            }`}
        >
          {isExpense ? "-" : "+"}
          {formatted}
        </div>
      );
    },
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge
          className={`uppercase text-[10px] ${type === "income"
              ? "bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
              : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
            }`}
        >
          {type}
        </Badge>
      );
    },
  },
];

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-2xl border border-white/5 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">Recent Financial Activity</h3>
          <p className="text-sm text-muted-foreground">Most recent incomes and expenses.</p>
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">View All</Button>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-white/5 hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-muted-foreground">
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
                  className="border-white/5 transition-colors hover:bg-white/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
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
    </div>
  );
}
