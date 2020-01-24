//@flow
const Dao = require("./dao.js");

module.exports = class ticketDao extends Dao {
    /**
     * Metode for å hente ut all informasjon om alle billetter i "ticket" tabellen.
     * @param callback
     */
    getAllTickets(callback: function) {
        super.query(
            "SELECT * FROM ticket ", [], callback
        );
    }
    /**
     * Metode for å hente ut all informasjon om billetter fra et spesifikt event via event_id i ticket-tabellen.
     */
    getEventTickets(event_id: number, callback: function){
            super.query(
                "SELECT * FROM ticket WHERE event_id = ?",[event_id], callback
            );
        }

    getTicket(event_id: number, callback: function) {
                super.query(
                    "SELECT * FROM ticket WHERE event_id = ?", [event_id],
                    callback
                );
        }

    /**
     * Metode som kjører en databasespørring for å hente ut antall billetter som er igjen på et spesifikt event.
     */
    getNumberOfRemainingTickets(event_id: number, callback: function) {
            super.query(
                "SELECT amount-amount_sold AS remaining FROM ticket WHERE event_id = ?", [event_id],
                callback
            );
        }
/**
 * Metode  som kjører en SQL-spørring for å legge til en ny billett til et spesifikt event i "ticket" tabellen.
 */
addTicket(json: {event_id: number, ticket_type: string, amount: number, description: string, price: number, amount_sold: number}, callback: function) {
        super.query(
            "INSERT INTO ticket(event_id, ticket_type, amount, description, price, amount_sold) VALUES (?,?,?,?,?,?)",
            [json.event_id, json.ticket_type, json.amount, json.description, json.price, json.amount_sold], callback
        );
    }
/**
 * Metode som kjører en SQL-spørring for å slette en spesifikk billett i "ticket" tabellen.
 */
deleteTicket(ticket_id: number, callback: function){
        super.query(
            "DELETE FROM ticket WHERE ticket_id = ?", [ticket_id],
            callback
        )
    }

/**
 * Metode som kjører en SQL-spørring som oppdaterer all informasjon om en spesifikk billett i "ticket" tabellen.
 */
updateTicket(ticket_id: number, json: {ticket_type: string, amount: number, description: string, price: number, amount_sold: number}, callback: function){
       super.query(
           "UPDATE ticket SET ticket_type = ?, amount = ?, description = ?, price = ?, amount_sold = ? WHERE ticket_id = ?",
           [json.ticket_type, json.amount, json.description, json.price, json.amount_sold, ticket_id], callback
       );
    }
};
