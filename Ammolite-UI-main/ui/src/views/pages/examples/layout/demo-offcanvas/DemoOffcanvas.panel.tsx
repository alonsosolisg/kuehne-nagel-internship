import { useState } from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DemoOffcanvasPanel = (): JSX.Element => {
  const [isOffCanvasOpenTop, setIsOffCanvasOpenTop] = useState(false);
  const [isOffCanvasOpenStart, setIsOffCanvasOpenStart] = useState(false);
  const [isOffCanvasOpenEnd, setIsOffCanvasOpenEnd] = useState(false);
  const [isOffCanvasOpenBottom, setIsOffCanvasOpenBottom] = useState(false);

  const toggleOffcanvasTop = () => {
    setIsOffCanvasOpenTop(!isOffCanvasOpenTop);
  };

  const toggleOffcanvasStart = () => {
    setIsOffCanvasOpenStart(!isOffCanvasOpenStart);
  };

  const toggleOffcanvasEnd = () => {
    setIsOffCanvasOpenEnd(!isOffCanvasOpenEnd);
  };

  const toggleOffcanvasBottom = () => {
    setIsOffCanvasOpenBottom(!isOffCanvasOpenBottom);
  };
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Demo Offcanvas</h3>
          </CardHeader>
          <CardBody>
            <div className="d-flex justify-content-center">
              <Button color="primary" onClick={toggleOffcanvasTop} className="mb-3">
                Open Top Side
              </Button>
              <Button color="primary" onClick={toggleOffcanvasStart} className="mb-3">
                Open Left Side
              </Button>
              <Button color="primary" onClick={toggleOffcanvasEnd} className="mb-3">
                Open Right Side
              </Button>
              <Button color="primary" onClick={toggleOffcanvasBottom} className="mb-3">
                Open Bottom Side
              </Button>
              <Offcanvas
                backdrop={true}
                direction="top"
                toggle={toggleOffcanvasTop}
                isOpen={isOffCanvasOpenTop}
              >
                <OffcanvasHeader toggle={toggleOffcanvasTop}>Offcanvas</OffcanvasHeader>
                <OffcanvasBody>
                  <strong>This is the Offcanvas body.</strong>
                </OffcanvasBody>
              </Offcanvas>
            </div>
            <div>
              <Offcanvas
                backdrop={true}
                direction="start"
                toggle={toggleOffcanvasStart}
                isOpen={isOffCanvasOpenStart}
              >
                <OffcanvasHeader toggle={toggleOffcanvasStart}>Offcanvas</OffcanvasHeader>
                <OffcanvasBody>
                  <strong>This is the Offcanvas body.</strong>
                </OffcanvasBody>
              </Offcanvas>
            </div>
            <div>
              <Offcanvas
                backdrop={true}
                direction="end"
                toggle={toggleOffcanvasEnd}
                isOpen={isOffCanvasOpenEnd}
              >
                <OffcanvasHeader toggle={toggleOffcanvasEnd}>Offcanvas</OffcanvasHeader>
                <OffcanvasBody>
                  <strong>This is the Offcanvas body.</strong>
                </OffcanvasBody>
              </Offcanvas>
            </div>
            <div>
              <Offcanvas
                backdrop={true}
                direction="bottom"
                toggle={toggleOffcanvasBottom}
                isOpen={isOffCanvasOpenBottom}
              >
                <OffcanvasHeader toggle={toggleOffcanvasBottom}>Offcanvas</OffcanvasHeader>
                <OffcanvasBody>
                  <strong>This is the Offcanvas body.</strong>
                </OffcanvasBody>
              </Offcanvas>
            </div>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
