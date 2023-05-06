import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const JobTitleDetailsPanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Job Title Details" })}</>;
};
