'use client';

import { BaseTable } from '@/app/components/ui/Table/base-table';
import type { Tour } from '@/services/api/tourService';
import type { Column, StatusConfig } from '@/types/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { ReactNode } from 'react';


// Props for the TourTable component
type TourTableProps = {
  data: Tour[];
  onDelete?: (id: string) => void;
  onEdit?: (tour: Tour) => void;
  onView?: (tour: Tour) => void;
};

// Column configuration for the Tour table
const tourColumns: Column<Tour>[] = [
  { key: 'title', header: 'Nom' },
  { key: 'description', header: 'Description' },
  { key: 'status', header: 'Statut' },
  {
    key: 'created_at',
    header: 'Date de création',
    render: (value: string | Date): ReactNode =>
      value ? format(new Date(value), 'dd MMMM yyyy', { locale: fr }) : '-',
  },
];

// Status configuration for Tour statuses
const tourStatusConfig: StatusConfig = {
  '0': { text: 'En attente', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300' },
  '1': { text: 'Envoyé pour rendu', className: 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300' },
  '2': { text: 'En cours de rendu', className: 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300' },
  '3': { text: 'Envoyé pour révision', className: 'bg-orange-100 text-orange-800 dark:bg-orange-800/30 dark:text-orange-300' },
  '4': { text: 'En révision', className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-300' },
  '5': { text: 'Approuvé', className: 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' },
  '6': { text: 'Rejeté', className: 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300' },
};

export const TourTable = ({ data, onDelete, onEdit, onView }: TourTableProps) => {
  return (
    <BaseTable
      data={data}
      columns={tourColumns}
      onDelete={onDelete}
      onEdit={onEdit}
      onView={onView}
      statusConfig={tourStatusConfig}
    />
  );
};
