// @flow
import axios from 'axios';

const url = "http://localhost:8080/";

export class Ticket {
    ticket_id: number;
    event_id: number;
    ticket_type: string;
    amount: number;
    description: string;
    price: number;
    amount_sold: number;

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

class TicketService {
    getAllTickets() {
        return axios.get<Ticket[]>(url + "ticket/all").then(response => response.data);
    }

    getOneTicket(id: number) {
        return axios.get<Ticket[]>(url + "ticket/"+id).then(response => response.data[0]);
    }

    getRemainingTickets(id: number) {
        return axios.get<{}>(url + "ticket/remaining/"+id).then(response => response.data[0]);
    }

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

    deleteTicket(id: number) {
        return axios.delete<Ticket, void>(url + "ticket/delete/" + id).then(response => response.data);
    }
}

export let ticketService = new TicketService();