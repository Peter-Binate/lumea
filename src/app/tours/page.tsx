'use client';

import { Button } from '@/app/components/ui/Button';
import { TourInformation } from '@/app/components/ui/TourInformation';
import { useTour } from '@/lib/hooks/useTour';
import { Tour } from '@/services/api/tourService';
import { DASHBOARD_HEADERS_CONFIG } from '@/types/dashboard';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import TourDashboardTemplate from '../components/templates/dashboard/TourDashboardTemplate';

export default function ToursPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Utilisation du hook tour
  const { tours, isLoading, error, deleteTour } = useTour();

  // Wrapper pour transformer le retour boolean en void
  const handleDelete = async (id: string): Promise<void> => {
    await deleteTour(id);
    setIsInfoOpen(false);
  };

  // Gestionnaire pour l'affichage des informations
  const handleViewTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsInfoOpen(true);
  };

  useEffect(() => {
    console.log('isInfoOpen a changé :', isInfoOpen);
  }, [isInfoOpen]);

  return (
    <>
      <TourDashboardTemplate
        isLoading={isLoading}
        error={error}
        data={tours}
        onDelete={handleDelete}
        onView={handleViewTour}
      >
        {/* En-tête avec bouton d'ajout */}
        <div className="mt-6 md:mt-0">
          {/* <Button className="w-full" onClick={() => setIsInfoOpen(true)}> */}
          <Button
            className="w-full"
            onClick={() => {
              console.log('Bouton cliqué, isInfoOpen : ', isInfoOpen);
            }}
          >
            <Plus className="mr-2" />
            {DASHBOARD_HEADERS_CONFIG.tours.buttonLabel}
          </Button>
        </div>
      </TourDashboardTemplate>

      {/* Panneau d'informations */}
      <TourInformation
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        tour={selectedTour}
        onDelete={handleDelete}
      />
    </>
  );
}
