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

import { JobTitle, JobTitleQuery } from "@/types/domain/job-title.model";

import { ReactTable } from "@/views/components/widgets";
import { BoxHeader } from "@/views/layout/headers";

import { SearchJobTitlesFilterPanel } from "../common/SearchJobTitlesFilter.panel";
import { JOB_TITLE_CREATE } from "../job-title.routes.consts";

import { jobTitlesTableColumns } from "./SearchJobTitles.table";

interface Props {
  jobTitles: JobTitle[];
  navigateToPanel: Dispatch<SetStateAction<string>>;
  onSearchJobTitles: (jobTitleSearchRequest: Partial<JobTitleQuery>) => void;
  onViewDetails: (id: number) => void;
  onDelete: (id: number) => void;
}

export const SearchJobTitlePanel = ({
  navigateToPanel,
  jobTitles,
  onSearchJobTitles,
  onViewDetails,
  onDelete,
}: Props): JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<boolean>(false);
  const [rowSelectionsUI, setRowSelectionsUI] = useState<Record<string, boolean>>({});

  const onDoWithSelected = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onCreateNewJobTitle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigateToPanel(JOB_TITLE_CREATE);
  };

  const onViewJobTitleDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    onViewDetails(parseInt(id));
  };

  const onDeleteJobTitle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    onDelete(parseInt(id));
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchJobTitlesFilterPanel onSearch={onSearchJobTitles} />
          </div>
        </Row>
        <div className="col">
          <Card>
            <CardHeader>
              <Row>
                <Col md="1.1">
                  <h3 className="mb-0">Job Titles</h3>
                  <p className="text-sm mb-0">Company Job Titles</p>
                </Col>
              </Row>
              <Row>
                <Col md="10"></Col>
                <Col md="2">
                  <FormGroup>
                    <Button
                      className="btn btn-success"
                      // color="primary"
                      size="sm"
                      onClick={onCreateNewJobTitle}
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
              data={jobTitles}
              columns={jobTitlesTableColumns({
                onDetailsButtonClick: onViewJobTitleDetails,
                onRemoveButtonClick: onDeleteJobTitle,
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
