import { httpClient } from '@/services/api/httpClient';

// Types pour les statuts possibles d'un compartiment
export const COMPARTMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  RESERVED: 'reserved',
} as const;

// Type pour les status de compartiment
export type CompartmentStatus =
  (typeof COMPARTMENT_STATUS)[keyof typeof COMPARTMENT_STATUS];

export interface Compartment {
  id: string;
  title: string;
  description: string;
  status?: CompartmentStatus;
  property: string; // A remplacer par vehicle_id
  created_at: Date;
  updated_at: string;
}

// Interface pour la création/mise à jour d'un compartiment
export interface CompartmentInput {
  title?: string;
  description?: string;
  status?: CompartmentStatus;
  property?: string;
}

interface ErrorResponse {
  message?: string;
}

// Classe d'erreur personnalisée pour les erreurs de l'API
export class CompartmentServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'CompartmentServiceError';
  }
}

export const compartmentService = {
  // Récupération de tous les compartiments
  async getAllCompartments(): Promise<Compartment[]> {
    try {
      const response = await httpClient.get('tour/room');
      //TODO remplacer par => const response = await httpClient.get('compartment/compartment');

      if (!response.ok) {
        throw new CompartmentServiceError(
          'Échec de la récupération des compartiments',
          response.status
        );
      }

      const compartmentsData = await response.json<Compartment[]>();
      console.log('Compartiments récupérés:', compartmentsData);
      return compartmentsData;
    } catch (error) {
      console.error('Erreur lors de la récupération des compartiments:', error);
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la récupération des compartiments'
          );
    }
  },

  // Récupération d'un compartiment spécifique
  async getCompartiment(id: string): Promise<Compartment> {
    try {
      const response = await httpClient.get(`tour/compartment/${id}/`);
      if (!response.ok) {
        throw new CompartmentServiceError(
          'Échec de la récupération du compartiment',
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du compartiment ${id}:`,
        error
      );
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la récupération du compartiment'
          );
    }
  },

  // Création d'un compartiment
  async createCompartment(data: CompartmentInput): Promise<Compartment> {
    try {
      const response = await httpClient.post(`tour/room/`, {
        json: data,
        throwHttpErrors: false,
      });
      // const response = await httpClient.post('tour/compartment/', {
      //   json: data,
      //   throwHttpErrors: false,
      // });

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => ({}))) as ErrorResponse;
        throw new CompartmentServiceError(
          errorData.message || 'Échec de la création du compartiment',
          response.status
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du compartiment:', error);
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la création du compartiment'
          );
    }
  },

  // Modification d'un compartiment
  async updateCompartment(
    id: string,
    data: Partial<CompartmentInput>
  ): Promise<Compartment> {
    try {
      const response = await httpClient.patch(`tour/compartment/${id}/`, {
        json: data,
        throwHttpErrors: false,
      });

      if (!response.ok) {
        const errorData = (await response
          .json()
          .catch(() => ({}))) as ErrorResponse;
        throw new CompartmentServiceError(
          errorData.message || 'Échec de la mise à jour du compartiment',
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour du compartiment ${id}:`,
        error
      );
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la mise à jour du compartiment'
          );
    }
  },

  // Suppression d'un compartiment
  async deleteCompartment(id: string): Promise<boolean> {
    try {
      const response = await httpClient.delete(`tour/compartment/${id}/`, {
        throwHttpErrors: false,
      });

      if (!response.ok) {
        throw new CompartmentServiceError(
          'Échec de la suppression du compartiment',
          response.status
        );
      }

      return true;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression du compartiment ${id}:`,
        error
      );
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la suppression du compartiment'
          );
    }
  },

  // Vérification du statut d'un compartiment
  async checkCompartmentStatus(id: string): Promise<CompartmentStatus> {
    try {
      const compartment = await this.getCompartiment(id);
      return compartment.status ?? COMPARTMENT_STATUS.INACTIVE;
    } catch (error) {
      console.error(
        `Erreur lors de la vérification du statut du compartiment ${id}:`,
        error
      );
      throw error instanceof CompartmentServiceError
        ? error
        : new CompartmentServiceError(
            'Erreur inattendue lors de la vérification du statut du compartiment'
          );
    }
  },
};
