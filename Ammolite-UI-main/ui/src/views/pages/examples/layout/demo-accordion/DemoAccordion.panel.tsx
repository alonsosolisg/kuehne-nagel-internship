import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DemoAccordionPanel = (): JSX.Element => {
  const [open, setOpen] = useState("1");

  const toggle = (id: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Demo Accordion Panel</h3>
          </CardHeader>
          <CardBody>
            <div>
              {
                // reactstrap has currently an issue on Accordion.toggle https://github.com/reactstrap/reactstrap/issues/2165
                //@ts-ignore
                <Accordion id="1" open={open} toggle={toggle}>
                  <AccordionItem>
                    <AccordionHeader targetId="1">Accordion Title 1</AccordionHeader>
                    <AccordionBody accordionId="1">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis non dolore
                      est fuga nobis ipsum illum eligendi nemo iure repellat, soluta, optio minus ut
                      reiciendis voluptates enim impedit veritatis officiis.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="2">Accordion Title 2</AccordionHeader>
                    <AccordionBody accordionId="2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis non dolore
                      est fuga nobis ipsum illum eligendi nemo iure repellat, soluta, optio minus ut
                      reiciendis voluptates enim impedit veritatis officiis.
                    </AccordionBody>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionHeader targetId="3">Accordion Title 3</AccordionHeader>
                    <AccordionBody accordionId="3">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis non dolore
                      est fuga nobis ipsum illum eligendi nemo iure repellat, soluta, optio minus ut
                      reiciendis voluptates enim impedit veritatis officiis.
                    </AccordionBody>
                  </AccordionItem>
                </Accordion>
              }
            </div>
          </CardBody>
        </Card>
        <div></div>
      </Container>
    </>
  );
};
