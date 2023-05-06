import { useEffect, useState } from "react";

import { TabContent, TabPane } from "reactstrap";

import { emptyJobTitle, JobTitle, JobTitleQuery } from "@/types/domain/job-title.model";

import { businessUnitsData } from "@/__mocks/data/business-units-mocks";
import { countries } from "@/__mocks/data/countries-mocks";
import { departmentsData } from "@/__mocks/data/departments-mocks";
import { jobTitleService } from "@/api/job-titles";
import {
  businessUnitsDataAsSelectOptions,
  countriesDataAsSelectOptions,
  departmentDataAsSelectOptions,
} from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";
import { alerts } from "@/views/components/feedback";

import { EditJobTitlePanel } from "./common/EditJobTitle.panel";
import { CreateJobTitlePanel } from "./create-job-title/CreateJobTitle.panel";
import { JobTitleDetailsPanel } from "./job-title-details/JobTitleDetails.panel";
import { JOB_TITLE_CREATE, JOB_TITLE_DETAILS, JOB_TITLE_SEARCH } from "./job-title.routes.consts";
import { SearchJobTitlePanel } from "./search-job-title/SearchJobTitle.panel";

export const JobTitleMainPanel = (): JSX.Element => {
  const [activePanel, setActivePanel] = useState<string>(JOB_TITLE_SEARCH);
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [currentJobTitle, setCurrentJobTitle] = useState<JobTitle>(emptyJobTitle);

  const departments: SelectOption[] = departmentDataAsSelectOptions(departmentsData);
  const countriesData: SelectOption[] = countriesDataAsSelectOptions(countries());
  const businessUnits: SelectOption[] = businessUnitsDataAsSelectOptions(businessUnitsData);

  useEffect(() => {
    fetchAllJobTitles();
  }, []);

  const fetchAllJobTitles = async () => {
    try {
      const { data } = await jobTitleService.getAllJobTitles();
      setJobTitles(data);
    } catch {
      alerts.errorAlert("Error", "Error fetching job titles");
    }
  };

  const onViewJobTitleDetails = async (id: number) => {
    setActivePanel(JOB_TITLE_DETAILS);
    const jobsFound = jobTitles.find(jobTitle => jobTitle.id === id) || emptyJobTitle;
    setCurrentJobTitle(jobsFound);
  };

  const onCreateNew = async (newJobTitle: Partial<JobTitle>) => {
    try {
      await jobTitleService.createJobTitle(newJobTitle as JobTitle);
      fetchAllJobTitles();
    } catch {
      alerts.errorAlert("Error", "Error creating job title");
    }
  };

  const onSave = async (jobTitle: Partial<JobTitle>) => {
    try {
      await jobTitleService.updateJobTitle(jobTitle as JobTitle);
      fetchAllJobTitles();
    } catch {
      alerts.errorAlert("Error", "Error updating job title");
    }
  };

  const onSearchJobTitles = async (jobTitleSearchRequest: Partial<JobTitleQuery>) => {
    const { data } = await jobTitleService.getAllJobTitles();
    const filteredData = data.filter((item: JobTitle) => {
      if (
        jobTitleSearchRequest.name &&
        !item.name.toLowerCase().includes(jobTitleSearchRequest.name.toLowerCase())
      ) {
        return false;
      }

      if (
        jobTitleSearchRequest.createdFrom &&
        new Date(item.startDate!).getTime() < new Date(jobTitleSearchRequest.createdFrom).getTime()
      ) {
        return false;
      }

      if (
        jobTitleSearchRequest.createdTo &&
        new Date(item.startDate!).getTime() > new Date(jobTitleSearchRequest.createdTo).getTime()
      ) {
        return false;
      }

      if (
        jobTitleSearchRequest.username &&
        !item.createdBy!.toLowerCase().includes(jobTitleSearchRequest.username.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
    setJobTitles(filteredData);
  };

  const onDelete = async (id: number) => {
    const result = await alerts.confirmActionAlert(
      "Are you sure you want to delete this job title?"
    );
    if (result.isConfirmed) {
      await onDeleteConfirmed(id);
    } else {
      return;
    }
  };

  const onDeleteConfirmed = async (id: number) => {
    try {
      await jobTitleService.deleteJobTitle(id);
      fetchAllJobTitles();
    } catch {
      alerts.errorAlert("Error", "Error deleting job title");
    }
  };

  return (
    <>
      <TabContent activeTab={activePanel}>
        <TabPane tabId={JOB_TITLE_SEARCH}>
          <SearchJobTitlePanel
            jobTitles={jobTitles}
            navigateToPanel={setActivePanel}
            onSearchJobTitles={onSearchJobTitles}
            onDelete={onDelete}
            onViewDetails={onViewJobTitleDetails}
          />
        </TabPane>
        <TabPane tabId={JOB_TITLE_CREATE}>
          <CreateJobTitlePanel>
            <EditJobTitlePanel
              jobTitle={{ ...emptyJobTitle }}
              onSave={onCreateNew}
              navigateToPanel={setActivePanel}
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
              title="Create Job Title"
            />
          </CreateJobTitlePanel>
        </TabPane>
        <TabPane tabId={JOB_TITLE_DETAILS}>
          <JobTitleDetailsPanel>
            <EditJobTitlePanel
              jobTitle={currentJobTitle}
              onSave={onSave}
              navigateToPanel={setActivePanel}
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
            />
          </JobTitleDetailsPanel>
        </TabPane>
      </TabContent>
    </>
  );
};
