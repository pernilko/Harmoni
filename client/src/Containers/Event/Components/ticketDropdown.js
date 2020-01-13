//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {Ticket} from "../../../services/TicketService.js";
import {Alert} from "../../../widgets";

export class TicketComp extends Component <{ticket: Ticket, editMode: boolean}>{
    ticketList: Ticket[] = [];
    type: string = "";
    beskrivelse: string = "";
    billetter: number = 0;
    pris: number = 0;

    editMode: boolean = this.props.editMode;

    render(){
        return(
            <Accordion>
                <Card style={{border: "none"}}>
                    <Card.Header style={{border: "none"}}>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0" style = {{float: "left"}}>
                           Rediger
                        </Accordion.Toggle>
                        <button type="button" className="btn btn-danger" style={{marginLeft: 10+"px", float: "left"}} onClick={() => this.deleteTicket(this.props.ticket)}>Slett</button>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" style={{border: "none"}}>
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
                                            <input type="number" min={0} className="form-control" placeholder="75" value={this.billetter}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.billetter = event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Pris per billett: (kr) </label>
                                            <input type="number" min = "0" id="prisInput"className="form-control" placeholder="350" value={this.pris}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.pris = event.target.value)}/>
                                        </div>
                                        <br/>
                                        <div className="form-group" align="center">
                                            <Accordion.Toggle type="button"  as={Button} variant="success" eventKey="0" onClick={this.add}>
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
        )
    }
    mounted() {
        if (!this.props.editMode) {
            let s: any = TicketDetails.instance();
            this.ticketList = s.ticketList;
        }
    }
    add(){
        if(this.pris < 0){
            Alert.danger("Pris kan ikke være en negativ verdi");
            return;
        }
        if(this.billetter < 0){
            Alert.danger("Antall billetter kan ikke være en negativ verdi");
            return;
        }
        const index = this.ticketList.indexOf(this.props.ticket);
        this.ticketList[index] = new Ticket(0, 0, this.type, parseInt(this.billetter), this.beskrivelse, parseInt(this.pris), 0);
    }
    deleteTicket(t: Ticket) {
        const index = this.ticketList.indexOf(t);
        if (index > -1) {
            this.ticketList.splice(index, 1);
        }
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
                <div className="card-body">
                {this.ticketList.map(ticket => (
                    <div className="card-header">
                        <div className="row">
                            <div className="col"><label>Billett Type: {ticket.ticket_type}</label></div>
                            <div className="col"><label>Beskrivelse: {ticket.description}</label></div>
                            <div className="col"><label>Pris: {ticket.price} kr</label></div>
                            <div className="col"><label>Antall: {ticket.amount}</label></div>
                        </div>
                        <div className={"row"}>
                            <div className={"col"}>
                                <TicketComp buttonName={"Rediger"} ticket={ticket}/>
                            </div>
                        </div>
                    </div>
                ))}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewTicket()}>Legg til billett</button>
                </div>
            </div>
        )
    }

    addNewTicket(){
        this.ticketList.push(new Ticket(null, null, "", 0, "", 0, 0));
    }

}