import { MouseEvent } from "react";

export interface IDefaultActionButtons {
  onDetailsButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onRemoveButtonClick: (e: MouseEvent<HTMLButtonElement>) => void;
}
