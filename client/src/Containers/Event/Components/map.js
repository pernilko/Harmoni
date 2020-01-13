import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function Map() {

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
    >
      <Marker position={{lng: 13, lat: 37}}/>
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));


export default function map() {
  
  return (
    <div style={{ width: "25vw", height: "25vh" }}>
      <MapWrapped
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCyYQy7LmG8h3r4M8CEDiy1SGBHJ_4QUrI'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onClick={() => console.log("hei")}
      />
    </div>
  );
}