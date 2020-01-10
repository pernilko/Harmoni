//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Artist} from "../../../services/ArtistService";
import Accordion from "react-bootstrap/Accordion";

export class ArtistDropdown extends Component {

    artist: Artist[] = [];

    artist_name: string = "";
    riders: File = "";
    hospitality_riders: File = "";
    artist_contract: File = "";
    email: string = "";
    phone: string = "";
    image: string = "";

    render() {
        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0">
                            Legg til en artist
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
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
                                        <input type="tlf" className="form-control" placeholder="+47 00000000" value={this.phone}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone = event.target.value)}/>
                                    </div>
                                    <label>Rider:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01" value={this.riders}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.riders = event.target.value)}/>
                                        </div>
                                    </div><br/>
                                    <label>Hospitality rider:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01" value={this.hospitality_riders}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.hospitality_riders = event.target.value)}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <label>Artist contract:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01" value={this.artist_contract}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.artist_contract = event.target.value)}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="form-group" align="center">
                                        <Accordion.Toggle type="button"  as={Button} variant="success" eventKey="0" onClick={this.add}>
                                            Legg til
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

    add(){
        this.artist.push(new Artist(0,0,this.artist_name, this.riders, this.hospitality_riders,this.artist_contract,this.email, this.phone,this.image));
        this.artist_name = "";
        this.email = "";
        this.phone = "";
        this.riders = "";
        this.hospitality_riders = "";
        this.artist_contract = "";
        this.image = "";
        let s: any = ArtistDetails.instance();
        s.mounted();
    }
}

export class ArtistDetails extends Component {

    artist: Artist[] = [];
    render(){
        return (
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
                                <button className="btn btn-secondary" style={{marginRight: 10+"px", float: "right"}}>Rediger</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )
    }

    delete(a: Artist){
        const index = this.artist.indexOf(a);
        if(index > -1){
            this.artist.splice(index,1);
        }
    }

    mounted() {
        let s: any = ArtistDropdown.instance();
        this.artist = s.artist;
    }
}