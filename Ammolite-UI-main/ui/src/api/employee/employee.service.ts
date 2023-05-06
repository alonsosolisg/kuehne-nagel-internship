import { Employee, EmployeeQuery } from "@/types/domain/employee.model";

import { httpCommon, EMPLOYEE_ROUTE } from "@/api";

const searchEmployees = (employeeSearchRequest: Partial<EmployeeQuery>) => {
  return httpCommon.get(`${EMPLOYEE_ROUTE}?${queryObjectToFilter(employeeSearchRequest)}`);
};

const findAllEmployees = () => httpCommon.get(`${EMPLOYEE_ROUTE}`);

const getEmployeeById = (id: number) => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = (partialEmployee: Partial<Employee>) => {
  const { id } = partialEmployee;
  return httpCommon.put(`${EMPLOYEE_ROUTE}/${id}`, JSON.stringify(partialEmployee));
};

const createEmployee = (newEmployee: Partial<Employee>) => {
  return httpCommon.post(`${EMPLOYEE_ROUTE}`, JSON.stringify(newEmployee));
};

const deleteEmployee = (id: number) => httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

const queryObjectToFilter = (employeeSearchRequest: Partial<EmployeeQuery>): URLSearchParams => {
  const filters = Object.assign(
    {},
    employeeSearchRequest.lastName && employeeSearchRequest.lastName !== ""
      ? { lastName: employeeSearchRequest.lastName }
      : null,
    employeeSearchRequest.businessUnitId
      ? { businessUnitId: `${employeeSearchRequest.businessUnitId}` }
      : null,
    employeeSearchRequest.departmentId
      ? { departmentId: `${employeeSearchRequest.departmentId}` }
      : null,
    employeeSearchRequest.officeCountryId
      ? { officeCountryId: `${employeeSearchRequest.officeCountryId}` }
      : null,
    employeeSearchRequest.jobTitleId ? { jobTitleId: `${employeeSearchRequest.jobTitleId}` } : null,
    employeeSearchRequest.hiredFrom ? { hiredFrom: `${employeeSearchRequest.hiredFrom}` } : null,
    employeeSearchRequest.jobTitleId ? { hiredTo: `${employeeSearchRequest.hiredTo}` } : null
  );

  return new URLSearchParams(filters);
};

export const employeeService = {
  searchEmployees,
  findAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
