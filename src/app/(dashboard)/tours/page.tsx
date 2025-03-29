'use client';

import { Button } from '@/app/components/ui/Button';
import { PageTitle } from '@/app/components/ui/PageTitle';
import { TourInformation } from '@/app/components/ui/TourInformation';
import { useTour } from '@/lib/hooks/useTour';
import { Tour } from '@/services/api/tourService';
import { DASHBOARD_HEADERS_CONFIG } from '@/types/dashboard';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TourDashboardTemplate from '../../components/templates/dashboard/TourDashboardTemplate';

export const ToursPage = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | undefined>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const router = useRouter();

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

  return (
    <>
      <PageTitle title="Vos tours" emoji="🗺️" />

      <TourDashboardTemplate
        isLoading={isLoading}
        error={error}
        data={tours}
        onDelete={handleDelete}
        onView={handleViewTour}
      >
        {/* En-tête avec bouton d'ajout */}
        <div className="mt-6 md:mt-0">
          <Button
            className="w-full"
            onClick={
              () => router.push('/tours/add-tour')
              //console.log('Bouton cliqué, isInfoOpen : ', isInfoOpen);
            }
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
};

export default ToursPage;
