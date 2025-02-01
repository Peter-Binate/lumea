'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import DashboardTemplate from '@/app/components/templates/dashboard/DashboardTemplate';
import { Button } from '@/app/components/ui/Button';
import { useTour } from '@/lib/hooks/useTour';
import type { Tour } from '@/services/api/tourService';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function PropertiesPage() {
  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);

  // Utilisation du hook pour toute la logique des tours
  const {
    tours,
    isLoading,
    error,
    createTour,
    deleteTour: deleteAction,
  } = useTour('property');

  // Wrapper pour supprimer le retour boolean
  const handleDelete = async (id: string) => {
    await deleteAction(id);
  };

  // Gestionnaire pour la création
  const handleCreateTour = async (data: Partial<Tour>) => {
    const success = await createTour(data);
    if (success) {
      setIsSideFormOpen(false);
    }
  };

  return (
    <>
      <h1 className="text-slate-900 text-[28px] font-semibold mt-8 mb-8 sm:mt-0">
        🏠 Vos biens
      </h1>
      <DashboardTemplate
        isLoading={isLoading}
        error={error}
        data={tours}
        pageType="property"
        onDelete={handleDelete}
      >
        <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Vos visites</h2>
            <p className="text-gray-600 text-sm">
              Retrouvez la liste de vos différentes visites
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button className="w-full" onClick={() => setIsSideFormOpen(true)}>
              <Plus className="mr-2" />
              Nouvelle propriété
            </Button>
          </div>
        </div>
      </DashboardTemplate>

      <SideForm
        type="property"
        isOpen={isSideFormOpen}
        onClose={() => setIsSideFormOpen(false)}
        onSubmit={handleCreateTour}
      />
    </>
  );
}
