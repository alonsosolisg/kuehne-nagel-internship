import { Employee } from "@/types/domain/employee.model";

import { Category } from "./common.model";

export interface Group extends Category {
  description: string;
  active: boolean | null;
  employees: Employee[];
  employeeIds: number[];
}

export const emptyGroup: Group = {
  id: 0,
  name: "",
  description: "",
  active: null,
  employees: [],
  employeeIds: [],
};

export interface GroupQuery extends Omit<Group, "name" | "description" | "members" | "memberIds"> {
  name?: string;
  creatorLastName?: string;
  createdFrom?: string;
  createdTo?: string;
}
