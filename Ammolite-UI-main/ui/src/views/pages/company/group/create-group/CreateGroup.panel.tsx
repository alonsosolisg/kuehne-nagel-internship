import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const CreateGroupPanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Create New Group" })}</>;
};
