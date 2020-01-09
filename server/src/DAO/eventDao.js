//@flow

const Dao = require("./dao.js");

module.exports = class eventDao extends Dao{

    getAll(callback: function) {
        super.query("SELECT * FROM event", [], callback);
    }

    getEvent(event_id: number, callback: function) {
        super.query("SELECT * FROM event WHERE event_id=?", [event_id], callback );
    }

    getEventLocation(event_id: number, callback:function){
        super.query("SELECT place FROM event WHERE event_id=?", [event_id], callback);
    }

    getEventTime(event_id: number, callback){
        super.query("SELECT event_start, event_end FROM event WHERE event_id=?", [event_id], callback);
    }

    addEvent(
      json: {event_name: string, place: string, event_start: Date, event_end: Date, longitude: number, latitude: number} ,callback: function){
        super.query( "INSERT INTO event (event_name, place, event_start, event_end, longitude, latitude) VALUES (?,?,?,?,?,?)", callback);
    }

    editEvent(
      json: {event_name: string, place: string, event_start: Date, event_end: Date, longitude: number, latitude: number, event_id:number}, callback:function){
    super.query("UPDATE event SET event_name=?, place=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
      callback);
    }

    deleteEvent(event_id: number, callback: function){
        super.query(
          "DELETE FROM event WHERE event_id=?",
          [event_id],
          callback
        );
    }

    deleteArtistEvent(event_id: number, callback: function){
      super.query(
        "DELETE FROM artist WHERE event_id=?",
        [event_id],
        callback
      );
    }

    deleteTicketEvent(event_id: number, callback: function){
        super.query(
            "DELETE FROM ticket WHERE event_id = ?", [event_id],
            callback
        );
    }
};
