//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import {ArtistDetails, ArtistDropdown} from "./artist";
import {Artist} from "../../../services/ArtistService";
import {TicketComp, TicketDetails} from "./ticketDropdown";
import {eventService} from "../../../services/EventService";
import {artistService} from "../../../services/ArtistService";
import {Ticket, ticketService} from "../../../services/TicketService";

import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
import {User, userService} from '../../../services/UserService';
import {sharedComponentData} from "react-simplified";
import MapContainer from "./map";
import {getlatlng} from "./map";

const history = createHashHistory();

export class RegistrationForm extends Component {
    artist: Artist[] = [];

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
    image: File = null;

    render(){
        return(
            <div>
                <div className="card-header">
                    <div className="form-inline">
                        <h2>Opprett et nytt arrangement</h2>
                    </div>
                </div>
                <form className="card-body">
                    <div className="form-group">
                        <label>Arrangement navn:</label>
                        <input className="form-control" placeholder="Skriv inn navn her" value={this.eventName}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.eventName = event.target.value)}/>
                    </div>
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
                    <div className="form-inline">
                        <div className="row">
                            <div className="col">
                                <label>Start dato:</label>
                                <input id="help" className="form-control" type="date" value={this.startDate}
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
                    </div>
                    <div className="form-group" style={{marginTop: 20+"px"}}>
                        <TicketDetails/>
                    </div>
                    <h2> Velg lokasjon på kartet: </h2>
                    <MapContainer show={false}/>
                    <div className="btn-group"  style={{width: "20%", marginLeft: "40%", padding: "20px"}}>
                        <button className="btn btn-success"  onClick={this.regEvent}>Opprett</button>
                        <button className="btn btn-danger" onClick={this.cancel}>Avbryt</button>
                    </div>
                </form>
            </div>
        )
    }

    regEvent(){
        console.log(this.eventName+"hei");

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
                this.addTickets(response[0]["LAST_INSERT_ID()"]);
                this.addArtists(response[0]["LAST_INSERT_ID()"]);
                history.push("/event/"+response[0]["LAST_INSERT_ID()"]);
            })
<<<<<<< HEAD
            .catch((error: Error) => console.log(error.message))

        history.push("/allEvents");
        Alert.success("Arrangementet ble opprettet");
=======
            .catch((error: Error) => console.log(error.message));

>>>>>>> 04513f806592ca528a181ae28fd29236774149cd
    }

    addArtists(val: number) {
        let artistDetails: any = ArtistDetails.instance();
        let artists = artistDetails.artist;
        console.log(artists);

        artists.map(a => {
            artistService
                .addArtist(val, a.artist_name, a.riders, a.hospitality_riders, a.artist_contract, a.email, a.phone, a.image)
                //.catch((error: Error) => console.log(error.message))
            });
    }

    addTickets(val: number) {
        let ticketDetails: any = TicketDetails.instance();
        let tickets = ticketDetails.ticketList;
        console.log(tickets);

        tickets.map(t => {
            ticketService
                .addTicket(val, t.ticket_type, t.amount, t.description, t.price, t.amount_sold)
                .then(response => console.log(response))
                .catch((error: Error) => console.log(error.message))
            });
    }

    cancel(){
      history.push("/allEvents");
    }
}
