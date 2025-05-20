'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Input } from '@/app/components/ui/Input';
import { Label } from '@/app/components/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/app/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/Table/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { cn } from '@/lib/utils';
import type { BaseTableProps, TableData } from '@/types/table';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  Edit,
  Eye,
  FilterIcon,
  ListFilterIcon,
  Trash2,
  TrashIcon,
} from 'lucide-react';
import { type ReactNode, useMemo, useRef, useState } from 'react';

/*----SearchBar----*/
const textFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (value === null || typeof value === 'undefined') return false;
  return String(value)
    .toLowerCase()
    .includes(String(filterValue).toLowerCase());
};

export const BaseTable = <T extends TableData>({
  data,
  columns,
  onDelete,
  onEdit,
  onView,
  statusConfig,
}: BaseTableProps<T>) => {
  // Component States
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'created_at', desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Memoized search column ID
  const searchColumnId = useMemo(() => {
    const hasTitleColumn = columns.some(column => column.key === 'title');
    return hasTitleColumn ? 'title' : (columns[0]?.key as string | undefined) ?? '';
  }, [columns]);

  const tableId = useMemo(
    () => `table-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const tableHasStatusColumn = useMemo(
    () => columns.some(column => column.key === 'status'),
    [columns]
  );

  // Helper: Custom filter function for status column
  const statusFilterFn: FilterFn<T> = (
    row,
    columnId,
    filterValue: string[]
  ) => {
    if (!filterValue?.length) return true;
    const rowStatusValue = row.getValue(columnId);
    if (rowStatusValue === null || typeof rowStatusValue === 'undefined') return false;
    const statusString = String(rowStatusValue);
    return filterValue.includes(statusString);
  };
  
  // TanStack Table column definitions
  const tableColumns: ColumnDef<T>[] = useMemo(() => {
    const mappedColumns: ColumnDef<T>[] = columns.map((column) => ({
      accessorKey: column.key as string,
      header: column.header,
      cell: ({ row }) => {
        const value = row.getValue(column.key as string);

        if (column.key === 'status' && statusConfig) {
          const currentStatus = String(value);
          const statusDisplay = statusConfig[currentStatus] || {
            text: 'Inconnu',
            className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
          };
          return <Badge className={cn(statusDisplay.className)}>{statusDisplay.text}</Badge>;
        }

        if (column.render) {
          return column.render(value, row.original) as ReactNode;
        }

        // Default rendering
        return <div>{typeof value !== 'undefined' && value !== null ? String(value) : '-'}</div>;
      },
      enableSorting: true, // Enable sorting for most columns
      filterFn: column.key === 'status' ? statusFilterFn : textFilterFn, 
    }));

    if (onDelete || onEdit || onView) {
      mappedColumns.push({
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <div className="flex justify-end space-x-2">
            {/* View button tooltip */}
            {onView && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(row.original)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs" align="start" alignOffset={-6}>
                    Voir
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(row.original)}
                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                aria-label="Edit item"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {/* Delete button tooltip */}
            {onDelete && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(row.original.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      aria-label="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs" align="center" sideOffset={6}>
                    Supprimer
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }
    return mappedColumns;
  }, [columns, statusConfig, onView, onEdit, onDelete, statusFilterFn]);


  // TanStack Table instance
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(), 
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
    filterFns: {
        statusFilterFn, 
        textFilterFn
    },
    enableRowSelection: true, 
  });

  const selectedStatuses = useMemo(() => {
    if (!tableHasStatusColumn) return [];
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return [];
    return (statusColumn.getFilterValue() as string[]) || [];
  }, [table, tableHasStatusColumn, columnFilters]); 

  // Handler for status checkbox changes
  const handleStatusChange = (isChecked: boolean, statusValueToToggle: string | number) => {
    if (!tableHasStatusColumn) return;
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return;

    const statusString = String(statusValueToToggle); 
    const currentSelected = (statusColumn.getFilterValue() as string[]) || [];
    let newSelected: string[];

    if (isChecked) {
      if (!currentSelected.includes(statusString)) {
        newSelected = [...currentSelected, statusString];
      } else {
        newSelected = [...currentSelected]; 
      }
    } else {
      newSelected = currentSelected.filter(s => s !== statusString);
    }
    statusColumn.setFilterValue(newSelected.length > 0 ? newSelected : undefined);
  };

  const uniqueStatusValues = useMemo(() => {
    if (!tableHasStatusColumn || !statusConfig) return [];
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return [];
    
    const facetedValues = Array.from(statusColumn.getFacetedUniqueValues().keys());
    
    return facetedValues
      .map(String) 
      .filter(value => typeof statusConfig[value] !== 'undefined' || typeof statusConfig[Number(value)] !== 'undefined') 
      .sort((a, b) => {
        // Attempt to sort numerically if statuses are numbers, otherwise string sort
        const numA = Number(a);
        const numB = Number(b);
        if (!isNaN(numA) && !isNaN(numB)) {
          return numA - numB;
        }
        return a.localeCompare(b);
      });
  }, [table, tableHasStatusColumn, statusConfig, columnFilters]); 

  const statusCounts = useMemo(() => {
    if (!tableHasStatusColumn) return new Map<string | number, number>();
    const statusColumn = table.getColumn('status');
    return statusColumn ? statusColumn.getFacetedUniqueValues() : new Map<string | number, number>();
  }, [table, tableHasStatusColumn, columnFilters]); 

  // Helper to check if a status is currently selected in the filter
  const isStatusSelected = (statusValue: string | number) => {
    return selectedStatuses.includes(String(statusValue));
  };
  
  // Handler for deleting selected rows
  const handleDeleteSelectedRows = () => { 
    if (onDelete && table.getSelectedRowModel().rows.length > 0) {
      table.getSelectedRowModel().rows.forEach((row) => {
        onDelete(row.original.id); 
      });
      table.resetRowSelection(); 
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3"> 
          {/* Global search input */}
          {searchColumnId && (
            <div className="relative">
              <Input
                ref={inputRef}
                placeholder="Rechercher..."
                value={(table.getColumn(searchColumnId)?.getFilterValue() as string) ?? ''}
                onChange={(e) => table.getColumn(searchColumnId)?.setFilterValue(e.target.value)}
                className="max-w-xs w-full sm:max-w-sm pl-9 pr-9" 
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                <ListFilterIcon size={16} aria-hidden="true" />
              </div>
              {Boolean(table.getColumn(searchColumnId)?.getFilterValue()) && (
                <button
                  type="button"
                  className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Clear filter"
                  onClick={() => {
                    table.getColumn(searchColumnId)?.setFilterValue('');
                    inputRef.current?.focus();
                  }}
                >
                  <CircleXIcon size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Status Filter Popover */}
          {tableHasStatusColumn &&
            statusConfig &&
            uniqueStatusValues.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                    Statut
                    {selectedStatuses.length > 0 && (
                      <span className="bg-secondary text-secondary-foreground -me-1 ml-2 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                        {selectedStatuses.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto min-w-48 p-3" align="start"> 
                  <div>
                    <div className="text-muted-foreground text-xs font-medium mb-2">
                      Filtrer par statut
                    </div>
                    <div className="space-y-3">
                      {uniqueStatusValues.map((statusValue, i) => {
                        const displayValue = statusConfig[String(statusValue)]?.text || 
                                             statusConfig[Number(statusValue)]?.text || 
                                             String(statusValue);
                        const count = statusCounts.get(statusValue) || statusCounts.get(Number(statusValue)) || 0;

                        return (
                          <div key={`${tableId}-status-${String(statusValue)}`} className="flex items-center gap-2">
                            <Checkbox
                              id={`${tableId}-status-filter-${i}`} 
                              checked={isStatusSelected(statusValue)}
                              onCheckedChange={(checked) => {
                                handleStatusChange(!!checked, statusValue);
                              }}
                              aria-labelledby={`${tableId}-status-label-${i}`}
                            />
                            <Label
                              htmlFor={`${tableId}-status-filter-${i}`}
                              id={`${tableId}-status-label-${i}`}
                              className="flex grow cursor-pointer justify-between gap-2 font-normal"
                            >
                              {displayValue}
                              <span className="text-muted-foreground ms-2 text-xs">
                                {count}
                              </span>
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          
          {/* Column Visibility Toggle Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Colonnes visibles</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter(column => column.getCanHide() && column.id !== 'actions') 
                .map((column) => {
                  const columnConfig = columns.find(col => col.key === column.id);
                  const columnName = columnConfig?.header || column.id;
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      onSelect={(event) => event.preventDefault()} 
                    >
                      {columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Bulk Delete Action */}
        <div className="flex items-center gap-3 mt-3 sm:mt-0">
          {onDelete && table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive hover:text-destructive-foreground hover:bg-destructive border-destructive"> 
                  <TrashIcon className="-ms-1 opacity-80" size={16} aria-hidden="true" />
                  Supprimer
                  <span className="bg-background text-muted-foreground group-hover:text-destructive-foreground -me-1 ml-2 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-destructive bg-destructive/10 text-destructive" aria-hidden="true">
                    <CircleAlertIcon size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de vouloir continuer ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. Cela supprimera définitivement{' '}
                      {table.getSelectedRowModel().rows.length}
                      {table.getSelectedRowModel().rows.length === 1 ? ' élément sélectionné.' : ' éléments sélectionnés.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteSelectedRows} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Table Display */}
      <div className="rounded-md border overflow-x-auto"> 
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}> 
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex items-center cursor-pointer select-none group" // Added group for hover effects on icon
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => e.key === 'Enter' && header.column.getToggleSortingHandler()?.(e)} 
                        role="button" 
                        tabIndex={0} 
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="ml-2 opacity-30 group-hover:opacity-80 transition-opacity"> 
                          {{
                            asc: <ChevronUp size={15} />,
                            desc: <ChevronDown size={15} />,
                          }[header.column.getIsSorted() as string] ?? <ChevronDown size={15} className="opacity-0 group-hover:opacity-30"/> // Show faint arrow on hover if not sorted
                        }
                        </span>
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext()) as ReactNode}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 py-4">
        <div className="flex items-center gap-2">
          <Label htmlFor={`${tableId}-rows-per-page`} className="text-sm whitespace-nowrap text-muted-foreground">
            Lignes par page:
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              id={`${tableId}-rows-per-page`}
              className="w-fit whitespace-nowrap h-9 text-sm" 
            >
              <SelectValue placeholder="Nombre de résultats" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()} className="text-sm">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-muted-foreground text-sm whitespace-nowrap">
          Page{' '}
          <span className="text-foreground font-medium">
            {table.getPageCount() > 0 ? table.getState().pagination.pageIndex + 1 : 0}
          </span>{' '}
          sur{' '}
          <span className="text-foreground font-medium">
            {table.getPageCount()}
          </span>
          <span className="mx-2 hidden sm:inline">|</span>
          <span className="text-foreground font-medium mt-2 sm:mt-0 inline-block">
            {table.getGlobalFacetedRowModel().rows.length}
          </span>
          {' résultats'}
        </div>


        <div className="flex items-center space-x-1">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Aller à la première page"
                  className="h-9 w-9" 
                >
                  <ChevronFirst size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Aller à la page précédente"
                  className="h-9 w-9"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Aller à la page suivante"
                  className="h-9 w-9"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Aller à la dernière page"
                  className="h-9 w-9"
                >
                  <ChevronLast size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};