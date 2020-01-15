//@flow

const Dao = require("./dao.js");

module.exports = class eventDao extends Dao{

    getAll(callback: function) {
        super.query("SELECT * FROM event", [], callback);
    }

    getEvent(event_id: number, callback: function) {
        super.query("SELECT * FROM event WHERE event_id=?", [event_id], callback );
    }

    getEventOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=?", [org_id], callback );
    }

    getEventUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=?", [user_id], callback );
    }

    getEventLocation(event_id: number, callback:function){
        super.query("SELECT place FROM event WHERE event_id=?", [event_id], callback);
    }

    editEvent(event_id: number, json: {event_name: string, place: string, description: string, event_start: Date, event_end: Date, longitude: number, latitude: number, image: number}, callback:function) {

      super.query("UPDATE event SET event_name=?, place=?, description=?, event_start=?, event_end=?, longitude=?, latitude=?, image=? WHERE event_id=?",
                  [json.event_name, json.place, json.description, json.event_start, json.event_end, json.longitude, json.latitude, json.image, event_id],
                  callback);
    }
};