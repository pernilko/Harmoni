import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";
import {ticketService} from "../../../services/TicketService";
import axios from "axios";
import {Artist, artistService} from "../../../services/ArtistService";
import {userService} from "../../../services/UserService";
import {userEventService} from "../../../services/UserEventService";
import "./event.css";

let eventService = new EventService();



export class EventDetails extends Component<{ match: { params: { id: number } } }>  {
    event_id = this.props.match.params.id;
    loaded = [false, false, false, false];
    constructor(props){
        super(props);
        this.state = {
            event: [],
            users: [],
            tickets: [],
            artists: []
        };
    }
    render() {
        {console.log(this.loaded)}
        if (this.loaded.some(l => !l)) {
            this.load();
            return <div/>
        }
        else {
            let e: Event = this.state["event"];
            return (
                <div className={"w-50 mx-auto shadow-lg mt-4"}>
                    <div className="card card-cascade wider reverse C">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                        <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                        <div className="view view-cascade overlay">
                            <img className="card-img-top shadow-lg"
                                 src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                 alt="Card image cap"></img>
                            <a href="#!">
                                <div className="mask rgba-white-slight"></div>
                            </a>
                        </div>
                        {console.log(this.state["users"])}
                        <div className="card-body card-body-cascade text-center">
                            <h1 className="card-title text">{e.event_name}</h1>
                            <h6 className="font-weight-bold indigo-text py-2">{e.place}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"> <b></b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)}</h6>
                            <p className="card-text">{e.description}</p>
                            <br/>
                            {console.log(this.state["artists"])}
                            <br/>
                            <p>Du kan akseptere din stilling i vaktlisten nedenfor.</p>
                            <br/>
                            <br/>
                            <h2 className={"text"}>Artister</h2>
                            <br/>
                            <Row className={"artistContainer"}>
                                {this.state["artists"].map(a =>
                                    <Column className="card artist" width={6}>
                                        <div className="card-body artist shadow-lg">
                                            <h5 className="card-title">{a.artist_name}</h5>
                                            <p className="card-text">
                                                <h6> Epost: {a.email}</h6>
                                                <h6> tlf: {a.phone} </h6>
                                            </p>
                                            <a href={""}> nedlasting av filer skjer her </a>
                                            <br/>

                                                <label className="form-check-label" htmlFor="exampleCheck1">Check me
                                                    out</label>
                                        </div>
                                    </Column>
                                )}
                            </Row>
                            <br/>
                            <h2 className={"text"}>Billetter</h2>
                            <br/>
                            <Row className={"ticketContainer"}>
                                {this.state["tickets"].map(t =>
                                    <Column className="card artist" width={6}>
                                        <div className="card-body artist shadow-lg">
                                            <h5 className="card-title">{t.ticket_type}</h5>
                                            <p className="card-text">
                                                <h6>{t.description}</h6>
                                                <h6>Pris: {t.price}</h6>
                                                <h6>Antall: {t.amount_sold}</h6>
                                            </p>
                                        </div>
                                    </Column>
                                )}
                            </Row>
                            <br/>
                            <h2 className={"text"}>Vakter</h2>
                            <br/>
                            <table className={"table shadow-lg text"}>
                                <thead className="tableHead">
                                <tr>
                                    <th scope="col" className={"nameCol"}>Navn</th>
                                    <th scope="col" className={"positionCol"}>Stilling</th>
                                    <th scope="col" className={"buttonCol"}></th>
                                </tr>
                                </thead>

                                <tbody>
                                {this.state["users"].map(row =>
                                    <tr className={(row.accepted === 1 ? "greenBG" : "") + (row.accepted === 0 ? "redBG" : "")}>
                                        <td className={"borderControl"}>{row.user_name}</td>
                                        <td>{row.job_position}
                                        </td>
                                        {this.getUserEvent(row.user_id) ?
                                            <td className={"noBorder"}>
                                                <div className="buttonHorizontal" onClick={() => this.setAccepted(userService.currentUser.user_id, e.event_id, 0)}>
                                                    <button id="bot" type="button" className="btn btn-info btn-circle">
                                                        <i className="fa fa-times" ></i>
                                                    </button>
                                                </div>
                                                <div className= "buttonHorizontal px-1" onClick={() => this.setAccepted(userService.currentUser.user_id, e.event_id, 1)}>
                                                    <button id="top" type="button" className="btn btn-info btn-circle">
                                                        <i className="fa fa-check" ></i>
                                                    </button>
                                                </div>
                                            </td> : <div/>}
                                    </tr>
                                )}
                                </tbody>
                            </table>


                            <br/>
                            <h2 className={"text"}>Kart</h2>
                            <br/>
                            <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>
                            <br/>
                            <a href={"#/editEvent/"+this.event_id} className="card-link">Rediger</a>



                        </div>
                    </div>
                </div>
            );
        }
    }
    load() {
        if (userService.currentUser) {
            eventService.getEventId(this.event_id).then(r => {
                let event = r;
                console.log(event);
                this.setState({event});
                this.loaded[0] = true;
            });

            ticketService.getEventTickets(this.event_id).then(r => {
                let tickets = r;
                console.log(tickets);
                this.setState({tickets});
                this.loaded[1] = true;
            });

            artistService.getEventArtists(this.event_id).then(r => {
                let artists = r;
                console.log(artists);
                this.setState({artists});
                this.loaded[2] = true;
            });

            userEventService.getAllbyId(this.event_id).then( res => {
                let users = res;
                console.log(users);
                this.setState({users});
                this.loaded[3] = true;
            });

        }
    }

    setAccepted(user_id: number, event_id: number, accepted: number) {
        userEventService.setAccepted(user_id, event_id, accepted);
        let users = this.state["users"];

        users = users.map(u => {
            if (u.user_id === user_id) {
                u.accepted = accepted;
            }
            return u;
        });
        this.setState({users});
    }

    getUserEvent(BANG){
        if (userService.currentUser){
            let u = this.state["users"];

            if (u.length > 0){
                return u.find(user => userService.currentUser.user_id === BANG);
            }
            return undefined;
        }
        return undefined;
    }
}
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>