import { httpClient } from '@/services/api/httpClient';

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  status: 'pending' | 'completed' | 'cancelled';
  room?: string;
  compartment?: string;
}

export type PortfolioType = 'property' | 'car' | 'monument' | 'object';

export const portfolioService = {
  // Récupération des propriétés selon le type
  async getPortfolio(type: PortfolioType): Promise<Portfolio[]> {
    try {
      console.log(`Récupération des propriétés de type: ${type}`);
      // TODO: Changer le nom de la route
      const response = await httpClient
        .get(`portfolio/${type}/`)
        .json<Portfolio[]>();
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés:', error);
      throw error;
    }
  },

  // Création d'une propriété
  async createPortfolio(type: PortfolioType, data: Partial<Portfolio>) {
    try {
      const response = await httpClient
        // TODO: Changer le nom de la route
        .post(`portfolio/${type}/`, {
          json: data,
        })
        .json();
      console.log('Propriété créée:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la propriété:', error);
      throw error;
    }
  },

  // Mise à jour d'une propriété
  async updatePortfolio(
    type: PortfolioType,
    id: string,
    data: Partial<Portfolio>
  ) {
    try {
      const response = await httpClient
        // TODO: Changer le nom de la route
        .patch(`portfolio/${type}/${id}/`, {
          json: data,
        })
        .json();
      return response;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la propriété:', error);
      throw error;
    }
  },

  // Suppression d'une propriété
  async deletePortfolio(type: PortfolioType, id: string) {
    try {
      // TODO: Changer le nom de la route
      const response = await httpClient.delete(`portfolio/${type}/${id}/`);
      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      throw error;
    }
  },
};
