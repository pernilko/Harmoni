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
    loaded: boolean = false;



    render() {
        if (!this.loaded) {
            if (userService.currentUser) {
                this.load();
                this.loaded = true;
            }
        }
        return (
             <div className={"w-50 mx-auto "}>
                    {this.pending.map( (e, i) =>
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
                                            <p> <b> Tidspunkt: </b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)} </p>
                                        </div>
                                    </div>
                                </a>

                                <div className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")} id = {i}>
                                  <div id="topButton" className= "mx-4" onClick={() => this.completed(e.event_id)}>
                                      <button id="top" type="button" className="btn btn-info btn-circle">
                                          <i className="fa fa-check" ></i>
                                      </button>
                                  </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
        )
    }

    getUserEvent(event_id: number){
        /*
        if (userService.currentUser){
            let e = this.state["events"].filter(ev => ev.event_id === event_id);
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
        return undefined;*/
    }

    completed(event_id: number){
        eventService
          .setCompleted(event_id)
          .then(response => console.log(response))
          .catch((error: Errror) => console.log(error.message));
    }

    load() {
        eventService
            .getEventsPending(userService.currentUser.user_id)
            .then(res => {
                this.pending = res;
                console.log("PENDING: ", this.pending);
            })
            .catch((error: Errror) => console.log(error.message))
    }
}
