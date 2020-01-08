//@flow
const Dao = require("./dao.js");

module.exports = class CasesDao extends Dao {
    getAll(callback: function){
        super.query("select * from Artist", [], callback);
    }

    getOne(id: number, callback: function) {
        super.query(
            "select * from Artist where artistID=?",
            [id],
            callback
        );
    }

    //db attributes must be changed to correspond to updated db
    insertOne(json: Object, callback: function) {
        var val = [json.arr_id, json.navn, json.riders, json.host_riders, json.kontrakt, json.epost, json.bilde];
        super.query(
            "insert into Artist (arr_id, navn, riders, host_riders, kontrakt, epost, bilde) values (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }
};