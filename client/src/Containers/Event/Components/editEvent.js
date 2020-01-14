//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {ArtistDetails} from "./artist";
import {eventService, Event} from "../../../services/EventService";
import {TicketComp} from "./ticketDropdown";
import {Artist, artistService} from "../../../services/ArtistService";
import {Ticket, ticketService} from "../../../services/TicketService";
import {TicketDetails} from "../Components/ticketDropdown";
import MapContainer from "./map";
import {getlatlng} from "./map";
import {EmployeesDetails} from "./employees";

const history = createHashHistory();

export class EditEvent extends Component <{match: {params: {event_id: number}}}> {
    event: any = null;
    artists: Artist[]=[];
    tickets: Ticket[] = [];
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;
    lat: float = 0;
    lng: float = 0; 


    render() {
        if (this.event && this.tickets && this.artists) {
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
                            <ArtistDetails/>
                        </div>
                        <div className="form-group" style={{marginTop: 20 + "px"}}>
                            <TicketDetails/>
                        </div>
                        <div className="form-group" style={{marginTop: 20+"px"}}>
                        <EmployeesDetails/>
                    </div>
                    <h2> Velg lokasjon på kartet: </h2>
                    <MapContainer lat={this.event.latitude} lng={this.event.longitude} show={true} edit={true}/>
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
            .then(event => {
                this.event = event;
                this.startDate = this.event.event_start.slice(0,10);
                this.startTime = this.event.event_start.slice(11,16);
                this.endDate = this.event.event_end.slice(0,10);
                this.endTime = this.event.event_end.slice(11,16);
            })
            .then(() => {
                this.getTickets(this.props.match.params.event_id);
                this.getArtists(this.props.match.params.event_id);
            })
            .catch((error: Error) => console.log(error.message))
    }

    getArtists(val: number) {
        artistService
            .getEventArtists(val)
            .then(artist => this.artists = artist)
            .then(() => {
                let s: any = ArtistDetails.instance();
                s.artist = this.artists;
            })
    }

    getTickets(val: number){
        ticketService   
            .getEventTickets(val)
            .then(ticket => this.tickets = ticket)
            .then(() => {
                let s: any = TicketDetails.instance();
                s.ticketList = this.tickets;
            })
            .catch((error: Error) => console.log(error.message))
    }

    edit(){
        this.lat = getlatlng()[0];
        this.lng = getlatlng()[1];
        console.log(this.startDate);
        //Don't know what to do with lat and long. But Dilawar knows.
        eventService
            .updateEvent(this.props.match.params.event_id, this.event.event_name, this.event.description, this.event.place,this.startDate+" "+this.startTime+":00", this.endDate+" "+this.endTime+":00", this.lng, this.lat, null)
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