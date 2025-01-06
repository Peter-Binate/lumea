'use client';
import { RegisterRequest } from '@/types/auth';
// import { yupResolver } from '@hookform/resolvers/yup';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// import ProgressBar from './ProgressBar';

// Dynamically load steps
const FirstStep = dynamic(() => import('./steps/FirstStep/FirstStep'));
const SecondStep = dynamic(() => import('./steps/SecondStep/SecondStep'));
const LastStep = dynamic(() => import('./steps/LastStep/LastStep'));

const MultiStepForm = () => {
  const steps = [FirstStep, SecondStep, LastStep];
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RegisterRequest>(
    {} as RegisterRequest
  );

  const methods = useForm<RegisterRequest>({
    defaultValues: formData,
    // resolver: yupResolver(
    //   [firstStepSchema, secondStepSchema, lastStepSchema][currentStep]
    // ),
  });

  const onSubmit = methods.handleSubmit((data) => {
    if (currentStep < steps.length - 1) {
      setFormData({ ...formData, ...data });
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log('Final data:', { ...formData, ...data });
    }
  });

  const StepComponent = steps[currentStep];

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* <ProgressBar currentStep={currentStep + 1} totalSteps={steps.length} /> */}
        <StepComponent />
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="btn btn-secondary"
            >
              Back
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
