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

    getEventUpcomingOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=? AND event_end > CURDATE() AND completed NOT LIKE -1", [org_id], callback );
    }

    getEventUpcomingUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? AND event_end > CURDATE() AND completed NOT LIKE -1", [user_id], callback );
    }

    getEventPreviousOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=? AND completed = TRUE AND event_end < CURDATE()", [org_id], callback );
    }

    getEventPreviousUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? AND completed = TRUE AND event_end < CURDATE()", [user_id], callback );
    }

    getPending(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND completed = FALSE AND event_end < CURDATE() AND completed NOT LIKE -1", [user_id], callback);
    }

    getEventCurrentUser(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1",
          [user_id],
          callback
      );
    }

    getEventCurrentOrg(org_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE org_id = ? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1",
          [org_id],
          callback
      );
    }

    getEventLocation(event_id: number, callback:function){
        super.query("SELECT place FROM event WHERE event_id=?", [event_id], callback);
    }

    deleteEvent(event_id: number, callback: function){
        super.query("DELETE FROM event WHERE event_id=?", [event_id], callback);
    }

    cancelEvent(event_id: number, callback: function){
        super.query("UPDATE event SET completed = -1 WHERE event_id = ?", [event_id], callback);
    }


    editEvent(event_id: number, json: {event_name: string, place: string, description: string, event_start: Date, event_end: Date, longitude: number, latitude: number, image: string}, callback:function) {
      super.query("UPDATE event SET event_name=?, place=?, description=?, event_start=?, event_end=?, longitude=?, latitude=?, image=? WHERE event_id=?",
                  [json.event_name, json.place, json.description, json.event_start, json.event_end, json.longitude, json.latitude, json.image, event_id],
                  callback);
    }

    getUsersForEvent(event_id: number, callback: function) {
      super.query("SELECT * FROM user_event WHERE event_id=?", [event_id], callback);
    }

    setAccepted(json: {user_id: number, event_id: number, accepted: number}, callback:function) {
      super.query("UPDATE user_event SET accepted = ? WHERE user_id = ? AND event_id = ?", [json.accepted, json.user_id, json.event_id],
          callback);
    }

    setCompleted(event_id: number, callback: function) {
      super.query(
        "UPDATE event SET completed=TRUE WHERE event_id = ?",
        [event_id],
        callback
      );
    }

    getEventbySearch(search: string, org_id: number, callback: function){
        super.query(
            "SELECT * FROM event WHERE event_name LIKE ? AND org_id = ?",
            ["%" + search + "%", org_id], callback
        )
    }

    setAcceptedEvent(event_id:number, json:{accepted:number}, callback:function){
    super.query(
        "UPDATE event SET accepted = ? WHERE event_id=?",
        [json.accepted, event_id],
        callback
    )
  }
};