//@flow

const Dao = require("./dao.js");

module.exports = class eventDao extends Dao{

    getAll(callback: function) {
        super.query("SELECT * FROM event", [], callback);
    }

    getEvent(event_id: number, callback: function) {
        super.query("SELECT * FROM event WHERE event_id=?", [event_id], callback );
    }

    addEvent(
      json: {event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number} ,callback: function){
        super.query( "INSERT INTO event (event_name, place, event_start, event_end, longitude, latitude) VALUES (?,?,?,?,?,?)", callback);
    }

    editEvent(
    json: {event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number, event_id:number}, callback:function){
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

};