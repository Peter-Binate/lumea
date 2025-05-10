import { Vehicle, vehicleService } from '@/services/api/vehicleService';
import { useEffect, useState } from 'react';

type VehicleSelectProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const VehicleSelect = ({ value, onChange, className }: VehicleSelectProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erreur lors du chargement des véhicules');
        console.error('Erreur lors du chargement des véhicules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, []);

  if (isLoading) return <p className="text-sm text-gray-500">Chargement des véhicules...</p>;
  
  if (error) return <p className="text-sm text-red-500">Erreur: {error}</p>;

  if (vehicles.length === 0) return <p className="text-sm text-amber-500">Aucun véhicule disponible.</p>;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary ${className}`}
    >
      <option value="">Sélectionner un véhicule</option>
      {vehicles.map((vehicle) => (
        <option key={vehicle.id} value={vehicle.id}>
          {vehicle.title} - {vehicle.registration}
        </option>
      ))}
    </select>
  );
};