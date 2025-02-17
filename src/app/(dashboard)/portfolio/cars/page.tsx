'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import VehicleDashboardTemplate from '@/app/components/templates/dashboard/VehicleDashboardTemplate';
import { Button } from '@/app/components/ui/Button';
import { useVehicle } from '@/lib/hooks/useVehicle';
import { Vehicle } from '@/services/api/vehicleService';
import { DASHBOARD_HEADERS_CONFIG } from '@/types/dashboard';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function VehiclesPage() {
  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);

  // Utilisation du hook pour toute la logique des Vehicless
  const {
    vehicle,
    isLoading,
    error,
    createVehicle,
    deleteVehicle: deleteAction,
  } = useVehicle();

  // Wrapper pour supprimer le reVehicles boolean
  const handleDelete = async (id: string) => {
    await deleteAction(id);
  };

  // Gestionnaire pour la création
  const handleCreateVehicles = async (data: Partial<Vehicle>) => {
    const success = await createVehicle(data);
    if (success) {
      setIsSideFormOpen(false);
    }
  };

  return (
    <>
      <h1 className="text-slate-900 text-[28px] font-semibold mt-8 mb-8 sm:mt-0">
        🚗 Vos véhicules
      </h1>
      <VehicleDashboardTemplate
        isLoading={isLoading}
        error={error}
        data={vehicle}
        onDelete={handleDelete}
      >
        {/* En-tête avec bouton d'ajout */}
        <div className="mt-6 md:mt-0">
          <Button className="w-full" onClick={() => setIsSideFormOpen(true)}>
            <Plus className="mr-2" />
            {DASHBOARD_HEADERS_CONFIG.vehicle.buttonLabel}
          </Button>
        </div>
      </VehicleDashboardTemplate>

      {/* Formulaire côté */}
      <SideForm
        isOpen={isSideFormOpen}
        onClose={() => setIsSideFormOpen(false)}
        onSubmit={handleCreateVehicles}
      />
    </>
  );
}
