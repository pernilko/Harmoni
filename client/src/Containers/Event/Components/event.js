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
                <div className={"w-50 mx-auto shadow-lg mt-4"}>
                    <div className="card card-cascade wider reverse C">
                        <div className="view view-cascade overlay">
                            <img className="card-img-top shadow-lg"
                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                 alt="Card image cap"></img>
                            <a href="#!">
                                <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>
                        <div className="card-body card-body-cascade text-center">
                            <h4 className="card-title"><strong>{e.event_name}</strong></h4>
                            <h6 className="font-weight-bold indigo-text py-2">{e.place}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"> <b></b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)}</h6>
                            <p className="card-text">{e.description}</p>
                            <p>Du er blitt tilbudt en stilling som bartender</p>
                            <a href="#" className="card-link">Aksepter</a>
                            <a href="#" className="card-link">Avslå</a>
                            <br/>
                            <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>
                        </div>
                    </div>
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
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>