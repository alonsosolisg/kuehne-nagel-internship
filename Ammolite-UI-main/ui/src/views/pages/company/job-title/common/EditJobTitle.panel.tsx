import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { VscOrganization } from "react-icons/vsc";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  NavLink,
  Row,
} from "reactstrap";

import { Employee } from "@/types/domain/employee.model";
import { JobTitle, emptyJobTitle } from "@/types/domain/job-title.model";

import { employeeService } from "@/api";
import smallPicture from "@/assets/img/brand/KNITS.png";
import { SelectOption } from "@/common/types/ui";
import { alerts } from "@/views/components/feedback";
import { ModalPanel } from "@/views/components/panels";
import { InputField, ReactTable } from "@/views/components/widgets";

import { employeesTableColumns } from "../../employee/search-employees/SearchEmployees.table";
import { JOB_TITLE_SEARCH } from "../job-title.routes.consts";

interface Props {
  onSave: (jobTitle: Partial<JobTitle>) => void;
  navigateToPanel: Dispatch<SetStateAction<string>>;
  jobTitle: JobTitle;
  title?: string;
  businessUnits: SelectOption[];
  departments: SelectOption[];
  countries: SelectOption[];
}

const JOB_TITLE_INFO = "Job Title Info";
const EMPLOYEES = "Employees";
const SEARCH_EMPLOYEES = "Add Employees to Group";
const ALL_PANELS = "ALL_PANELS";

export const EditJobTitlePanel = ({
  onSave,
  navigateToPanel,
  jobTitle,
  title,
}: Props): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [jobTitleUi, setJobTitleUi] = useState<JobTitle>(jobTitle);
  const [currentPanel, setCurrentPanel] = useState<string>(JOB_TITLE_INFO);
  const [selectedMenu, setSelectedMenu] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [currentJobEmployees, setCurrentJobEmployees] = useState<Employee[]>([]);
  const [currentJobExcludedEmployees, setCurrentJobExcludedEmployees] = useState<Employee[]>([]);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState<number[]>([]);
  const [employeesRowSelectionsUI, setEmployeesRowSelectionsUI] = useState<Record<string, boolean>>(
    {}
  );

  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [memberRowSelectionsUI, setMemberRowSelectionsUI] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setJobTitleUi(jobTitle);
  }, [jobTitle]);

  useEffect(() => {
    searchEmployees();
  }, [jobTitle]);

  const searchEmployees = async () => {
    const employees = (await employeeService.findAllEmployees()).data;
    setEmployeeList(employees);
    setCurrentJobEmployees(employees.filter((e: Employee) => e.jobTitle?.name === jobTitle.name));
    setCurrentJobExcludedEmployees(
      employees.filter((e: Employee) => e.jobTitle?.name !== jobTitle.name)
    );
  };

  const onSaveUiEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(jobTitleUi);
    alerts.successAlert("Employees saved with success");
    navigateToPanel(JOB_TITLE_SEARCH);
  };

  const onResetUiEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(jobTitle);
  };

  const onDoWithSelected = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onAddNewEmployeeClick = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const onAddEmployeesToJobTitle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedEmployees: Employee[] = employeeList.filter(employee =>
      selectedEmployeesIds.includes(employee.id)
    );

    const editedEmployees = selectedEmployees.map((employee: Employee) => {
      employee.jobTitle = jobTitleUi;
      return employee;
    });
    editedEmployees.map(async employee => {
      await employeeService.updateEmployee(employee);
    });

    await alerts.successAlert("Employees modified with success").then(() => {
      searchEmployees();
      setOpenModal(false);
    });
  };

  const onRemoveEmployeesFromJobTitle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedEmployees: Employee[] = employeeList.filter(employee =>
      selectedMemberIds.includes(employee.id)
    );

    const editedEmployees = selectedEmployees.map((employee: Employee) => {
      employee.jobTitle = emptyJobTitle;
      return employee;
    });
    editedEmployees.map(async employee => {
      await employeeService.updateEmployee(employee);
    });

    await alerts.successAlert("Employees modified with success").then(() => {
      searchEmployees();
      setOpenModal(false);
    });
  };

  const onRemoveEmployeeFromJobTitle = async (id: number) => {
    const employee = employeeList.find(employee => employee.id === id);
    if (employee) {
      employee.jobTitle = emptyJobTitle;
      await employeeService.updateEmployee(employee);
    }
    await alerts.successAlert("Employee modified with success").then(() => {
      searchEmployees();
      setOpenModal(false);
    });
  };

  const handleToggleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setJobTitleUi({ ...jobTitleUi, status: checked });
  };

  return (
    <>
      {openModal && (
        <ModalPanel isOpen={openModal} onClose={onModalClose}>
          <>
            {currentPanel === ALL_PANELS && <hr className="my-3" />}
            <h6 className="heading-small text-muted mb-4">{SEARCH_EMPLOYEES}</h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <Row>
                    {" "}
                    <div className="col">
                      <Card>
                        <CardHeader>
                          <Row>
                            <Col md="1.1">
                              <h3 className="mb-0">Employees</h3>
                              <p className="text-sm mb-0">Employees from EDM</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="10"></Col>
                            <Col md="2">
                              <Button
                                className="btn btn-success"
                                size="sm"
                                type="submit"
                                onClick={e => {
                                  onAddEmployeesToJobTitle(e);
                                }}
                              >
                                Add Selected
                              </Button>
                            </Col>
                          </Row>
                        </CardHeader>
                        <ReactTable
                          data={currentJobExcludedEmployees}
                          columns={employeesTableColumns({
                            onDetailsButtonClick: () => {
                              console.log("on detail button click from edit group panel");
                            },
                            onRemoveButtonClick: () => {
                              console.log("on remove button click from edit group panel");
                            },
                          })}
                          rowSelections={employeesRowSelectionsUI}
                          onRowSelectionChangeHandler={setEmployeesRowSelectionsUI}
                          selectedIds={selectedEmployeesIds}
                          setSelectedIds={setSelectedEmployeesIds}
                        />
                      </Card>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </>
        </ModalPanel>
      )}
      <Row>
        {" "}
        <Col xl="12" className="pt-5"></Col>
      </Row>
      <Row>
        <Col className="order-xl-2" xl="8">
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="12">
                  <h3 className="mb-0">{title}</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Collapse isOpen={currentPanel === JOB_TITLE_INFO || currentPanel === ALL_PANELS}>
                <h6 className="heading-small text-muted mb-4">{JOB_TITLE_INFO}</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <InputField
                        id="input-job-title-name"
                        label="Job title name"
                        value={jobTitleUi.name || ""}
                        style={{ height: "36px" }}
                        className={
                          jobTitleUi.name === "" ? "form-control is-invalid" : "form-control"
                        }
                        type="text"
                        onChange={e =>
                          setJobTitleUi({
                            ...jobTitleUi,
                            name: e.target.value,
                          })
                        }
                      />
                      {jobTitleUi.name === "" && (
                        <div>
                          <div className="invalid-feedback"></div>
                          <div className="text-danger text-sm">Job title name is required</div>
                        </div>
                      )}
                    </Col>
                    <Col lg="6">
                      <InputField
                        id="input-job-title-description"
                        label="Description"
                        value={jobTitleUi.description || ""}
                        style={{ height: "36px" }}
                        className="form-control"
                        type="text"
                        onChange={e =>
                          setJobTitleUi({
                            ...jobTitleUi,
                            description: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <Label for="job-title-status">Active:</Label>
                      <Input
                        type="checkbox"
                        checked={jobTitleUi.status === true}
                        name="status"
                        id="input-job-title-status"
                        className="ml-2"
                        onChange={handleToggleChange}
                      ></Input>
                    </Col>
                  </Row>
                </div>
              </Collapse>
              <Collapse isOpen={currentPanel === EMPLOYEES || currentPanel === ALL_PANELS}>
                {currentPanel === ALL_PANELS && <hr className="my-3" />}
                <h6 className="heading-small text-muted mb-4">{EMPLOYEES}</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="12">
                      <Row>
                        {" "}
                        <div className="col">
                          <Card>
                            <CardHeader>
                              <Row>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                  }}
                                >
                                  <div>
                                    <Col md="1.1">
                                      <h3 className="mb-0">{EMPLOYEES}</h3>
                                      <p className="text-sm mb-0">Employees</p>
                                    </Col>
                                  </div>
                                  <div>
                                    <Col
                                      sm="1"
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "0",
                                      }}
                                    >
                                      <ButtonGroup aria-label="Basic example" role="group">
                                        <Button
                                          className="btn btn-success"
                                          size="sm"
                                          onClick={onAddNewEmployeeClick}
                                        >
                                          New
                                        </Button>
                                        <Dropdown
                                          isOpen={selectedMenu}
                                          toggle={() => setSelectedMenu(!selectedMenu)}
                                        >
                                          <DropdownToggle caret size="sm" color="secondary">
                                            With Selected
                                          </DropdownToggle>
                                          <DropdownMenu>
                                            <DropdownItem onClick={onDoWithSelected}>
                                              Export as Csv
                                            </DropdownItem>
                                            <DropdownItem onClick={onDoWithSelected}>
                                              Export as Excel
                                            </DropdownItem>
                                            <DropdownItem onClick={onRemoveEmployeesFromJobTitle}>
                                              Remove from Job Title
                                            </DropdownItem>
                                          </DropdownMenu>
                                        </Dropdown>
                                      </ButtonGroup>
                                    </Col>
                                  </div>
                                </div>
                              </Row>
                            </CardHeader>
                            <ReactTable
                              data={currentJobEmployees}
                              columns={employeesTableColumns({
                                onDetailsButtonClick: () => {
                                  console.log("on detail button click from edit group panel");
                                },
                                onRemoveButtonClick: (e: MouseEvent<HTMLButtonElement>) => {
                                  const { id } = e.currentTarget;
                                  onRemoveEmployeeFromJobTitle(Number(id));
                                },
                              })}
                              rowSelections={memberRowSelectionsUI}
                              onRowSelectionChangeHandler={setMemberRowSelectionsUI}
                              selectedIds={selectedMemberIds}
                              setSelectedIds={setSelectedMemberIds}
                            />
                          </Card>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Collapse>
              {currentPanel === ALL_PANELS && <hr className="my-3" />}
              <div className="pl-4 d-flex justify-content-end">
                <Button
                  color="primary"
                  type="submit"
                  disabled={jobTitleUi.name === ""}
                  onClick={onSaveUiEvent}
                >
                  Save
                </Button>
                <Button color="primary" type="submit" onClick={onResetUiEvent}>
                  Reset
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-3" xl="4">
          <Card className="card-profile">
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img alt="..." className="rounded-circle" src={smallPicture} />
                  </a>
                </div>
              </Col>
            </Row>
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                <Button
                  className="btn btn-primary"
                  color="primary"
                  size="sm"
                  onClick={() => navigateToPanel(`${JOB_TITLE_SEARCH}`)}
                >
                  To Search
                </Button>
                <Button
                  className="btn btn-primary float-right"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    currentPanel === ALL_PANELS
                      ? setCurrentPanel(JOB_TITLE_INFO)
                      : setCurrentPanel(ALL_PANELS);
                  }}
                >
                  {" Open/Close "}
                </Button>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <div>
                      <span className="heading">{currentJobEmployees.length}</span>
                      <span className="description">Employees</span>
                    </div>
                    <div>
                      <span className="heading">{jobTitleUi.name || "TBC"}</span>
                      <span className="description">Job Name</span>
                    </div>
                    <div>
                      <span className="heading">
                        {Math.round(
                          (new Date().getTime() - new Date(jobTitle.startDate!).getTime()) /
                            (30.44 * 24 * 60 * 60 * 1000)
                        ) === 0
                          ? Math.round(
                              (new Date().getTime() - new Date(jobTitle.startDate!).getTime()) /
                                (24 * 60 * 60 * 1000)
                            )
                          : Math.round(
                              (new Date().getTime() - new Date(jobTitle.startDate!).getTime()) /
                                (30.44 * 24 * 60 * 60 * 1000)
                            )}
                      </span>
                      <span className="description">
                        {Math.round(
                          (new Date().getTime() - new Date(jobTitle.startDate!).getTime()) /
                            (30.44 * 24 * 60 * 60 * 1000)
                        ) === 0
                          ? "Days Ago"
                          : "Months Ago"}
                      </span>
                    </div>
                  </div>
                </div>
              </Row>
              <Row>
                <Col xl="2">&nbsp;</Col>
                <Col xl="8">
                  <NavLink
                    to="#nowhere"
                    onClick={e => {
                      e.preventDefault;
                      setCurrentPanel(JOB_TITLE_INFO);
                    }}
                  >
                    <VscOrganization
                      size={20}
                      color="#003369"
                      className="mr-2"
                      style={{ cursor: "pointer" }}
                    />
                    <span className="nav-link-text" style={{ cursor: "pointer" }}>
                      Job Info
                    </span>
                  </NavLink>
                </Col>
                <Col xl="2">&nbsp;</Col>
              </Row>
              <Row>
                <Col xl="2">&nbsp;</Col>
                <Col xl="8">
                  <NavLink
                    to="#nowhere"
                    onClick={e => {
                      e.preventDefault;
                      setCurrentPanel(EMPLOYEES);
                    }}
                  >
                    <VscOrganization
                      size={20}
                      color="#003369"
                      className="mr-2"
                      style={{ cursor: "pointer" }}
                    />
                    <span className="nav-link-text" style={{ cursor: "pointer" }}>
                      Employees
                    </span>
                  </NavLink>
                </Col>
                <Col xl="2">&nbsp;</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
