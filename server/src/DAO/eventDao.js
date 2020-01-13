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

    editEvent(
      json: {event_name: string, place: string, event_start: Date, event_end: Date, longitude: number, latitude: number, event_id:number}, callback:function){
    super.query("UPDATE event SET event_name=?, place=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
      callback);
    }
};