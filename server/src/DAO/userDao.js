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

    getAllUsersByOrgId(org_id: number, callback: function){
        super.query("SELECT * FROM user WHERE org_id = ?", [org_id], callback);
    }

    //not tested
    getAdminByOrgId(org_id: number, callback: function){
        super.query("SELECT * FROM user u WHERE privileges = 1 AND org_id = ?", [org_id], callback);
    }

    //delete a user using their id. Dont use without deleting rows in user_event first!
    deleteUserById(id: number, callback: function){
        super.query("DELETE FROM user WHERE user_id = ?", [id], callback);
    }

    //Update user email
    updateUserEmail(user_id: number, json: {email: string}, callback: function){
        super.query("UPDATE user SET email=? WHERE user_id=?", [json.email, user_id], callback);
    }
    //Only update the users profile picture
    updateUserImage(user_id: number, json: {image: string}, callback: function){
        super.query("UPDATE user SET image=? WHERE user_id=?", [json.image, user_id], callback);
    }
    updateUserInfo(user_id: number, json:{address: string, phone: string}, callback: function){
        super.query("UPDATE user SET address=?, phone=? WHERE user_id=?", [json.address, json.phone, user_id], callback);
    }
    updateUserPass(user_id: number, json:{user_name: string, password: string}, callback: function){
        let salt: string = bcrypt.genSaltSync(saltRounds);
        console.log(json.password);
        let hash: string = bcrypt.hashSync(json.password, salt);
        super.query("UPDATE user SET user_name=?, password=? WHERE user_id=?", [json.user_name, hash, user_id],
          callback
        );
    }
    updateUserName(user_id: number, json: {user_name: string}, callback: function){
        super.query("UPDATE user SET user_name = ? WHERE user_id = ?", [json.user_name, user_id],
            callback
        );
    }

};
