import * as React from 'react';
import { Component } from "react-simplified";
import {Event, eventService} from '../../../services/EventService';
import { createHashHistory } from 'history';
import {Alert} from "../../../widgets";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import {userEventService} from "../../../services/UserEventService";
import {Container, Row, Spinner} from "react-bootstrap";
import "./showEvents.css";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const history = createHashHistory();
/**
    Pending viser frem de arrangementene som venter på å bli godkjent av økonomiansvarlig etter at de er ferdige.
 */
export class Pending extends Component<{}> {
    pending: Event[] = [];
    loaded: boolean = false;
    nowitsready: boolean = false;
    currentPage: number = 0;
    months: string[] = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
    /**
        @constructor konstruktøren lager et state-objekt hvor vi lagrer data om det skal vises frem i komponenten, slik at det kan oppdateres i sanntid.
     */
    constructor(props){
        super(props);
        this.state = {
            events: [],
            users: [],
            postPerPage: 6,
            currentPosts: [],
            items: []
        };
    }

    /**
        generer html for å vise frem komponenten
        @return {html} selve siden som skal vises frem
     */
    render() {
        if (!this.loaded) {
            if (userService.currentUser) {
                this.load();
            }
        }
        if(!this.nowitsready && this.loaded){
            this.loadPage();
        }
        if (this.pending.length !== 0) {
        return (
              <div className="container">
                  <div>
                      <ul className="pagination">
                          {this.state["items"].map((item, i) => (
                              <li className="page-item" ><Button type="button" id="pageButton" variant="secondary"  onClick={() => this.changePage(i)}>{i+1}</Button></li>
                          ))}
                      </ul>
                  </div>
                        {this.state["currentPosts"].map((e, i) =>
                            <Container>
                                <div id="eventcard" className="card" style={{marginLeft: "12%", marginRight: "12%", marginBottom: "2%", borderRadius: 6+"px", border: "none"}}>
                                    <Row style={{margin: 0}}>
                                        <Col sm={2} style={{padding: 0}}>
                                            <div
                                                className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")}
                                                id={i}>
                                                {this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ?
                                                    <div>
                                                        <div id="topButton" className="mx-4"
                                                             onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 1)}>
                                                            <button type = "button" id="top" type="button" className="btn btn-info btn-circle">
                                                                <i className="fa fa-check"></i>
                                                            </button>
                                                        </div>
                                                        <div className="button mx-4 my-3"
                                                             onClick={() => this.setAccepted(i, this.getUserEvent(e.event_id).user_id, e.event_id, 0)}>
                                                            <button id="top" type="button" className="btn btn-info btn-circle">
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
                                                        <h2 style={{textAlign: "left"}}> {e.event_name} </h2>
                                                        <p><b> Sted: </b> {e.place} </p>
                                                        <p><b> Stilling: </b>{this.getUserEvent(e.event_id) ? "Du er satt opp som " + this.getUserEvent(e.event_id).job_position + ".\n Bekreft valget ditt med knappene på venstre side." : "Du er ikke satt på dette arrangementet"}.</p>
                                                        <p><b> Tidspunkt: {this.setFormat(e.event_start, e.event_end)}</b></p>
                                                    </div>
                                                    <div>
                                                        <div className= "mx-4" onClick={() => this.completed(e.event_id)}>
                                                            <button type="button" className="btn btn-info btn-circle">
                                                                Klikk for å arkivere arrangement:
                                                                <i className="fa fa-check" ></i>
                                                            </button>
                                                        </div>
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
                              <li className="page-item" ><Button id="pageButton" variant="secondary"  onClick={() => this.changePage(i)}>{i+1}</Button></li>
                          ))}
                      </ul>
                  </div>
              </div>
        )
    } else{
            return (
              <div style={{color: 'white'}}>
                  Du har ingen arrangement til arkivering
              </div>
            )

        }
    }

    /**
        metoden henter ut raden som beskriver vakten til den brukeren som er logget inn hvis det er noen. Den tar inn arrangementet sin id og bruker informasjon om hvilken bruker som er logget inn til å sjekke hvem sin vakt det er snakk om.
        @parameter {number} event_id - id til arrangementet det er snakk om.
        @return {UserEvent} raden i DB som beskriver brukeren som er logget inn sitt vakt på et gitt arrangement, eller undefined
     */
    getUserEvent(event_id: number){
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
        return undefined;
    }

    /**
        setFormat beregner hvordan start og sluttidspunktet for et arrangement skal vises frem. F.eks skal den kun skrive hvilket år den starter og slutter i dersom den starter og slutter i to ulike år.
        @parameter {string} start - en string som beskriver når et arrangement starter.
        @parameter {string} end - en string som beskriver når et arrangement slutter.
        @return {string} en string som viser når arrangementer starter og slutter.
     */
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
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)] + " " + startYear + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)] + " " + endYear;
        }
        else if (startMonth !== endMonth) {
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)] + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)] + " " + endYear;
        }
        else {
            date = "kl. " + startTime + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)] + " " + endYear;
        }

        return date;
    }

    /**
        Metode for å arkivere arrangement
        @parameter {number} event_id - id til arrangementet som skal arkiveres.
     */
    completed(event_id: number){
        eventService
          .setCompleted(event_id)
          .then(response => console.log(response))
          .then(response => this.load())
          .then(Alert.success("Arrangementet ble arkivert"))
          .catch((error: Errror) => console.log(error.message));
    }

    /**
        Metoden henter arrangementene som skal vises frem på siden.
        @type this.loaded er en bolsk variabel som beskriver om dataen er hentet inn tidligere slik at ting skjer i rett rekkefølge.
     */
    load() {
        eventService
            .getEventsPending(userService.currentUser.user_id)
            .then(res => {
                this.pending = res;
                console.log("PENDING: ", this.pending);
                this.loaded = true;
            })
            .catch((error: Error) => console.log(error.message))
    }

    /**
        metoden beregner hvor mange sider med arrangementer som skal vises, og velger ut de som skal vises på den nåværende siden.
     */
    loadPage(){
        let amount = Math.ceil(this.pending.length/this.state["postPerPage"]);
        console.log(this.pending);
        let items = this.pending.slice(0, amount);
        console.log(items.length);
        this.setState({items});


        let indexOfFirstPost = this.currentPage * this.state["postPerPage"];
        let indexOfLastPost = indexOfFirstPost + this.state["postPerPage"];

        let currentPosts = this.pending.slice(indexOfFirstPost, indexOfLastPost);
        this.setState({currentPosts});

        this.nowitsready = true;
    }

    /**
        Metoden henter ut hvilke arrangement som skal vises når du bytter side og flytter brukeren opp til toppen av nettsiden.
        @parameter {number} currentPage - hvilken side vi nå skal rendere istedenfor
     */
    changePage(currentPage: number){
        this.currentPage = currentPage;

        let indexOfFirstPost = this.currentPage * this.state["postPerPage"];
        let indexOfLastPost = indexOfFirstPost + this.state["postPerPage"];

        let currentPosts = this.pending.slice(indexOfFirstPost, indexOfLastPost);
        this.setState({currentPosts});

        window.scrollTo(0,0);

    }
    
}
