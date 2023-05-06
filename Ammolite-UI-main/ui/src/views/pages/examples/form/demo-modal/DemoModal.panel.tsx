import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DemoModalPanel = (): JSX.Element => {
  const [modal, setModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [backdropModal, setBackdropModal] = useState(false);
  const [delayModal, setDelayModal] = useState(false);
  const [unmountModal, setUnmountModal] = useState(false);
  const [externalModal, setExternalModal] = useState(false);
  const [fadeModal, setFadeModal] = useState(false);
  const [fullview, setFullview] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [innerModal, setInnerModal] = useState(false);

  const [keyboard, setKeyboard] = useState(true);
  const [staticBackdrop, setStaticBackdrop] = useState("");
  const [backdrop, setBackdrop] = useState(true);
  const [windowDelay, setWindowDelay] = useState(1);
  const [backdropDelay, setBackdropDelay] = useState(3);
  const [unmount, setUnmount] = useState(false);
  const [focus, setFocus] = useState(true);

  const closeBtn = (
    <button className="close" onClick={() => setCloseModal(!closeModal)} type="button">
      &times;
    </button>
  );

  const externalCloseBtn = (
    <button
      type="button"
      className="close"
      style={{ position: "absolute", top: "15px", right: "15px" }}
      onClick={() => setExternalModal(false)}
    >
      &times;
    </button>
  );

  const changeKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyboard(e.currentTarget.checked);
  };

  const changeStatic = () => {
    setStaticBackdrop(staticBackdrop === "" ? "static" : "");
  };

  const changeBackdrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackdrop(e.target.value === "True");
  };

  const changeUnmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnmount(e.target.value === "True");
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Simple Modal</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="4">
              Pressing the button will open the Modal Window. Try it out!
            </Label>
            <Col md="2">
              <Button color="success" onClick={() => setModal(!modal)}>
                Click Me
              </Button>
            </Col>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
              <ModalHeader>Here goes the Modal title...</ModalHeader>
              <ModalBody>
                Here goes the Modal Window text. While this is open all other page content is
                deactivated. Modals are mainly used for performing a necessary action or inform the
                user.
              </ModalBody>
              <ModalFooter>
                <Button color="info" onClick={() => setModal(!modal)}>
                  Got it
                </Button>{" "}
                <Button color="secondary" onClick={() => setModal(!modal)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Additional options to close Modal Window</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-3" md="4">
              Press the button to find out.
            </Label>
            <Form onSubmit={e => e.preventDefault()}>
              <FormGroup className="mb-3 ml-3" check>
                <Label check>
                  <Input type="checkbox" checked={keyboard} onChange={changeKeyboard} /> Keyboard
                </Label>
              </FormGroup>
              <FormGroup className="mb-5 ml-3" check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={staticBackdrop === "static"}
                    onChange={changeStatic}
                  />{" "}
                  Static Backdrop
                </Label>
              </FormGroup>
            </Form>
            <Col md="2">
              <Button color="success" onClick={() => setCloseModal(!closeModal)}>
                Click Me
              </Button>
            </Col>
            <Modal
              isOpen={closeModal}
              toggle={() => setCloseModal(!closeModal)}
              keyboard={keyboard}
              backdrop={staticBackdrop === "static" ? staticBackdrop : true}
            >
              <ModalHeader close={closeBtn}>Closing Modal Window</ModalHeader>
              <ModalBody>
                <ol>
                  <li className="mb-3">
                    Modal Window can be closed by using Custom Close Button in the corner.
                  </li>
                  <li className="mb-3">
                    By default you can close Modal Window using ESC button. To disable uncheck
                    Keyboard checkbox.
                  </li>
                  <li className="mb-3">
                    Also you can close window by clicking outside the Modal Window. To disable check
                    Static Backdrop checkbox.
                  </li>
                </ol>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setCloseModal(!closeModal)}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Backdrop value</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              Previously we have set Modal backdrop value to be static, so window could not be
              closed by clicking outside of it. Lets look at additional parameters.
            </Label>
            <Form>
              <FormGroup className="ml-3 mb-4">
                <Label className="form-control-label">Select backdrop value:</Label>
                <br />
                <Input
                  type="select"
                  style={{ minWidth: "200px", maxHeight: "36px" }}
                  className={"mb-4"}
                  onChange={changeBackdrop}
                >
                  <option>True</option>
                  <option>False</option>
                </Input>
              </FormGroup>
            </Form>
            <Col md="2">
              <Button color="success" onClick={() => setBackdropModal(!backdropModal)}>
                Click Me
              </Button>
            </Col>
            <Modal
              isOpen={backdropModal}
              backdrop={backdrop}
              toggle={() => setBackdropModal(!backdropModal)}
            >
              <ModalHeader>Amazing facts</ModalHeader>
              <ModalBody>
                When backdrop is set to true, it dimmers and disables everything around the Window.
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setBackdropModal(!backdropModal)}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Delays</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="7">
              You can also add a delay to Modal Window opening and backdrop. Change the parameters
              to see for yourself.
            </Label>
            <FormGroup className="row ml-1">
              <Label className="form-control-label" htmlFor="example-number-input" md="2">
                Window delay: (seconds)
              </Label>
              <Col md="2">
                <Input
                  defaultValue={windowDelay}
                  id="example-number-input"
                  maxLength={1}
                  onChange={e => setWindowDelay(parseInt(e.target.value))}
                />
              </Col>
            </FormGroup>
            <FormGroup className="row ml-1">
              <Label className="form-control-label" htmlFor="example-number-input" md="2">
                Backdrop delay: (seconds)
              </Label>
              <Col md="2">
                <Input
                  defaultValue={backdropDelay}
                  id="example-number-input"
                  maxLength={1}
                  onChange={e => setBackdropDelay(parseInt(e.target.value))}
                />
              </Col>
            </FormGroup>
            <Col md="2">
              <Button color="success" onClick={() => setDelayModal(!delayModal)}>
                Click Me
              </Button>
            </Col>
            <Modal
              isOpen={delayModal}
              toggle={() => setDelayModal(!delayModal)}
              modalTransition={{ timeout: windowDelay * 1000 }}
              backdropTransition={{ timeout: backdropDelay * 1000 }}
            >
              <ModalHeader>Delay</ModalHeader>
              <ModalBody>Did you notice? Try out different delay values.</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setDelayModal(!delayModal)}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Backdrop value</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              When unmountOnClose is set to false, Modal data will remain even if it is closed.
            </Label>
            <Form>
              <FormGroup className="ml-3 mb-4">
                <Label className="form-control-label">Select unmountOnClose value:</Label>
                <br />
                <Input
                  type="select"
                  style={{ minWidth: "200px", maxHeight: "36px" }}
                  className={"mb-4"}
                  onChange={changeUnmount}
                >
                  <option>True</option>
                  <option>False</option>
                </Input>
              </FormGroup>
            </Form>
            <Col md="2">
              <Button color="success" onClick={() => setUnmountModal(!unmountModal)}>
                Click Me
              </Button>
            </Col>
            <Modal
              isOpen={unmountModal}
              toggle={() => setUnmountModal(!unmountModal)}
              unmountOnClose={unmount}
            >
              <ModalHeader>Text Box</ModalHeader>
              <ModalBody>
                <Input
                  type="textarea"
                  placeholder="Leave message here and check wether the message will remain"
                  rows={3}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setUnmountModal(!unmountModal)}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">External Close Button and Focus</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              Close button can be set out of Modal in top right corner.
              <br />
              <br />
              If returnFocusAfterClose will be set to true, then the Click Me button will be
              highlighted after closing the Modal.
            </Label>
            <Form>
              <FormGroup className="mb-4 ml-3" check>
                <Input
                  type="checkbox"
                  checked={focus}
                  onChange={e => setFocus(e.target.checked)}
                ></Input>
                Use returnFocusAfterClose
              </FormGroup>
            </Form>
            <Button
              className="ml-3"
              color="success"
              onClick={() => setExternalModal(!externalModal)}
            >
              Click Me
            </Button>
            <Modal returnFocusAfterClose={focus} isOpen={externalModal} external={externalCloseBtn}>
              <ModalHeader>Look and Focus</ModalHeader>
              <ModalBody>Look at the top right corner of the webpage.</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setExternalModal(!externalModal)}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Turning off Fade</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              You can also deactivate fade, so the Modal Window would be shown instantly.
            </Label>
            <Col md="2">
              <Button color="success" onClick={() => setFadeModal(!fadeModal)}>
                Click Me
              </Button>
            </Col>
            <Modal isOpen={fadeModal} fade={false} toggle={() => setFadeModal(!fadeModal)}>
              <ModalHeader>Fade</ModalHeader>
              <ModalBody>Fade is turned off by setting it false as Modal attribute.</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setFadeModal(!fadeModal)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Fullscreen</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              Modal Windows can be made fullscreen by specifying it in Modal attributes.
            </Label>
            <Col md="2">
              <Button color="success" onClick={() => setFullview(!fullview)}>
                Click Me
              </Button>
            </Col>
            <Modal
              size="xl"
              style={{ maxWidth: "60vw" }}
              isOpen={fullview}
              toggle={() => setFullview(!fullview)}
              fullscreen
            >
              <ModalHeader>Full screen</ModalHeader>
              <ModalBody style={{ height: "60vh" }}>Its huge!</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setFullview(!fullview)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Nested Modal</h3>
          </CardHeader>
          <CardBody>
            <Label className="form-control-label mb-4" md="8">
              Show Modal inside another Modal!
            </Label>
            <Col md="2">
              <Button color="success" onClick={() => setNestedModal(!nestedModal)}>
                Click Me
              </Button>
            </Col>
            <Modal isOpen={nestedModal}>
              <ModalHeader>There is another...</ModalHeader>
              <ModalBody>Open additional Modal by clicking &quot;Another&quot;.</ModalBody>
              <Modal isOpen={innerModal} toggle={() => setInnerModal(!innerModal)}>
                <ModalHeader>Inner Modal</ModalHeader>
                <ModalBody>Congratulations, you opened the nested Modal.</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => setInnerModal(!innerModal)}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
              <ModalFooter>
                <Button color="info" onClick={() => setInnerModal(!innerModal)}>
                  Another
                </Button>{" "}
                <Button color="secondary" onClick={() => setNestedModal(!nestedModal)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
