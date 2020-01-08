// @flow
import axios from 'axios';

export class TicketService {
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