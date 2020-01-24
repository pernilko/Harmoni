//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import {ArtistDetails, ArtistDropdown} from "./artist";
import {Artist} from "../../../services/ArtistService";
import {TicketComp, TicketDetails} from "./ticketDropdown";
import {eventService} from "../../../services/EventService";
import {artistService} from "../../../services/ArtistService";
import {Ticket, ticketService} from "../../../services/TicketService";
import {UserEvent, userEventService} from "../../../services/UserEventService";
import Form from 'react-bootstrap/Form';
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {User, userService} from '../../../services/UserService';
import {sharedComponentData} from "react-simplified";
import {Employees, EmployeesDetails} from "./employees";
import "./event.css";

import MapContainer from "./map";
import {getlatlng} from "./map";
import {Spinner} from "react-bootstrap";

let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const history = createHashHistory();

/**
    Denne komponeten bruker for å opprette nye arrangementer.
    Den anvender en rekke andre komponenter som inneholder egne skjemaer for delene som utgjør et arrangemente (artister, billetter osv). 
 */
export class RegistrationForm extends Component {
    artists: Artist[] = [];
    tickets: Ticket[] = [];
    employees: UserEvent[] = [];
    loaded:boolean = false;

    event_id: number = 0;
    eventName: string = "";
    user_id: number = 0;
    address: string = "";
    description: string = "";
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;
    lat: number = 0;
    lng: number = 0;
    image: string = "";

    /**
        funksjonen generer html for å vise frem komponenten
        @return html-element som inneholder komponenten.
     */
    render(){
                return (
                  <div id="whole-page" className="container-fluid">
                    <div id="con" className="container">
                        <div className="card-header" style={{marginTop:'5%'}}>
                            <div className="form-inline">
                                <h2>Opprett et nytt arrangement</h2>
                            </div>
                        </div>
                        <form className="card-body">
                            <div className="form-group">
                                <label>Forhåndsvisning:</label>
                                <div>
                                    <img id="preview_add" src={this.image ? this.image : "https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Arrangement navn:</label>
                                <input className="form-control" placeholder="Skriv inn navn her" value={this.eventName}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.eventName = event.target.value)}/>
                            </div>
                            <Form.Group>
                                <Form.Label>Last opp bilde</Form.Label>
                                <input className="form-control-file" type="file" accept = "image/*" onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {
                                    let ascii = /^[ -~]+$/;
                                    if (event.target.files[0]) {
                                        if (!ascii.test(event.target.files[0].name)) {
                                            Alert.danger("Ugyldig filnavn: unngå å bruke bokstavene 'Æ, Ø og Å'");
                                        } else {
                                            this.image = event.target.files[0];
                                        }
                                    }
                                    let reader = new FileReader();
                                    reader.onload = (
                                        function()
                                        {
                                            return function(e) {
                                                document.getElementById("preview_add").src = e.target.result;
                                            };
                                        })(this.org_image);
                                    reader.readAsDataURL(event.target.files[0]);
                                }}/>
                            </Form.Group>
                            <div className="form-group">
                                <label>Lokasjon:</label>
                                <input className="form-control" placeholder="Skriv inn addresse" value={this.address}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.address = event.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Beskrivelse:</label>
                                <textarea className="form-control" value={this.description}
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.description = event.target.value)}/>
                            </div>
                            <div className="form-group d-inline-block">
                                <div className="row" style={{width:'inherit'}}>
                                    <div className="col">
                                        <label>Start dato:</label>
                                        <input className="form-control" type="date" value={this.startDate}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startDate = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Start tid:</label>
                                        <input className="form-control" type="time" value={this.startTime}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startTime = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Slutt dato:</label>
                                        <input className="form-control" type="date" value={this.endDate}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endDate = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Slutt tid:</label>
                                        <input  className="form-control" type="time" value={this.endTime}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endTime = event.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group" style={{marginTop: 20 + "px"}}>
                                <ArtistDetails/>
                            </div>
                            <div className="form-group" style={{marginTop: 20 + "px"}}>
                                <TicketDetails/>
                            </div>
                            <div className="form-group" style={{marginTop: 20 + "px"}}>
                                <EmployeesDetails/>
                            </div>
                            <h2> Velg lokasjon på kartet: </h2>
                            <MapContainer show={false}/>
                            <div className="btn-group">
                                <button type = "button" className="btn btn-success" onClick={this.regEvent}>Opprett</button>
                                <button className="btn btn-danger" onClick={this.cancel}>Avbryt</button>
                            </div>
                        </form>
                    </div>
                  </div>
                )
    }

    /**
        denne metoden kjøres når komponenten opprettes og skal hente ut instansene av de listene med informasjon om f.eks billetter som blir laget i registreringskomponentene for disse mindre enhetene.
     */
    mounted() {
        this.getArtists();
        this.getTickets();
        this.getEmployees();
    }

    /**
        Henter instansen av artistene som er registrert til hovedskjemaet så dataen er tilgjengelig i denne kompoenten
     */
    getArtists() {
        let s: any = ArtistDetails.instance();
        this.artists = s.artist;
    }

    /**
        Henter instansen av billettene som er registrert til hovedskjemaet så dataen er tilgjengelig i denne kompoenten
     */
    getTickets() {
        let s: any = TicketDetails.instance();
        this.tickets = s.ticketList;
    }

    /**
        Henter instansen av de ansatte som er registrert til hovedskjemaet så dataen er tilgjengelig i denne kompoenten
     */
    getEmployees() {
        let s: any = EmployeesDetails.instance();
        this.employees = s.emp;

    }

    /**
        hvis brukeren har rettighetene som er nødvendige, og skjemaet er fylt ut på en gyldig måte vil event legges til i databasen.
     */
    regEvent(){
        if (!userService.currentUser) {
            Alert.danger("Ikke autorisert")
            return;
        }else{
                if (userService.currentUser.p_create_event < 1 && userService.currentUser.privileges != 1) {
                Alert.danger("Ikke autorisert")
                return;    
            }
        }
        console.log(this.eventName+" hei");

        console.log(getlatlng()[0]);
        console.log(getlatlng()[1]);

        //getlatlng returns [LAT, LNG]
        this.lat = getlatlng()[0];
        this.lng = getlatlng()[1];

        if (this.eventName === "") {
            Alert.danger("Ugyldig arrangement navn");
            return;
        }
        if (this.address === "") {
            Alert.danger("Ugyldig adresse");
            return;
        }
        if(this.startDate === null){
            Alert.danger("Ugyldig start dato");
            return;
        }
        if(this.endDate === null){
            Alert.danger("Ugyldig slutt dato");
            return;
        }
        if(this.startTime === null){
            Alert.danger("Ugyldig start tid");
            return;
        }
        if(this.endTime === null){
            Alert.danger("Ugyldig slutt tid");
            return;
        }
        console.log(this.startDate +", "+ this.startTime);
        console.log(this.endDate +", "+ this.endTime);

        eventService
            .postEvent(userService.currentUser.org_id, this.eventName, userService.currentUser.user_id, this.description, this.address, this.startDate+" "+this.startTime+":00", this.endDate+" "+this.endTime+":00",this.lng,  this.lat)
            .then(response => {
                this.changePic(response[0]["LAST_INSERT_ID()"]);
                this.addTickets(response[0]["LAST_INSERT_ID()"], this.tickets);
                this.addArtists(response[0]["LAST_INSERT_ID()"], this.artists);
                this.addEmployee(response[0]["LAST_INSERT_ID()"], this.employees);
                this.notify(response[0]["LAST_INSERT_ID()"], this.eventName, this.employees);
            }).then(()=>{
            history.push("/mineEvents");
            Alert.success("Arrangementet ble opprettet");
        })
            .catch((error: Error) => console.log(error.message))
    }

    /**
        Metoden legger til alle artistene som er med på arrangementet i databasen.
     */
    addArtists(val: number, artists: Artist[]) {
        console.log("ARTISTER: ", artists);
        artists.map(a => {
            if(a) {
                console.log(a);
                artistService
                    .addArtist(val, a.artist_name, a.email, a.phone, a.riders, a.hospitality_riders, a.artist_contract)
                    .then(res => console.log(res))
                    .catch((error:Error)=>Alert.danger(error.message));
            }
        });
    }

    /**
        Metoden legger til alle billettypene til arrangementet i databasen.
     */
    addTickets(val: number, tickets: Ticket[]) {
        console.log("BILLETTER: ", tickets);

        tickets.map(t => {
            if (t) {
                ticketService
                    .addTicket(val, t.ticket_type, t.amount, t.description, t.price, t.amount_sold)
                    .then(response => console.log(response))
            }
        });
    }

    /**
        Metoden legger til alle de ansatte i arrangementet i databasen.
     */
    addEmployee(val: number, employees: UserEvent[]){
        console.log("ANSATTE: ", employees);

        employees.map(e => {
            if (e) {
                userEventService
                    .addUserEvent(e.user_id, val, e.job_position, e.accepted)
                    .then(response => console.log(response))
            }
        });
    }

    /**
        Metoden sender ut en mail til alle de som har blitt satt opp på en stilling slik at de er klar over det.
     */
    notify(val: number, name: string, employees: UserEvent[]) {
        console.log("INVITER: ", employees);

        employees.map(e => {
            if (e) {
                userEventService
                    .notify(val, name, e.job_position, e.email)
                    .then(response => console.log(response))
            }
        })
    }

    /**
        Metoden oppdaterer bildet til arrangementet i databasen.
     */
    changePic(val: number){
    console.log("BILDE: ", this.image);
      eventService
        .updateEventImage(val, this.image)
        .then(() => {
          if(userService.currentUser){
            userService.autoLogin();
            //history.push("/Profile");
          }
        })
    }

    /**
        Metoden brukes til å kansellere opprettelsen av et nytt arrangement og sender brukeren tilbake til oversikten over alle arrangement.
     */
    cancel(){
      history.push("/alleEvents");
    }
}
