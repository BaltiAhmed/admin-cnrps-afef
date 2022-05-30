import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";

function MyVerticallyCenteredModal(props) {
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [message, setMessage] = useState();
  const onchange = (e) => {
    if (e.target.name === "message") {
      setMessage(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/notification/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sujet: "Réponse à votre reclamation",
          message: message,
          idUtilisateur: props.id,
          reclamationId: props.reclamationId,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Réponse bien ajouter");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
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
          Postuler une réponse
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorModel error={error} />
        <SuccessModel success={success} />
        <Form onSubmit={submit}>
          <Form.Group controlId="formGridEmail">
            <Form.Control as="textarea" rows={5} name="message" required />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: 30 }}>
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalReclamtion(props) {
  const [modalShow, setModalShow] = React.useState(false);
  console.log(props.id);
  console.log(props.reclamationId);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        style={{ marginTop: 30 }}
      >
        Postuler une réponse
      </Button>

      <MyVerticallyCenteredModal
        id={props.id}
        reclamationId={props.reclamationId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalReclamtion;
