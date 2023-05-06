import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const CreateJobTitlePanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Create New Job Title" })}</>;
};
