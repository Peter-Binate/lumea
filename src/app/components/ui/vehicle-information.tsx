'use client';

import { Button } from '@/app/components/ui/button';
import { SideInformation } from '@/app/components/ui/side-information';
import { Vehicle } from '@/services/api/vehicleService';
import { useState } from 'react';
// import { toast } from 'sonner';

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

  const footer = (
    <div className="flex gap-3">
      {onDelete && (
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => onDelete(vehicle.id)}
          disabled={isDeleting || isUpdating}
        >
          Supprimer
        </Button>
      )}
      <Button
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => console.log(`Partager le véhicule: ${vehicle.id}`)}
      >
        Partager
      </Button>
    </div>
  );

  return (
    <SideInformation isOpen={isOpen} onClose={onClose} footer={footer}>
      {/* Title and Status */}
      <div className="flex flex-col items-center justify-center pt-3.5 pb-4 bg-slate-50 border-slate-100 w-11/12 mx-auto rounded-lg shadow-sm">
        <h1 className="text-lg capitalize font-medium text-center text-[#344054] mb-2">
          {vehicle.title}
        </h1>
      </div>

      {/* Description */}
      <div className="my-5 px-2.5 py-4 bg-slate-50 border-slate-100 w-11/12 mx-auto rounded-lg shadow-sm">
        <h3 className="text-md font-medium mb-2">Description</h3>
        <p className="text-sm text-gray-600">{vehicle.description}</p>
      </div>

      {/* Registration */}
      <div className="my-5 px-2.5 py-4 bg-slate-50 border-slate-100 w-11/12 mx-auto rounded-lg shadow-sm">
        <h3 className="text-md font-medium mb-2">Plaque d'immatriculation</h3>
        <p className="text-sm text-gray-600 uppercase">
          {vehicle.registration}
        </p>
      </div>
    </SideInformation>
  );
};
