import { httpClient } from './httpClient';

export interface Tour {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  status: 'pending' | 'completed' | 'cancelled';
  room?: string;
  compartment?: string;
}

export type TourType = 'property' | 'car' | 'monument' | 'object';

export const tourService = {
  // Récupération des tours selon le type
  async getTours(type: TourType): Promise<Tour[]> {
    try {
      console.log(`Récupération des tours de type: ${type}`);
      const response = await httpClient.get(`tour/${type}/`).json<Tour[]>();
      console.log('Tours récupérés:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des tours:', error);
      throw error;
    }
  },

  // Création d'une tour
  async createTour(type: TourType, data: Partial<Tour>) {
    return await httpClient
      .post(`tour/${type}/`, {
        json: data,
      })
      .json();
  },

  // Modification d'une tour
  async updateTour(type: TourType, id: string, data: Partial<Tour>) {
    return await httpClient
      .patch(`tour/${type}/${id}`, {
        json: data,
      })
      .json();
  },

  // Suppression d'une tour avec meilleure gestion des erreurs
  async deleteTour(type: TourType, id: string) {
    try {
      const url = `tour/${type}/${id}/`;
      console.log('URL de suppression:', url);

      // Log des headers avant la requête
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('userEmail')}`,
      };
      console.log('Headers de la requête:', headers);

      const response = await httpClient.delete(url, {
        headers,
        throwHttpErrors: false, // Pour gérer manuellement les erreurs
      });

      // Log de la réponse complète
      console.log('Réponse brute:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Détails de l'erreur serveur:", errorData);

        throw new Error(
          errorData.message ||
            `Erreur serveur (${response.status}): ${response.statusText}`
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Erreur complète:', {
        error,
        stack: error instanceof Error ? error.stack : undefined,
      });

      if (error instanceof Error) {
        throw new Error(`Échec de la suppression: ${error.message}`);
      }
      throw new Error('Échec inattendu de la suppression');
    }
  },
};
