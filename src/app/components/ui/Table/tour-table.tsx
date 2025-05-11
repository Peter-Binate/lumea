'use client';

import { BaseTable } from '@/app/components/ui/Table/base-table';
import { Tour } from '@/services/api/tourService';
import { Column } from '@/types/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TourTableProps {
  data: Tour[];
  onDelete?: (id: string) => void;
  onEdit?: (tour: Tour) => void;
  onView?: (tour: Tour) => void;
}

// Configuration des colonnes pour les tours
const columns: Column<Tour>[] = [
  { key: 'title', header: 'Nom' },
  { key: 'description', header: 'Description' },
  { key: 'status', header: 'Statut' },
  {
    key: 'created_at',
    header: 'Date de création',
    render: (value: string) =>
      format(new Date(value), 'dd MMMM yyyy', { locale: fr }),
  },
];

// Configuration des statuts
const statusConfig = {
  pending: { text: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  in_progress: { text: 'En cours', className: 'bg-blue-100 text-blue-800' },
  completed: { text: 'Terminé', className: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Annulé', className: 'bg-red-100 text-red-800' },
};

export function TourTable({ data, onDelete, onEdit, onView }: TourTableProps) {
  return (
    <BaseTable
      data={data}
      columns={columns}
      onDelete={onDelete}
      onEdit={onEdit}
      onView={onView}
      statusConfig={statusConfig}
    />
  );
}
