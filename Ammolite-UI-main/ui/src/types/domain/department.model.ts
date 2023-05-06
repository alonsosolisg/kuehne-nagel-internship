import { Category } from "./common.model";
import { Employee } from "./employee.model";

export interface Department extends Category {
  manager?: Employee;
  managerId?: number;
  employeeIds?: number[];
}
