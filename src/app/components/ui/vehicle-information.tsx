'use client';

import { SideInformation } from '@/app/components/ui/side-information';
import { Vehicle } from '@/services/api/vehicleService';
import { useState } from 'react';
// import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';

interface VehicleInformationProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
  onDelete?: (id: string) => void;
}

export const VehicleInformation = ({
  isOpen,
  onClose,
  vehicle,
  onDelete,
}: VehicleInformationProps) => {
  // États locaux pour la gestion des actions
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!vehicle || !isOpen) return null;

  const footer = onDelete ? (
    <div className="flex gap-4">
      <Button
        variant="destructive"
        className="flex-1"
        onClick={() => onDelete(vehicle.id)}
        disabled={isDeleting || isUpdating}
      >
        Supprimer le véhicule
      </Button>
    </div>
  ) : null;

  return (
    <SideInformation 
      isOpen={isOpen} 
      onClose={onClose}
      footer={footer}
    >
      {/* Titre */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {vehicle.title}
        </h3>
      </div>

      {/* Description */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Description
        </h4>
        <p className="text-sm text-gray-600">
          {vehicle.description}
        </p>
      </div>
    </SideInformation>
  );
};
