"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Moleculs/Table";
import { Spin } from "antd";
import Button from "../Atoms/Button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>;
}

export function DataTable<TData, TValue>({ columns, data = [], isLoading, isError, isFetching, refetch }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="whitespace-nowrap font-bold text-foreground" key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-72 text-center">
                <Spin />
              </TableCell>
            </TableRow>
          ) : isError && !isFetching ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-72">
                <div className="flex flex-col items-center justify-center gap-3">
                  <p>there is an error</p>
                  <Button
                    onClick={() => {
                      refetch();
                    }}
                  >
                    Refresh
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
