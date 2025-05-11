import { useAuth } from '@/app/contexts/AuthContext';
import { useToast } from '@/lib/hooks/use-toast';
import {
  Compartment,
  CompartmentInput,
  compartmentService,
} from '@/services/api/compartmentService';
import { useEffect, useState } from 'react';

export function useCompartment() {
  const [compartments, setCompartments] = useState<Compartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadCompartments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isAuthenticated) {
        throw new Error('Utilisateur non authentifié');
      }

      const data = await compartmentService.getAllCompartments();
      setCompartments(data);
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

  const createCompartment = async (data: CompartmentInput) => {
    try {
      await compartmentService.createCompartment(data);
      toast({
        title: 'Succès',
        description: 'Compartiment créé avec succès',
        type: 'success',
      });
      await loadCompartments();
      return true;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le compartiment',
        type: 'error',
      });
      return false;
    }
  };

  const updateCompartment = async (
    id: string,
    data: Partial<CompartmentInput>
  ) => {
    try {
      await compartmentService.updateCompartment(id, data);
      toast({
        title: 'Succès',
        description: 'Compartiment mis à jour avec succès',
        type: 'success',
      });
      await loadCompartments();
      return true;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le compartiment',
        type: 'error',
      });
      return false;
    }
  };

  const deleteCompartment = async (id: string) => {
    try {
      await compartmentService.deleteCompartment(id);
      toast({
        title: 'Succès',
        description: 'Compartiment supprimé avec succès',
        type: 'success',
      });
      await loadCompartments();
      return true;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le compartiment',
        type: 'error',
      });
      return false;
    }
  };

  // Chargement initial des données
  useEffect(() => {
    if (isAuthenticated) {
      loadCompartments();
    }
  }, [isAuthenticated]);

  return {
    compartments,
    isLoading,
    error,
    loadCompartments,
    createCompartment,
    updateCompartment,
    deleteCompartment,
  };
}
