"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Moleculs/Table";
import { Spin } from "antd";
import Button from "../Atoms/Button";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Array of column definitions
  data?: TData[]; // Optional data array
  isLoading?: boolean; // Optional loading state
  isError?: boolean; // Optional error state
  isFetching?: boolean; // Optional fetching state
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult>; // Function to refetch data
}

// Component for rendering a data table
export function DataTable<TData, TValue>({ columns, data = [], isLoading, isError, isFetching, refetch }: DataTableProps<TData, TValue>) {
  // Initialize the table with data and columns using react-table
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
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())} {/* Render header cell content */}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            // Display loading spinner if data is loading
            <TableRow>
              <TableCell colSpan={columns.length} className="h-72 text-center">
                <Spin />
              </TableCell>
            </TableRow>
          ) : isError && !isFetching ? (
            // Display error message and refresh button if there is an error
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
            // Render table rows if data is available
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell> // Render cell content
                ))}
              </TableRow>
            ))
          ) : (
            // Display message if no data is available
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
