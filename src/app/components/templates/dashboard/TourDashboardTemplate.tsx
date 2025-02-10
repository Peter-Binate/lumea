'use client';

import { EmptyState } from '@/app/components/ui/EmptyState';
import { TourTable } from '@/app/components/ui/Table/TourTable';
import { ToursDashboardProps } from '@/types/dashboard';
import BaseDashboardTemplate from './BaseDashboardTemplate';

export default function TourDashboardTemplate(props: ToursDashboardProps) {
  const { data, onDelete } = props;

  const content =
    data.length === 0 ? (
      <EmptyState type="tours" />
    ) : (
      <TourTable data={data} onDelete={onDelete} />
    );

  return <BaseDashboardTemplate {...props} content={content} />;
}
