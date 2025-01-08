'use client';
import ProgressBar from '@/app/components/ui/ProgressBar';
import { RegisterFormData } from '@/types/auth';
import Link from 'next/link';
import { useState } from 'react';
import LogoImage from '../../ui/LogoImage';
import ProfileImage from '../../ui/ProfileImage';
import FirstStep from './steps/FirstStep/FirstStep';
import LastStep from './steps/LastStep/LastStep';
import SecondStep from './steps/SecondStep/SecondStep';

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
    rentalsNumber: 0,
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
    <div className="w-[604px] mt-12">
      <div className="text-center">
        <ProgressBar currentStep={currentStep} totalSteps={3} />
        <ProfileImage />
      </div>

      {renderStep()}
      <div className="mt-[20px] text-center text-[#5261ab] text-base font-normal font-inter underline leading-[30px]">
        <Link href="auth/login">Vous avez déjà un compte ?</Link>
      </div>
      <LogoImage />
    </div>
  );
};

export default MultiStepForm;
