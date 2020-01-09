//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

export class Ticket extends Component {
    render(){
        return(
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0">
                           Legg til billett
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <form style={{padding: 20 + 'px', width: "100%", position: "sticky", overflow: "visible"}}>
                                <div className="form-group">
                                    <row>
                                        <h4>Registrer billetter for arrangement: </h4><br/>
                                        <div className="form-group">
                                            <label>Billettype: </label>
                                            <input type="text" className="form-control" placeholder="Ståplass Foran" value={this.artist_name}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.artist_name = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Billettbeskrivelse: </label>
                                            <textarea type="text" className="form-control" placeholder="Denne billetten... " value={this.email}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.email = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Antall billetter tilgjengelig: </label>
                                            <input type="text" className="form-control" placeholder="75" value={this.phone}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Pris per billett: (kr) </label>
                                            <input type="text" className="form-control" placeholder="350" value={this.phone}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.phone = event.target.value)}/>
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
        )
    }
    add(){
        //this func adds an ticket type to the form over the add ticket dropdown, and stores the info in a temporary array.
        //also needs a button for editing ticket after add.
    }
}


export class TicketDetails extends Component {
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Billetter:</h3>
                </div>
                <div className="card-body">
                    <div className="card-header">
                        <div className="row">
                            <div className="col"><label>Billett Type: type navn</label></div>
                            <div className="col"><label>Beskrivelse: blablabla</label></div>
                            <div className="col"><label>Pris: 19999kr</label></div>
                            <div className="col"><label>Antall: 4</label></div>
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