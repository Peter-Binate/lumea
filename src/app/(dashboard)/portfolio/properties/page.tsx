'use client';

import { SideForm } from '@/app/components/forms/SideForm';
import PortfolioTemplate from '@/app/components/templates/dashboard/PortfolioDashboardTemplate';
import { Button } from '@/app/components/ui/Button';
import { usePortfolio } from '@/lib/hooks/usePortfolio';
import type { Portfolio } from '@/services/api/portfolioService';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export default function PropertiesPage() {
  // État local uniquement pour le formulaire
  const [isSideFormOpen, setIsSideFormOpen] = useState(false);

  // Utilisation du hook pour toute la logique des Portfolios
  const {
    portfolio,
    isLoading,
    error,
    createPortfolio,
    deletePortfolio: deleteAction,
  } = usePortfolio('property');

  // Wrapper pour supprimer le rePortfolio boolean
  const handleDelete = async (id: string) => {
    await deleteAction(id);
  };

  // Gestionnaire pour la création
  const handleCreatePortfolio = async (data: Partial<Portfolio>) => {
    const success = await createPortfolio(data);
    if (success) {
      setIsSideFormOpen(false);
    }
  };

  return (
    <>
      <h1 className="text-slate-900 text-[28px] font-semibold mt-8 mb-8 sm:mt-0">
        🏠 Vos biens
      </h1>
      <PortfolioTemplate
        isLoading={isLoading}
        error={error}
        data={portfolio}
        pageType="property"
        onDelete={handleDelete}
      >
        <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium">Vos visites</h2>
            <p className="text-gray-600 text-sm">
              Retrouvez la liste de vos différentes visites
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button className="w-full" onClick={() => setIsSideFormOpen(true)}>
              <Plus className="mr-2" />
              Nouvelle propriété
            </Button>
          </div>
        </div>
      </PortfolioTemplate>

      <SideForm
        type="property"
        isOpen={isSideFormOpen}
        onClose={() => setIsSideFormOpen(false)}
        onSubmit={handleCreatePortfolio}
      />
    </>
  );
}
