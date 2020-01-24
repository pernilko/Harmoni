//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {Ticket} from "../../../services/TicketService.js";
import {Alert} from "../../../widgets";

let del_ticket: Ticket[] = [];

/**
    Klassen håndterer visningen av registreringsskjemaet for en ny billettype
    @parameter {string} buttonName - navnet på knappen som åpner redigeringsmenyen av en billett.
    @parameter {Ticket} ticket - billettobjektet for selve billetten som redigeres.
 */
export class TicketComp extends Component <{buttonName: string, ticket: Ticket}>{
    ticketList: Ticket[] = [];

    type: string = this.props.ticket.ticket_type;
    beskrivelse: string = this.props.ticket.description;
    billetter: number = this.props.ticket.amount;
    pris: number = this.props.ticket.price;
    
    /**
        generer html for å vise frem komponenten
        @return {html} selve siden som skal vises frem
     */
    render(){
        return(
            <Accordion>
                <Card style={{border: "none"}}>
                    <Card.Header style={{border: "none"}}>
                        <Accordion.Toggle as={Button} variant="success" eventKey="0" style = {{float: "left"}}>
                            {this.props.buttonName}
                        </Accordion.Toggle>
                        <button type="button" className="btn btn-danger" style={{marginLeft: 10+"px", float: "left"}} onClick={() => this.deleteTicket(this.props.ticket)}>Slett</button>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" style={{border: "none"}}>
                        <Card.Body style={{width: "70%"}}>
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
                                            <label>Antall billetter: </label>
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

    /**
        Henter instansen av billettene som er registrert til hovedskjemaet så dataen er tilgjengelig i denne kompoenten
     */
    mounted() {
            let s: any = TicketDetails.instance();
            this.ticketList = s.ticketList;
    }

    /**
        hvis registreringsskjemaet for en ny billett ble gyldig fylt ut så vil billettypen lagres når denne funksjonen kjøres.
     */
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
        this.ticketList[index] = new Ticket(this.props.ticket.ticket_id, this.props.ticket.event_id, this.type, parseInt(this.billetter), this.beskrivelse, parseInt(this.pris), 0);
    }
    deleteTicket(t: Ticket) {
        del_ticket.push(t);
        const index = this.ticketList.indexOf(t);
        if (index > -1) {
            this.ticketList[index] = null;
        }
    }
}

/**
    TicketDetails viser frem informasjonen om de billettene som er opprettet
 */
export class TicketDetails extends Component {
    ticketList: Ticket[] = [];
    
    /**
        generer html for å vise frem komponenten
        @return {html} selve siden som skal vises frem
     */
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Billetter:</h3>
                </div>
                <div className="card-body">
                {this.ticketList.map(ticket => {if (ticket) { return(
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
                )}})}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewTicket()}>Legg til billett</button>
                </div>
            </div>
        )
    }

    /**
        legger til en ny, blank billettype som kan redigeres.
     */
    addNewTicket(){
        this.ticketList.push(new Ticket(-1, 0, "", 0, "", 0, 0));
    }

}

export { del_ticket };