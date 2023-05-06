import { cloneElement } from "react";

interface Props {
  children: JSX.Element;
}

export const GroupDetailsPanel = (props: Props): JSX.Element => {
  return <>{cloneElement(props.children, { title: "Group Details" })}</>;
};
