import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";
import Popup from "reactjs-popup";
import { createHashHistory } from 'history';
import {organizationService} from "../../../services/OrganizationService";
import {User, userService} from "../../../services/UserService";
import {UserEvent, userEventService} from "../../../services/UserEventService";

const history = createHashHistory();

let eventService = new EventService();
export class EventDetails extends Component<{ match: { params: { id: number } } }>  {
    event_id = this.props.match.params.id;
    loaded: boolean = false;
    hidden: boolean = true;
    cancel: boolean = true;
    bugreport: string = "";
    employees: UserEvent[] = [];

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
                            <p>HEI - INFO OM ARRANGEMENT</p>
                            <a href="#" className="card-link">Aksepter</a>
                            <a href="#" className="card-link">Avslå</a>
                            <a href={"#/editEvent/"+this.event_id} className="card-link">Rediger</a>
                            <Popup trigger = {<a className="card-link">Avlys arrangement</a>} >
                                { close => (
                                  <div>
                                      <p><b>Vil du avlyse dette arrangementet?</b></p>
                                      <button className="btn btn-warning float-left ml-3" onClick={() => {close();}}> Nei</button>
                                      <button className="btn btn-success float-right mr-3" onClick={() => this.cancelled(this.event_id)}>Ja</button>
                                  </div>
                                )}
                            </Popup>
                            <a href={"#/showEvent/" + this.event_id} className="card-link" onClick={this.show}> Rapporter problem
                                <div hidden={this.hidden}>
                                    <textarea rows="4" cols="40" style={{margin: '10px',}} placeholder="Beskriv feilmelding"
                                              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.bugreport = event.target.value)}/>
                                    <br/>
                                    <button className="btn btn-primary submit" style={{margin:10 +'px'}} onClick={this.sendReport}>Rapporter problem</button>
                                </div>
                            </a>
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
        this.getEvent();
        this.getEmployees();
    }

    getEmployees() {
        userEventService.getAllUserEvent(this.event_id)
            .then(e => this.employees = e)
            .then(console.log(this.employees))
    }

    getEvent() {
        eventService.getEventId(this.event_id).then(r => {
            let event = r;
            console.log(event);
            this.setState({event});
            this.loaded = true;
        });
    }

    cancelled(event_id: number) {
        eventService
          .cancelEvent(event_id)
          .then((response) => {
              this.sendCancellationMail();
              console.log(response);
              history.push("/cancel/" + event_id);
              Alert.danger("Arrangementet ble avlyst");
              this.cancel = true;
          })
          .catch((error: Error) => console.log(error.message));
    }

    show(){
        this.hidden = false;
    }
    show2(){
        this.cancel = false;
    }

    sendReport(){
        organizationService.reportBug("pernilko@stud.ntnu.no", userService.currentUser.org_id, organizationService.currentOrganization.org_name, this.bugreport)
            .then((e) => {
                Alert.success("Bug report sendt!");
                this.hidden = true;
                this.email = "";
            })
            .catch((error: Error) => console.log(error.message))
    }

    sendCancellationMail(){
        console.log("EMPLOYEES: ", this.employees);
        this.employees.map(e => {
            if (e) {
                organizationService.sendCancellationMail(e.email, userService.currentUser.org_id, organizationService.currentOrganization.org_name, this.event_id)
                    .then((e) => {
                        Alert.success("Staff is alerted about the cancellation");
                        this.email = "";
                    }).catch((error: Error) => console.log(error.message))
            }
        })
    }
}
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>