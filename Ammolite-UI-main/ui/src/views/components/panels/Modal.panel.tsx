import { useState } from "react";

import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

interface Props {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPanel = (props: Props): JSX.Element => {
  const [closeModal, setCloseModal] = useState<boolean>(props.isOpen);

  return (
    <Modal
      isOpen={closeModal}
      toggle={() => {
        setCloseModal(!closeModal);
        props.onClose();
      }}
      keyboard={true}
      backdrop={true}
      style={{ maxWidth: "70vw" }}
    >
      <div style={{ position: "relative", right: "2vw", top: "2vh" }}>
        <button
          style={{ cursor: "pointer", width: "40px", height: "40px" }}
          className="close"
          onClick={() => {
            setCloseModal(!closeModal);
            props.onClose();
          }}
          type="button"
        >
          &times;
        </button>
      </div>

      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={() => {
            setCloseModal(!closeModal);
            props.onClose();
          }}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
