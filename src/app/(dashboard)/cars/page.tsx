'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import VehicleDashboardTemplate from '@/app/components/templates/dashboard/VehicleDashboardTemplate';
import { DeleteConfirmationModal } from '@/app/components/ui/delete-confirmation-modal';
import { VehicleInformation } from '@/app/components/ui/vehicle-information';
import { useVehicle } from '@/lib/hooks/useVehicle';
import { Vehicle } from '@/services/api/vehicleService';
import { useState } from 'react';
import { PageTitle } from '../../components/ui/PageTitle';

export default function VehiclesPage() {

  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  // Utilisation du hook pour toute la logique des Vehicless
  const {
    vehicle,
    isLoading,
    error,
    createVehicle,
    deleteVehicle: deleteAction,
  } = useVehicle();

  // Wrapper pour afficher le formulaire de compartiment
  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsInfoOpen(true);
  };

  // Gestionnaire pour la création
  const handleCreateVehicles = async (data: Partial<Vehicle>) => {
    const success = await createVehicle(data);
    // const success = await createVehicle(data);
    if (success) {
      setIsSideFormOpen(false);
    }
  };

  // Afficher la modale de confirmation avant supression
  const handleDeleteClick = (id: string) => {
    setVehicleToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Execution de la supression après confirmation
  const handleConfirmDelete = async () => {
    if (vehicleToDelete) {
      await deleteAction(vehicleToDelete);
      setVehicleToDelete(null);
      setIsInfoOpen(false);
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
        onDelete={handleDeleteClick}
        onAdd={() => setIsSideFormOpen(true)}
      />

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
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        actionName="supprimer ce véhicule"
      />
    </>
  );
}
