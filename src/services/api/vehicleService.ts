import { httpClient } from '@/services/api/httpClient';
import { type } from 'os';

export interface Vehicle {
  id: string;
  title: string;
  description: string;
  registration: string;
  created_at: Date;
  status: 'pending' | 'completed' | 'cancelled';
  //compartment?: string;
}

// Configuration des statuts

export const vehicleService = {
  // Récupération des propriétés selon le type
  async getAllVehicles(): Promise<Vehicle[]> {
    try {
      console.log(`Récupération des propriétés de type: ${type}`);
      // TODO: Changer le nom de la route
      const response = await httpClient.get(`tour/vehicle/`).json<Vehicle[]>();
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés:', error);
      throw error;
    }
  },

  // Création d'une propriété
  async createVehicle(data: Partial<Vehicle>) {
    try {
      const response = await httpClient
        // TODO: Changer le nom de la route
        .post(`tour/vehicle/`, {
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
  async updateVehicle(id: string, data: Partial<Vehicle>) {
    try {
      const response = await httpClient
        // TODO: Changer le nom de la route
        .patch(`tour/vehicle/${id}/`, {
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
  async deleteVehicle(id: string) {
    try {
      // TODO: Changer le nom de la route
      const response = await httpClient.delete(`tour/vehicle/${id}/`);
      return response.ok;
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      throw error;
    }
  },
};
