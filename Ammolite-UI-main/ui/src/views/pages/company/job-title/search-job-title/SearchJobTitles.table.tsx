import { ColumnDef } from "@tanstack/react-table";

import { JobTitle } from "@/types/domain/job-title.model";

import {
  ActionColumnEditDelete,
  IDefaultActionButtons,
} from "@/views/components/widgets/react-table";

export const jobTitlesTableColumns = ({
  onDetailsButtonClick,
  onRemoveButtonClick,
}: IDefaultActionButtons): ColumnDef<JobTitle, unknown>[] => {
  const columns: ColumnDef<JobTitle>[] = [
    {
      header: "Id",
      accessorKey: "id",
      cell: info => info.getValue(),
    },
    {
      header: "Name",
      accessorKey: "name",
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
