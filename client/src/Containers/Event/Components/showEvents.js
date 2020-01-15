import * as React from 'react';
import { Component } from "react-simplified";
import {Event, eventService} from '../../../services/EventService';
import { createHashHistory } from 'history';
import {Alert} from "../../../widgets";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import {userEventService} from "../../../services/UserEventService";
import {Spinner} from "react-bootstrap";
import Popup from 'reactjs-popup';

const history = createHashHistory();

export class EventList extends Component<{user: boolean}>{
    loaded: boolean = false;
    ready: boolean = false;

    constructor(props){
        super(props);
        this.state = {
            events: [],
            users: []
        };
        //this.mounted = this.mounted.bind(this);
    }

    render() {
        if (userService.currentUser) {

            if(!this.loaded) {
                this.load();
            }
            if(!this.ready){
                this.loadContent();
            }
            return (
                <div className={"w-50 mx-auto"}>
                    {this.state["events"].map((event, i) =>
                        <div className={"card my-4" + (this.getUserEvent(event.event_id) ? (this.getUserEvent(event.event_id).accepted === 0 ? " border-danger" : (this.getUserEvent(event.event_id).accepted === 1 ? " border-success" : "")) : "")}>
                            <div className>
                                <a href={'#/showEvent/' + event.event_id}>
                                    <h5 className="card-title">{event.event_name}</h5>
                                </a>
                                <h6>{event.place}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">{event.event_start.slice(0, 10)}, {event.event_start.slice(11, 16)}-{event.event_end.slice(11, 16)}</h6>
                                <p className="card-text">{event.description}</p>

                                {
                                    //abolutely terrible code
                                }

                                {this.getUserEvent(event.event_id) ?  "Du er satt opp som " + this.getUserEvent(event.event_id).job_position: "Du er ikke satt på dette arrangementet"}
                                <br/>
                                {this.getUserEvent(event.event_id) ?
                                    <div><button onClick={() => this.setAccepted(event.event_id, this.getUserEvent(event.event_id).user_id, 1)} className="btn-dark">Aksepter</button>
                                        <button onClick={() => this.setAccepted(event.event_id, this.getUserEvent(event.event_id).user_id, 0)} className="btn-dark">Avslå</button></div> : <div></div>}
                                <div>
                                <Popup trigger = {<button className="float-right btn btn-danger">Slett</button>} position="right center">
                                  { close => (
                                    <div>
                                      <p><b>Vil du slette dette arrangementet?</b></p>
                                      <button className="btn btn-warning float-left ml-3" onClick={() => {close();}}>Nei</button>
                                      <button className="btn btn-success float-right mr-3" onClick={() => this.slett(event.event_id)}>Ja</button>
                                    </div>
                                  )}
                                </Popup>
                                </div>
                                <div>
                                  <button className="float-right btn btn-warning"onClick={() => history.push("/")}>Rediger</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }else{
            return(
            <Spinner animation="border"></Spinner>
            );
        }
        ;
    }

    setAccepted(user_id: number, event_id: number, accepted: number) {
        userEventService.setAccepted(event_id, user_id, accepted);
    }

    getUserEvent(event_id: number){
        if (userService.currentUser){
            let e = this.state["events"].filter(ev => ev.event_id === event_id);
            let u = this.state["users"];
            let userList = u.filter(list => (list.length > 0 && list[0].event_id == event_id));
            if (userList.length > 0){
                let users = userList[0];
                return users.find(user => user.event_id === event_id && userService.currentUser.user_id === user.user_id);
            }
            //return u.some(userList => userList.some(user => user.event_id === event_id && userService.currentUser.user_id === user.user_id));
        }
        return undefined;
    }

    load(){
        if (this.props.user) {
            eventService.getEventsByUser_id(userService.currentUser.user_id).then(res => {
                let events = res;
                console.log(events);
                this.setState({events});
                this.loaded = true;
            })
        } else {
            eventService.getEventsByOrg_id(userService.currentUser.org_id).then(res => {
                let events = res;
                console.log(events.length);
                this.setState({events});
                this.loaded = true;
            })
        }
    }

    slett(event_id: number){
      eventService
          .deleteEvent(event_id)
          .then(response => console.log(response))
          .then(() => history.push("/"))
          .then(Alert.danger("Arrangementet ble slettet"))
          .catch((error: Error) => console.log(error.message));
    }

    loadContent(){
        if (userService.currentUser && this.loaded){
            //gå gjennom alle event for å hente brukenrne som er tilknyttet dme
            console.log(this.state["events"].length);
            this.state["events"].map(e => {
                userEventService.getAllUserEvent(e.event_id).then( res => {
                    let users = this.state["users"];
                    users.push(res);
                    this.setState({users});
                    console.log(users);
                });
            });

            this.ready = true;
        }
    }
/*
    mounted() {
            if (this.props.user) {
                eventService.getEventsByUser_id(userService.currentUser.user_id).then(res => {
                    let events = res;
                    console.log(events);
                    this.setState({events});
                })
            } else {
                eventService.getEventsByOrg_id(userService.currentUser.org_id).then(res => {
                    let events = res;
                    console.log(events);
                    this.setState({events});
                })
            }

        else {
        eventService.getAllEvents().then(r => {
            let events = r;
            console.log(events);
            //history.push("/AllEvents")
            this.setState({events});

        }).catch((error:Error)=>{
            Alert.danger(error);
            })
        }

    }
    */
}
