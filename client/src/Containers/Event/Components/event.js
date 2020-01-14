import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";


let eventService = new EventService();

export class EventDetails extends Component<{ match: { params: { id: number } } }>  {
    event_id = this.props.match.params.id;
    loaded: boolean = false;

    constructor(props){
        super(props);
        this.loaded = false;
        this.state = {
            event: []
        };
        this.mounted = this.mounted.bind(this);
    }

    render() {
        if(this.loaded){
            let e: Event = this.state["event"];
            return (
                <div>
                    <div className={"w-50 mx-auto"}>
                    <div className="card my-4" >
                        <div className="card-body">
                            
                            <h2 className="card-title">{e.event_name}</h2>
                            <h6> <b> sted: </b> {e.place}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"> <b> tid: </b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)}</h6>
                            <h6> <b> beskrivelse: </b> {e.description} </h6>
                            
                            <p>Du er blitt tilbudt en stilling som bartender</p>
                            <a href="#" className="card-link">Aksepter</a>
                            <a href="#" className="card-link">Avslå</a>
                            
                            <br/>
                            <h6> <b> Place: </b> {e.place} </h6>
                            <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>

                        </div>
                        
                    </div>
                </div> : <></>)}

                </div>
            );
        }else{
            return <div/>
        }
    }

    mounted() {
        eventService.getEventId(this.event_id).then(r => {
            let event = r;
            console.log(event);
            this.setState({event});
            this.loaded = true;
        })
    }

}
<<<<<<< HEAD
=======
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>
>>>>>>> 04513f806592ca528a181ae28fd29236774149cd
