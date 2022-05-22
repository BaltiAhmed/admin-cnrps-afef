import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { useParams } from "react-router-dom";
import ModalReclamtion from "../../components/modalReclamation";

function DetailsReclamation() {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const [reclamation, setReclamation] = useState();
  const [utilisateur, setUtilisateur] = useState();
  const [utilisateurId, setUtilisateurId] = useState("");
  const id = useParams().id;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reclamation/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setReclamation(responseData.rec);
        setUtilisateurId(responseData.rec.utilisateur);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(utilisateurId);
  console.log(utilisateur);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/utilisateur/${utilisateurId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setUtilisateur(responseData.utilisateur);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, [utilisateurId]);

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  name="nom"
                  value={utilisateur && utilisateur.nom}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adresse"
                  name="adresse"
                  value={utilisateur && utilisateur.adresse}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Téléphone"
                  name="tel"
                  value={utilisateur && utilisateur.tel}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={utilisateur && utilisateur.email}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Objet</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={reclamation && reclamation.objet}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={reclamation && reclamation.message}
                  required
                />
              </Form.Group>

              <ModalReclamtion id={utilisateurId && utilisateurId} reclamationId = {id} />
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailsReclamation;
