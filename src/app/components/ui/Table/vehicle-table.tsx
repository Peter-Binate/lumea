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
  {
    key: 'created_at',
    header: 'Date de création',
    render: (value: string) =>
      format(new Date(value), 'dd MMMM yyyy', { locale: fr }),
  },
];

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
    />
  );
}
