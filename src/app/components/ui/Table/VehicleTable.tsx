'use client';

import { Button } from '@/app/components/ui/Button';
import { Vehicle } from '@/services/api/vehicleService';
import { DASHBOARD_COLUMNS_CONFIG } from '@/types/dashboard';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface VehicleTableProps {
  data: Vehicle[];
  onDelete?: (id: string) => Promise<void>;
  onEdit?: (Vehicle: Vehicle) => void;
  onView?: (Vehicle: Vehicle) => void;
}

const formatCellValue = (value: any) => {
  if (value instanceof Date) {
    return format(value, 'dd MMMM yyyy', { locale: fr });
  }
  return value;
};

export function VehicleTable({
  data,
  onDelete,
  onEdit,
  onView,
}: VehicleTableProps) {
  const columns = DASHBOARD_COLUMNS_CONFIG.vehicle;

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
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.render
                    ? column.render(item[column.key as keyof Vehicle])
                    : formatCellValue(item[column.key as keyof Vehicle])}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.id)}
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
