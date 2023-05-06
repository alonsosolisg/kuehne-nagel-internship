import { ColumnDef } from "@tanstack/react-table";

import { Employee } from "@/types/domain/employee.model";

import {
  ActionColumnEditDelete,
  IDefaultActionButtons,
} from "@/views/components/widgets/react-table";

export const employeesTableColumns = ({
  onDetailsButtonClick,
  onRemoveButtonClick,
}: IDefaultActionButtons): ColumnDef<Employee, unknown>[] => {
  const columns: ColumnDef<Employee>[] = [
    {
      header: "First Name",
      accessorKey: "firstName",
      cell: info => info.getValue(),
    },
    {
      header: "Last Name",
      accessorKey: "lastName",
      cell: info => info.getValue(),
    },
    {
      header: "Job Title",
      accessorFn: row => (row.jobTitle ? row.jobTitle.name : ""),
      cell: info => info.getValue(),
    },
    {
      header: "Business Unit",
      accessorFn: row => (row.businessUnit ? row.businessUnit.name : ""),
      cell: info => info.getValue(),
    },
    {
      header: "Office",
      accessorFn: row => (row.office ? row.office.country : ""),
      cell: info => info.getValue(),
    },
    {
      header: "Hire Date",
      accessorKey: "startDate",
      cell: info => info.getValue(),
    },
    {
      header: "",
      accessorKey: "id",
      cell: info => ActionColumnEditDelete(info, onDetailsButtonClick, onRemoveButtonClick),
    },
  ];
  return columns;
};
