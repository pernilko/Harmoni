//@flow
const Dao = require("./dao.js");

module.exports = class userEventDao extends Dao{
    addUserEvent(json: {user_id: number, event_id: number, job_position: string}, callback: Function){
        super.query("INSERT INTO user_event(user_id, event_id, job_position) VALUES (?,?,?)",
            [json.user_id, json.event_id, json.job_position], callback);
    }
}