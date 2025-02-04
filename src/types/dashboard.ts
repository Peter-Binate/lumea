import { Portfolio, PortfolioType } from '@/services/api/portfolioService';
import { Tour } from '@/services/api/tourService';

// Props de base communes à tous les templates de dashboard
export interface BaseDashboardProps {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  error: Error | string | null;
}

// Props spécifiques au template Portfolio
export interface PortfolioDashboardProps extends BaseDashboardProps {
  data: Portfolio[];
  portfolioType: PortfolioType;
  onDelete: (id: string) => Promise<void>;
  onEdit?: (portfolio: Portfolio) => void;
  onView?: (portfolio: Portfolio) => void;
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
  property: [...baseColumns, { key: 'rooms', header: 'Pièce' }],
  car: [...baseColumns],
  monument: [...baseColumns],
  object: [...baseColumns],
  tours: [
    ...baseColumns,
    {
      key: 'status',
      header: 'status',
      render: (value: number) => {
        const statusConfig = {
          0: {
            label: 'En attente',
            color: 'bg-yellow-500',
          },
          1: {
            label: 'Envoyé',
            color: 'bg-blue-500',
          },
          2: {
            label: 'En cours',
            color: 'bg-purple-500',
          },
          3: {
            label: 'En révision',
            color: 'bg-orange-500',
          },
          4: {
            label: 'Approuvé',
            color: 'bg-green-500',
          },
          5: {
            label: 'Rejeté',
            color: 'bg-red-500',
          },
        }[value] || { label: 'Inconnu', color: 'bg-gray-500' };

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
  property: {
    title: 'Vos propriétés',
    description: 'Gérez vos biens immobiliers',
    buttonLabel: 'Nouvelle propriété',
  },
  car: {
    title: 'Vos véhicules',
    description: 'Gérez vos véhicules',
    buttonLabel: 'Nouveau véhicule',
  },
  monument: {
    title: 'Vos monuments',
    description: 'Gérez vos monuments',
    buttonLabel: 'Nouveau monument',
  },
  object: {
    title: 'Vos objets',
    description: 'Gérez vos objets',
    buttonLabel: 'Nouvel objet',
  },
  tours: {
    title: 'Vos visites',
    description: 'Gérez vos visites virtuelles',
    buttonLabel: 'Nouvelle visite',
  },
} as const;
