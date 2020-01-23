import * as React from 'react';
import { Component } from "react-simplified";
import {eventService} from '../../../services/EventService';
import { createHashHistory } from 'history';

import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import {userEventService} from "../../../services/UserEventService";
import {Container, Row, Spinner} from "react-bootstrap";
import "./showEvents.css";
import {useState} from "react";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";



export class EventList extends Component<{user: boolean, time: number}>{
    loaded: boolean = false;
    ready: boolean = false;
    nowitsready: boolean = false;
    selectedPage: number = 0;

    currentPage: number = 0;
    months: string[] = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

    constructor(props){
        super(props);
        this.state = {
            events: [],
            users: [],
            postPerPage: 4,
            currentPosts: [],
            items: []
        };
    }
    render() {
        if (userService.currentUser) {
            if(!this.loaded) {
                this.load();
            }
            if(!this.ready){
                this.loadContent();
            }
            if(!this.nowitsready && this.loaded && this.ready){
                this.loadPage();
            }
            if (this.state["events"].length !== 0) {
            if(this.props.time == 3){
                return (
                    <div className={"w-100 mx-auto "}>
                        <div style={{width: "100%"}}>
                            <ul className="pagination">
                                {this.state["items"].map((item, i) => (
                                    <li className="page-item" ><Button variant="secondary"  onClick={() => this.changePage(i)}>{i+1}</Button></li>
                                ))}
                            </ul>
                        </div>
                        {this.state["currentPosts"].map((e, i) =>
                            <Container>
                                    <div id = "eventcard" className="card" style={{marginLeft: "18%", marginRight: "18%", marginBottom: "2%", borderRadius: 6+"px", border: "none"}}>
                                        <Row style={{margin: 0}}>
                                        <Col sm={2} style={{padding: 0}}>
                                            <div className="banner"/>
                                        </Col>
                                        <Col sm={10} style={{padding: 0}}>
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                                                <div id = "eventcard-body" className="card-body" style={{padding:0}}>
                                                    <a href={'#/avlyst/' + e.event_id}>
                                                        <Container id="cancelledImage">
                                                            <img id="image" src="https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"/>
                                                            <h3 id="cancelled" className="overlay">Avlyst</h3>
                                                        </Container>
                                                        <div id="eventcard-text" className="card-text" style={{float: "left", textAlign: "left"}}>
                                                            <h2 style={{textAlign: "left", paddingLeft: 20}}> {e.event_name} </h2>
                                                            <p> <b> Sted: </b> {e.place} </p>
                                                            <p><b> Tidspunkt: {this.setFormat(e.event_start, e.event_end)}</b> </p>
                                                        </div>
                                                    </a>
                                                </div>
                                        </Col>
                                        </Row>
                                    </div>
                            </Container>
                        )}
                        <div>
                            <ul className="pagination">
                                {this.state["items"].map((item, i) => (
                                    <li className="page-item" ><Button variant="secondary" onClick={()=>this.changePage(i)}>{i+1}</Button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }else {
                return (
                    <div className={"w-100 mx-auto "}>
                        <div>
                            <ul className="pagination">
                                {this.state["items"].map((item, i) => (
                                    <li className="page-item" ><Button id="pageButton" variant="secondary"  onClick={() => this.changePage(i)}>{i+1}</Button></li>
                                ))}
                            </ul>
                        </div>
                        {this.state["currentPosts"].map((e, i) =>
                            <Container>
                                <div id="eventcard" className="card" style={{marginLeft: "18%", marginRight: "18%", marginBottom: "2%", borderRadius: 6+"px", border: "none"}}>
                                    <Row style={{margin: 0}}>
                                        <Col sm={2} style={{padding: 0}}>
                                            <div
                                                className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")}
                                                id={i}>
                                                {this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ?
                                                    <div>
                                                        <div id="topButton" 
                                                             onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 1)}>
                                                            <button type = "button" id="top" type="button" className="btn btn-info btn-circle">
                                                                <i className="fa fa-check"></i>
                                                            </button>
                                                        </div>
                                                        <div 
                                                             onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 0)}>
                                                            <button id="bot" type="button" >
                                                                <i className="fa fa-times"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    : <></>) : <></>}
                                            </div>
                                        </Col>
                                        <Col sm={10} style={{padding: 0}}>
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                                            <div id = "eventcard-body" className="card-body" style={{padding:0}}>
                                                <a href={'#/showEvent/' + e.event_id}>
                                                    <img id="image"
                                                         src={e.image ? e.image : "https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"}/>
                                                    <div id="eventcard-text" className="card-text" style={{float: "left", textAlign: "left"}}>
                                                        <h2 style={{textAlign: "left", paddingLeft: 20}}> {e.event_name} </h2>
                                                        <p><b> Sted: </b> {e.place} </p>
                                                        <p><b> Stilling: </b>{this.getUserEvent(e.event_id) ? "Du er satt opp som " + this.getUserEvent(e.event_id).job_position + ".\n Bekreft valget ditt med knappene på venstre side." : "Du er ikke satt på dette arrangementet"}.
                                                        </p>
                                                        <p>
                                                            <b> Tidspunkt: {this.setFormat(e.event_start, e.event_end)}</b>
                                                        </p>
                                                    </div>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        )}
                        <div>
                            <ul className="pagination">
                                {this.state["items"].map((item, i) => (
                                    <li className="page-item" ><Button id="pageButton" onClick={() => this.changePage(i)} variant="secondary">{i+1}</Button></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
            } else {
                return <div>
                    <p style={{color: 'white'}}>
                        Ingen arrangement å vise
                    </p>
                </div>
            }
        }else{
            return( <Spinner animation="border"></Spinner>);
        }
    }

    loadPage(){
        let amount = Math.ceil(this.state["events"].length/this.state["postPerPage"]);
        console.log(amount);
        let items = this.state["events"].slice(0, amount);
        console.log(items.length);
        this.setState({items});


        let indexOfFirstPost = this.currentPage * this.state["postPerPage"];
        let indexOfLastPost = indexOfFirstPost + this.state["postPerPage"];

        let currentPosts = this.state["events"].slice(indexOfFirstPost, indexOfLastPost);
        this.setState({currentPosts});


        this.nowitsready = true;
    }

    changePage(currentPage: number){
        this.currentPage = currentPage;

        let indexOfFirstPost = this.currentPage * this.state["postPerPage"];
        let indexOfLastPost = indexOfFirstPost + this.state["postPerPage"];

        let currentPosts = this.state["events"].slice(indexOfFirstPost, indexOfLastPost);
        this.setState({currentPosts});

        window.scrollTo(0,0);

    }

    setFormat(start, end) {
        let date = "";

        let startTime = start.slice(11, 16);
        let endTime = end.slice(11, 16);
        let startDay = start.slice(8, 10);
        let endDay = end.slice(8, 10);
        let startMonth = start.slice(6, 8);
        let endMonth = start.slice(6, 8);
        let startYear = start.slice(0, 4);
        let endYear = end.slice(0, 4);

        if (startYear !== endYear) {
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)-1] + " " + startYear + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }
        else if (startMonth !== endMonth) {
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)-1] + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }
        else {
            date = "kl. " + startTime + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }

        return date;
    }

    setAccepted(iterator: number, user_id: number, event_id: number, accepted: number) {
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

    load(){
        if (this.props.user && this.props.time == 0) {
            eventService.getEventsPreviousByUser_id(userService.currentUser.user_id).then(res => {
                let events = res;
                this.setState({events});
                this.loaded = true;
            })
        } else if (this.props.user && this.props.time == 1){
            eventService.getEventsCurrentByUser_id(userService.currentUser.user_id).then(res => {
                let events = res;
                console.log(events);
                this.setState({events});
                this.loaded = true;
            })
        } else if (this.props.user && this.props.time == 2){
            eventService.getEventsUpcomingByUser_id(userService.currentUser.user_id).then(res => {
                let events = res;
                console.log(events);
                this.setState({events});
                this.loaded = true;
            })
        } else if (this.props.time == 0){
            eventService.getEventsPreviousByOrg_id(userService.currentUser.org_id).then(res => {
                let events = res;
                this.setState({events});
                this.loaded = true;
            })
        } else if (this.props.time == 1){
            eventService.getEventsCurrentByOrg_id(userService.currentUser.org_id).then(res => {
                let events = res;
                this.setState({events});
                this.loaded = true;
            })
        } else if (this.props.time == 2){
            eventService.getEventsUpcomingByOrg_id(userService.currentUser.org_id).then(res => {
              let events = res;
              this.setState({events});
              this.loaded = true;
          })
      }else if (this.props.time == 3){
            eventService.getEventsCancelledOrg_id(userService.currentUser.org_id).then(res => {
                let events = res;
                this.setState({events});
                this.loaded = true;
            })
        }else if (this.props.user && this.props.time == 3){
            eventService.getEventsCancelledUser_id(userService.currentUser.user_id).then(res => {
                let events = res;
                this.setState({events});
                this.loaded = true;
            })
        }
    }

    loadContent(){
        if (userService.currentUser && this.loaded){
            //gå gjennom alle event for å hente brukenrne som er tilknyttet dme
            this.state["events"].map(e => {
                userEventService.getAllUserEvent(e.event_id).then( res => {
                    let users = this.state["users"];
                    users.push(res);
                    this.setState({users});
                });
            });

            this.ready = true;
        }
    }
}