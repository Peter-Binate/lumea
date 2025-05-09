import { Vehicle } from "@/services/api/vehicleService";
import { FilterFn } from "@tanstack/react-table";

// Column fillter
export const multiColumnFilterFn: FilterFn<Vehicle> = (row, columnId, filterValue) => {
    const searchableRowContent = 
    `${row.original.title} ${row.original.description}`.toLowerCase();
    const searchTerm = (filterValue ?? "").toLowerCase();
    return searchableRowContent.includes(searchTerm);
};

// Status filter
export const statusFilterFn: FilterFn<Vehicle> = (
    row,
    columnId,
    filterValue: string[]
) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
};