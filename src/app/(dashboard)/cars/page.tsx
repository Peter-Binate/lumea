'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import VehicleDashboardTemplate from '@/app/components/templates/dashboard/VehicleDashboardTemplate';
import { Button } from '@/app/components/ui/button';
import { DeleteConfirmationModal } from '@/app/components/ui/delete-confirmation-modal';
import { VehicleInformation } from '@/app/components/ui/vehicle-information';
import { useDelete } from '@/lib/hooks/use-delete';
import { useVehicle } from '@/lib/hooks/useVehicle';
import { Vehicle } from '@/services/api/vehicleService';
import { DASHBOARD_HEADERS_CONFIG } from '@/types/dashboard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { PageTitle } from '../../components/ui/PageTitle';

export default function VehiclesPage() {

  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  // Utilisation du hook pour toute la logique des Vehicless
  const {
    vehicle,
    isLoading,
    error,
    createVehicle,
    deleteVehicle: deleteAction,
  } = useVehicle();

  const {
    isDeleteModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    closeDeleteModal
  } = useDelete(deleteAction, {
    onDeleteSuccess: () => {
      // Fermer le panneau d'information si ouvert
      setIsInfoOpen(false);
    }
  });

  // Wrapper pour afficher le formulaire de compartiment
  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsInfoOpen(true);
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
      <PageTitle title="Vos véhicules" emoji="🚗" />

      <VehicleDashboardTemplate
        isLoading={isLoading}
        error={error}
        data={vehicle}
        onView={handleViewVehicle}
        onAdd={() => setIsSideFormOpen(true)}
        onDelete={handleDeleteClick}
      >
        {/* En-tête avec bouton d'ajout */}
        <div className="mt-6 md:mt-0">
          <Button className="w-full" onClick={() => setIsSideFormOpen(true)}>
            <Plus />
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

      <VehicleInformation
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        vehicle={selectedVehicle}
        onDelete={handleDeleteClick}
      />

      {/* Modale de confirmation de suppression */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        actionName="supprimer ce véhicule"
      />
    </>
  );
}
