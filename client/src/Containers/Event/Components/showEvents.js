import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';

let eventService = new EventService();

export class EventList extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: []
        };
        this.mounted = this.mounted.bind(this);
    }

    render() {
        return (
            <div className={"w-50 mx-auto"}>
                {this.state["events"].map(event =>
                        <div className="card my-4" >
                            <div className="card-body">
                                <a href={event.event_id}>
                                <h5 className="card-title">{event.event_name}</h5>
                                </a>
                                <h6>{event.place}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">{event.event_start.slice(0, 10)},  {event.event_start.slice(11, 16)}-{event.event_end.slice(11, 16)}</h6>
                                <p className="card-text">Some quick example text to build on the card title and make
                                    up the bulk of the card's content.</p>
                                <p>Du er blitt tilbudt en stilling som bartender</p>
                                <a href="#" className="card-link">Aksepter</a>
                                <a href="#" className="card-link">Avslå</a>
                            </div>
                        </div>
                )}
            </div>
         )
    };

    mounted() {
        eventService.getAllEvents().then(r => {
            let events = r;
            console.log(events);
            this.setState({events});
        })
    }
}