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

    getEventTime(event_id: number, callback: function){
        super.query("SELECT event_start, event_end FROM event WHERE event_id=?", [event_id], callback);
    }

<<<<<<< HEAD
    addEvent(
      json: {org_id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number}, callback: function){
        super.query("INSERT INTO event (org_id, event_name, description, place, CONVERT(DATETIME, event_start), CONVERT(DATETIME, event_end), longitude, latitude) VALUES (?,?,?,?,?,?,?,?)", callback);
    }

    editEvent(
      json: {event_name: string, place: string, event_start: Date, event_end: Date, longitude: number, latitude: number, event_id:number}, callback:function){
    super.query("UPDATE event SET event_name=?, place=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
      callback);
=======
    editEvent(event_id:number,
      json: { org_id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number}, callback: function){
        super.query("UPDATE event SET event_name = ?, description = ?, place = ?, event_start = ?, event_end = ?, longitude = ?, latitude = ? WHERE event_id = ? AND org_id = ?",
          [json.event_name, json.description, json.place, json.event_start, json.event_end, json.longitude, json.latitude,event_id, json.org_id],
          callback);
>>>>>>> 0c36c64c56924ff5ee177400726bde624064f3fc
    }

    deleteEvent(event_id: number, callback: function){
        super.query(
          "DELETE FROM event WHERE event_id=?",
          [event_id],
          callback
        );
<<<<<<< HEAD
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
=======
>>>>>>> 0c36c64c56924ff5ee177400726bde624064f3fc
    }
};
