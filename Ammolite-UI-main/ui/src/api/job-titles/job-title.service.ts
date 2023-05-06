import { JobTitle } from "@/types/domain/job-title.model";

import { JOB_TITLE_ROUTE } from "../api-routes";
import { httpCommon } from "../http-client";

const getAllJobTitles = () => httpCommon.get(`${JOB_TITLE_ROUTE}`);

const createJobTitle = (newJobTitle: Partial<JobTitle>) => {
  return httpCommon.post(`${JOB_TITLE_ROUTE}`, JSON.stringify(newJobTitle));
};

const updateJobTitle = (jobTitle: JobTitle) => {
  return httpCommon.put(`${JOB_TITLE_ROUTE}/${jobTitle.id}`, JSON.stringify(jobTitle));
};

const deleteJobTitle = (jobTitleId: number) => {
  return httpCommon.delete(`${JOB_TITLE_ROUTE}/${jobTitleId}`);
};

export const jobTitleService = {
  getAllJobTitles,
  createJobTitle,
  updateJobTitle,
  deleteJobTitle,
};
