// @flow
import axios from 'axios';
import {Artist} from "./ArtistService";

const url = "http://localhost:8080/";

/**
    Ticket - klasse for billettene som tilhører et arrangement.
 */

export class Ticket {
    ticket_id: number;
    event_id: number;
    ticket_type: string;
    amount: number;
    description: string;
    price: number;
    amount_sold: number;

    /**
        Konstruktør for å lage et billett objekt
        @constructor
        @parameter {number} ticket_id - Id til billetten.
        @parameter {number} event_id - Id til event som billetten tilhører.
        @parameter {string} ticket_type - Navn på billettypen.
        @parameter {number} amount - Antallet billetter av denne typen som er tilgjengelig.
        @parameter {string} description - beskrivelse av hva som er inkludert i denne billettypen.
        @parameter {number} price - Prisen til billetten.
        @parameter {number} amount_sold - Antallett billetter som er solgt.
     */

    constructor(ticket_id: number, event_id: number, ticket_type: string, amount: number, description: string, price: number, amount_sold: number) {
        this.ticket_id = ticket_id;
        this.event_id = event_id;
        this.ticket_type = ticket_type;
        this.amount = amount;
        this.description = description;
        this.price = price;
        this.amount_sold = amount_sold;
    }
}

/**
    TicketService - Klasse for å hente inn informasjon om billetter.
 */

class TicketService {

    /**
        getAllTIckets - Hentre alle billettene som er i DB.
        @return Ticket[] alle billetter fra DB.
     */
    getAllTickets() {
        return axios.get<Ticket[]>(url + "ticket/all").then(response => response.data);
    }

    /**
        getEventTIckets - henter billetter tilknyttet et arrangement
        @parameter {number} event_id - id til eventet du vil hente billettene fra
        @return Ticket[] alle billettene som er tilknyttet et arrangement
     */
    getEventTickets(event_id: number){
        return axios.get<Ticket[]>(url + "ticket/event/" + event_id).then(response => response.data);
    }

    /**
        getOneTicket - Henter billett som har et gitt id
        @parameter {number} id - id til billetten du vil hente
        @return Ticket[] billetten som har id den fikk som parameter
     */
    getOneTicket(id: number) {
        return axios.get<Ticket[]>(url + "ticket/"+id).then(response => response.data[0]);
    }

    /**
        getRemainingTickets - Henter hvor mange billetter som er ledige av en billettype.
        @parameter {number} id - Id til billetten som du vil hente informasjon om.
        @return Ticket[] antallet billetter som fortsatt er til salgs av denne typen (antall_totalt - antall_solgt)
     */
    getRemainingTickets(id: number) {
        return axios.get<{}>(url + "ticket/remaining/"+id).then(response => response.data[0]);
    }

    /**
        addTicket - Legger til en ny billettype
        @parameter {number} event_id - Id til eventen som den nye billettypen tilhører
        @parameter {string} ticket_type - String som angir hva billetten heter.
        @parameter {number} amount - Antall billetter som kan selges av denne typen.
        @parameter {string} description - Beskrivelse av hva billetten inneholder.
        @parameter {number} price - prisen til billetten.
        @parameter {number} amount_sold - antallet billetter som er solgt allerede.
        @return AffectedRows - antallet rader som ble påvirket av databasekallet.
     */
    addTicket(event_id: number, ticket_type: string, amount: number, description: string, price: number, amount_sold: number) {
        return axios.post<{}, Ticket>(url + "ticket/add", {
            "event_id": event_id,
            "ticket_type": ticket_type,
            "amount": amount,
            "description": description,
            "price": price,
            "amount_sold": amount_sold
        }).then(response => response.data);
    }

    /**
        updateTicket - Oppdaterer informasjonen tilknytta en billettype.
        @parameter {number} id - Id til billetten som skal oppdateres.
        @parameter {number} event_id - Id til eventen som den nye billettypen tilhører.
        @parameter {string} ticket_type - String som angir hva billetten heter.
        @parameter {number} amount - Antall billetter som kan selges av denne typen.
        @parameter {string} description - Beskrivelse av hva billetten inneholder.
        @parameter {number} price - prisen til billetten.
        @parameter {number} amount_sold - antallet billetter som er solgt allerede.
        @return AffectedRows - antallet rader som ble påvirket av databasekallet.
     */
    updateTicket(id: number, event_id: number, ticket_type: string, amount: number, description: string, price: number, amount_sold: number) {
        return axios.put<{}, Event>(url + "ticket/edit/"+id, {
            "event_id": event_id,
            "ticket_type": ticket_type,
            "amount": amount,
            "description": description,
            "price": price,
            "amount_sold": amount_sold
        }).then(response => response.data);
    }

    /**
        deleteTicket - Sletter en billett
        @parameter {number} id - Id til billetten som du vil slette
        @return AffectedRows - antallet rader som ble påvirket av databasekallet.
     */
    deleteTicket(id: number) {
        return axios.delete<Ticket, void>(url + "ticket/delete/" + id).then(response => response.data);
    }
}

export let ticketService = new TicketService();