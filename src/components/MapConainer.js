import React, { useState, useRef, useMemo, useCallback } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyMap() {
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
            console.log("hi")
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
              ? position.lat+" "+position.lng
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  console.log(position.lat);
  console.log(position.lng);
  return (
    <Map
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </Map>
  );
}

export default MyMap;
