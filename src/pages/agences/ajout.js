import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { Map, TileLayer, Marker, Popup, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function AjoutAgence() {
  const center = {
    lat: 36.802083,
    lng: 10.185429,
  };

  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  function DraggableMarker() {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? position.lat + " " + position.lng
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  console.log(position.lat);
  console.log(position.lng);

  const [nom, setNom] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [fax, setFax] = useState();
  const [lat, setLat] = useState(position.lat);
  const [long, setLong] = useState(position.lng);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "fax") {
      setFax(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();

    console.log(nom);
    console.log(adresse);
    console.log(tel);
    console.log(fax);
    console.log(position.lat);
    console.log(position.lng);

    try {
      let response = await fetch("http://localhost:5000/api/agence/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          adresse: adresse,
          tel: tel,
          fax: fax,
          long: position.lng,
          lat: position.lat,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Agence bien ajouter");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Adresse"
                  name="adresse"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Téléphone"
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Fax</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fax"
                  name="fax"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Position</Form.Label>
                <MapContainer
                  center={center}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: 500, width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker />
                </MapContainer>
              </Form.Group>

              <Button variant="primary" type="submit" style={{ marginTop: 30 }}>
                Ajouter
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default AjoutAgence;
