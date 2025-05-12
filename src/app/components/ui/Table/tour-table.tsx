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
  0: { text: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  1: { text: 'Envoyé pour rendu', className: 'bg-blue-100 text-blue-800' },
  2: { text: 'En cours de rendu', className: 'bg-purple-100 text-purple-800' },
  3: {
    text: 'Envoyé pour révision',
    className: 'bg-orange-100 text-orange-800',
  },
  4: { text: 'En révision', className: 'bg-indigo-100 text-indigo-800' },
  5: { text: 'Approuvé', className: 'bg-green-100 text-green-800' },
  6: { text: 'Rejeté', className: 'bg-red-100 text-red-800' },
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
