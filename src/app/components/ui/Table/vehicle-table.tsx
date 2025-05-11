'use client';

import { BaseTable } from '@/app/components/ui/Table/base-table';
import { Vehicle } from '@/services/api/vehicleService';
import { Column } from '@/types/table';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface VehicleTableProps {
  data: Vehicle[];
  onDelete?: (id: string) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onView?: (vehicle: Vehicle) => void;
  //onAdd?: () => void;
}

// Configuration des colonnes pour les véhicules
const columns: Column<Vehicle>[] = [
  { key: 'title', header: 'Nom' },
  { key: 'description', header: 'Description' },
  { key: 'registration', header: 'Immatriculation' },
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
  completed: { text: 'Complété', className: 'bg-green-100 text-green-800' },
  cancelled: { text: 'Annulé', className: 'bg-red-100 text-red-800' },
};

export function VehicleTable({
  data,
  onDelete,
  onEdit,
  onView,
}: VehicleTableProps) {
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
