//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {ArtistDetails, ArtistDropdown} from "./artist";
import {eventService, Event} from "../../../services/EventService";
import {TicketComp, TicketDetails} from "./ticketDropdown";
import {Artist, artistService} from "../../../services/ArtistService";

const history = createHashHistory();

export class EditEvent extends Component <{match: {params: {event_id: number}}}> {
    event: Event | any = new Event(2, 3, "h", "h", "h", "h", "h", 0, 1);
    artist: Artist[] = [];
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;

    render() {
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
                        <input className="form-control" placeholder="Skriv inn navn her" value={this.event.event_name}
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
                                <input id="help" className="form-control" type="date" value={this.start_date}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startDate = event.target.value)}/>
                            </div>
                            <div className="col">
                                <label>Start tid:</label>
                                <input className="form-control" type="time" value={this.start_time}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.startTime = event.target.value)}/>
                            </div>
                            <div className="col">
                                <label>Slutt dato:</label>
                                <input className="form-control" type="date" value={this.end_date}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endDate = event.target.value)}/>
                            </div>
                            <div className="col">
                                <label>Slutt tid:</label>
                                <input className="form-control" type="time" value={this.end_time}
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
                                {this.artist.map(a => (
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col"><label>Artist: {a.artist_name} </label></div>
                                            <div className="col"><label>Email: {a.email}</label></div>
                                            <div className="col"><label>Tlf: {a.phone}</label></div>
                                            <div className="col"><label>Dokumenter: {a.riders}</label></div>
                                            <div className="col">
                                                <button className="btn btn-danger" onClick={() => this.delete(a)} style={{marginLeft: 10+"px", float: "right"}}>Slett</button>
                                                <ArtistDropdown buttonName={"Rediger"} editMode={true} artist={a}/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>





                        <ArtistDropdown buttonName={"Legg til artist"} editMode={false}
                                        artist={new Artist(0, 0, "", "", "", "", "", null, "")}/>
                    </div>
                    <div className="form-group" style={{marginTop: 20 + "px"}}>
                        <TicketDetails/>
                        <TicketComp/>
                    </div>
                    <div className="btn-group" style={{width: "20%", marginLeft: "40%", padding: "20px"}}>
                        <button className="btn btn-success" onClick={this.edit}>Lagre</button>
                        <button className="btn btn-danger" onClick={this.cancel}>Avbryt</button>
                    </div>
                </form>
            </div>
        )
    }

    mounted() {
        eventService
            .getEventId(this.props.match.params.event_id)
            .then(event => this.event = event)
            .catch((error: Error) => console.log(error.message));

    }

    edit(){
        //Don't know what to do with lat and long
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
}