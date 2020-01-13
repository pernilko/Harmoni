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

    constructor(props){
        super(props);
        this.state = {
            event: []
        };
        this.mounted = this.mounted.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    {(this.state["event"] ?
                        <div className={"w-50 mx-auto"}>
                        <div className="card my-4" >
                            <div className="card-body">
                                
                                <NavLink exact to={"/event/" +this.state["event"].event_id}>
                                    <h5 className="card-title">{this.state["event"].event_name}</h5>
                                </NavLink>
                                <h6>{this.state["event"].place}</h6>
                                <h6> {this.state["event"].latitude} </h6>
                                

                                <p className="card-text">Some quick example text to build on the card title and make
                                    up the bulk of the card's content.</p>
                                <p>Du er blitt tilbudt en stilling som bartender</p>
                                <a href="#" className="card-link">Aksepter</a>
                                <a href="#" className="card-link">Avslå</a>
                            </div>

                            <MapContainer lat={this.state["event"].latitude}/>
                        </div>
                    </div> : <div></div>)}
                </div>

            </div>
        );
    }

    mounted() {
        eventService.getEventId(this.event_id).then(r => {
            let event = r;
            console.log(event + "LOOK DUDE");
            this.setState({event});
        })
    }

}