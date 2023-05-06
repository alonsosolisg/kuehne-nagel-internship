import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { VscOrganization } from "react-icons/vsc";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Collapse,
  Form,
  NavLink,
  Row,
} from "reactstrap";

import { Employee } from "@/types/domain/employee.model";
import { SelectOption } from "@/types/ui/common-ui";

import userBackgroundJpg from "@/assets/img/company/department.jpg";
import team4 from "@/assets/img/company/team-4.jpg";
import { GENDERS, SELECT_ALL } from "@/common/consts";
import { asSelectionOptions } from "@/common/utils";
import { DateField, InputField, SelectField } from "@/views/components/widgets";

import { EMPLOYEE_SEARCH } from "../employee.routes.consts";

interface Props {
  onSave: (employee: Partial<Employee>) => void;
  navigateToPanel: Dispatch<SetStateAction<string>>;
  employee: Employee;
  title?: string;
  businessUnits: SelectOption[];
  departments: SelectOption[];
  countries: SelectOption[];
  divisions: SelectOption[];
  costCenters: SelectOption[];
  jobtitles: SelectOption[];
}

const PERSONAL_INFO = "Personal Info";
const CONTACT = "Contact Data";
const COMPANY = "Company Data";
const ALL_PANELS = "ALL_PANELS";

export const EditEmployeesPanel = ({
  onSave,
  navigateToPanel,
  employee,
  title,
  departments,
  countries,
  businessUnits,
  jobtitles,
  divisions,
  costCenters,
}: Props): JSX.Element => {
  //console.log("IN EditEmployeesPanel ", employee);

  const [employeeUi, setEmployeeUi] = useState<Employee>(employee);
  const [currentPanel, setCurrentPanel] = useState<string>(PERSONAL_INFO);
  const [birthDate, setBirthDate] = useState<Date>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [businessUnitSelected, setBusinessUnitSelected] = useState<SelectOption>(SELECT_ALL);
  const [departmentSelected, setDepartmentSelected] = useState<SelectOption>(SELECT_ALL);
  const [officeSelected, setOfficeSelected] = useState<SelectOption>(SELECT_ALL);
  const [jobTitleSelected, setJobTitleSelected] = useState<SelectOption>(SELECT_ALL);
  const [countrySelected, setCountrySelected] = useState<SelectOption>(SELECT_ALL);
  const [divisionSelected, setDivisionSelected] = useState<SelectOption>(SELECT_ALL);
  const [costCenterSelected, setCostCenterSelected] = useState<SelectOption>(SELECT_ALL);

  useEffect(() => {
    setEmployeeUi(employee);
  }, [employee]);

  const onSaveUiEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(employeeUi);
  };

  const onResetUiEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave(employee);
  };

  return (
    <>
      <Row>
        {" "}
        <Col xl="12"> &nbsp; </Col>
      </Row>
      <Row>
        <Col className="order-xl-1" xl="1">
          &nbsp;
        </Col>
        <Col className="order-xl-2" xl="7">
          <Card>
            <CardHeader>
              <Row className="align-items-center">
                <Col xs="12">
                  <h3 className="mb-0">{title}</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <Collapse isOpen={currentPanel === PERSONAL_INFO || currentPanel === ALL_PANELS}>
                  <h6 className="heading-small text-muted mb-4">{PERSONAL_INFO}</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <InputField
                          id="input-first-name"
                          label="First name"
                          value={employeeUi.firstName || ""}
                          style={{ height: "36px" }}
                          className="form-control"
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col lg="6">
                        <InputField
                          id="input-last-name"
                          label="Last name"
                          value={employeeUi.lastName || ""}
                          style={{ height: "36px" }}
                          className="form-control"
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="2">
                        <DateField
                          id="birthDate"
                          label="Birth Date"
                          style={{ height: "32px" }}
                          value={birthDate}
                          setValue={setBirthDate}
                        />
                      </Col>
                      <Col md="2">
                        <SelectField
                          id="select-citizenship"
                          label="Citizenship"
                          value={countrySelected}
                          options={countries}
                          onChange={item => {
                            setCountrySelected(item as SelectOption);
                          }}
                        />
                      </Col>
                      <Col lg="2">
                        <SelectField
                          id="select-gender"
                          label="Gender"
                          value={
                            employeeUi.gender
                              ? asSelectionOptions(employeeUi.gender)
                              : asSelectionOptions("MALE")
                          }
                          options={GENDERS}
                          onChange={item => {
                            const selection = item as SelectOption;
                            setEmployeeUi({
                              ...employeeUi,
                              gender: selection.value,
                            });
                          }}
                        />
                      </Col>
                      <Col lg="6">
                        <InputField
                          id="input-id-document-code"
                          label="Id Document Code"
                          value={employeeUi.idDocumentCode || ""}
                          style={{ height: "36px" }}
                          className="form-control"
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              idDocumentCode: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </Collapse>
                <Collapse isOpen={currentPanel === CONTACT || currentPanel === ALL_PANELS}>
                  <hr className="my-3" />
                  <h6 className="heading-small text-muted mb-4">{CONTACT}</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <InputField
                          id="input-email"
                          label="Email"
                          style={{ height: "36px" }}
                          className="form-control"
                          value={employeeUi.email || ""}
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              email: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col lg="6">
                        <InputField
                          id="input-phone"
                          label="Phone"
                          style={{ height: "36px" }}
                          className="form-control"
                          value={employeeUi.companyPhone || ""}
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              companyPhone: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <InputField
                          id="input-mobile-phone"
                          label="Mobile Phone"
                          style={{ height: "36px" }}
                          className="form-control"
                          value={employeeUi.companyMobilePhone || ""}
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              companyMobilePhone: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col lg="6">
                        <InputField
                          id="input-companyCode"
                          label="Company Code"
                          style={{ height: "36px" }}
                          className="form-control"
                          value={employeeUi.companyCode || ""}
                          type="text"
                          onChange={e =>
                            setEmployeeUi({
                              ...employeeUi,
                              companyCode: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                </Collapse>
                <Collapse isOpen={currentPanel === COMPANY || currentPanel === ALL_PANELS}>
                  <hr className="my-3" />
                  <h6 className="heading-small text-muted mb-4">{COMPANY}</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="3">
                        <DateField
                          id="startDate"
                          label="Start Date"
                          style={{ height: "40px" }}
                          value={startDate}
                          setValue={setStartDate}
                        />
                      </Col>
                      <Col lg="3">
                        <DateField
                          id="endDate"
                          label="End Date"
                          style={{ height: "44px" }}
                          value={endDate}
                          setValue={setEndDate}
                        />
                      </Col>
                      <Col md="3">
                        <SelectField
                          id="select-cost-center"
                          label="Cost Center"
                          value={costCenterSelected}
                          options={costCenters}
                          onChange={item => {
                            setCostCenterSelected(item as SelectOption);
                          }}
                        />
                      </Col>

                      <Col md="3">
                        <SelectField
                          id="select-division"
                          label="Division"
                          value={divisionSelected}
                          options={divisions}
                          onChange={item => {
                            setDivisionSelected(item as SelectOption);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <SelectField
                          id="select-office"
                          label="Office"
                          value={officeSelected}
                          options={countries}
                          onChange={item => {
                            setOfficeSelected(item as SelectOption);
                          }}
                        />
                      </Col>
                      <Col md="3">
                        <SelectField
                          id="select-departments"
                          label="Department"
                          value={departmentSelected}
                          options={departments}
                          onChange={item => {
                            setDepartmentSelected(item as SelectOption);
                          }}
                        />
                      </Col>
                      <Col md="3">
                        <SelectField
                          id="select-businessUnits"
                          label="Business Unit"
                          value={businessUnitSelected}
                          options={businessUnits}
                          onChange={item => {
                            setBusinessUnitSelected(item as SelectOption);
                          }}
                        />
                      </Col>
                      <Col md="3">
                        <SelectField
                          id="select-job-titles"
                          label="Job Title"
                          value={jobTitleSelected}
                          options={jobtitles}
                          onChange={item => {
                            setJobTitleSelected(item as SelectOption);
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                </Collapse>
                <hr className="my-3" />
                <div className="pl-4 d-flex justify-content-end">
                  <Button color="primary" type="submit" onClick={onSaveUiEvent}>
                    Save
                  </Button>
                  <Button color="primary" type="submit" onClick={onResetUiEvent}>
                    Reset
                  </Button>
                </div>
              </Form>
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
                    <img alt="..." className="rounded-circle" src={team4} />
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
                  onClick={() => navigateToPanel(`${EMPLOYEE_SEARCH}`)}
                >
                  To Search
                </Button>
                <Button
                  className="btn btn-primary float-right"
                  color="primary"
                  size="sm"
                  onClick={() => {
                    currentPanel === ALL_PANELS
                      ? setCurrentPanel(PERSONAL_INFO)
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
                      <span className="heading">22</span>
                      <span className="description">Groups</span>
                    </div>
                    <div>
                      <span className="heading">Pegasus</span>
                      <span className="description">Team</span>
                    </div>
                    <div>
                      <span className="heading">6</span>
                      <span className="description">Seniority</span>
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
                      setCurrentPanel(PERSONAL_INFO);
                    }}
                  >
                    <VscOrganization size={20} color="#003369" className="mr-2" />
                    <span className="nav-link-text">Personal Info</span>
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
                      setCurrentPanel(CONTACT);
                    }}
                  >
                    <VscOrganization size={20} color="#003369" className="mr-2" />
                    <span className="nav-link-text">Contact Data</span>
                  </NavLink>
                  <NavLink
                    to="#nowhere"
                    onClick={e => {
                      e.preventDefault;
                      setCurrentPanel(COMPANY);
                    }}
                  >
                    <VscOrganization size={20} color="#003369" className="mr-2" />
                    <span className="nav-link-text">Company Data</span>
                  </NavLink>
                </Col>
                <Col xl="2">&nbsp;</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className="order-xl-4" xl="1">
          &nbsp;
        </Col>
      </Row>
    </>
  );
};
