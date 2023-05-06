import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const CreateEmployeePanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Create New Employee" })}</>;
};
