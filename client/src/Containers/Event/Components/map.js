import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { Component } from "react-simplified";

let LAT: number = 0;
let LNG: number = 0;

export function getlatlng(){
  return [LAT, LNG];
}

const Map = compose(
    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
      }), {
        onMapClick: ({ isMarkerShown }) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown:true
        })
      }),
    withScriptjs,
    withGoogleMap
)
    (props =>
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{ lat: 63.42972, lng: 10.39333 }}
            onClick={(e) => {
              props.onMapClick(e);
              LAT = e.latLng.lat();
              LNG = e.latLng.lng();
            }}
        >
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
        </GoogleMap>
    )

export default class MapContainer extends Component<{lat: number, lng: number}> {
    position: any = null;
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyYQy7LmG8h3r4M8CEDiy1SGBHJ_4QUrI"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onClick={() => console.log("hei")}
                />
            </div>
        )
    }

    mounted() {
      //this.position = Map.props.markerPosition;
    }
}
