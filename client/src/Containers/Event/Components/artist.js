//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Artist} from "../../../services/ArtistService";
import Accordion from "react-bootstrap/Accordion";

export class ArtistDropdown extends Component<{buttonName: string, editMode: boolean, artist: Artist}> {
    state: Object={raider: new FileReader(),hraider: new FileReader(),contract: new FileReader()};
    readState: Object={raiderReader:null,hRaiderReader:null,contractReader:null};
    artist: Artist[] = [];

    artist_name: string = this.props.artist.artist_name;
    riders: Buffer = this.props.artist.riders;
    hospitality_riders: Buffer = this.props.artist.hospitality_riders;
    artist_contract: Buffer = this.props.artist.artist_contract;
    email: string = this.props.artist.email;
    phone: string = this.props.artist.phone;
    //image: string = this.props.image;

    editMode: boolean = this.props.editMode;


    render() {
        let reader = new FileReader();

        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0">
                            {this.props.buttonName}
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
                                            <input type="file" className="file-path validate" id="raider" accept='.pdf'
                                                   onChange={this.onChanger}/>
                                        </div>
                                    </div><br/>
                                    <label>Hospitality rider:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="hospitality-raider" accept='.pdf'
                                                   onChange={this.onChangeh}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <label>Artist contract:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="contract" accept='.pdf'
                                                   onChange={this.onChangec}/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="form-group" align="center">
                                        <Accordion.Toggle type="button"  as={Button} variant="success" eventKey="0" onClick={() => {
                                            if(this.editMode){
                                                this.edit()
                                            } else {
                                                this.add()
                                            };
                                        }}>
                                            {this.props.buttonName}
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
        console.log(this.state);
        const index = this.artist.indexOf(this.props.artist);
        this.artist[index] = new Artist(0,0,this.artist_name, this.state.raider, this.state.hraider,this.state.contract,this.email, this.phone,this.image);
        this.artist_name = "";
        this.email = "";
        this.phone = "";
        this.riders = "";
        this.hospitality_riders = "";
        this.artist_contract = "";
        this.image = "";
        //let s: any = ArtistDetails.instance();
        //s.mounted();

    }

    onChanger(event:SyntheticInputEvent<HTMLInputElement>) {
        this.state.raider=event.target.files[0];
        this.readState.raiderReader.onload=(function(data){
            return function(e){data.src=e.target.result;};
        });
        this.readState.raiderBuffer.readAsArrayBuffer(this.state.raider);
    }

    onChangeh(event:SyntheticInputEvent<HTMLInputElement>) {
        this.state.hraider=event.target.files[0];
        this.readState.hRaiderReader.onload=(function(data){
            return function(e){data.src=e.target.result;};
        });
        this.readState.hRaiderReader.readAsArrayBuffer(this.state.hospitality_riders)
    };

    onChangec(event:SyntheticInputEvent<HTMLInputElement>){
        this.state.contract=event.target.files[0];
        this.readState.contractReader.onload=(function(data){
            return function(e){data.src=e.target.result;};
        });
        this.readState.contractReader.readAsArrayBuffer(this.state.hospitality_riders);
    }

    mounted(): unknown {
        let s: any = ArtistDetails.instance();
        this.artist = s.artist;
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
                            <div className="col"><label>Dokumenter:
                                <label>{a.readStates.raiderReader ? a.states.raider.name: 'Ingen rider valgt.'}</label>
                                <label>{a.readStates.hRaiderReader ? a.states.hospitality_riders.name : 'Ingen hospitality rider valgt.'}</label>
                                <label>{a.readStates.contractReader ? a.states.artist_contract.name: 'Ingen kontrakt valgt.'}</label></label></div>
                            <div className="col">
                                <button type="button" className="btn btn-danger" onClick={() => this.delete(a)} style={{marginLeft: 10+"px", float: "right"}}>Slett</button>
                            </div>
                        </div>
                        <div className={"row"}>
                            <div className={"col"}>
                                <ArtistDropdown buttonName={"Rediger"} editMode={false} artist={a}/>
                            </div>
                        </div>
                    </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewArtist()}>Legg til artist</button>
                </div>
            </div>
        )
    }

    addNewArtist(){
        this.artist.push(new Artist(0, 0, "", "","", "", "",""));
    }

    delete(a: Artist){
        const index = this.artist.indexOf(a);
        if(index > -1){
            this.artist.splice(index,1);
        }
    }

}

export class UploadTest extends Component{

    render(){
        return(
            <div>
                <p>HALLO</p>
                <form ref='uploadForm'
                      action='http://localhost:8080/uploadRiders/6'
                      method='post'
                      encType="multipart/form-data">
                    <input type="file" name="sampleFile" />
                    <input type='submit' value='Upload!' />
                </form>
            </div>
        );
    }
}