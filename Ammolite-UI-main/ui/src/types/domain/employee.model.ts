import { BusinessUnit } from "@/types/domain/business-unit.model";
import { Group } from "@/types/domain/group-model.type";
import { Office } from "@/types/domain/office.model";

import { Domain } from "./common.model";
import { Country } from "./country.model";
import { Department } from "./department.model";
import { JobTitle } from "./job-title.model";

export interface Employee extends Domain {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idDocumentCode: string;
  citizenship?: Country;
  birthDate: string;
  gender: string;
  startDate: string;
  endDate?: string | null;
  costCenter: string;
  companyPhone: string;
  companyMobilePhone: string;
  companyCode: string;
  businessUnit?: BusinessUnit;
  department?: Department;
  manager?: Employee;
  office?: Office;
  jobTitle?: JobTitle;
  groups: Group[];
}

export interface EmployeeQuery
  extends Omit<
    Employee,
    | "firstName"
    | "lastName"
    | "companyPhone"
    | "companyMobilePhone"
    | "companyMobilePhone"
    | "gender"
    | "businessUnit"
    | "office"
    | "groups"
  > {
  lastName?: string;
  businessUnitId?: number;
  departmentId?: number;
  officeCountryId?: number;
  jobTitleId?: number;
  hiredFrom?: string;
  hiredTo?: string;
}

export const emptyEmployee: Employee = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  idDocumentCode: "",
  gender: "",
  startDate: "",
  costCenter: "",
  companyPhone: "",
  companyMobilePhone: "",
  companyCode: "",
  groups: [],
};
