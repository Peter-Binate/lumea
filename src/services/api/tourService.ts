import { Compartment } from '@/types/tour';
import { httpClient } from './httpClient';

// Types des status possibles pour une visite
export const TOUR_STATUS = {
  PENDING: 'pending',
  SENT_FOR_RENDERING: 1,
  RENDERING: 2,
  SENT_FOR_REVIEW: 3,
  REVIEWING: 4,
  APPROVED: 5,
  REJECTED: 6,
} as const;

// Type pour les status de visite
export type TourStatus = Exclude<
  (typeof TOUR_STATUS)[keyof typeof TOUR_STATUS],
  'pending'
>;

// Interface pour la structure d'une visite
export interface Tour {
  id: string;
  title: string;
  description: string;
  status: TourStatus;
  created_at: string;
  updated_at: string;
  car?: {
    id: string;
    title: string;
  };
  compartment?: Compartment[];
  video?: string;
}

// Interface pour la création/mise à jour d'une visite
export interface TourInput {
  title?: string;
  description?: string;
  property_id?: string;
  room_id?: string;
}

interface ErrorResponse {
  message?: string;
}

// Classe d'erreur personnalisée pour les erreurs de l'API
export class TourServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'TourServiceError';
  }
}

// Service de gestion des visites
export const tourService = {
  // Récupération des tours selon les visites
  async getTours(): Promise<Tour[]> {
    try {
      const response = await httpClient.get(`tour/tour`);

      if (!response.ok) {
        throw new TourServiceError(
          'Echec de la récupération des tours',
          response.status
        );
      }

      const toursData = await response.json<Tour[]>();
      console.log('Tours récupérés:', toursData);
      return toursData;
    } catch (error) {
      console.error('Erreur lors de la récupération des tours:', error);
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la récupération des tours'
          );
    }
  },

  // Récupération d'une visite spécifique
  async getTour(id: string): Promise<Tour> {
    try {
      const response = await httpClient.get(`tour/tour/${id}`);

      if (!response.ok) {
        throw new TourServiceError('Tour non trouvée', response.status);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la visite ${id}:`,
        error
      );
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la récupération de la visite'
          );
    }
  },

  // Création d'une tour
  async createTour(data: TourInput): Promise<Tour> {
    try {
      const response = await httpClient.post('tour/tour/', {
        json: data,
        throwHttpErrors: false,
      });

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => ({}))) as ErrorResponse;
        throw new TourServiceError(
          errorData.message || 'Échec de la création de la visite',
          response.status
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création de la visite:', error);
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la création de la visite'
          );
    }
  },

  // Modification d'une tour
  async updateTour(id: string, data: Partial<TourInput>): Promise<Tour> {
    try {
      const response = await httpClient.patch(`tour/tour/${id}/`, {
        json: data,
        throwHttpErrors: false,
      });

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => ({}))) as ErrorResponse;
        throw new TourServiceError(
          errorData.message || 'Échec de la mise à jour de la visite',
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la visite ${id}:`, error);
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la mise à jour de la visite'
          );
    }
  },

  // Suppression d'un tour avec meilleure gestion des erreurs
  async deleteTour(id: string): Promise<boolean> {
    try {
      const response = await httpClient.delete(`tours/${id}/`, {
        throwHttpErrors: false,
      });

      if (!response.ok) {
        throw new TourServiceError(
          'Échec de la suppression de la visite',
          response.status
        );
      }

      return true;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la visite ${id}:`, error);
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la suppression de la visite'
          );
    }
  },

  // Vérification du statut d'une visite
  async checkTourStatus(id: string): Promise<TourStatus> {
    try {
      const tour = await this.getTour(id);
      return tour.status;
    } catch (error) {
      console.error(
        `Erreur lors de la vérification du statut de la visite ${id}:`,
        error
      );
      throw error instanceof TourServiceError
        ? error
        : new TourServiceError(
            'Erreur inattendue lors de la vérification du statut de la visite'
          );
    }
  },
};
