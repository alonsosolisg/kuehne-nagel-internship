import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Row,
} from "reactstrap";

import { Employee, EmployeeQuery } from "@/types/domain/employee.model";
import { SelectOption } from "@/types/ui/common-ui";

import { ReactTable } from "@/views/components/widgets";
import { onItemRemovedFromSelection } from "@/views/components/widgets/react-table/table-utils";
import { BoxHeader } from "@/views/layout/headers";

import { SearchEmployeesFilterPanel } from "../common/SearchEmployeesFilter.panel";
import { EMPLOYEE_CREATE } from "../employee.routes.consts";

import { employeesTableColumns } from "./SearchEmployees.table";

interface Props {
  employees: Employee[];
  departments: SelectOption[];
  countries: SelectOption[];
  businessUnits: SelectOption[];
  jobtitles: SelectOption[];
  navigateToPanel: Dispatch<SetStateAction<string>>;
  onSearchEmployees: (employeeSearchRequest: Partial<EmployeeQuery>) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export const SearchEmployeesPanel = ({
  employees,
  departments,
  countries,
  businessUnits,
  jobtitles,
  navigateToPanel,
  onSearchEmployees,
  onDelete,
  onViewDetails,
}: Props): JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowSelectionsUI, setRowSelectionsUI] = useState<Record<string, boolean>>({});
  const [selectedMenu, setSelectedMenu] = useState<boolean>(false);

  const onViewEmployeeDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    onViewDetails(parseInt(id));
  };

  const onDeleteEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id, name } = e.currentTarget;
    const empIdAsInt = parseInt(id);
    const rowIndex = parseInt(name);
    try {
      await onDelete(empIdAsInt);
      setSelectedIds(selectedIds.filter(empId => empId !== empIdAsInt));
      setRowSelectionsUI(onItemRemovedFromSelection(rowSelectionsUI, rowIndex));
    } catch (err) {
      //silently discard cancel operation
    }
  };

  const onCreateNewEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigateToPanel(EMPLOYEE_CREATE);
  };

  const onDoWithSelected = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //only for demo purposes
    console.log(selectedIds);
    const employeesSelected = selectedIds.map(id => employees.find(employee => employee.id === id));
    console.log(employeesSelected);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchEmployeesFilterPanel
              departments={departments}
              businessUnits={businessUnits}
              countries={countries}
              jobtitles={jobtitles}
              onSearch={onSearchEmployees}
            />
          </div>
        </Row>

        <div className="col">
          <Card>
            <CardHeader>
              <Row>
                <Col md="1.1">
                  <h3 className="mb-0">Employees</h3>
                  <p className="text-sm mb-0">Employees from PDM</p>
                </Col>
              </Row>
              <Row>
                <Col md="10"></Col>
                <Col md="2">
                  <FormGroup>
                    <Button
                      className="btn btn-success"
                      color="primary"
                      size="sm"
                      onClick={onCreateNewEmployee}
                    >
                      New
                    </Button>
                    <Dropdown isOpen={selectedMenu} toggle={() => setSelectedMenu(!selectedMenu)}>
                      <DropdownToggle
                        caret
                        size="sm"
                        color="secondary"
                        // className="shadow-none text-white border-0"
                      >
                        With Selected
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={onDoWithSelected}>Export as Csv</DropdownItem>
                        <DropdownItem onClick={onDoWithSelected}>Export as Excel</DropdownItem>
                        <DropdownItem onClick={onDoWithSelected}>Deactivate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                </Col>
              </Row>
            </CardHeader>
            <ReactTable
              data={employees}
              columns={employeesTableColumns({
                onDetailsButtonClick: onViewEmployeeDetails,
                onRemoveButtonClick: onDeleteEmployee,
              })}
              rowSelections={rowSelectionsUI}
              onRowSelectionChangeHandler={setRowSelectionsUI}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </Card>
        </div>
      </Container>
    </>
  );
};
