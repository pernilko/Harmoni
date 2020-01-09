//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {Ticket} from "../../../services/TicketService.js";

export class TicketComp extends Component {
    ticketList: Ticket[] = [];
    type: string = "";
    beskrivelse: string = "";
    billetter: string = "";
    pris: string = "";

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
                                            <input type="text" className="form-control" placeholder="Ståplass Foran" value={this.type}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.type = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Billettbeskrivelse: </label>
                                            <textarea type="text" className="form-control" placeholder="Denne billetten... " value={this.beskrivelse}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.beskrivelse = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Antall billetter tilgjengelig: </label>
                                            <input type="text" className="form-control" placeholder="75" value={this.billetter}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.billetter = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Pris per billett: (kr) </label>
                                            <input type="text" className="form-control" placeholder="350" value={this.pris}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.pris = event.target.value)}/>
                                        </div>
                                        <br/>
                                        <div className="form-group" align="center">
                                            <Accordion.Toggle type="submit"  as={Button} variant="success" eventKey="0" onClick={this.add}>
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
        )
    }
    add(){
        this.ticketList.push(new Ticket(0, 0, this.type, parseInt(this.billetter), this.beskrivelse, parseInt(this.pris), 0));
        console.log(this.ticketList);
        this.type = "";
        this.beskrivelse = "";
        this.billetter = "";
        this.pris = "";
        let s: any = TicketDetails.instance();
        s.mounted();
    }
}


export class TicketDetails extends Component {
    ticketList: Ticket[] = [];

    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Billetter:</h3>
                </div>
                {this.ticketList.map(ticket => (
                    <div className="card-header">
                        <div className="row">
                            <div className="col"><label>Billett Type: {ticket.ticket_type}</label></div>
                            <div className="col"><label>Beskrivelse: {ticket.description}</label></div>
                            <div className="col"><label>Pris: {ticket.price} kr</label></div>
                            <div className="col"><label>Antall: {ticket.amount}</label></div>
                            <div className="col">
                                <button className="btn btn-danger" style={{marginLeft: 10+"px", float: "right"}} onClick={() => this.deleteTicket(ticket)}>Slett</button>
                                <button className="btn btn-secondary" style={{marginRight: 10+"px", float: "right"}}>Rediger</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="card-body">
                </div>
            </div>
        )
    }

    deleteTicket(t: Ticket) {
        const index = this.ticketList.indexOf(t);
        if (index > -1) {
            this.ticketList.splice(index, 1);
        }
    }

    mounted() {
        let s: any = TicketComp.instance();
        this.ticketList = s.ticketList;
    }
}