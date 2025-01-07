'use client';
import { RegisterFormData } from '@/types/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type SecondStepData = Pick<RegisterFormData, 'rentalsNumber'>;

// Interface pour les props du composant
interface SecondStepProps {
  formData: RegisterFormData; // Données actuelles du formulaire
  updateFormData: (data: Partial<RegisterFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SecondStep: React.FC<SecondStepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev,
}) => {
  const [selectedRentalsButtonValue, setSelectedRentalsButtonValue] = useState<
    number | null
  >(null);
  const [manualRentalsInputValue, setManualRentalsInputValue] = useState<
    number | ''
  >(formData.rentalsNumber || '');

  const { register, handleSubmit } = useForm<SecondStepData>({
    defaultValues: {
      rentalsNumber: formData.rentalsNumber,
    },
  });

  // Update rentalsNumber
  const handleRentalsNumberChange = (value: number) => {
    const numberValue = Number(value); // on convertit en nombre
    setSelectedRentalsButtonValue(numberValue);
    setManualRentalsInputValue(''); // Efface la saisie manuelle si un bouton est sélectionné
    updateFormData({ rentalsNumber: numberValue });
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convertit la valeur en nombre, si vide retourne ''
    const value = e.target.value === '' ? '' : Number(e.target.value);

    // Vérifie si la valeur est soit vide soit un nombre valide dans la plage
    if (
      value === '' ||
      (typeof value === 'number' && value >= 6 && value <= 1000000)
    ) {
      // Met à jour l'état local du champ de saisie
      setManualRentalsInputValue(value);
      // Réinitialise la sélection des boutons car on utilise la saisie manuelle
      setSelectedRentalsButtonValue(null);
      // Met à jour formData uniquement si une valeur valide est saisie
      if (value !== '') {
        updateFormData({ rentalsNumber: value });
      }
    }
  };

  const onSubmitStep = (data: SecondStepData) => {
    // Détermine la valeur finale à utiliser
    const finalValue =
      selectedRentalsButtonValue ||
      (manualRentalsInputValue !== '' ? Number(manualRentalsInputValue) : null);

    // Ne procède que si une valeur valide est présente
    if (finalValue !== null) {
      // Met à jour les données du formulaire avec la valeur finale
      updateFormData({
        rentalsNumber: finalValue,
      });
      // Passe à l'étape suivante
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitStep)} className="space-y-4">
      {/* Boutons pour sélectionner rentalsNumber */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sélectionnez le nombre de locations :
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((number) => (
            <button
              key={number}
              type="button"
              className={`px-4 py-2 border rounded ${
                selectedRentalsButtonValue === number
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleRentalsNumberChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>

      {/* Champ pour saisir une valeur manuelle */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ou entrez un nombre (6 - 1 000 000) :
        </label>
        <input
          type="number"
          {...register('rentalsNumber')}
          value={manualRentalsInputValue || ''}
          onChange={handleManualInputChange}
          placeholder="Entrez un nombre"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      {/* Boutons de navigation */}
      <div className="flex space-x-4">
        <button type="button" onClick={onPrev} className="w-1/2">
          Précédent
        </button>
        <button type="submit" className="w-1/2">
          Suivant
        </button>
      </div>
    </form>
  );
};

export default SecondStep;
