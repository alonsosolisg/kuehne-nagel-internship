import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { VscOrganization } from "react-icons/vsc";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavLink,
  Row,
} from "reactstrap";

import { ApiError } from "@/types/api/common-api";
import { Employee, EmployeeQuery } from "@/types/domain/employee.model";
import { Group } from "@/types/domain/group-model.type";

import { employeeService } from "@/api";
import userBackgroundJpg from "@/assets/img/company/group.jpg";
import { SelectOption } from "@/common/types/ui";
import { alerts } from "@/views/components/feedback";
import { ModalPanel } from "@/views/components/panels";
import { InputField, ReactTable } from "@/views/components/widgets";

import { SearchEmployeesFilterPanel } from "../../employee/common/SearchEmployeesFilter.panel";
import { employeesTableColumns } from "../../employee/search-employees/SearchEmployees.table";
import { GROUP_SEARCH } from "../group.routes.consts";

import smallPicture from "@/assets/img/brand/logo.png";

interface Props {
  onSave: (group: Partial<Group>) => void;
  navigateToPanel: Dispatch<SetStateAction<string>>;
  group: Group;
  title?: string;
  businessUnits: SelectOption[];
  departments: SelectOption[];
  countries: SelectOption[];
  jobtitles: SelectOption[];
}

const GROUP_INFO = "Group Info";
const EMPLOYEES = "Employees";
const SEARCH_EMPLOYEES = "Add Employees to Group";
const ALL_PANELS = "ALL_PANELS";

export const EditGroupPanel = ({
  onSave,
  navigateToPanel,
  group,
  title,
  departments,
  countries,
  businessUnits,
  jobtitles,
}: Props): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [groupUi, setGroupUi] = useState<Group>(group);
  const [currentPanel, setCurrentPanel] = useState<string>(GROUP_INFO);
  const [employeesResultset, setEmployeesResultset] = useState<Employee[]>([]);
  const [selectedEmployeesIds, setSelectedEmployeesIds] = useState<number[]>([]);
  const [employeesRowSelectionsUI, setEmployeesRowSelectionsUI] = useState<Record<string, boolean>>(
    {}
  );

  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [memberRowSelectionsUI, setMemberRowSelectionsUI] = useState<Record<string, boolean>>({});

  const [selectedMenu, setSelectedMenu] = useState<boolean>(false);

  useEffect(() => {
    setGroupUi(group);
  }, [group]);

  const onSaveUiEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedEmployeesIds([]);
    setEmployeesResultset([]);
    setEmployeesRowSelectionsUI({});
    onSave(groupUi);
  };

  const onResetUiEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(group);
  };

  const onSearchEmployees = async (employeeSearchRequest: Partial<EmployeeQuery>) => {
    try {
      const { data } = await employeeService.searchEmployees(employeeSearchRequest);
      setEmployeesResultset(data);
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

  const onAddEmployeesToGroup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const selectedEmployees: Employee[] = employeesResultset.filter(employee =>
      selectedEmployeesIds.includes(employee.id)
    );

    const newGroup = {
      ...group,
      employeeIds: [...group.employeeIds, ...selectedEmployeesIds],
      employees: [...group.employees, ...selectedEmployees],
    };
    await alerts.successAlert("Employees added with success");
    setGroupUi(newGroup);
    setSelectedEmployeesIds([]);
    setEmployeesResultset([]);
    setEmployeesRowSelectionsUI({});
    onSave(newGroup);
  };

  const onAddNewEmployeeClick = () => {
    setOpenModal(true);
  };

  const onModalClose = () => {
    setOpenModal(false);
  };

  const onDoWithSelected = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
                                  onAddEmployeesToGroup(e);
                                }}
                              >
                                Add Selected
                              </Button>
                            </Col>
                          </Row>
                        </CardHeader>
                        <ReactTable
                          data={employeesResultset}
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
        <Col xl="12"> &nbsp; </Col>
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
              <Collapse isOpen={currentPanel === GROUP_INFO || currentPanel === ALL_PANELS}>
                <h6 className="heading-small text-muted mb-4">{GROUP_INFO}</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <InputField
                        id="input-group-name"
                        label="Group name"
                        value={groupUi.name || ""}
                        style={{ height: "36px" }}
                        className="form-control"
                        type="text"
                        onChange={e =>
                          setGroupUi({
                            ...groupUi,
                            name: e.target.value,
                          })
                        }
                      />
                    </Col>
                    <Col lg="6">
                      <InputField
                        id="input-group-description"
                        label="Description"
                        value={groupUi.description || ""}
                        style={{ height: "36px" }}
                        className="form-control"
                        type="text"
                        onChange={e =>
                          setGroupUi({
                            ...groupUi,
                            description: e.target.value,
                          })
                        }
                      />
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
                                            <DropdownItem onClick={onDoWithSelected}>
                                              Deactivate
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
                              data={groupUi.employees}
                              columns={employeesTableColumns({
                                onDetailsButtonClick: () => {
                                  console.log("on detail button click from edit group panel");
                                },
                                onRemoveButtonClick: () => {
                                  console.log("on remove button click from edit group panel");
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
                <Button color="primary" type="submit" onClick={onSaveUiEvent}>
                  Save
                </Button>
                <Button color="primary" type="submit" onClick={onResetUiEvent}>
                  Reset
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-3" xl="3">
          <Card className="card-profile">
            <CardImg alt="..." src={userBackgroundJpg} top />
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
                  onClick={() => navigateToPanel(`${GROUP_SEARCH}`)}
                >
                  To Search
                </Button>
                <Button
                  className="btn btn-primary float-right"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    currentPanel === ALL_PANELS
                      ? setCurrentPanel(GROUP_INFO)
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
                      <span className="heading">10</span>
                      <span className="description">Members</span>
                    </div>
                    <div>
                      <span className="heading">{groupUi.name || "TBC"}</span>
                      <span className="description">Group Name</span>
                    </div>
                    <div>
                      <span className="heading">6</span>
                      <span className="description">Months</span>
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
                      setCurrentPanel(GROUP_INFO);
                    }}
                  >
                    <VscOrganization size={20} color="#003369" className="mr-2" />
                    <span className="nav-link-text">Group Info</span>
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
                    <VscOrganization size={20} color="#003369" className="mr-2" />
                    <span className="nav-link-text">Employees</span>
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
