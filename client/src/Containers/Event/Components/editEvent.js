//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {ArtistDetails} from "./artist";
import {eventService, Event} from "../../../services/EventService";
import {Artist, artistService} from "../../../services/ArtistService";
import {Ticket, ticketService} from "../../../services/TicketService";
import {UserEvent, userEventService} from "../../../services/UserEventService";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {User, userService} from "../../../services/UserService";
import {TicketDetails} from "./ticketDropdown";
import MapContainer from "./map";
import {getlatlng} from "./map";
import {Employees, EmployeesDetails} from "./employees";
import {del_artist} from "./artist";
import {del_ticket} from "./ticketDropdown";
import {del_employee} from "./employees";
import {sharedComponentData} from "react-simplified";
import {Spinner} from "react-bootstrap";
import Popup from "reactjs-popup";
import Form from 'react-bootstrap/Form';

const history = createHashHistory();

const original_artists: Artist[] = [];
const original_tickets: Ticket[] = [];
const original_employees: UserEvent[] = [];

export class EditEvent extends Component <{match: {params: {event_id: number}}}> {
    event: any = null;
    artists: Artist[]=[];
    add_artists: Artist[] = [];
    update_artists: Artist[] = [];
    add_tickets: Ticket[] = [];
    update_tickets: Ticket[] = [];
    tickets: Ticket[] = [];
    employees: UserEvent[] = [];
    add_employees: UserEvent[] = [];
    update_employees: UserEvent[] = [];
    users: User[] = [];
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;
    lat: float = 0;
    lng: float = 0;
    loaded: boolean = false;
    restLoaded = false;
    empDet: any = null;
    changed: boolean = false;

    render() {
        if(!this.loaded){
            this.load();
            this.loaded = true;
        }
        if (this.event && this.tickets && this.artists && userService.currentUser) {
            if(this.event.user_id == userService.currentUser.user_id || userService.currentUser.privileges == 1) {
                if(!this.restLoaded){
                    this.loadRest();
                    this.restLoaded = true;
                }
                return (
                    <div>
                        <div className="card-header">
                            <div className="form-inline">
                                <h2>Rediger arrangementet</h2>
                            </div>
                        </div>
                        <form className="card-body">
                            <div className="form-group">
                                <label>Arrangement navn:</label>
                                <input className="form-control" placeholder="Skriv inn navn her"
                                       value={this.event.event_name}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event.event_name = event.target.value)}/>
                            </div>
                            <Form.Group>
                                <Form.Label>Last opp bilde</Form.Label>
                                <Form.Control accept = "image/*" type="file" onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {this.event.image =
                                event.target.files[0]}}/>
                            </Form.Group>
                            <div className="form-group">
                                <label>Lokasjon:</label>
                                <input className="form-control" placeholder="Skriv inn addresse"
                                       value={this.event.place}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event.place = event.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label>Beskrivelse:</label>
                                <textarea className="form-control" defaultValue={this.event.description}
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event.description = event.target.value)}/>
                            </div>
                            <div className="form-inline">
                                <div className="row">
                                    <div className="col">
                                        <label>Start dato:</label>
                                        <input id="startdate" className="form-control" type="date"
                                               value={this.startDate}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startDate = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Start tid:</label>
                                        <input className="form-control" type="time" value={this.startTime}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startTime = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Slutt dato:</label>
                                        <input id="enddate" className="form-control" type="date" value={this.endDate}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endDate = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>Slutt tid:</label>
                                        <input className="form-control" type="time" value={this.endTime}
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
                            <MapContainer lat={this.event.latitude} lng={this.event.longitude} show={true} edit={true}/>
                            <div className="btn-group" style={{width: "20%", marginLeft: "40%", padding: "20px"}}>
                                <Popup trigger={<a
                                    className="btn btn-success">Lagre</a>}>
                                    {close => (
                                        <div>
                                            <p><b>Vil du varsle personalet om endringen(e)?</b></p>
                                            <button className="btn btn-warning float-left ml-3" onClick={() => {
                                                this.edit(false);
                                            }}>Nei
                                            </button>
                                            <button className="btn btn-success float-right mr-3"
                                                    onClick={() => this.edit(true)}>Ja
                                            </button>
                                        </div>
                                    )}
                                </Popup>
                                <button className="btn btn-danger" type="button" onClick={this.cancel}>Avbryt</button>
                            </div>
                        </form>
                    </div>
                )
            }else{
                Alert.danger("ikke autorisert");
                return <div></div>
            }
        } else {
            return <Spinner animation="border"></Spinner>
        }
    }
    
    load() {
        eventService
            .getEventId(this.props.match.params.event_id)
            .then(event => {
                this.event = event;
                this.startDate = this.event.event_start.slice(0,10);
                this.startTime = this.event.event_start.slice(11,16);
                this.endDate = this.event.event_end.slice(0,10);
                this.endTime = this.event.event_end.slice(11,16);
                this.eventLoaded = true;
            })
            /*
            .then(() => {
                this.getArtists(this.props.match.params.event_id);
                this.getTickets(this.props.match.params.event_id);
                this.getEmployees(this.props.match.params.event_id);
            })*/
    }
    loadRest(){
        this.getArtists(this.props.match.params.event_id);
        this.getTickets(this.props.match.params.event_id);
        this.getEmployees(this.props.match.params.event_id);
    }

    getArtists(val: number) {
        artistService
            .getEventArtists(val)
            .then(artist => {
                this.artists = artist;
                let s: any = ArtistDetails.instance();
                s.artist = this.artists;
                console.log(s.artist);
                s.artist.map(a => original_artists.push(a));
            })
    }

    getTickets(val: number){
        ticketService   
            .getEventTickets(val)
            .then(ticket => {
                this.tickets = ticket
                let s: any = TicketDetails.instance();
                s.ticketList = this.tickets;
                console.log(s.ticketList);
                s.ticketList.map(t => original_tickets.push(t));
            })
    }

    getEmployees(val: number) {
        userEventService
            .getAllbyId(val)
            .then(employee => {
                this.employees = employee
                let s: any = EmployeesDetails.instance();
                s.emp = this.employees;
                s.hidden = true;
                console.log(s.emp);
                s.emp.map(e => original_employees.push(e));
            })
    }

    edit(sendMail: boolean){
        this.lat = getlatlng()[0];
        this.lng = getlatlng()[1];
        //console.log(this.startDate);
        //Don't know what to do with lat and long. But Dilawar knows.
        eventService
            .updateEvent(this.props.match.params.event_id, this.event.event_name, this.event.description, this.event.place,this.startDate+" "+this.startTime+":00", this.endDate+" "+this.endTime+":00", this.lng, this.lat)
            .then(response => {
                console.log(response);
                this.changePic(this.props.match.params.event_id)
                this.updateAddArtists();
                this.updateAddTickets();
                this.updateAddEmployees();
                this.updateArtists(this.update_artists);
                this.addArtists(this.add_artists);
                this.deleteArtists(del_artist);
                this.updateTickets(this.update_tickets);
                this.addTickets(this.add_tickets);
                this.deleteTickets(del_ticket);
                this.deleteEmployees(del_employee);
                this.addEmployees(this.add_employees);
                if (sendMail) {
                    this.notifyAdd(this.props.match.params.event_id, this.event.event_name, this.add_employees);
                    this.notifyDelete(this.props.match.params.event_id, this.event.event_name, del_employee);
                }
                console.log(this.employees.length);
                console.log(original_employees.length);
                if (this.add_employees.length == 0 && del_employee.length == 0) {
                    this.notifyEdit(this.props.match.params.event_id, this.event.event_name, original_employees);
                }
            })
            .catch((error: Error) => Alert.danger(error.message));
        history.push("/allEvents");
        Alert.success("Arrangementet ble redigert.");
    }

    updateAddArtists() {

        //console.log(this.artists);
        //console.log(original_artists);
        //console.log(del_artist);
        let update: Artist[] = [];
        let add: Artist[] = [];
        this.artists.map(a => {
            if (a) {
                let found: bool = false;
                original_artists.map(oa => {
                    if (a.artist_id == oa.artist_id) {
                        found = true;
                    }
                });
                if (found) {
                    update.push(a);
                }
                else {
                    add.push(a);
                }
            }
        });
        this.add_artists = add;
        this.update_artists = update;
    }

    updateAddTickets() {

        /*console.log(this.tickets);
        console.log(original_tickets);
        console.log(del_ticket);*/
        
        let update: Ticket[] = [];
        let add: Ticket[] = [];
        this.tickets.map(t => {
            if (t) {
                let found: bool = false;
                original_tickets.map(ot => {
                    if (t.ticket_id == ot.ticket_id) {
                        found = true;
                    }
                });
                if (found) {
                    update.push(t);
                }
                else {
                    add.push(t);
                }
            }
        });
        this.add_tickets = add;
        this.update_tickets = update;
    }

    updateAddEmployees() {
        let add: UserEvent[] = [];
        this.employees.map(e => {
            if (e) {
                let found: bool = false;
                original_employees.map(oe => {
                    if (e.user_id == oe.user_id && e.event_id == oe.event_id) {
                        found = true;
                    }
                });
                if (!found) {
                    let emp: UserEvent = new UserEvent(e.user_id, parseInt(this.props.match.params.event_id), e.job_position, e.user_name, e.email, 2);
                    add.push(emp);
                }
            }
        });
        this.add_employees = add;
    }

    updateArtists(artists: Artist[]) {
        console.log("UPDATE ARTISTS: ", artists);
        artists.map(a => {
           artistService
            .updateArtist(a.artist_id, a.artist_name, a.riders, a.hospitality_riders, a.artist_contract, a.email, a.phone)
            .then(response => console.log(response))
        });
    }

    deleteArtists(artists: Artist[]) {
        console.log("DELETE ARTISTS: ", artists);
        artists.map(a => {
            artistService
                .deleteArtist(a.artist_id)
                .then(response => console.log(response))
        })
    }

    addArtists(artists: Artist[]) {
        console.log("ADD ARTISTS: ", artists);
        artists.map(a => {
            artistService
                .addArtist(this.props.match.params.event_id, a.artist_name, a.email, a.phone, a.riders, a.hospitality_riders, a.artist_contract)
                .then(response => console.log(response))     
        })  
    }

    updateTickets(tickets: Ticket[]) {
        console.log("UPDATE TICKETS: ", tickets);
        tickets.map(t => {
            ticketService
                .updateTicket(t.ticket_id, t.event_id, t.ticket_type, t.amount, t.description, t.price, t.amount_sold)
                .then(response => console.log(response))
        })
    }

    addTickets(tickets: Ticket[]) {
        console.log("ADD TICKETS: ", tickets);
        tickets.map(t => {
            ticketService
                .addTicket(this.props.match.params.event_id, t.ticket_type, t.amount, t.description, t.price, t.amount_sold)
                .then(response => console.log(response))
        })
    }

    deleteTickets(tickets: Ticket[]) {
        console.log("DELETE TICKETS: ", tickets);
        tickets.map(t => {
            ticketService
                .deleteTicket(t.ticket_id)
                .then(response => console.log(response))
        })
    }

    addEmployees(employees: UserEvent[]) {
        console.log("ADD EMPLOYEES: ", employees);
        
        employees.map(e => {
            e.event_id = this.props.match.params.event_id;
            userEventService
                .addUserEvent(e.user_id, e.event_id, e.job_position, e.accepted)
                .then(response => console.log(response))
                .catch((error: Error) => console.log(error.message))
        })
    }

    deleteEmployees(employees: UserEvent[]) {
        console.log("DELETE", employees);
        employees.map(e => {
            e.event_id = this.props.match.params.event_id;
            userEventService
                .deleteUserEvent(e.user_id, e.event_id)
                .then(response => console.log(response))
                .catch((error: Error) => console.log(error.message))
        })
    }

    notifyAdd(val: number, name: string, employees: UserEvent[]) {
        console.log("INVITER: ", employees);

        employees.map(e => {
            if (e) {
                userEventService
                    .notify(val, name, e.job_position, e.email)
                    .then(response => console.log(response))
            }
        })
    }

    notifyDelete(val: number, name: string, employees: UserEvent[]) {
        console.log("INVITER: ", employees);

        employees.map(e => {
            if (e) {
                userEventService
                    .notifyDelete(val, name, e.job_position, e.email)
                    .then(response => console.log(response))
            }
        })
    }

    notifyEdit(val: number, name: string, employees: UserEvent[]) {
        console.log("INVITER: ", employees);

        employees.map(e => {
            if (e) {
                userEventService
                    .notifyEdit(val, name, e.job_position, e.email)
                    .then(response => console.log(response))
            }
        })
    }

    changePic(val: number){
    console.log("BILDE: ", this.event.image);
      eventService
        .updateEventImage(val, this.event.image)
        .then(() => {
          if(userService.currentUser){
            userService.autoLogin();
            history.push("/Profile");
          }
        })

  }
}