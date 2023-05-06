import { useEffect, useState } from "react";

import { TabContent, TabPane } from "reactstrap";

import { emptyGroup, Group, GroupQuery } from "@/types/domain/group-model.type";

import { businessUnitsData } from "@/__mocks/data/business-units-mocks";
import { countries } from "@/__mocks/data/countries-mocks";
import { departmentsData } from "@/__mocks/data/departments-mocks";
import { mockGroups } from "@/__mocks/data/groups-mocks";
import {
  businessUnitsDataAsSelectOptions,
  countriesDataAsSelectOptions,
  departmentDataAsSelectOptions,
  jobTitlesDataAsSelectOptions,
} from "@/common/category-utils";
import { SelectOption } from "@/common/types/ui";

import { EditGroupPanel } from "./common/EditGroup.panel";
import { CreateGroupPanel } from "./create-group/CreateGroup.panel";
import { GroupDetailsPanel } from "./group-details/GroupDetails.panel";
import { GROUP_CREATE, GROUP_DETAILS, GROUP_SEARCH } from "./group.routes.consts";
import { SearchGroupPanel } from "./search-groups/SearchGroups.panel";
import { JobTitle } from "@/types/domain/job-title.model";
import { jobTitleService } from "@/api/job-titles";
import { alerts } from "@/views/components/feedback";

export const GroupMainPanel = (): JSX.Element => {
  const [activePanel, setActivePanel] = useState<string>(GROUP_SEARCH);
  const [currentGroup, setCurrentGroup] = useState<Group>(emptyGroup);
  const [groups, setGroups] = useState<Group[]>(mockGroups());
  const [jobTitlesData, setJobTitlesData] = useState<JobTitle[]>([]);

  const departments: SelectOption[] = departmentDataAsSelectOptions(departmentsData);
  const countriesData: SelectOption[] = countriesDataAsSelectOptions(countries());
  const businessUnits: SelectOption[] = businessUnitsDataAsSelectOptions(businessUnitsData);
  const jobtitles: SelectOption[] = jobTitlesDataAsSelectOptions(jobTitlesData);

  useEffect(() => {
    fetchAllJobTitles();
  }, []);

  const fetchAllJobTitles = async () => {
    try {
      const { data } = await jobTitleService.getAllJobTitles();
      setJobTitlesData(data);
    } catch {
      alerts.errorAlert("Error", "Error fetching job titles");
    }
  };

  const onCreateNew = async (newGroup: Partial<Group>) => {
    const newGroups = [...groups, newGroup as Group];
    setGroups(newGroups);
  };

  const onSave = async (partialGroup: Partial<Group>) => {
    const newGroups = groups.map(group =>
      group.id === partialGroup.id ? { ...group, ...partialGroup } : group
    );
    setGroups(newGroups);
  };

  const onViewGroupDetails = async (id: number) => {
    setActivePanel(GROUP_DETAILS);
    const groupFound = groups.find(group => group.id === id) || emptyGroup;
    setCurrentGroup(groupFound);
  };

  const onSearchGroups = async (groupSearchRequest: Partial<GroupQuery>) => {
    console.log(groupSearchRequest);
  };

  const onDelete = async (id: number) => {
    console.log(id);
    onDeleteConfirmed(id);
  };

  const onDeleteConfirmed = async (id: number) => {
    console.log(id);
  };

  return (
    <>
      <TabContent activeTab={activePanel}>
        <TabPane tabId={GROUP_SEARCH}>
          <SearchGroupPanel
            groups={groups}
            navigateToPanel={setActivePanel}
            onSearchGroups={onSearchGroups}
            onDelete={onDelete}
            onViewDetails={onViewGroupDetails}
          />
        </TabPane>
        <TabPane tabId={GROUP_CREATE}>
          <CreateGroupPanel>
            <EditGroupPanel
              group={{ ...emptyGroup }}
              onSave={onCreateNew}
              navigateToPanel={setActivePanel}
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
              jobtitles={jobtitles}
            />
          </CreateGroupPanel>
        </TabPane>
        <TabPane tabId={GROUP_DETAILS}>
          <GroupDetailsPanel>
            <EditGroupPanel
              group={currentGroup}
              onSave={onSave}
              navigateToPanel={setActivePanel}
              departments={departments}
              countries={countriesData}
              businessUnits={businessUnits}
              jobtitles={jobtitles}
            />
          </GroupDetailsPanel>
        </TabPane>
      </TabContent>
    </>
  );
};
