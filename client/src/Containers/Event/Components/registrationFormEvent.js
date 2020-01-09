//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import {Artist, ArtistDetails} from "./artist";
import {Ticket, TicketDetails} from "./ticketDropdown";
import {eventService} from "../../../services/EventService";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';

const history = createHashHistory();

export class RegistrationForm extends Component {
    artist: Artist[] = [];

    eventName: string = "";
    address: string = "";
    startDate: number = null;
    endDate: number = null;
    startTime: number = null;
    endTime: number = null;

    render(){
        return(
            <div>
                <div className="card-header">
                    <div className="form-inline">
                        <h2>Opprett nytt arrangement</h2>
                        <button className="btn btn-success" style={{marginLeft: "25%"}} onClick={this.regEvent}>Opprett</button>
                    </div>
                </div>
                <form className="card-body">
                    <div className="form-group">
                        <label>Arrangement Navn:</label>
                        <input className="form-control" placeholder="skriv inn navn her" value={this.eventName}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.eventName = event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Lokasjon:</label>
                        <input className="form-control" placeholder="Skriv inn addresse" value={this.address}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.address = event.target.value)}/>
                    </div>
                    <div className="form-inline">
                        <div className="row">
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
                                <input className="form-control" type="time" value={this.endTime}
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.endTime = event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group" style={{marginTop: 20+"px"}}>
                        <ArtistDetails/>
                        <Artist/>
                    </div>
                    <div className="form-group" style={{marginTop: 20+"px"}}>
                        <TicketDetails/>
                        <Ticket/>
                    </div>
                </form>
            </div>
        )
    }
    regEvent(){
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
            .postEvent(1, this.eventName, this.address, new Date(this.startDate+"T"+this.startTime+":00Z"), new Date(this.endDate+"T"+this.endTime+":00Z"), 0, 0)
            .then(history.push("/registerEvent"))
            .catch((error: Error) => console.log("feil ved registrering av event"));
//2020-01-10, 22:01
    }
}
