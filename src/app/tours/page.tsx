'use client';

import ProtectedRoute from '@/app/components/ProtectedRoute/ProtectedRoute';
import { Button } from '@/stories/Button';
import DashboardTemplate from '../components/templates/dashboard/DashboardTemplate';

export default function Tours() {
  return (
    <ProtectedRoute>
      <DashboardTemplate
        isLoading={isLoading}
        error={error}
        data={tours}
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
      </DashboardTemplate>
    </ProtectedRoute>
  );
}
