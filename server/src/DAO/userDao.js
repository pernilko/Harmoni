//@flow
const Dao = require("./dao.js");
const bcrypt = require('bcryptjs');
const saltRounds: number = 10;

module.exports = class userDao extends Dao {

    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    setAdminPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET privileges = 1 WHERE user_id = ?", [id], callback);
    }
    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    setAdminPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET privileges = 1 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }

    //method to set a user to default privileges in db, privileges = 0 => normal privilege
    setNormalPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET privileges = 0 WHERE user_id = ?", [id], callback);
    }
    //method to set a user to default privileges in db, privileges = 0 => normal privilege
    setNormalPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET privileges = 0 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }

    //retrieve the row of a user using the user_id
    getUserById(id: number, callback: function){
        super.query("SELECT * FROM user WHERE user_id = ?", [id], callback);
    }

    //retrieve the row of a user by using their email combined with their org_id
    getUser(json: {email: string, org_id: number}, callback: function) {
        super.query("SELECT email, org_id, password, user_id FROM user WHERE email=? AND org_id=?", [json.email, json.org_id], callback);
    }

    //add a new user to the DB by json
    addUser(json: {email: string, org_id: number, privileges: number, user_name: string, password: string, address: string, phone: string, image: string}, callback: function) {
        let salt: string = bcrypt.genSaltSync(saltRounds);
        console.log(json.password);
        let hash: string = bcrypt.hashSync(json.password, salt);
        super.query(
            "INSERT INTO user (org_id, email, privileges, user_name, password, address, phone, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [json.org_id, json.email, json.privileges, json.user_name, hash, json.address, json.phone, json.image],
            callback
        );
    }

    getAllUsersByOrgId(org_id: number, callback: Function){
        super.query("SELECT * FROM user WHERE org_id = ?", [org_id], callback);
    }

    //delete a user using their id. Dont use without deleting rows in user_event first!
    deleteUserById(id: number, callback: function){
        super.query("DELETE FROM user WHERE user_id = ?", [id], callback);
    }
};
