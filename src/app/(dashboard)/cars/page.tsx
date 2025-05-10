'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import VehicleDashboardTemplate from '@/app/components/templates/dashboard/VehicleDashboardTemplate';
import { DeleteConfirmationModal } from '@/app/components/ui/delete-confirmation-modal';
import { VehicleInformation } from '@/app/components/ui/VehicleInformation';
import { Vehicle } from '@/services/api/vehicleService';
import { useEffect, useState } from 'react';
import { PageTitle } from '../../components/ui/PageTitle';

// TODO: à supprimer 
const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    title: 'Citroën C3',
    description: 'Véhicule compact urbain',
    created_at: new Date('2023-05-15'),
    status: 'pending',
  },
  {
    id: '2',
    title: 'Peugeot 3008',
    description: 'SUV familial',
    created_at: new Date('2023-08-22'),
    status: 'pending',
  },
  {
    id: '3',
    title: 'Renault Clio',
    description: 'Citadine économique',
    created_at: new Date('2024-01-10'),
    status: 'pending',
  },
  {
    id: '4',
    title: 'Tesla Model 3',
    description: 'Véhicule électrique',
    created_at: new Date('2024-03-05'),
    status: 'pending',
  }
];

export default function VehiclesPage() {
  // -----------------------TODO: à supprimer-------------------------------
  // Simuler un chargement initial des données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 800));
        setVehicles(MOCK_VEHICLES);
        setIsLoading(false);
      } catch (err) {
        setError("Erreur lors du chargement des véhicules");
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // État local pour gérer les véhicules mockés
  const [vehicleMock, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createMockVehicle = async (data: Partial<Vehicle>): Promise<boolean> => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Créer un nouveau véhicule avec un ID généré
      const newVehicle: Vehicle = {
        id: `mock-${Date.now()}`,
        title: data.title || 'Nouveau véhicule',
        description: data.description || 'Description par défaut',
        created_at: new Date(),
        status: data.status || 'pending'
      };
      
      // Mettre à jour l'état local
      setVehicles(prev => [...prev, newVehicle]);
      
      return true;
    } catch (err) {
      setError("Erreur lors de la création du véhicule");
      return false;
    }
  };

  // Implémentation mockée de la suppression de véhicule
  const deleteMockVehicle = async (id: string): Promise<boolean> => {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filtrer pour supprimer le véhicule
      setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
      
      return true;
    } catch (err) {
      setError("Erreur lors de la suppression du véhicule");
      return false;
    }
  };
  // -----------------------TODO: à supprimer-------------------------------

  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);

  // Utilisation du hook pour toute la logique des Vehicless
  // const {
  //   vehicle,
  //   isLoading,
  //   error,
  //   createVehicle,
  //   deleteVehicle: deleteAction,
  // } = useVehicle();

  // Wrapper pour afficher le formulaire de compartiment
  const handleViewVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsInfoOpen(true);
  };

  // Gestionnaire pour la création
  const handleCreateVehicles = async (data: Partial<Vehicle>) => {
    const success = await createMockVehicle(data);
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
      await deleteMockVehicle(vehicleToDelete);
      // await deleteAction(vehicleToDelete);
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
        data={vehicleMock}
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
