import { ColumnDef } from "@tanstack/react-table";

import { Group } from "@/types/domain/group-model.type";

import {
  ActionColumnEditDelete,
  IDefaultActionButtons,
} from "@/views/components/widgets/react-table";

export const groupsTableColumns = ({
  onDetailsButtonClick,
  onRemoveButtonClick,
}: IDefaultActionButtons): ColumnDef<Group, unknown>[] => {
  const columns: ColumnDef<Group>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: info => info.getValue(),
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: info => info.getValue(),
    },
    {
      header: "Created",
      accessorKey: "created on",
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
