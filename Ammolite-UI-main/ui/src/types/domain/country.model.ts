import { Category } from "./common.model";

export interface Country extends Category {
  iso2: string;
  iso3: string;
  number: string;
}
