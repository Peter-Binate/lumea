import { useToast } from '@/lib/hooks/use-toast';

export const useNotificationService = () => {
  const { toast } = useToast();

  return {
    // Notifications pour les véhicules
    vehicleCreated: () => {
      toast({
        title: 'Véhicule créé',
        description: 'Le véhicule a été ajouté avec succès',
        type: 'success',
      });
    },
    vehicleUpdated: () => {
      toast({
        title: 'Véhicule mis à jour',
        description: 'Le véhicule a été modifié avec succès',
        type: 'success',
      });
    },
    vehicleDeleted: () => {
      toast({
        title: 'Véhicule supprimé',
        description: 'Le véhicule a été supprimé avec succès',
        type: 'success',
      });
    },

    // Notifications pour les tours
    tourCreated: () => {
      toast({
        title: 'Tour créé',
        description: 'Le tour a été créé avec succès',
        type: 'success',
      });
    },
    tourUpdated: () => {
      toast({
        title: 'Tour mis à jour',
        description: 'Le tour a été modifié avec succès',
        type: 'success',
      });
    },
    tourDeleted: () => {
      toast({
        title: 'Tour supprimé',
        description: 'Le tour a été supprimé avec succès',
        type: 'success',
      });
    },

    // Notification générique d'erreur
    showError: (message: string) => {
      toast({
        title: 'Erreur',
        description: message,
        type: 'error',
      });
    },
  };
};