'use client';

import { EmptyState } from '@/app/components/ui/EmptyState';
import { PortfolioTable } from '@/app/components/ui/Table/PortfolioTable';
import {
  DASHBOARD_HEADERS_CONFIG,
  PortfolioDashboardProps,
} from '@/types/dashboard';
import BaseDashboardTemplate from './BaseDashboardTemplate';

export default function PortfolioDashboardTemplate(
  props: PortfolioDashboardProps
) {
  const { data, portfolioType, onDelete, onEdit, onView } = props;
  const header = DASHBOARD_HEADERS_CONFIG[portfolioType];

  const content =
    data.length === 0 ? (
      <EmptyState type={portfolioType} />
    ) : (
      <PortfolioTable
        data={data}
        type={portfolioType}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
      />
    );

  return (
    <BaseDashboardTemplate {...props} content={content}>
      <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium">{header.title}</h2>
          <p className="text-gray-600 text-sm">{header.description}</p>
        </div>
      </div>
    </BaseDashboardTemplate>
  );
}
