import type { FilterFn } from '@tanstack/react-table';
import type { ReactNode } from 'react';

// Generic type for data used in the table.
export type TableData = {
  id: string;
  title?: string;
  description?: string;
  created_at?: string | Date;
  status?: string | number;
  [key: string]: any;
};

// Configuration for a single column in the table
export type Column<T extends TableData> = {
  key: keyof T | 'actions';
  header: string;
  render?: (value: any, row: T) => ReactNode;
};

// Configuration for status display (text and CSS class)
export type StatusConfigItem = {
  text: string;
  className: string;
};
export type StatusConfig = Record<string | number, StatusConfigItem>;


// Props for the BaseTable component
export type BaseTableProps<T extends TableData> = {
  data: T[];
  columns: Column<T>[];
  onDelete?: (id: string) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  statusConfig?: StatusConfig;
};

export const multiColumnTextSearchFilterFn: FilterFn<TableData> = (
  row,
  _columnId,
  filterValue
) => {
  const searchTerm = String(filterValue).toLowerCase();
  if (!searchTerm) return true;

  const title = String(row.original.title || '').toLowerCase();
  const description = String(row.original.description || '').toLowerCase();
  const searchableRowContent = `${title} ${description}`;
  
  return searchableRowContent.includes(searchTerm);
};

export const exampleStatusFilterFn: FilterFn<TableData> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId);
  if (status === null || typeof status === 'undefined') return false;
  return filterValue.includes(String(status));
};
