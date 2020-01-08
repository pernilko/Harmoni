//@flow
const Dao = require("./dao.js");

module.exports = class userDao extends Dao {

    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    setAdminPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET priviliges = 1 WHERE user_id = ?", [id], callback);
    }
    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    setAdminPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET priviliges = 1 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }

    //method to set a user to default privileges in db, privileges = 0 => normal privilege
    setNormalPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET priviliges = 0 WHERE user_id = ?", [id], callback);
    }

    //method to set a user to default privileges in db, privileges = 0 => normal privilege
    setNormalPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET priviliges = 0 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }
};