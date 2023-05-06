import { useState } from "react";

import { Col, Form, Row } from "reactstrap";

import { JobTitleQuery } from "@/types/domain/job-title.model";

import { updateFilterWithCurrentDate } from "@/common/utils";
import { FilterPanel } from "@/views/components/panels";
import { DateField, InputField } from "@/views/components/widgets";

interface Props {
  onSearch: (jobTitleSearchRequest: Partial<JobTitleQuery>) => void;
}

export const SearchJobTitlesFilterPanel = ({ onSearch }: Props): JSX.Element => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>("");
  const [searchCreationDateFrom, setSearchCreationDateFrom] = useState<Date>();
  const [searchCreationDateTo, setSearchCreationDateTo] = useState<Date>();
  const [searchCreatorLastName, setSearchCreatorLastName] = useState<string>("");

  const resetFilters = () => {
    setSearchName("");
    setSearchCreatorLastName("");
    setSearchCreationDateFrom(undefined);
    setSearchCreationDateTo(undefined);
  };

  const search = () => {
    const filters = parametersToFilter();
    setSubmitting(true);
    onSearch(filters);
  };

  const parametersToFilter = (): Partial<JobTitleQuery> => {
    const queryJobTitleFilters: Partial<JobTitleQuery> = {};
    if (searchName) {
      queryJobTitleFilters.name = searchName;
    }
    if (searchCreatorLastName) {
      queryJobTitleFilters.username = searchCreatorLastName;
    }
    updateFilterWithCurrentDate(searchCreationDateFrom, queryJobTitleFilters, "createdFrom");
    updateFilterWithCurrentDate(searchCreationDateTo, queryJobTitleFilters, "createdTo");
    return queryJobTitleFilters;
  };

  return (
    <>
      <Form>
        <FilterPanel
          title="Search Job Titles"
          resetFilters={resetFilters}
          isSubmitting={isSubmitting}
          onSearch={search}
        >
          <Row>
            <Col md="3">
              <InputField
                id="input-job-title-name"
                label="Name"
                style={{ height: "36px" }}
                className="form-control"
                value={searchName}
                placeholder="First Name"
                type="text"
                onChange={e => setSearchName(e.target.value)}
              />
            </Col>
            <Col md="3">
              <DateField
                id="date-created-from"
                label="Created From"
                style={{ height: "32px" }}
                value={searchCreationDateFrom}
                setValue={setSearchCreationDateFrom}
              />
            </Col>
            <Col md="3">
              <DateField
                id="date-created-to"
                label="Created To"
                style={{ height: "32px" }}
                value={searchCreationDateTo}
                setValue={setSearchCreationDateTo}
              />
            </Col>
            <Col md="3">
              <InputField
                id="input-creator-last-name"
                label="Created By"
                style={{ height: "36px" }}
                className="form-control"
                value={searchCreatorLastName}
                placeholder="Creator Last Name"
                type="text"
                onChange={e => setSearchCreatorLastName(e.target.value)}
              />
            </Col>
          </Row>
        </FilterPanel>
      </Form>
    </>
  );
};
