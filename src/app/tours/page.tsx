'use client';

import { Button } from '@/app/components/ui/Button';
import { useTour } from '@/lib/hooks/useTour';
import { DASHBOARD_HEADERS_CONFIG } from '@/types/dashboard';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import TourDashboardTemplate from '../components/templates/dashboard/TourDashboardTemplate';

export default function ToursPage() {
  // État local pour gérer l'ouverture/fermeture du formulaire latéral
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);

  // Utilisation du hook tour
  const { tours, isLoading, error, createTour, deleteTour } = useTour();

  // Gestionnaire pour la création d'une visite
  const handleCreateTour = async (data: any) => {
    const success = await createTour(data);
    if (success) {
      setIsSideFormOpen(false);
    }
  };

  // Wrapper pour transformer le retour boolean en void
  const handleDelete = async (id: string): Promise<void> => {
    await deleteTour(id);
  };

  return (
    <>
      <TourDashboardTemplate
        isLoading={isLoading}
        error={error}
        data={tours}
        onDelete={handleDelete}
      >
        {/* En-tête avec bouton d'ajout */}
        <div className="mt-6 md:mt-0">
          <Button className="w-full" onClick={() => setIsSideFormOpen(true)}>
            <Plus className="mr-2" />
            {DASHBOARD_HEADERS_CONFIG.tours.buttonLabel}
          </Button>
        </div>
      </TourDashboardTemplate>
    </>
  );
}
