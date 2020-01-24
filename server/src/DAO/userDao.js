//@flow
const Dao = require("./dao.js");
const bcrypt = require('bcryptjs');
const imageUrl = "https://storage.cloud.google.com/harmoni-files/";
const saltRounds: number = 10;

module.exports = class userDao extends Dao {


    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    /**
     * Metode for å oppdatere admin-statusen til en bruker via id ved å oppdatere privilegier i tabellen "user".
     * @param id {number} tar inn id-en på den spesifikke brukeren som skal redigeres.
     * @param callback {function} tar inn en funksjon som fylles med et resultat når databasekallet er ferdig.
     */
    setAdminPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET privileges = 1 WHERE user_id = ?", [id], callback);
    }
    //method to set a user to admin status by updating privileges in db. privileges = 1 => admin privilege
    /**
     * Metode som forandrer admin-statusen til en bruker basert på email og organisasjons-id i tabellen "user".
     */
    setAdminPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET privileges = 1 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }

    //method to set a user to default privileges in db, privileges = 0 => normal privilege
/**
 * Metode som fjerner admin rettigheter fra en spesifikk bruker via id i "user" tabellen.
 */
    setNormalPrivilegesId(id: number, callback: function){
        super.query("UPDATE user SET privileges = 0 WHERE user_id = ?", [id], callback);
    }
    //method to set a user to default privileges in db, privileges = 0 => normal privilege
/**
 * Metode for å fjerne admin-rettigheter til en bruker identifisert av email og org_id i "user" tabellen.
 */
    setNormalPrivilegesEmail(email: string, org_id: number, callback: function){
        super.query("UPDATE user SET privileges = 0 WHERE email = ? AND org_id = ?", [email, org_id], callback);
    }
/**
 * Metode for å oppdatere rettigheter for en spesifikk bruker identifisert av bruker-id i "user" tabellen.
 */
setPrivilegesId(id: number, json: {p_create_event: number, p_read_contract: number, p_read_riders: number, p_archive: number}, callback: function){
        super.query("UPDATE user SET p_create_event = ?, p_read_contract = ?, p_read_riders = ?, p_archive = ? WHERE user_id = ?",
            [json.p_create_event, json.p_read_contract, json.p_read_riders, json.p_archive, id], callback);
}
/**
 * Metode for å hente ut all informasjon om en spesifikk bruker identifisert av bruker_id fra "user" tabellen.
 */
    //retrieve the row of a user using the user_id
    getUserById(id: number, callback: function){
        super.query("SELECT * FROM user WHERE user_id = ?", [id], callback);
    }
/**
 * Metode for å hente ut all informasjon om en bruker identifisert av epostaddresse og organisasjons-id fra "user" tabellen.
 */
    getUser(json: {email: string, org_id: number}, callback: function) {
        super.query("SELECT email, org_id, password, user_id FROM user WHERE email=? AND org_id=?", [json.email, json.org_id], callback);
    }

    //add a new user to the DB by json
/**
 * Metode for å sette inn en ny bruker i "user" tabellen. passord hashes med salt før det lagres i databasen.
 */
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
    /**
     * Metode for å hente all informasjon om  alle brukere innenfor en spesifikk organisasjon fra databasen.
     */
    getAllUsersByOrgId(org_id: number, callback: function){
            super.query("SELECT * FROM user WHERE org_id = ?", [org_id], callback);
        }

    /**
     * Metode for å hente all informasjon om alle admin-brukere for en spesifikk organisasjon.
     */
    getAdminByOrgId(org_id: number, callback: function){
            super.query("SELECT * FROM user u WHERE privileges = 1 AND org_id = ?", [org_id], callback);
        }
    /**
     * Metode for å slette en bruker identifisert av bruker-id i "user" tabellen.
     */
    deleteUserById(id: number, callback: function){
            super.query("DELETE FROM user WHERE user_id = ?", [id], callback);
        }

    //Update user email
    /**
     * Metode for å oppdatere bruker-epost-addresse for en spesifikk bruker identifisert av bruker-id i "user" tabellen.
     */
    updateUserEmail(user_id: number, json: {email: string}, callback: function){
        super.query("UPDATE user SET email=? WHERE user_id=?", [json.email, user_id], callback);
    }
    //Only update the users profile picture
    /**
     * Metode for å oppdatere urlen for profilbilde til en spesifikk bruker.
     */
    updateUserImage(user_id: number, image: string, callback: function){
        super.query("UPDATE user SET image=? WHERE user_id=?", [imageUrl + image, user_id], callback);
    }
    /**
     * Metode for å oppdatere addresse og telefonnummer for en spesifikk bruker i "user" tabellen.
     */
    updateUserInfo(user_id: number, json:{address: string, phone: string}, callback: function){
            super.query("UPDATE user SET address=?, phone=? WHERE user_id=?", [json.address, json.phone, user_id], callback);
        }

    /**
     * Metode for å oppdatere brukernavn og passord til en spesifikk bruker i "user" tabellen.
     */
    updateUserPass(user_id: number, json:{user_name: string, password: string}, callback: function){
                let salt: string = bcrypt.genSaltSync(saltRounds);
                console.log(json.password);
                let hash: string = bcrypt.hashSync(json.password, salt);
                super.query("UPDATE user SET user_name=?, password=? WHERE user_id=?", [json.user_name, hash, user_id],
                  callback
                );
            }
    /**
     * Metode for å oppdatere passord til en spesifikk bruker, identifisert av org_id og epostaddresse.
     */
    resetPass(json:{org_id: number, email: string, password: string}, callback: function){
            let salt: string = bcrypt.genSaltSync(saltRounds);
            console.log(json.password);
            let hash: string = bcrypt.hashSync(json.password, salt);
            super.query("UPDATE user SET password=? WHERE org_id=? AND email=?", [hash, json.org_id, json.email],
              callback
            );
        }
    /**
     * Metode for å oppdatere brukernavnet til en spesifikk bruker identifisert av bruker_id i "user" tabellen.
     */
    updateUserName(user_id: number, json: {user_name: string}, callback: function){
            super.query("UPDATE user SET user_name = ? WHERE user_id = ?", [json.user_name, user_id],
                callback
            );
        }
    /**
     * Metode for å gi en spesifikk bruker identifisert av bruker_id i "user" tabellen.
     */
    makeAdmin(user_id: number, callback: function) {
            super.query("UPDATE user SET privileges=1 WHERE user_id=?", [user_id], callback);
        }
    };
