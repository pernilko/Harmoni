import * as React from 'react';
import { Component } from "react-simplified";
import {Event, eventService} from '../../../services/EventService';
import { createHashHistory } from 'history';
import {Alert} from "../../../widgets";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import {Spinner} from "react-bootstrap";
import Popup from 'reactjs-popup';

const history = createHashHistory();

export class EventList extends Component<{user: boolean}>{
    loaded: boolean = false;
    constructor(props){
        super(props);
        this.state = {
            events: []
        };
        //this.mounted = this.mounted.bind(this);
    }

    render() {
        if (userService.currentUser) {
            if(!this.loaded) {
                this.load();
            }
            return (
                <div className={"w-50 mx-auto"}>
                    {this.state["events"].map(event =>
                        <div className="card my-4">
                            <div className="card-body">
                                <a href={'#/showEvent/' + event.event_id}>
                                    <h5 className="card-title">{event.event_name}</h5>
                                </a>
                                <h6>{event.place}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">{event.event_start.slice(0, 10)}, {event.event_start.slice(11, 16)}-{event.event_end.slice(11, 16)}</h6>
                                <p className="card-text">Some quick example text to build on the card title and make
                                    up the bulk of the card's content.</p>
                                <p>Du er blitt tilbudt en stilling som bartender</p>
                                <a href="#" className="card-link">Aksepter</a>
                                <a href="#" className="card-link">Avslå</a>
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
                console.log(events);
                this.setState({events});
                this.loaded = true;
            })
        }
        this.loaded = true;
    }

    slett(event_id: number){
      console.log(event_id);
      eventService
          .deleteEvent(event_id)
          .then(response => console.log(response))
          .then(()=>history.push("/allEvents"))
          .catch((error: Error) => console.log(error.message));
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
