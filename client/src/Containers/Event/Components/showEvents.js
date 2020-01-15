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
        let ev = [];
        if (userService.currentUser) {

            if(!this.loaded) {
                this.load();
            }
            if(!this.ready){
                this.loadContent();
            }
            if (this.ready){
                ev = this.state["events"].slice(0, 1);
            }
            return (
                <div className={"w-50 mx-auto "}>
                    
                    {this.state["events"].map((e, i) => 
                        <div className="my-4">  
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                            <div className="eventCard shadow-lg text">
                                <div className="content">
                                    <img id="image" src="https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"/>
                                    <div className="m-3"> 
                                        <h1 className="my-3">  <a href={'#/showEvent/' + e.event_id}> {e.event_name} </a> </h1>
                                        <p> <b> Sted: </b> {e.place} </p>
                                        <p> <b> Stilling: </b>{this.getUserEvent(e.event_id) ?  "Du er satt opp som " + this.getUserEvent(e.event_id).job_position: "Du er ikke satt på dette arrangementet"}. </p>
                                        <p> <b> Tidspunkt: </b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)} </p>
                                    </div>
                                </div>

                                <div className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")} id = {i}>
                                    { this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ? 
                                    <div>
                                        <div id="topButton" className= "mx-4">
                                            <button id="top" type="button" className="btn btn-info btn-circle"><i className="fa fa-check" onClick={() => this.setAccepted(i, e.event_id, this.getUserEvent(e.event_id).user_id, 1)}></i></button>
                                        </div>
                                        <div className="button mx-4 my-3">
                                            <button id="bot" type="button" className="btn btn-info btn-circle"><i className="fa fa-times" onClick={() => this.setAccepted(i, e.event_id, this.getUserEvent(e.event_id).user_id, 0)}></i></button>
                                        </div>
                                    </div>
                                    : <></>) : <></>}
                                </div>
                            </div>
                        </div>
                    )}

               
                    
                        


                        {/*<div id="event" className={"card my-5 bg-light" + (this.getUserEvent(event.event_id) ? (this.getUserEvent(event.event_id).accepted === 0 ? " border-danger" : (this.getUserEvent(event.event_id).accepted === 1 ? " border-success" : "")) : "")}>
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
                                  <button className="btn btn-danger"  onClick={this.deleteEvent}>Delete</button>
                                </div>
                            </div>
                        </div>

                         <div className={"center"}>
                    <div className="container">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            
                            <div className="card">
                                <div className="additional">
                                    <div className="user-card">
                                        <div className="level center">
                                            <button id="top" type="button" className="btn btn-info btn-circle"><i className="fa fa-check"></i></button>
                                            <button id="bot" type="button" className="btn btn-info btn-circle"><i className="fa fa-times"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card general">
                                <img id="image" src="https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"/>
                                <h1 id="content2ElectricBogaloo">Event Name </h1>
                                <p className="content"> Din rolle</p>
                                <p className="content"> Sted + tid </p>
                                <p className="content"> deskripsjon </p>
                            </div>
                            
                        </div>
                        */}
                    
                    </div>
            )
        }else{
            return(
            <Spinner animation="border"></Spinner>
            );
        }
        ;
    }

    setAccepted(iterator: number, user_id: number, event_id: number, accepted: number) {
        userEventService.setAccepted(event_id, user_id, accepted);
        console.log("hei")
        let users = this.state["users"];    

        for(let i = 0; i < users.length; i++){
            if (users[i].user_id == user_id && users[i].event_id == event_id) users[i].accepted = accepted;
        }
        
        users = users.map(row => {
            if (row.user_id === user_id && event_id === row.event_id){
                row.accepted = accepted;
            }
            return row;
        });

        this.setState({users});
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
