'use client';

import { EmptyState } from '@/app/components/ui/EmptyState';
import { ErrorState } from '@/app/components/ui/ErrorState';
import { Loader } from '@/app/components/ui/Loader';
import { TourTable } from '@/app/components/ui/Table/TourTable';
import type { Tour, TourType } from '@/services/api/tourService';

interface DashboardTemplateProps {
  children: React.ReactNode;
  className?: string;
  isLoading: boolean;
  error: string | null;
  data: Tour[];
  pageType: TourType;
  onDelete?: (id: string) => Promise<boolean | void>;
}

export default function DashboardTemplate({
  children,
  className = '',
  isLoading,
  error,
  data,
  pageType,
  onDelete,
}: DashboardTemplateProps) {
  // Conversion de l'erreur en string si c'est un objet Error
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div
      className={`flex mx-auto rounded-md bg-white border-2 border-[#eaecf0] ${className}`}
    >
      <div className="flex-1 overflow-y-auto">
        {children}

        <div className="px-6 pb-6">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorState message={errorMessage} />
          ) : data.length === 0 ? (
            <EmptyState type={pageType} />
          ) : (
            <TourTable data={data} type={pageType} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
