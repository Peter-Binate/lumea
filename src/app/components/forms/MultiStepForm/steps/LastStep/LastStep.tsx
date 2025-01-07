import { RegisterFormData } from '@/types/auth';
import React from 'react';

export interface ILastStepProps {
  formData: RegisterFormData;
  updateFormData: (data: Partial<RegisterFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const LastStep: React.FC<ILastStepProps> = ({ formData, onPrev, onSubmit }) => {
  // Calculer le prix en fonction du nombre de locations
  const getMonthlyPrice = (rentalsNumber: number) => {
    if (rentalsNumber <= 5) {
      return 29;
    }
    return 99;
  };

  const monthlyPrice = getMonthlyPrice(formData.rentalsNumber);

  return (
    <div className="w-full border-2 border-emerald-500 py-6 leading-7 text-gray-900 bg-white sm:py-12 md:py-16">
      <div className="w-full px-4 mx-0 sm:px-6 md:px-8">
        {/* En-tête */}
        <div className="flex flex-col items-center text-center text-gray-900">
          <h2
            id="pricing"
            className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-xl text-gray-900 sm:text-2xl">
            Choisissez le plan qui correspond à vos besoins.
          </p>
        </div>

        {/* Cartes de prix */}
        <div
          id="pricing"
          className="grid grid-cols-1 gap-4 mt-4 sm:mt-6 sm:gap-6 md:mt-8 lg:grid-cols-3"
        >
          {/* Plan Starter */}
          <div className="relative flex flex-col items-center p-6 border border-solid rounded-lg bg-white shadow-md">
            <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Starter
            </h3>
            <div className="flex items-end mt-6">
              <p className="text-6xl font-semibold">$1</p>
              <p className="ml-1">/ month</p>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="font-semibold">1 Website</li>
              <li className="font-semibold">SSL (HTTPS)</li>
              <li className="font-semibold">SiteFast Domain</li>
            </ul>
            <button
              onClick={onSubmit}
              className="w-full px-4 py-3 mt-8 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 hover:text-white"
            >
              Start Now
            </button>
          </div>

          {/* Plan Basic */}
          <div className="relative flex flex-col items-center p-6 border-4 border-blue-600 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Basic
            </h3>
            <div className="flex items-end mt-6">
              <p className="text-6xl font-semibold">$29</p>
              <p className="ml-1">/ month</p>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="font-semibold">15 Websites</li>
              <li className="font-semibold">SSL (HTTPS)</li>
              <li className="font-semibold">Custom Domain</li>
              <li className="font-semibold">SiteFast Branding Removal</li>
            </ul>
            <button
              onClick={onSubmit}
              className="w-full px-4 py-3 mt-8 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Start Now
            </button>
          </div>

          {/* Plan Plus */}
          <div className="relative flex flex-col items-center p-6 border border-solid rounded-lg bg-white shadow-md">
            <h3 className="text-2xl font-semibold sm:text-3xl md:text-4xl">
              Plus
            </h3>
            <div className="flex items-end mt-6">
              <p className="text-6xl font-semibold">$49</p>
              <p className="ml-1">/ month</p>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="font-semibold">50 Websites</li>
              <li className="font-semibold">SSL (HTTPS)</li>
              <li className="font-semibold">Custom Domain</li>
              <li className="font-semibold">SiteFast Branding Removal</li>
              <li className="font-semibold">Google Analytics</li>
              <li className="font-semibold">Email Integration</li>
            </ul>
            <button
              onClick={onSubmit}
              className="w-full px-4 py-3 mt-8 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 hover:border-blue-700 hover:text-white"
            >
              Start Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastStep;
