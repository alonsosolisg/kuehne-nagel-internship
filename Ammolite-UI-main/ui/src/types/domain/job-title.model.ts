import { Category } from "./common.model";

export interface JobTitle extends Category {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date | null;
  status: boolean;
  createdBy?: string;
}

export const emptyJobTitle: JobTitle = {
  id: 0,
  name: "",
  description: "",
  startDate: new Date(),
  endDate: null,
  status: true,
  createdBy: "<CurrentUser></CurrentUser>",
};

export interface JobTitleQuery
  extends Omit<JobTitle, "name" | "description" | "members" | "memberIds"> {
  name?: string;
  username?: string;
  createdFrom?: string;
  createdTo?: string;
}
