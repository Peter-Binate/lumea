import { useAuth } from '@/app/contexts/AuthContext';
import { useToast } from '@/lib/hooks/useToast';
import {
  Portfolio,
  portfolioService,
  PortfolioType,
} from '@/services/api/portfolioService';
import { useEffect, useState } from 'react';

export function usePortfolio(type: PortfolioType) {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const loadPortfolio = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isAuthenticated) {
        throw new Error('Utilisateur non authentifié');
      }

      const data = await portfolioService.getPortfolio(type);
      setPortfolio(data);
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

  const createPortfolio = async (data: Partial<Portfolio>) => {
    try {
      await portfolioService.createPortfolio(type, data);
      toast({
        title: 'Succès',
        description: 'Propriété créée avec succès',
        type: 'success',
      });
      await loadPortfolio();
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

  const updatePortfolio = async (id: string, data: Partial<Portfolio>) => {
    try {
      await portfolioService.updatePortfolio(type, id, data);
      toast({
        title: 'Succès',
        description: 'Propriété mise à jour avec succès',
        type: 'success',
      });
      await loadPortfolio();
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

  const deletePortfolio = async (id: string) => {
    try {
      await portfolioService.deletePortfolio(type, id);
      toast({
        title: 'Succès',
        description: 'Propriété supprimée avec succès',
        type: 'success',
      });
      await loadPortfolio();
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
      loadPortfolio();
    }
  }, [type, isAuthenticated]);

  return {
    portfolio,
    isLoading,
    error,
    loadPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  };
}
