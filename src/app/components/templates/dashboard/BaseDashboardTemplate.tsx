'use client';

import { ErrorState } from '@/app/components/ui/ErrorState';
import { Loader } from '@/app/components/ui/Loader';
import { BaseDashboardProps } from '@/types/dashboard';

export default function BaseDashboardTemplate({
  children,
  className = '',
  isLoading,
  error,
  content,
}: BaseDashboardProps & { content: React.ReactNode }) {
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
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
