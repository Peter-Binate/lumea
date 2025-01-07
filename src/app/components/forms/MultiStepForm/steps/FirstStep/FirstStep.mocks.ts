import { RegisterFormData } from '@/types/auth';

// Type pour les données de la première étape
type FirstStepData = Pick<
  RegisterFormData,
  'name' | 'email' | 'password' | 'confirmPassword'
>;

// Interface pour les props du composant
export interface FirstStepProps {
  formData: RegisterFormData;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  onNext: () => void;
}

const base: FirstStepProps = {
  formData: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    rentalsNumber: 0,
  },
  updateFormData: () => {},
  onNext: () => {},
};

export const mockFirstStepProps = {
  base,
};
