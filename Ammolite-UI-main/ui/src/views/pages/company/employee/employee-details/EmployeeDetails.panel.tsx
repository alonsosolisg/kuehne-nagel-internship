import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const EmployeeDetailsPanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Employee Details" })}</>;
};
