'use client';
import { RegisterFormData } from '@/types/auth';
import { useState } from 'react';
import FirstStep from './steps/FirstStep/FirstStep';
import LastStep from './steps/LastStep/LastStep';
import SecondStep from './steps/SecondStep/SecondStep';
// import ProgressBar from './ProgressBar';

interface MultiStepFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmit }) => {
  // État pour suivre l'étape actuelle du formulaire
  const [currentStep, setCurrentStep] = useState(1);

  // État pour stocker toutes les données du formulaire
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rentalsNumber: [],
    additionalRentals: 0,
  });

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3)); // Limites à 3 étapes
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ne descend pas en dessous de 1 étape
  };

  // Fonction pour mettre à jour les données du formulaire
  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    console.log('Updated form data:', formData);
  };

  const handleSubmit = () => {
    console.log('Final form data:', formData);
    onSubmit(formData);
  };

  // Ajout d'un console.log pour voir l'étape courante
  console.log('Current step:', currentStep);

  // Fonction pour rendre l'étape actuelle
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FirstStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <SecondStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
            onPrev={handleBackStep}
          />
        );
      case 3:
        return (
          <LastStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
            onPrev={handleBackStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        // On retourne FirstStep par défaut
        return (
          <FirstStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNextStep}
          />
        );
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      {/* <ProgressBar currentStep={currentStep} totalSteps={3} /> */}
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
