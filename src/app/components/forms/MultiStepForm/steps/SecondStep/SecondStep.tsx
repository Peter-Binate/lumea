import { RegisterFormData } from '@/types/auth';
import { useForm } from 'react-hook-form';

type SecondStepData = Pick<
  RegisterFormData,
  'rentalsNumber' | 'additionalRentals'
>;

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondStepData>({
    defaultValues: {
      rentalsNumber: formData.rentalsNumber,
      additionalRentals: formData.additionalRentals,
    },
  });

  const onSubmitStep = (data: SecondStepData) => {
    updateFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitStep)} className="space-y-4">
      {/* Champ pour le nombre de locations additionnelles */}
      <div>
        <input
          {...register('additionalRentals')}
          type="number"
          placeholder="Nombre de locations additionnelles"
          className={errors.additionalRentals ? 'border-red-500' : ''}
        />
        {errors.additionalRentals && (
          <span className="text-red-500 text-sm mt-1">
            {errors.additionalRentals.message}
          </span>
        )}
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
