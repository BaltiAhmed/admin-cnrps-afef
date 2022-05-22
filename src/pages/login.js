import { useState, useContext } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import ErrorModel from "../models/error-models";
import SuccessModel from "../models/success-models";
import { Authcontext } from "../context/auth-context";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }

      auth.login(responsedata.admin, responsedata.token);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div style={{ marginTop: "5%",height: "100vh" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <Card className="text-center">
              <Card.Header></Card.Header>
            </Card>
            <Card>
              <Card.Body>
                <ErrorModel error={error} />
                <SuccessModel success={success} />
                <Form onSubmit={submit}>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Entrer email"
                      required
                      name="email"
                      onChange={onchange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mot de passe"
                      required
                      name="password"
                      onChange={onchange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check" />
                  </Form.Group>
                  <Button variant="info" type="submit">
                    Connextion
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
