import { Card, CardBody, CardHeader, Container } from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DivisionMainPanel = (): JSX.Element => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Divisions</h3>
          </CardHeader>
          <CardBody>Divisions go here...</CardBody>
        </Card>
      </Container>
    </>
  );
};
