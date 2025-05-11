'use client';

import { EmptyState } from '@/app/components/ui/empty-state';
import { TourTable } from '@/app/components/ui/Table/tour-table';
import {
  DASHBOARD_HEADERS_CONFIG,
  ToursDashboardProps,
} from '@/types/dashboard';
import BaseDashboardTemplate from './BaseDashboardTemplate';

export default function TourDashboardTemplate(props: ToursDashboardProps) {
  const { data, onView, onEdit, onDelete, children } = props;
  const header = DASHBOARD_HEADERS_CONFIG.vehicle;

  const content =
    data.length === 0 ? (
      <EmptyState type="tour" />
    ) : (
      <TourTable
        data={data}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );

  return (
    <BaseDashboardTemplate {...props} content={content}>
      <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{header.title}</h2>
          <p className="text-gray-600 text-sm">{header.description}</p>
        </div>
        {children}
      </div>
    </BaseDashboardTemplate>
  );
}
