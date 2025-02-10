'use client';

import { Button } from '@/app/components/ui/Button';
import type { Tour } from '@/services/api/tourService';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

interface TourTableProps {
  data: Tour[];
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (tour: Tour) => void;
  onView?: (tour: Tour) => void;
}

// Définition du type pour une colonnes
interface Column {
  key: keyof Tour;
  header: string;
}

// Définition des colonnes à afficher
const columns: Column[] = [
  { key: 'id', header: 'ID' },
  { key: 'title', header: 'Tour' },
  { key: 'status', header: 'Statut' },
  { key: 'created_at', header: 'Enregistrement' },
];

// Mapping des statuts pour l'affichage en fonction des valeurs de TOUR_STATUS
const statusDisplay: Record<number, { text: string; className: string }> = {
  0: { text: 'En attente', className: 'bg-yellow-100 text-yellow-800' },
  1: { text: 'Envoyé', className: 'bg-blue-100 text-blue-800' },
  2: { text: 'En cours', className: 'bg-purple-100 text-purple-800' },
  3: { text: 'En révision', className: 'bg-orange-100 text-orange-800' },
  4: { text: 'Approuvé', className: 'bg-green-100 text-green-800' },
  5: { text: 'Rejeté', className: 'bg-red-100 text-red-800' },
};

export function TourTable({ data, onDelete, onEdit, onView }: TourTableProps) {
  // Formater la valeur selon le type de colonne
  const formatCellValue = (tour: Tour, key: keyof Tour): ReactNode => {
    if (key === 'created_at' && tour[key]) {
      return format(new Date(tour[key]), 'dd MMMM yyyy', { locale: fr });
    }
    if (key === 'status') {
      const statusConfig = statusDisplay[tour[key] as number] || {
        text: 'Inconnu',
        className: 'bg-gray-100 text-gray-800',
      };

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${statusConfig.className}`}
        >
          {statusConfig.text}
        </span>
      );
    }
    return tour[key]?.toString() || '-';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((tour) => (
            <tr key={tour.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${tour.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {formatCellValue(tour, column.key as keyof Tour)}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(tour)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(tour)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(tour.id.toString())}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
