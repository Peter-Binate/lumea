import { FilterFn } from '@tanstack/react-table';

// Type générique pour les données de la table
export type TableData = {
  id: string;
  title: string;
  description: string;
  created_at: string | Date;
  status?: string | number;
  [key: string]: any;
};

// Configuration des colonnes
export interface Column<T extends TableData> {
  key: keyof T;
  header: string;
  render?: (value: any) => React.ReactNode;
}

// Props de base pour la table
export interface BaseTableProps<T extends TableData> {
  data: T[];
  columns: Column<T>[];
  onDelete?: (id: string) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  statusConfig?: Record<string | number, { text: string; className: string }>;
}

// Filtres
export const multiColumnFilterFn: FilterFn<TableData> = (
  row,
  _columnId,
  filterValue
) => {
  const searchableRowContent =
    `${row.original.title} ${row.original.description}`.toLowerCase();
  const searchTerm = (filterValue ?? '').toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<TableData> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};
