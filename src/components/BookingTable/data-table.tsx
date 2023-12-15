'use client';

import { ColumnDef, ColumnFiltersState, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, VisibilityState, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '../Inputfields/Inputfield';
import { Checkbox } from '@/components/ui/checkbox';
import React from 'react';
import { Button } from '../ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  udløbne: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
}

export function DataTable<TData, TValue>({ columns, data, udløbne, onCheckedChange }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      rowSelection,
    },
  });

  function deleteEntries() {
    //Delete the entries from table.getFilteredSelectedRowModel() after a modal pops up and ask if you really want to do this
  }

  return (
    <>
      {udløbne ? (
        <div className='flex flex-row gap-x-2 align-top justify-start mb-2'>
          <Checkbox onCheckedChange={onCheckedChange} className='mt-1'></Checkbox>
          <label>Vis udløbne bookinger</label>
        </div>
      ) : (
        ''
      )}
      <div className='mb-2'>
        <ul>
          {/* Med dette kan vi lave en function der sletter de valgte fx */}
          {table.getFilteredSelectedRowModel().rows.map((booking) => (
            <li>{booking.getValue('id')}</li>
          ))}
        </ul>
      </div>
      {columns.length > 10 ? (
        <div className='flex-1 text-sm text-muted-foreground mb-2'>
          {table.getFilteredSelectedRowModel().rows.length} ud af {table.getFilteredRowModel().rows.length} rækker er valgt.
        </div>
      ) : (
        ''
      )}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={`${header.id}${Math.floor(Math.random() * 1000)}`}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                //Add an on click that only shows the content on mobile where the table might not be so readable
                <TableRow key={`${row.id}${Math.floor(Math.random() * 1000)}`} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={`${cell.id}${Math.floor(Math.random() * 1000)}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex items-center justify-end space-x-2'>
          <Button variant='ghost' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Forrige
          </Button>
          <span className='font-medium text-sm'>
            Side {table.getState().pagination.pageIndex + 1} af {table.getPageCount()}
          </span>
          <Button variant='ghost' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Næste
          </Button>
        </div>
      </div>
    </>
  );
}
