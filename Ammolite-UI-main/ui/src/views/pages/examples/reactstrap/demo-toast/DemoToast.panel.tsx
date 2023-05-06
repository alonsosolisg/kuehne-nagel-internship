import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DemoToastPanel = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Demo Toast</h3>
          </CardHeader>
          <CardBody>
            <div>
              <Button color="primary" onClick={() => setIsOpen(!isOpen)}>
                Click Me
              </Button>
              <br />
              <br />
              {isOpen && (
                <Toast>
                  <ToastHeader toggle={() => setIsOpen(!isOpen)}>Toast title</ToastHeader>
                  <ToastBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud.
                  </ToastBody>
                </Toast>
              )}
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
