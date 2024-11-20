import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { DistrictCapacity } from '../types';

const columns: ColumnDef<DistrictCapacity>[] = [
  {
    accessorKey: 'district',
    header: 'Район'
  },
  {
    accessorKey: 'capacity',
    header: 'Парковочные места, шт.'
  }
];
const pageSizes = [5, 10];

const Table = ({ districtData }: { districtData: DistrictCapacity[] }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const table = useReactTable({
    data: districtData || [],
    columns,
    state: {
      globalFilter,
      sorting,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false
  });

  return (
    <div className='p-6'>
      <input
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder='Поиск по таблице'
        className='border border-gray-300 rounded p-2 mb-4 w-full'
      />
      <div className='flex flex-col justify-between'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}>
              {'◁◁'}
            </button>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              {'◁'}
            </button>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              {'▷'}
            </button>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}>
              {'▷▷'}
            </button>
          </div>
          <div className='ml-2'>
            <span className='text-center mx-3'>
              Страница {table.getState().pagination.pageIndex + 1}/
              {table.getPageCount()}
            </span>
            <select
              value={pagination.pageSize}
              onChange={e => {
                const newPageSize = Number(e.target.value);
                setPagination({ ...pagination, pageSize: newPageSize });
                table.setPageSize(newPageSize);
              }}
              className='border border-gray-300 rounded p-2'>
              {pageSizes.map(size => (
                <option key={size} value={size}>
                  Показывать {size} строк
                </option>
              ))}
            </select>
          </div>
        </div>
        <table className='w-full border-collapse border border-gray-300'>
          <thead className='bg-gray-100'>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className='px-4 py-2 text-left cursor-pointer'
                    onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: ' ▲',
                      desc: ' ▼'
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className='px-4 py-2 border-t border-gray-200 w-1/2'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
