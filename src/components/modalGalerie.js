import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

function MyVerticallyCenteredModal(props) {
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [list, setList] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pensioncivile/${props.id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.PensionC);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Les documents envoyer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorModel error={error} />
        <SuccessModel success={success} />
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:5000/${list && list.decisionMISEretraite}`}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:5000/${list && list.releveService}`}
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalGalerie(props) {
  const [modalShow, setModalShow] = React.useState(false);
  console.log(props.id);

  return (
    <>
      <PhotoLibraryIcon
        onClick={() => setModalShow(true)}
        style={{ color: "blue" }}
      ></PhotoLibraryIcon>

      <MyVerticallyCenteredModal
        id={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalGalerie;
