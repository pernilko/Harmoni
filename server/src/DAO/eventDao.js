//@flow

const Dao = require("./dao.js");
const imageUrl = "https://storage.cloud.google.com/harmoni-files/";

module.exports = class eventDao extends Dao{

    //tested
    getAll(callback: function) {
        super.query("SELECT * FROM event ORDER BY event_start ASC", [], callback);
    }

    //tested
    getEvent(event_id: number, callback: function) {
        super.query("SELECT * FROM event WHERE event_id=?", [event_id], callback );
    }

    //tested
    getEventOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=? ORDER BY event_start ASC", [org_id], callback );
    }

    //tested
    getEventUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? ORDER BY event_start ASC", [user_id], callback );
    }

    //tested
    getEventUpcomingOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=? AND event_end > CURDATE() AND completed NOT LIKE -1 ORDER BY event_start ASC", [org_id], callback );
    }

    getEventUpcomingUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? AND event_end > CURDATE() AND completed NOT LIKE -1 ORDER BY event_start ASC", [user_id], callback );
    }
    
    getEventPreviousOrg(org_id: number, callback: function){
      super.query("SELECT * FROM event WHERE org_id=? AND completed = TRUE AND event_end < CURDATE() ORDER BY event_end DESC", [org_id], callback );
    }

    //tested
    getEventPreviousUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? AND completed = TRUE AND event_end < CURDATE() ORDER BY event_end DESC", [user_id], callback );
    }


    getPending(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND completed = FALSE AND event_end < CURDATE() AND completed NOT LIKE -1 ORDER BY event_end DESC", [user_id], callback);
    }

    getCancelledOrg(org_id: number, callback: function){
      super.query(
          "SELECT * FROM event WHERE org_id=? AND completed LIKE -1 ORDER BY event_end DESC", [org_id], callback);
    }

    getCancelledUser(user_id: number, callback: function){
      super.query(
          "SELECT * FROM event WHERE user_id=? AND completed LIKE -1 ORDER BY event_end DESC", [user_id], callback);
    }

    getEventCurrentUser(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1 ORDER BY event_start ASC",
          [user_id],
          callback
      );
    }

    getEventCurrentOrg(org_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE org_id = ? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1 ORDER BY event_start ASC",
          [org_id],
          callback
      );
    }

    //tested
    getEventLocation(event_id: number, callback:function){
        super.query("SELECT place FROM event WHERE event_id=?", [event_id], callback);
    }

    cancelEvent(event_id: number, callback: function){
        super.query("UPDATE event SET completed = -1 WHERE event_id = ?", [event_id], callback);
    }

    editEvent(event_id: number, json: {event_name: string, place: string, description: string, event_start: Date, event_end: Date, longitude: number, latitude: number}, callback:function) {
      super.query("UPDATE event SET event_name=?, place=?, description=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
                  [json.event_name, json.place, json.description, json.event_start, json.event_end, json.longitude, json.latitude, event_id],
                  callback);
    }

    //tested
    getUsersForEvent(event_id: number, callback: function) {
      super.query("SELECT * FROM user_event WHERE event_id=?", [event_id], callback);
    }

    //tested
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

    //tested
    getEventbySearch(search: string, org_id: number, callback: function){
        super.query(
            "SELECT * FROM event WHERE event_name LIKE ? AND org_id = ? ORDER BY event_start ASC",
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

  updateEventImage(event_id: number, image: string, callback: function){
        super.query("UPDATE event SET image=? WHERE event_id=?", [imageUrl + image, event_id], callback);
    }
};
