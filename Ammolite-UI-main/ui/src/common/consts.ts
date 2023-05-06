import { SelectOption } from "./types/ui";

export const PERMISSIONS_NONE = "PERMISSIONS_NONE";
export const AUTHENTICATED = "AUTHENTICATED";

export const NO_FILTER = "";
export const SELECT_ALL = { value: NO_FILTER, label: "ALL" };
export const SELECT_ALL_IDS = (ids: number[]) => {
  return { value: `${ids}`, label: "ALL" };
};

export const GENDERS: SelectOption[] = [
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
];

export const DATE_FILTER_FORMAT = "DD/MM/YYYY";
