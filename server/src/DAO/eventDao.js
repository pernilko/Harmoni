//@flow

const Dao = require("./dao.js");
const imageUrl = "https://storage.cloud.google.com/harmoni-files/";

module.exports = class eventDao extends Dao{

    //tested
    /**
     * Spørring for å hente alle events sortert på start-tidspunkt.
     */
    getAll(callback: function) {
        super.query("SELECT * FROM event ORDER BY event_start ASC", [], callback);
    }

    //tested
    /**
     * Spørring for å hente et spesifikt event.
     * @param {event_id} id til event
     */
    getEvent(event_id: number, callback: function) {
        super.query("SELECT * FROM event WHERE event_id=?", [event_id], callback );
    }

    //tested
    /**
     * Spørring for å hente alle event til en organisasjon.
     * @param {org_id} id til organisasjon
     */
    getEventOrg(org_id: number, callback: function){
          super.query("SELECT * FROM event WHERE org_id=? ORDER BY event_start ASC", [org_id], callback );
    }

    //tested
    /**
     * Spørring for å hente alle events til en user.
     * @param {user_id} id til bruker
     */
    getEventUser(user_id: number, callback: function){
        super.query("SELECT * FROM event WHERE user_id=? ORDER BY event_start ASC", [user_id], callback );
    }

    //tested
    /**
     * Spørring for å hente kommende events.
     * @param {org_id} id til organisasjon
     */
    getEventUpcomingOrg(org_id: number, callback: function){
          super.query("SELECT * FROM event WHERE org_id=? AND event_end > CURDATE() AND completed NOT LIKE -1 ORDER BY event_start ASC", [org_id], callback );
    }
    /**
     * Spørring for å hente kommende events for en bruker.
     * @param {user_id} id til bruker
     */
    getEventUpcomingUser(user_id: number, callback: function){
          super.query("SELECT * FROM event WHERE user_id=? AND event_end > CURDATE() AND completed NOT LIKE -1 ORDER BY event_start ASC", [user_id], callback );
    }
    /**
     * Spørring for å hente tidligere events for en organisasjon.
     * @param {org_id} id til organisasjon
     */
    getEventPreviousOrg(org_id: number, callback: function){
          super.query("SELECT * FROM event WHERE org_id=? AND completed = TRUE AND event_end < CURDATE() ORDER BY event_end DESC", [org_id], callback );
    }

    //tested
    /**
     * Spørring for å hente tidligere events for en bruker.
     * @param {user_id} id til bruker
     */
    getEventPreviousUser(user_id: number, callback: function){
      super.query("SELECT * FROM event WHERE user_id=? AND completed = TRUE AND event_end < CURDATE() ORDER BY event_end DESC", [user_id], callback );
    }

    /**
     * Spørring for å hente tidligere events for en organisasjon.
     * @param {user_id} id til bruker
     */
    getPending(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND completed = FALSE AND event_end < CURDATE() AND completed NOT LIKE -1 ORDER BY event_end DESC", [user_id], callback);
    }

    /**
     * Spørring for å hente kansellerte event for organisasjon.
     * @param {org_id} id til organisasjon
     */
    getCancelledOrg(org_id: number, callback: function){
      super.query(
          "SELECT * FROM event WHERE org_id=? AND completed LIKE -1 ORDER BY event_end DESC", [org_id], callback);
    }
    /**
     * Spørring for å hente tidligere events for en bruker.
     * @param {user_id} id til bruker
     */
    getCancelledUser(user_id: number, callback: function){
      super.query(
          "SELECT * FROM event WHERE user_id=? AND completed LIKE -1 ORDER BY event_end DESC", [user_id], callback);
    }

    /**
     * Spørring for å hente pågående events for en bruker.
     * @param {user_id} id til bruker
     */
    getEventCurrentUser(user_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE user_id=? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1 ORDER BY event_start ASC",
          [user_id],
          callback
      );
    }

    /**
     * Spørring for å hente pågående events for en organisasjon.
     * @param {org_id} id til organisasjon
     */
    getEventCurrentOrg(org_id: number, callback: function) {
      super.query(
          "SELECT * FROM event WHERE org_id = ? AND CURDATE() >= event_start AND CURDATE() <= event_end AND completed NOT LIKE -1 ORDER BY event_start ASC",
          [org_id],
          callback
      );
    }

    //tested
    /**
     * Spørring for å hente lokasjonen til en event.
     * @param {event_id} id til event
     */
    getEventLocation(event_id: number, callback:function){
        super.query("SELECT place FROM event WHERE event_id=?", [event_id], callback);
    }

    /**
     * Spørring for å kansellere en event.
     * @param {event_id} id til event
     */
    cancelEvent(event_id: number, callback: function){
        super.query("UPDATE event SET completed = -1 WHERE event_id = ?", [event_id], callback);
    }
    /**
     * Spørring for å redigere et event.
     * @param {event_id} id til event
     * @param {event_name} navnet til event
     * @param {place} lokasjonen til event
     * @param {description} beskrivelse til event
     * @param {event_start} starttidspunkt til event
     * @param {event_end} sluttidspunkt til event
     * @param {longitude} breddegrad til event
     * @param {latitude} lengdegrad til event
     */
    editEvent(event_id: number, json: {event_name: string, place: string, description: string, event_start: Date, event_end: Date, longitude: number, latitude: number}, callback:function) {
      super.query("UPDATE event SET event_name=?, place=?, description=?, event_start=?, event_end=?, longitude=?, latitude=? WHERE event_id=?",
                  [json.event_name, json.place, json.description, json.event_start, json.event_end, json.longitude, json.latitude, event_id],
                  callback);
    }

    //tested
    /**
     * Spørring for å hente alle brukere knyttet til en event.
     * @param {event_id} id til event
     */
    getUsersForEvent(event_id: number, callback: function) {
      super.query("SELECT * FROM user_event WHERE event_id=?", [event_id], callback);
    }

    //tested
    /**
     * Spørring for å sette at en bruker har akseptert en stilling.
     * @param {user_id} id til bruker
     * @param {event_id} id til event
     * @param {accepted} status på om brukeren har akseptert
     */
    setAccepted(json: {user_id: number, event_id: number, accepted: number}, callback:function) {
      super.query("UPDATE user_event SET accepted = ? WHERE user_id = ? AND event_id = ?", [json.accepted, json.user_id, json.event_id],
          callback);
    }
    /**
     * Spørring for å sette at en event er ferdig.
     * @param {event_id} id til event
     */
    setCompleted(event_id: number, callback: function) {
      super.query(
        "UPDATE event SET completed=TRUE WHERE event_id = ?",
        [event_id],
        callback
      );
    }

    //tested
    /**
     * Spørring for å hente et event med søk.
     * @param {search} tekst man vil søke på
     * @param {org_id} id til organisasjon
     */
    getEventbySearch(search: string, org_id: number, callback: function){
        super.query(
            "SELECT * FROM event WHERE event_name LIKE ? AND org_id = ? ORDER BY event_start ASC",
            ["%" + search + "%", org_id], callback
        )
    }

    /**
     * Spørring for å godkjenne et event.
     * @param {event_id} id til event
     * @param {accepted} status på om event er godkjent
     */
    setAcceptedEvent(event_id:number, json:{accepted:number}, callback:function){
    super.query(
        "UPDATE event SET accepted = ? WHERE event_id=?",
        [json.accepted, event_id],
        callback
    )
  }
    /**
     * Spørring for å oppdatere bildet på et event
     * @param {event_id} id til event
     * @param {image} bilde til event
     */
  updateEventImage(event_id: number, image: string, callback: function){
        super.query("UPDATE event SET image=? WHERE event_id=?", [imageUrl + image, event_id], callback);
    }
};
