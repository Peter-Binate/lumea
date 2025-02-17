'use client';

import { EmptyState } from '@/app/components/ui/EmptyState';
import { TourTable } from '@/app/components/ui/Table/TourTable';
import { ToursDashboardProps } from '@/types/dashboard';
import BaseDashboardTemplate from './BaseDashboardTemplate';

export default function TourDashboardTemplate(props: ToursDashboardProps) {
  const { data, onView, onEdit, onDelete } = props;

  const content =
    data.length === 0 ? (
      <EmptyState />
    ) : (
      <TourTable
        data={data}
        onView={onView} // Assurez-vous de passer ces props
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

  return <BaseDashboardTemplate {...props} content={content} />;
}
