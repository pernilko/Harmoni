const Dao = require("./dao.js");

/**
    DAOklasse for å hente ut rader fra UserEvent-tabellen.
 */
module.exports = class userEventDao extends Dao{

    /**
        Metoden legger til en ny vakt (UserEvent)
        @parameter {number} user_id - id til brukeren som blir satt opp på vakt.
        @parameter {number} event_id - id til eventet brukere har en vakt.
        @parameter {string} job_position - tittel på stillingen.
        @parameter {number} accepted - et tall som beskriver om brukeren har godtatt (1), avslått (0), eller ikke svart på om de kan ta vakta (alt annet).
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    addUserEvent(json, callback){
        super.query("INSERT INTO user_event(user_id, event_id, job_position, accepted) VALUES (?,?,?,?)",
            [json.user_id, json.event_id, json.job_position, json.accepted], callback);
    }

    /**
        henter alle vaktene tilknytta et event.
        @parameter {number} event_id - id til arrangementet som man henter vaktene til.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    getAllbyId(event_id, callback){
        super.query(
            "SELECT user_event.user_id, event_id, job_position, accepted, user_name, email FROM user_event JOIN user ON (user_event.user_id = user.user_id) WHERE event_id = ?",
            [event_id],  callback
        );
    }

    /**
        Sletter en vakt fra databasen
        @parameter {number} user_id - id til brukeren som har et vakt som skal slettes.
        @parameter {number} event_id - id til eventet som har et vakt som skal slettes.
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    deleteUserEvent(user_id, event_id, callback){
        super.query(
            "DELETE FROM user_event WHERE user_id = ? AND event_id = ?",
            [user_id,event_id], callback
        );
    }

    /**
        oppdaterer et vakt gitt bruker og event.
        @parameter {number} user_id - id til brukeren som har et vakt som skal slettes.
        @parameter {number} event_id - id til eventet som har et vakt som skal slettes.
        @parameter {number} user_id - id til brukeren som blir satt opp på vakt.
        @parameter {string} job_position - tittel på stillingen.
        @parameter {number} accepted - et tall som beskriver om brukeren har godtatt (1), avslått (0), eller ikke svart på om de kan ta vakta (alt annet).
        @parameter {function} callback - funksjon som returner data fra kallet
     */
    updateUserEvent(user_id, event_id, json, callback){
        super.query(
            "UPDATE user_event SET user_id = ?, job_position = ?, accepted=? WHERE user_id = ? AND event_id = ?",
            [json.user_id, json.job_position,json.accepted, user_id, event_id], callback
        )
    }
};