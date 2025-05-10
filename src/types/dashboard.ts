import { Tour } from '@/services/api/tourService';
import { Vehicle } from '@/services/api/vehicleService';

// Props de base communes à tous les templates de dashboard
export interface BaseDashboardProps {
  children?: React.ReactNode;
  className?: string;
  isLoading: boolean;
  error: Error | string | null;
}

// Props spécifiques au template Vehicle
export interface VehicleDashboardProps extends BaseDashboardProps {
  data: Vehicle[];
  onDelete: (id: string) => void;
  onEdit?: (Vehicle: Vehicle) => void;
  onView?: (Vehicle: Vehicle) => void;
  onAdd?: () => void;
}

// Props spécifiques au template Tours
export interface ToursDashboardProps extends BaseDashboardProps {
  data: Tour[];
  onDelete: (id: string) => Promise<void>;
  onEdit?: (tour: Tour) => void;
  onView?: (tour: Tour) => void;
}

// Configuration des colonnes pour les tableaux
export interface TableColumn {
  key: string;
  header: string;
  render?: (value: any) => React.ReactNode;
}

// Configuration de base des colonnes communes à tous les tableaux
const baseColumns: TableColumn[] = [
  { key: 'title', header: 'Nom' },
  { key: 'description', header: 'Description' },
  {
    key: 'created_at',
    header: 'Date de création',
    render: (value: string) => new Date(value).toLocaleDateString('fr-FR'),
  },
];

// Configuration des colonnes spécifiques par type
export const DASHBOARD_COLUMNS_CONFIG = {
  // TODO: Changer key "rooms" en "compartment"
  vehicle: [...baseColumns, { key: 'rooms', header: 'Compartiment' }],
  tours: [
    ...baseColumns,
    {
      key: 'status',
      header: 'status',
      render: () => {
        // return (
        //   <span className={`px-2 py-1 rounded-full text-xs bg-${statusConfig.color}-100 text-${statusConfig.color}-800`}>
        //     {statusConfig.label}
        //   </span>
        // );
      },
    },
  ],
};

// Configuration des en-têtes de colonnes
export const DASHBOARD_HEADERS_CONFIG = {
  vehicle: {
    title: 'Vos véhicules',
    description: 'Gérez vos véhicules',
    buttonLabel: 'Nouveau véhicule',
  },
  tours: {
    title: 'Vos visites',
    description: 'Gérez vos visites virtuelles',
    buttonLabel: 'Demander un tour',
  },
} as const;
