//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {ArtistDropdown} from "./artist";
import {eventService, Event} from "../../../services/EventService";
import {TicketComp} from "./ticketDropdown";
import {Artist, artistService} from "../../../services/ArtistService";
import {Ticket, ticketService} from "../../../services/TicketService";

const history = createHashHistory();

export class EditEvent extends Component <{match: {params: {event_id: number}}}> {
    event: Event | any = new Event(2, 3, 1, "h", "h", "h", "h", "h", 1,0);
    artists: Artist[]=[];
    tickets: Ticket[] = [];
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;


    render() {
        if (this.artists && this.tickets && this.event) {
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
                        <div className="form-group">
                            <label>Lokasjon:</label>
                            <input className="form-control" placeholder="Skriv inn addresse" value={this.event.place}
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
                                    <input id="startdate" className="form-control" type="date" value={this.event.event_start.slice(0,10)}
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startDate = event.target.value)}/>
                                </div>
                                <div className="col">
                                    <label>Start tid:</label>
                                    <input className="form-control" type="time" value={this.event.event_start.slice(11,16)}
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startTime = event.target.value)}/>
                                </div>
                                <div className="col">
                                    <label>Slutt dato:</label>
                                    <input id="enddate" className="form-control" type="date" value={this.event.event_end.slice(0,10)}
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endDate = event.target.value)}/>
                                </div>
                                <div className="col">
                                    <label>Slutt tid:</label>
                                    <input className="form-control" type="time" value={this.event.event_end.slice(11,16)}
                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endTime = event.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{marginTop: 20 + "px"}}>
                            <div className="card">
                                <div className="card-header">
                                    <h3>Artister:</h3>
                                </div>
                                <div className="card-body">
                                    {this.artists.map(a => (
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col"><label>Artist: {a.artist_name} </label></div>
                                                <div className="col"><label>Email: {a.email}</label></div>
                                                <div className="col"><label>Tlf: {a.phone}</label></div>
                                                <div className="col"><label>Dokumenter: {a.riders}</label></div>
                                                <div className="col">
                                                    <button className="btn btn-danger" onClick={() => this.delete(a)}
                                                            style={{marginLeft: 10 + "px", float: "right"}}>Slett
                                                    </button>
                                                    <ArtistDropdown buttonName={"Rediger"} editMode={true} artist={a}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewArtist()}>Legg til artist</button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{marginTop: 20 + "px"}}>
                            <div className="card">
                                <div className="card-header">
                                    <h3>Billetter:</h3>
                                </div>
                                <div className="card-body">
                                    {this.tickets.map(ticket => (
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col"><label>Billett Type: {ticket.ticket_type}</label></div>
                                                <div className="col"><label>Beskrivelse: {ticket.description}</label></div>
                                                <div className="col"><label>Pris: {ticket.price} kr</label></div>
                                                <div className="col"><label>Antall: {ticket.amount}</label></div>
                                                <div className="col">
                                                    <button type="button" className="btn btn-danger" style={{marginLeft: 10+"px", float: "right"}} onClick={() => this.deleteTicket(ticket)}>Slett</button>
                                                </div>
                                            </div>
                                            <div className={"row"}>
                                                <div className={"col"}>
                                                    <TicketComp buttonName={"Rediger"} editMode={true} ticket={ticket}/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewTicket()}>Legg til billett</button>
                                </div>
                            </div>
                        </div>
                        <div className="btn-group" style={{width: "20%", marginLeft: "40%", padding: "20px"}}>
                            <button className="btn btn-success" type="button" onClick={this.edit}>Lagre</button>
                            <button className="btn btn-danger" type="button" onClick={this.cancel}>Avbryt</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return <div>Something went wrong :(</div>
        }
    }

    mounted() {
        eventService
            .getEventId(this.props.match.params.event_id)
            .then(event => this.event = event)
            .then(() => {
                this.getArtists(this.props.match.params.event_id);
                this.getTickets(this.props.match.params.event_id)
            })
            .catch((error: Error) => console.log(error.message))
    }

    getArtists(val: number) {
        artistService
            .getEventArtists(val)
            .then(artist => this.artists = artist)
    }

    getTickets(val: number){
        ticketService
            .getEventTickets(val)
            .then(ticket => this.tickets = ticket)

    }

    edit(){
        //Don't know what to do with lat and long. But Dilawar knows.
        eventService
            .updateEvent(this.event.event_id, this.event.org_id, this.event.event_name, this.event.description, this.event.place,this.startDate+" "+this.startTime+":00", this.endDate+" "+this.endTime+":00", 0,0)
            .then(() => {
                if (this.event) {
                    history.push("/");
                    Alert.success("Arrangementet er oppdatert!");
                }
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    deleteTicket(event_id: number){
        ticketService
            .deleteTicket(event_id)
            .then(this.mounted())
    }

    editTicket(id: number, event_id: number, ticket_type: string, amount: number, description: string, price: number, amount_sold: number){
        ticketService
            .updateTicket(id,event_id,ticket_type,amount,description,price,amount_sold)
    }
}