//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import { createHashHistory } from 'history';
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const history = createHashHistory();

export class Artist extends Component {
    artist_name: string = "";
    riders: string = "";
    hospitality_riders: string = "";
    artist_contract: string = "";
    email: string = "";
    phone: number = null;
    image: string = "";
    onChange(event:SyntheticEvent<HTMLButtonElement>){
        console.log(event.target);

    }

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
                                                   aria-describedby="inputGroupFileAddon01"/>
                                        </div>
                                    </div><br/>
                                    <label>Hospitality rider:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <label>Artist contract:</label><br/>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        </div>
                                        <div className="custom-file">
                                            <input type="file" className="file-path validate" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01"/>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="form-group" align="center">
                                        <Button type="submit" className="btn btn-primary" onClick={this.add}>Legg til</Button>
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
        //this func adds an artist to the form over the add artist dropdown, and stores the info in a temporary array.
        //also needs a button for editing artist after add.

    }
}

export class ArtistDetails extends Component {
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Artister:</h3>
                </div>
                <div className="card-body">
                    <div className="card-header">
                        <div className="row">
                            <div className="col"><label>Artist: artist navn</label></div>
                            <div className="col"><label>Email: mail@mail.com</label></div>
                            <div className="col"><label>Tlf: +47 777777</label></div>
                            <div className="col"><label>Dokumenter: vis filer</label></div>
                            <div className="col">
                                <button className="btn btn-danger" style={{marginLeft: 10+"px", float: "right"}}>Slett</button>
                                <button className="btn btn-secondary" style={{marginRight: 10+"px", float: "right"}}>Rediger</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}