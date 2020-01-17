import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";
import Popup from "reactjs-popup";
import { createHashHistory } from 'history';

const history = createHashHistory();
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
                        <div className="card-body card-body-cascade text-center">
                            <h1 className="card-title text">{e.event_name}</h1>
                            <h6 className="font-weight-bold indigo-text py-2">{e.place}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"> <b></b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)}</h6>
                            <p className="card-text">{e.description}</p>
                            {this.state["artists"].map(artist =>
                                <div>{artist.artist_name}</div>
                            )}
                            {this.state["tickets"].map(ticket =>
                                <div>{ticket.ticket_type}</div>
                            )}
                            <div>
                                <div className= "mx-4" onClick={() => this.setAccepted(this.getUserEvent(e.event_id).user_id, e.event_id, 1)}>
                                    <button id="top" type="button" className="btn btn-info btn-circle">
                                        <i className="fa fa-check" ></i>
                                    </button>
                                </div>
                                <div className="button mx-4 my-3" onClick={() => this.setAccepted(this.getUserEvent(e.event_id).user_id, e.event_id, 0)}>
                                    <button id="bot" type="button" className="btn btn-info btn-circle">
                                        <i className="fa fa-times" ></i>
                                    </button>
                                </div>
                            </div>
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
                                            <a href="#" className="card-link">Aksepter</a>
                                            <a href="#" className="card-link">Avslå</a>
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

                            <a href={"#/editEvent/"+this.event_id} className="card-link">Rediger</a>
                            <Popup trigger = {<a className="card-link">Slett</a>} >
                                { close => (
                                    <div>
                                        <p><b>Vil du slette dette arrangementet?</b></p>
                                        <button className="btn btn-warning float-left ml-3" onClick={() => {close();}}>Nei</button>
                                        <button className="btn btn-success float-right mr-3" onClick={() => this.slett(this.event_id)}>Ja</button>
                                    </div>
                                )}
                            </Popup>
                            <br/>
                            {console.log(this.state["users"])}
                            <table className={"table"}>
                                <thead className="thead-dark"/>
                                <tr>
                                    <th scope="col">Navn</th>
                                    <th scope="col">Stilling</th>
                                </tr>

                                <tbody>
                                    {this.state["users"].map(row =>
                                        <tr>
                                            <th scope="row"></th>
                                            <td>{row.user_name}</td>
                                            <td>{row.job_position}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>


                            <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>



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

            userEventService.getAllUserEvent(this.event_id).then( res => {
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

        //endrer users lokalt for mest responsiv nettside
        users = users.map(list => {
            list = list.map(u => {
                if (u.user_id === user_id && u.event_id === event_id){
                    u.accepted = accepted;
                }
                return u;
            });
            return list;
        });

        this.setState({users});
    }

    getUserEvent(event_id: number){
        if (userService.currentUser){
            let u = this.state["users"];

            let userList = u.filter(list => {
                return (list.some(user => {
                    if (user) return user.event_id === event_id;
                    return false;
                }))
            });
            if (userList.length > 0){
                let users = userList[0];
                return users.find(user => user.event_id === event_id && userService.currentUser.user_id === user.user_id);
            }
        }
        return undefined;
    }
    slett(event_id: number){
        eventService
            .deleteEvent(event_id)
            .then(response => console.log(response))
            .then(() => history.push("/allEvents"))
            .then(Alert.danger("Arrangementet ble slettet"))
            .catch((error: Error) => console.log(error.message));
    }
}
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>