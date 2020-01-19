//@flow
const Dao = require("./dao.js");

module.exports = class userEventDao extends Dao{

    addUserEvent(json: {user_id: number, event_id: number, job_position: string, accepted: number}, callback: function){
        super.query("INSERT INTO user_event(user_id, event_id, job_position, accepted) VALUES (?,?,?,?)",
            [json.user_id, json.event_id, json.job_position, json.accepted], callback);
    }

    getAllbyId(event_id: number, callback: function){
        super.query(
            "SELECT user_event.user_id, event_id, job_position, accepted, user_name FROM user_event JOIN user ON (user_event.user_id = user.user_id) WHERE event_id = ?",
            [event_id],  callback
        );
    }

    deleteUserEvent(user_id: number, event_id: number, callback: function){
        super.query(
            "DELETE FROM user_event WHERE user_id = ? AND event_id = ?",
            [user_id,event_id], callback
        );
    }

    updateUserEvent(user_id: number, event_id: number, json:{user_id: number, job_position: string, accepted: number}, callback: function){
        super.query(
            "UPDATE user_event SET user_id = ?, job_position = ?, accepted=? WHERE user_id = ? AND event_id = ?",
            [json.user_id, json.job_position,json.accepted, user_id, event_id], callback
        )
    }


};