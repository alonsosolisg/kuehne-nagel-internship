import { Category } from "./common.model";
import { Employee } from "./employee.model";

export interface Team extends Category {
  teamLead?: Employee;
  teamLeadId?: number;
  employeeIds: number[];
}
