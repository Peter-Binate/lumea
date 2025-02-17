import { useAuth } from '@/app/contexts/AuthContext';
import { useToast } from '@/lib/hooks/useToast';
import { Vehicle, vehicleService } from '@/services/api/vehicleService';
import { useEffect, useState } from 'react';

export function useVehicle() {
  const [vehicle, setVehicle] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadVehicle = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isAuthenticated) {
        throw new Error('Utilisateur non authentifié');
      }

      const data = await vehicleService.getAllVehicles();
      setVehicle(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast({
        title: 'Erreur',
        description: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createVehicle = async (data: Partial<Vehicle>) => {
    try {
      await vehicleService.createVehicle(data);
      toast({
        title: 'Succès',
        description: 'Propriété créée avec succès',
        type: 'success',
      });
      await loadVehicle();
      return true;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la propriété',
        type: 'error',
      });
      return false;
    }
  };

  const updateVehicle = async (id: string, data: Partial<Vehicle>) => {
    try {
      await vehicleService.updateVehicle(id, data);
      toast({
        title: 'Succès',
        description: 'Propriété mise à jour avec succès',
        type: 'success',
      });
      await loadVehicle();
      return true;
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la propriété',
        type: 'error',
      });
      return false;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await vehicleService.deleteVehicle(id);
      toast({
        title: 'Succès',
        description: 'Propriété supprimée avec succès',
        type: 'success',
      });
      await loadVehicle();
      return true;
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer la propriété',
        type: 'error',
      });
      return false;
    }
  };

  // Chargement initial des données
  useEffect(() => {
    if (isAuthenticated) {
      loadVehicle();
    }
  }, [isAuthenticated]);

  return {
    vehicle,
    isLoading,
    error,
    loadVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
}
