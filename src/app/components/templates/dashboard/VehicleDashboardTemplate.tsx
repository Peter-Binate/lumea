'use client';

import { VehicleTable } from '@/app/components/ui/Table/VehicleTable';
import {
  DASHBOARD_HEADERS_CONFIG,
  VehicleDashboardProps,
} from '@/types/dashboard';
import BaseDashboardTemplate from './BaseDashboardTemplate';

export default function VehicleDashboardTemplate(props: VehicleDashboardProps) {
  const { data, onDelete, onEdit, onView, children } = props;
  const header = DASHBOARD_HEADERS_CONFIG.vehicle;

  // const content =
  //   data.length === 0 ? (
  //     <EmptyState />
  //   ) : (
  //     <VehicleTable
  //       data={data}
  //       onDelete={onDelete}
  //       onEdit={onEdit}
  //       onView={onView}
  //     />
  //   );

  const content =
  <VehicleTable
    data={data}
    onDelete={onDelete}
    onEdit={onEdit}
    onView={onView}
  />;

  return (
    <BaseDashboardTemplate {...props} content={content}>
      <div className="flex flex-col md:flex-row md:justify-between py-5 px-6">
        <div className="flex flex-col">
          {/* <h2 className="text-lg font-medium">{header.title}</h2> */}
          <h2 className="text-lg font-medium">title</h2>
          {/* <p className="text-gray-600 text-sm">{header.description}</p> */}
          <p className="text-gray-600 text-sm">header description</p>
        </div>
        {children}
      </div>
    </BaseDashboardTemplate>
  );
}
