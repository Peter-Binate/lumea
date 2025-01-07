export interface PricingPlan {
  title: string;
  description: string;
  price: number;
  features: string[];
  isRecommended: boolean;
}

export interface LastStepProps {
  formData: {
    rentalsNumber: number;
    [key: string]: any;
  };
  updateFormData: (data: Partial<any>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
}

const standardPlan: PricingPlan = {
  title: 'Plan Standard',
  description: 'Parfait pour débuter avec quelques locations',
  price: 29,
  features: [
    "Jusqu'à 5 locations",
    'Support client standard',
    'Mises à jour gratuites',
    'Interface intuitive',
    'Statistiques de base',
  ],
  isRecommended: true,
};

const premiumPlan: PricingPlan = {
  title: 'Plan Premium',
  description: 'Idéal pour les gestionnaires professionnels',
  price: 99,
  features: [
    'Locations illimitées',
    'Support client prioritaire',
    'Mises à jour premium',
    'Analyses avancées',
    'Fonctionnalités exclusives',
  ],
  isRecommended: false,
};

const base: LastStepProps = {
  formData: {
    rentalsNumber: 3,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  },
  updateFormData: () => {},
  onNext: () => {},
  onPrev: () => {},
  onSubmit: () => {},
};

// Cas avec un nombre de locations qui recommande le plan premium
const withPremiumRecommendation: LastStepProps = {
  ...base,
  formData: {
    ...base.formData,
    rentalsNumber: 6,
  },
};

export const mockLastStepProps = {
  base,
  withPremiumRecommendation,
  pricingPlans: {
    standardPlan,
    premiumPlan,
  },
};
