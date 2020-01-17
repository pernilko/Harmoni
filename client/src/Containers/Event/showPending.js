import * as React from 'react';
import { Component } from "react-simplified";
import {Event, eventService} from '../../../services/EventService';
import { createHashHistory } from 'history';
import {Alert} from "../../../widgets";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import {userEventService} from "../../../services/UserEventService";
import {Spinner} from "react-bootstrap";
import "./showEvents.css";

export class Pending extends Component<{}> {
    pending: Event[] = [];

    render() {
        return (
             <div className={"w-50 mx-auto "}>
                    {this.pending.map( e =>
                        <div className="my-4">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                            <div className="eventCard shadow-lg text">
                                <a href={'#/showEvent/' + e.event_id}>
                                    <div className="content">
                                        <img id="image" src="https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"/>
                                        <div className="m-3">
                                            <h1 className="my-3">  {e.event_name}  </h1>
                                            <p> <b> Sted: </b> {e.place} </p>
                                            <p> <b> Stilling: </b>{this.getUserEvent(e.event_id) ?  "Du er satt opp som " + this.getUserEvent(e.event_id).job_position: "Du er ikke satt på dette arrangementet"}. </p>
                                            <p> <b> Tidspunkt: </b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)} </p>
                                        </div>
                                    </div>
                                </a>

                                <div className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")} id = {i}>

                                    { this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ?
                                        <div>
                                            <div id="topButton" className= "mx-4" onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 1)}>
                                                <button id="top" type="button" className="btn btn-info btn-circle">
                                                    <i className="fa fa-check" ></i>
                                                </button>
                                            </div>
                                            <div className="button mx-4 my-3" onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 0)}>
                                                <button id="bot" type="button" className="btn btn-info btn-circle">
                                                    <i className="fa fa-times" ></i>
                                                </button>
                                            </div>
                                        </div>
                                    : <></>) : <></>}

                                    { this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ?
                                        <div>
                                            <div id="topButton" className= "mx-4" onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 1)}>
                                                <button id="top" type="button" className="btn btn-info btn-circle">
                                                    <i className="fa fa-check" ></i>
                                                </button>
                                            </div>
                                            <div className="button mx-4 my-3" onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 0)}>
                                                <button id="bot" type="button" className="btn btn-info btn-circle">
                                                    <i className="fa fa-times" ></i>
                                                </button>
                                            </div>
                                        </div>
                                    : <></>) : <></>}

                                </div>
                            </div>
                        </div>
                    )}

                </div>
        )
    }

    mounted() {
        eventService
            .getEventsPending()
    }
}