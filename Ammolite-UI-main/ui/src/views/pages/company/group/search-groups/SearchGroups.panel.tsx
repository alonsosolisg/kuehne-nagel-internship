import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Row,
} from "reactstrap";

import { Group, GroupQuery } from "@/types/domain/group-model.type";

import { ReactTable } from "@/views/components/widgets";
import { BoxHeader } from "@/views/layout/headers";

import { SearchGroupsFilterPanel } from "../common/SearchGroupsFilter.panel";
import { GROUP_CREATE } from "../group.routes.consts";

import { groupsTableColumns } from "./SearchGroups.table";

interface Props {
  groups: Group[];
  navigateToPanel: Dispatch<SetStateAction<string>>;
  onSearchGroups: (employeeSearchRequest: Partial<GroupQuery>) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

export const SearchGroupPanel = ({
  groups,
  navigateToPanel,
  onSearchGroups,
  onDelete,
  onViewDetails,
}: Props): JSX.Element => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowSelectionsUI, setRowSelectionsUI] = useState<Record<string, boolean>>({});
  const [selectedMenu, setSelectedMenu] = useState<boolean>(false);

  const onDoWithSelected = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //only for demo purposes
    console.log(selectedIds);
    const groupSelected = selectedIds.map(id => groups.find(group => group.id === id));
    console.log(groupSelected);
  };

  const onViewGroupDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    onViewDetails(parseInt(id));
  };

  const onDeleteGroup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    onDelete(parseInt(id));
  };

  const onCreateNewGroup = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigateToPanel(GROUP_CREATE);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchGroupsFilterPanel onSearch={onSearchGroups} />
          </div>
        </Row>

        <div className="col">
          <Card>
            <CardHeader>
              <Row>
                <Col md="1.1">
                  <h3 className="mb-0">Groups</h3>
                  <p className="text-sm mb-0">Company Groups</p>
                </Col>
              </Row>
              <Row>
                <Col md="10"></Col>
                <Col md="2">
                  <FormGroup>
                    <Button
                      className="btn btn-success"
                      // color="primary"
                      size="sm"
                      onClick={onCreateNewGroup}
                    >
                      New
                    </Button>
                    <Dropdown isOpen={selectedMenu} toggle={() => setSelectedMenu(!selectedMenu)}>
                      <DropdownToggle
                        caret
                        size="sm"
                        color="secondary"
                        // className="shadow-none text-white border-0"
                      >
                        With Selected
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={onDoWithSelected}>Export as Csv</DropdownItem>
                        <DropdownItem onClick={onDoWithSelected}>Export as Excel</DropdownItem>
                        <DropdownItem onClick={onDoWithSelected}>Deactivate</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </FormGroup>
                </Col>
              </Row>
            </CardHeader>
            <ReactTable
              data={groups}
              columns={groupsTableColumns({
                onDetailsButtonClick: onViewGroupDetails,
                onRemoveButtonClick: onDeleteGroup,
              })}
              rowSelections={rowSelectionsUI}
              onRowSelectionChangeHandler={setRowSelectionsUI}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          </Card>
        </div>
      </Container>
    </>
  );
};
