import { RegisterFormData } from '@/types/auth';
import { firstStepSchema } from '@/utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

// Type pour les données de la première étape
type FirstStepData = Pick<
  RegisterFormData,
  'name' | 'email' | 'password' | 'confirmPassword'
>;

// Interface pour les props du composant
interface FirstStepProps {
  formData: RegisterFormData; // Données actuelles du formulaire
  updateFormData: (data: Partial<RegisterFormData>) => void;
  onNext: () => void;
}

const FirstStep: React.FC<FirstStepProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  // Initialisation du hook useForm avec validation Yup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FirstStepData>({
    resolver: yupResolver(firstStepSchema),
    mode: 'onChange', // Validation en temps réel
    defaultValues: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  });

  // Fonction pour gérer la soumission du formulaire
  const onSubmitStep = (data: FirstStepData) => {
    updateFormData(data); // Mise à jour des données
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitStep)} className="space-y-4">
      {/* Champ Nom */}
      <div>
        <input
          {...register('name')}
          placeholder="Nom"
          className={errors.name ? 'border-red-500' : ''}
        />
        {/* Affichage du message d'erreur si présent */}
        {errors.name && (
          <span className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Champ Email */}
      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Champ Mot de passe */}
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Mot de passe"
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Champ Confirmation mot de passe */}
      <div>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirmer le mot de passe"
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Bouton de soumission */}
      <button type="submit" className="w-full" disabled={!isValid}>
        Suivant
      </button>
    </form>
  );
};

export default FirstStep;
