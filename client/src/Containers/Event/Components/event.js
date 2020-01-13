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
        return (
            <div>
                <div className={"w-50 mx-auto"}>
                <div className="card my-4" >
                    <div className="card-body">
                        
                        <NavLink exact to={"/event/" +this.state["event"].event_id}>
                            <h5 className="card-title">{this.state["event"].event_name}</h5>
                        </NavLink>
                        <h6> sted: {this.state["event"].place}</h6>
                        <h6> lat: {this.state["event"].latitude} </h6>
                        

                        <p className="card-text">Some quick example text to build on the card title and make
                            up the bulk of the card's content.</p>
                        <p>Du er blitt tilbudt en stilling som bartender</p>
                        <a href="#" className="card-link">Aksepter</a>
                        <a href="#" className="card-link">Avslå</a>
                        
                        <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude} show={true}/>

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
