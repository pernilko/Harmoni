import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { Component } from "react-simplified";

let LAT: float = 0;
let LNG: float = 0;
let show: boolean = false;
let edit: boolean = false;

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
            defaultCenter={{ lat: LAT, lng: LNG }}
            onClick={(e) => {
            if (!show){
              props.onMapClick(e);
              LAT = e.latLng.lat();
              LNG = e.latLng.lng();
            } else if (edit){
                LAT = e.latLng.lat();
                LNG = e.latLng.lng();
                props.onMapClick(e);
            }}}
        >

        {(show ? <Marker position={{lat: LAT, lng: LNG}}/> : <></>)}
            {props.isMarkerShown && <Marker position={props.markerPosition} />}
        </GoogleMap>
    )

/**
    Komponent for å vise frem kart med react-google-maps api. dette er en ganske standard måte å gjøre det på delvis hentet fra https://stackblitz.com/edit/react-umnzy4?file=MapContainer.js
 */
export default class MapContainer extends Component<{lat?: float, lng?: float, show: boolean, edit?: boolean}> {
    constructor(props) {
        super(props);
        LAT = this.props.lat || 63.43049 ;
        LNG = this.props.lng || 10.39506;
        show = this.props.show;
        edit = this.props.edit;
    }

    /**
        render definerer htmldelen av komponenten.
        @return html element som inneholder komponenten.
    */
    render() {
        return (
            <div style={{ height: '100%', width: '74%', marginLeft: '13%'}}>
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
