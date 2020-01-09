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

    addEvent(
      json: {org_id: number, event_name: string, place: string, event_start: any, event_end: any, longitude: number, latitude: number} ,callback: function){
        super.query( "INSERT INTO event (org_id, event_name, place, event_start, event_end, longitude, latitude) VALUES (?,?,?,?,?,?,?)",
          [json.org_id, json.event_name, json.place, json.event_start, json.event_end, json.longitude, json.latitude],
          callback);
    }

    editEvent( event_id:number,
      json: {event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number}, callback:function){
        super.query("UPDATE event SET event_name=?, place=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
          [json.event_name, json.place, json.event_start, json.event_end, json.longitude, json.latitude],
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