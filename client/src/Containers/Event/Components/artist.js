//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Artist} from "../../../services/ArtistService";
import Accordion from "react-bootstrap/Accordion";
import {Alert} from "../../../widgets";

let del_artist: Artist[] = [];

/**
 * Variabel for å sjekke om en string er en gyldig email-addresse
 * @type {RegExp}
 */
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * ArtistDropdown
 * Dette er en komponent klasse som brukes til å lage nye artister.
 * @requires react
 * @requires react-simplified
 * @requires react-bootstrap
 * @constructor
 * @param {string} buttonName - Dette er hva som skal stå på knappen som man trykker på for å se ArtistDropdown
 */
export class ArtistDropdown extends Component<{buttonName: string, artist: Artist}> {
    state: Object={raider: null, hraider: null,contract: null};
    artist: Artist[] = [];

    artist_name: string = this.props.artist.artist_name;
    currentriders: string = this.props.artist.riders;
    riders: File = this.props.artist.riders;
    currenthospitality_riders: string = this.props.artist.hospitality_riders;
    hospitality_riders: File = this.props.artist.hospitality_riders;
    currentartist_contract: string = this.props.artist.artist_contract;
    artist_contract: File = this.props.artist.artist_contract;
    email: string = this.props.artist.email;
    phone: string = this.props.artist.phone;
    //image: string = this.props.image;

    /**
     * Dette er metoden som brukes for å generere en HTML komponent for å redigere artist.
     * @returns {*} - Dette returnerer en HTML komponent.
     */
    render() {
        return (
            <Accordion>
                <Card style={{border: "none"}}>
                    <Card.Header style={{border: "none"}}>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0" style = {{float: "left"}}>
                            {this.props.buttonName}
                        </Accordion.Toggle>
                        <button type="button" className="btn btn-danger" onClick={() => this.delete(this.props.artist)} style={{marginLeft: 10+"px", float: "left"}}>Slett</button>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" style={{border: "none"}}>
                        <Card.Body style={{width: "70%"}}>
                            <form style={{padding: 20 + 'px', width: "100%" , position: "sticky", overflow: "visible"}}>
                            <div className="form-group">
                                <row>
                                    <h4>Kontakt info: </h4><br/>
                                    <div className="form-group">
                                        <label>Fullt navn:</label>
                                        <input type="text" className="form-control" placeholder="Ola Nordmann" value={this.artist_name}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.artist_name = event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>E-post: </label>
                                        <input type="epost" className="form-control" placeholder="olanordmann@gmail.com" value={this.email}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Mobilnummer: </label>
                                        <input type="text" className="form-control" placeholder="+47 00000000" value={this.phone}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone = event.target.value)}/>
                                    </div>
                                    <label>Rider:</label><br/>
                                    <div>
                                        <a href = {this.currentriders} target = "blank" style = {{color: "blue"}}>{this.currentriders?<p>Nåværende riders</p>:<div></div>}</a>
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="raider" accept='.pdf'
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                                       if(event.target.files[0]) {
                                                           let ascii = /^[ -~]+$/;

                                                           if (!ascii.test(event.target.files[0].name)) {
                                                               Alert.danger("Ugyldig filnavn: unngå å bruke bokstavene 'Æ, Ø og Å'");
                                                           } else {
                                                               this.riders = event.target.files[0];
                                                           }
                                                       }
                                                   }
                                                   }/>
                                        </div>
                                    </div><br/>
                                    <label>Hospitality rider:</label><br/>
                                    <a href = {this.currenthospitality_riders} target = "blank" style = {{color: "blue"}}>{this.currenthospitality_riders?<p>Nåværende hospitality riders</p>:<div></div>}</a>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="hospitality-raider" accept='.pdf'
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                                       if(event.target.files[0]) {
                                                           let ascii = /^[ -~]+$/;

                                                           if (!ascii.test(event.target.files[0].name)) {
                                                               Alert.danger("Ugyldig filnavn: unngå å bruke bokstavene 'Æ, Ø og Å'");
                                                           } else {
                                                               this.hospitality_riders = event.target.files[0];
                                                           }
                                                       }
                                                   }}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <label>Artistkontrakt:</label><br/>
                                    <a href = {this.currentartist_contract} target = "blank" style = {{color: "blue"}}>{this.currentartist_contract?<p>Nåværende artistkontrakt</p>:<div></div>}</a>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="contract" accept='.pdf'
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                                       if(event.target.files[0]) {
                                                           let ascii = /^[ -~]+$/;

                                                           if (!ascii.test(event.target.files[0].name)) {
                                                               Alert.danger("Ugyldig filnavn: unngå å bruke bokstavene 'Æ, Ø og Å'");
                                                           } else {
                                                               this.artist_contract = event.target.files[0];
                                                           }
                                                       }
                                                   }}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="form-group" align="center">
                                        <Accordion.Toggle type="button"  as={Button} variant="success" eventKey="0" onClick={() => {this.add()}}>
                                            Lagre
                                        </Accordion.Toggle>
                                    </div>
                                </row>
                            </div>
                        </form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }

    /**
     * Dette er metoden man bruker for å legge inn artist i arangement
     * For å legge inn ny artist må man ha navn +e-post|tlf
     */
    add(){
        if (this.artist_name == "") {
            Alert.danger("Artist navn ikke fylt inn.");
            return;
        }
        if (!emailRegEx.test(this.email) && this.phone == "") {
            Alert.danger("Telefonnummer eller gyldig epost-adresse må fylles inn.");
            return;
        }

        if(this.pris < 0){
            this.pris = 0;
            Alert.danger("Pris kan ikke være en negativ verdi");
            return;
        }

        console.log(this.state);
        const index = this.artist.indexOf(this.props.artist);
        this.artist[index] = new Artist(this.props.artist.artist_id,this.props.artist.event_id,this.artist_name ,this.email, this.phone, this.riders, this.hospitality_riders, this.artist_contract);
        //let s: any = ArtistDetails.instance();
        //s.mounted();
    }

    /**
     * Dette er en funksjon som kjører før render funksjonen.
     * Vi bruker denne til å ikke overskrive detaljene til artisten
     */
    mounted(): unknown {
        let s: any = ArtistDetails.instance();
        this.artist = s.artist;
    }

    /**
     * Dette er funskjeonen man bruker for å slette en artist.
     * @param {Artist} a - Parameteren tar inn et artist objektav artisten som skal slettes
     */
    delete(a: Artist){
        del_artist.push(a);
        const index = this.artist.indexOf(a);
        if (index > -1) {
            this.artist[index] = null;
        }
    }
}

/**
 * Denne klassen skal vise artist informasjonen på en oversiktlig måte, og evt mulighet til å lage nye
 */
export class ArtistDetails extends Component {

    artist: Artist[] = [];

    /**
     * Denne klassen inneholder en react komponent som skal vise informasonen til alle artister som er koblet til et arrangement
     * @returns {*} - Denne metoden returnerer en komponent som viser detaljene til alle atristene i et arrangement
     */
    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h3>Artister:</h3>
                </div>
                <div className="card-body">
                    {this.artist.map(a => {if (a) { return(
                    <div className="card-header">
                        <div className="row">
                            <div className="col"><label>Artist: {a.artist_name} </label></div>
                            <div className="col"><label>Email: {a.email}</label></div>
                            <div className="col"><label>Tlf: {a.phone}</label></div>
                        </div>
                        <div className={"row"}>
                            <div className={"col"}>
                                <ArtistDropdown buttonName={"Legg til"} artist={a}/>
                            </div>
                        </div>
                    </div>
                    )}})}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewArtist()}>Legg til artist</button>
                </div>
            </div>
        )
    }

    /**
     * Denne metoden skal lage en ny tom artist som brukeren skal fylle inn med informeasjon.
     */
    addNewArtist(){
        let a: Artist = new Artist(-1, 0, "", "", "", null, null, null, null);
        this.artist.push(a);
    }
}

export { del_artist };
