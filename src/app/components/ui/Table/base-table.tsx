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
import { cn } from '@/lib/utils';
import { BaseTableProps, TableData } from '@/types/table';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
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
import { useMemo, useRef, useState } from 'react';

export function BaseTable<T extends TableData>({
  data,
  columns,
  onDelete,
  onEdit,
  onView,
  statusConfig,
}: BaseTableProps<T>) {
  // États pour le tableau
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

  // Génération d'un ID unique pour les checkboxes de statut
  const tableId = useMemo(
    () => `table-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  // Filtre personnalisé pour filtrer par statut
  const statusFilterFn: FilterFn<T> = (
    row,
    columnId,
    filterValue: string[]
  ) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
  };

  // Conversion des colonnes en format TanStack Table
  const tableColumns: ColumnDef<T>[] = columns.map((column) => ({
    accessorKey: column.key as string,
    header: column.header,
    cell: ({ row }) => {
      const value = row.getValue(column.key as string);

      // Rendu personnalisé pour le statut
      if (column.key === 'status' && statusConfig) {
        const status = statusConfig[value as string | number] || {
          text: 'Inconnu',
          className: 'bg-gray-100 text-gray-800',
        };
        return <Badge className={cn(status.className)}>{status.text}</Badge>;
      }

      // Rendu personnalisé si spécifié
      if (column.render) {
        return column.render(value);
      }

      // Rendu par défaut
      return <div>{value?.toString() || '-'}</div>;
    },
    enableSorting: true,
    filterFn:
      column.key === 'status' && statusConfig ? statusFilterFn : undefined,
  }));

  // Ajout de la colonne d'actions si nécessaire
  if (onDelete || onEdit || onView) {
    tableColumns.push({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          {onView && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(row.original)}
              className="text-blue-600 hover:text-blue-900"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(row.original)}
              className="text-indigo-600 hover:text-indigo-900"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(row.original.id)}
              className="text-red-600 hover:text-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
      enableSorting: false,
    });
  }

  // Initialisation de la table
  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
  });

  // Récupérer les statuts sélectionnés
  const selectedStatuses = useMemo(() => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return [];
    const filterValue = statusColumn.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn('status')?.getFilterValue()]);

  // Fonction pour gérer le changement de statut
  const handleStatusChange = (checked: boolean, value: string) => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return;

    const filterValue = statusColumn.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    statusColumn.setFilterValue(
      newFilterValue.length ? newFilterValue : undefined
    );
  };

  // Get unique status values
  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn || !data.length || !statusConfig) return [];

    // Utiliser les clés du statusConfig comme valeurs de statut valides
    return Object.keys(statusConfig).sort();
  }, [data, table.getColumn('status'), statusConfig]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return new Map<string, number>();

    const counts = new Map<string, number>();
    data.forEach((item: any) => {
      if (item.status) {
        const status = item.status.toString();
        const count = counts.get(status) || 0;
        counts.set(status, count + 1);
      }
    });

    return counts;
  }, [data, table.getColumn('status')]);

  // Fonction pour gérer la suppression des lignes sélectionnées
  const handleDeleteRows = () => {
    if (onDelete) {
      table.getSelectedRowModel().rows.forEach((row) => {
        onDelete(row.original.id);
      });
    }
    table.resetRowSelection();
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder="Rechercher..."
              value={
                (table.getColumn('title')?.getFilterValue() as string) ?? ''
              }
              onChange={(e) =>
                table.getColumn('title')?.setFilterValue(e.target.value)
              }
              className="max-w-sm pl-9 pr-9"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn('title')?.getFilterValue()) && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn('title')?.setFilterValue('');
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filter by status - Only show if status column exists */}
          {table.getColumn('status') &&
            statusConfig &&
            uniqueStatusValues.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <FilterIcon
                      className="-ms-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                    Statut
                    {selectedStatuses.length > 0 && (
                      <span className="bg-background text-muted-foreground/70 -me-1 ml-2 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                        {selectedStatuses.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto min-w-36 p-3" align="start">
                  <div>
                    <div className="text-muted-foreground text-xs font-medium">
                      Filtres
                    </div>
                    <div className="space-y-3">
                      {uniqueStatusValues.length > 0 ? (
                        uniqueStatusValues.map((value, i) => (
                          <div key={value} className="flex items-center gap-2">
                            <Checkbox
                              id={`${tableId}-status-${i}`}
                              checked={selectedStatuses.includes(value)}
                              onCheckedChange={(checked) =>
                                handleStatusChange(!!checked, value)
                              }
                            />
                            <Label
                              htmlFor={`${tableId}-status-${i}`}
                              className="flex grow justify-between gap-2 font-normal"
                            >
                              {statusConfig?.[value]?.text || value}{' '}
                              <span className="text-muted-foreground ms-2 text-xs">
                                {statusCounts.get(value) || 0}
                              </span>
                            </Label>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted-foreground text-sm">
                          Aucun statut disponible
                        </div>
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Colonne
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Colonnes visibles</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide() && column.id !== 'actions'
                )
                .map((column) => {
                  // Récupérer le nom de la colonne depuis la configuration
                  const columnConfig = columns.find(
                    (col) => col.key === column.id
                  );
                  const columnName = columnConfig?.header || column.id;

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{' '}
                      {table.getSelectedRowModel().rows.length} selected{' '}
                      {table.getSelectedRowModel().rows.length === 1
                        ? 'row'
                        : 'rows'}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Tableau */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className="flex items-center cursor-pointer select-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="ml-10">
                          {{
                            asc: <ChevronUp size={15} />,
                            desc: <ChevronDown size={15} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </span>
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) as React.ReactNode
                      }
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
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Sélection du nombre de lignes par page */}
        <div className="flex items-center gap-3">
          <Label htmlFor="rows-per-page" className="max-sm:sr-only">
            Lignes par page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger
              id="rows-per-page"
              className="w-fit whitespace-nowrap"
            >
              <SelectValue placeholder="Nombre de résultats" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Information sur les pages */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{' '}
            sur{' '}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Boutons de pagination */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* Bouton première page */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Aller à la première page"
                >
                  <ChevronFirst size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Bouton page précédente */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Aller à la page précédente"
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Bouton page suivante */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Aller à la page suivante"
                >
                  <ChevronRight size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Bouton dernière page */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Aller à la dernière page"
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
}
