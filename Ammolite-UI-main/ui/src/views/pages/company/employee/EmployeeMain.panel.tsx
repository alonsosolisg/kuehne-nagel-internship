import { useState } from "react";

import { TabContent, TabPane } from "reactstrap";

import { ApiError } from "@/types/api/common-api";
import { Employee, EmployeeQuery, emptyEmployee } from "@/types/domain/employee.model";
import { SelectOption } from "@/types/ui/common-ui";

import { businessUnitsData } from "@/__mocks/data/business-units-mocks";
import { countries } from "@/__mocks/data/countries-mocks";
import { departmentsData } from "@/__mocks/data/departments-mocks";
// import { mockEmployees } from "@/__mocks/data/employees-mocks";
import { employeeService } from "@/api";
import {
  businessUnitsDataAsSelectOptions,
  countriesDataAsSelectOptions,
  departmentDataAsSelectOptions,
  jobTitlesDataAsSelectOptions,
} from "@/common/category-utils";
import { alerts } from "@/views/components/feedback";

import { EditEmployeesPanel } from "./common/EditEmployee.panel";
import { CreateEmployeePanel } from "./create-employee/CreateEmployee.panel";
import { EmployeeDetailsPanel } from "./employee-details/EmployeeDetails.panel";
import { EMPLOYEE_CREATE, EMPLOYEE_DETAILS, EMPLOYEE_SEARCH } from "./employee.routes.consts";
import { SearchEmployeesPanel } from "./search-employees/SearchEmployees.panel";
import { JobTitle } from "@/types/domain/job-title.model";
import { jobTitleService } from "@/api/job-titles";
import { useEffect } from "react";

export const EmployeeMainPanel = (): JSX.Element => {
  const [activePanel, setActivePanel] = useState<string>(EMPLOYEE_SEARCH);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentEmployee, setCurrentEmployee] = useState<Employee>(emptyEmployee);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);

  const departments: SelectOption[] = departmentDataAsSelectOptions(departmentsData);
  const countriesData: SelectOption[] = countriesDataAsSelectOptions(countries());
  const businessUnits: SelectOption[] = businessUnitsDataAsSelectOptions(businessUnitsData);
  const jobtitles: SelectOption[] = jobTitlesDataAsSelectOptions(jobTitles);
  const divisions: SelectOption[] = [];
  const costCenters: SelectOption[] = [];

  useEffect(() => {
    findJobTitles();
  }, []);

  const findJobTitles = async () => {
    try {
      const { data } = await jobTitleService.getAllJobTitles();
      setJobTitles(data);
    } catch {
      alerts.errorAlert("Error while fetching job titles", "Attention!");
    }
  };

  const onCreateNew = async (newEmployee: Partial<Employee>) => {
    try {
      const { data } = await employeeService.createEmployee(newEmployee);
      await alerts.successAlert("Saved with success", "Success");
      data && setEmployees([...employees, data]);
      const response = await employeeService.findAllEmployees();
      setEmployees(response.data);
      return await Promise.resolve();
    } catch (error) {
      let message = "Unknown Error";
      if (error) {
        const apiError = error as ApiError;
        message = apiError.message;
      }
      alerts.errorAlert(message, "Attention!");
      return await Promise.reject(error);
    }
  };

  const onSave = async (partialEmployee: Partial<Employee>) => {
    try {
      await employeeService.updateEmployee(partialEmployee);
      await alerts.successAlert("Saved with success", "Success");
      const response = await employeeService.findAllEmployees();
      setEmployees(response.data);
      return await Promise.resolve();
    } catch (error) {
      let message = "Unknown Error";
      if (error) {
        const apiError = error as ApiError;
        message = apiError.message;
      }
      alerts.errorAlert(message, "Attention!");
      return await Promise.reject(error);
    }
  };

  const onViewEmployeeDetails = async (id: number) => {
    try {
      const { data } = await employeeService.getEmployeeById(id);
      setCurrentEmployee(data);
      setActivePanel(EMPLOYEE_DETAILS);
      return await Promise.resolve();
    } catch (error) {
      let message = "Unknown Error";
      if (error) {
        const apiError = error as ApiError;
        message = apiError.message;
      }
      alerts.errorAlert(message, "Attention!");
      return await Promise.reject(error);
    }
  };

  const onSearchEmployees = async (employeeSearchRequest: Partial<EmployeeQuery>) => {
    try {
      const { data } = await employeeService.searchEmployees(employeeSearchRequest);
      setEmployees(data);
      return await Promise.resolve();
    } catch (error) {
      let message = "Unknown Error";
      if (error) {
        const apiError = error as ApiError;
        message = apiError.message;
      }
      alerts.errorAlert(message, "Attention!");
      return await Promise.reject(error);
    }
  };

  const onDelete = async (id: number) => {
    const { isConfirmed } = await alerts.confirmActionDanger("Are you sure?");
    if (isConfirmed) {
      return await onDeleteConfirmed(id);
    } else {
      return await Promise.reject("Delete Canceled");
    }
  };

  const onDeleteConfirmed = async (id: number) => {
    try {
      await employeeService.deleteEmployee(id);
      await alerts.successAlert("Deleted with success", "Success");
      const { data } = await employeeService.findAllEmployees();
      setEmployees(data);
      return await Promise.resolve();
    } catch (error) {
      let message = "Unknown Error";
      if (error) {
        const apiError = error as ApiError;
        message = apiError.message;
      }
      alerts.errorAlert(message, "Attention!");
      return await Promise.reject(error);
    }
  };

  return (
    <>
      <TabContent activeTab={activePanel}>
        <TabPane tabId={EMPLOYEE_SEARCH}>
          <SearchEmployeesPanel
            employees={employees}
            departments={departments}
            countries={countriesData}
            businessUnits={businessUnits}
            jobtitles={jobtitles}
            navigateToPanel={setActivePanel}
            onSearchEmployees={onSearchEmployees}
            onDelete={onDelete}
            onViewDetails={onViewEmployeeDetails}
          />
        </TabPane>
        <TabPane tabId={EMPLOYEE_CREATE}>
          <CreateEmployeePanel>
            <EditEmployeesPanel
              employee={{ ...emptyEmployee }}
              onSave={onCreateNew}
              navigateToPanel={setActivePanel}
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
              jobtitles={jobtitles}
              divisions={divisions}
              costCenters={costCenters}
            />
          </CreateEmployeePanel>
        </TabPane>
        <TabPane tabId={EMPLOYEE_DETAILS}>
          <EmployeeDetailsPanel>
            <EditEmployeesPanel
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
              jobtitles={jobtitles}
              divisions={divisions}
              costCenters={costCenters}
              employee={currentEmployee}
              onSave={onSave}
              navigateToPanel={setActivePanel}
            />
          </EmployeeDetailsPanel>
        </TabPane>
      </TabContent>
    </>
  );
};
