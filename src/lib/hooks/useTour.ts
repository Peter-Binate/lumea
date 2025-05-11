import { useAuth } from '@/app/contexts/AuthContext';
import { useToast } from '@/lib/hooks/useToast';
import {
  Tour,
  TourServiceError,
  tourService,
} from '@/services/api/tourService';
import { useEffect, useState } from 'react';

export function useTour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const loadTours = async () => {
    try {
      setIsLoading(true);
      const data = await tourService.getTours();
      console.log('Tours chargés:', data);
      setTours(data);
    } catch (error) {
      console.error('Erreur lors du chargement des tours:', error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  };

  const createTour = async (
  tourData: any
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Vérification des données minimales
    if (!tourData.title || !tourData.vehicle || !tourData.file) {
      console.error("Données incomplètes:", 
        JSON.stringify({
          hasTitle: !!tourData.title,
          hasVehicle: !!tourData.vehicle,
          hasFile: !!tourData.file,
        })
      );
      return { 
        success: false, 
        error: "Données incomplètes. Veuillez remplir tous les champs obligatoires."
      };
    }
    
    console.log("Tentative de création de tour avec les données:", {
      title: tourData.title,
      description: tourData.description?.substring(0, 20) || "N/A",
      vehicleId: tourData.vehicle,
      viewType: tourData.view,
      fileSize: tourData.file ? (tourData.file.length / 1024).toFixed(2) + " KB" : "N/A",
    });
    
    const response = await tourService.createTour(tourData);
    console.log("Réponse de création:", response);
    
    // Recharger les tours après la création
    await loadTours();
    
    return { success: true };
  } catch (error) {
    console.error('Erreur détaillée lors de la création du tour:', error);
    
    let errorMessage = 'Une erreur est survenue lors de la création du tour.';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof TourServiceError) {
      errorMessage = `Erreur (${error.statusCode || "inconnu"}): ${error.message}`;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

  const updateTour = async (id: string, data: Partial<Tour>) => {
    try {
      await tourService.updateTour(id, data);
      toast({
        title: 'Succès',
        description: 'Tour mis à jour avec succès',
        type: 'success',
      });
      await loadTours();
      return true;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la tour',
        type: 'error',
      });
      return false;
    }
  };

  const deleteTour = async (id: string) => {
    try {
      console.log(`Tentative de suppression -  ID: ${id}`);

      const result = await tourService.deleteTour(id);
      console.log('Résultat de la suppression:', result);

      if (result) {
        setTours((prevTours) =>
          prevTours.filter((tour) => tour.id.toString() !== id)
        );

        toast({
          title: 'Succès',
          description: 'Tour supprimé avec succès',
          type: 'success',
        });
        return true;
      }
      throw new Error('La suppression a échoué');
    } catch (error) {
      console.error('Erreur complète de suppression:', error);

      toast({
        title: 'Erreur',
        description:
          error instanceof Error
            ? error.message
            : 'Impossible de supprimer le tour',
        type: 'error',
      });
      return false;
    }
  };

  // Chargement initial des données
  useEffect(() => {
    if (isAuthenticated) {
      loadTours();
    }
  }, [isAuthenticated]);

  return { tours, isLoading, error, createTour, updateTour, deleteTour };
}
