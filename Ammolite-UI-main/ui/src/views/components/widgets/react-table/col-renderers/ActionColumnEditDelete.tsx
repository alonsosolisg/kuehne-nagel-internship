import { CellContext } from "@tanstack/react-table";
import { MouseEvent } from "react";

import { Button, ButtonGroup } from "reactstrap";

export const ActionColumnEditDelete = <T extends { id: number }>(
  info: CellContext<T, unknown>,
  onDetailsButtonClick: (e: MouseEvent<HTMLButtonElement>) => void,
  onRemoveButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
) => {
  if (!info.getValue()) return <></>;
  const id = info.row.original.id.toString();

  return (
    <div className="table-action-button-group">
      <ButtonGroup aria-label="Basic example" role="group">
        <Button
          id={id}
          size="sm"
          className="btn-icon m-1"
          type="button"
          color="info"
          onClick={onDetailsButtonClick}
          data-testid="detailButton"
        >
          <span id={id} className="btn-inner--icon">
            <i id={id} className="ni ni-badge" />
          </span>
        </Button>
        <Button
          id={id}
          size="sm"
          name={`${info.row.index}`}
          className="btn-icon m-1"
          color="danger"
          type="button"
          onClick={onRemoveButtonClick}
          data-testid="removeButton"
        >
          <span id={id} className="btn-inner--icon">
            <i id={id} className="ni ni-fat-remove" />
          </span>
        </Button>
      </ButtonGroup>
    </div>
  );
};
