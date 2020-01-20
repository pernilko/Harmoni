//@flow
const Dao = require("./dao.js");

module.exports = class artistDao extends Dao {
    getAll(callback: function){
        super.query("SELECT * FROM artist", [], callback);
    }

    getEventArtists(event_id: number, callback: function){
        super.query(
            "SELECT * FROM artist WHERE event_id = ?",
            [event_id], callback
        );
    }

    getOne(artist_id: number, callback: function) {
        super.query(
            "select * from artist where artist_id = ?",
            [artist_id], callback
        );
    }

    insertOne(json: {event_id: number, artist_name: string, riders: Object, hospitality_riders: Object,
                  artist_contract: Object, email: string, phone: string}, callback: function) {

        console.log('Printing the rider tostring'+json.riders);
        super.query(
            "INSERT INTO artist (event_id, artist_name, riders, hospitality_riders, artist_contract, email, phone) values (?,?,?,?,?,?,?)",
            [json.event_id, json.artist_name, json.riders, json.hospitality_riders, json.artist_contract, json.email, json.phone],
            callback
        );
    }

    insertRider(riders_file: any, artist_id: number, callback: function){
        super.query(
            "INSERT INTO ridersFile (artist_id, name, data, size, encoding, tempFilePath, truncated, mimetype, md5) values(?,?,?,?,?,?,?,?,?)",
            [artist_id, riders_file.name, riders_file.data, riders_file.size, riders_file.encoding, riders_file.tempFilePath, riders_file.truncated, riders_file.mimetype, riders_file.md5],
            callback
        );
    }


    insertHospitalityRider(hospitality_riders_file: any, artist_id: number, callback: function){
        super.query("INSERT INTO hospitality_ridersFile (artist_id, name, data, size, encoding, tempFilePath, truncated, mimetype, md5) values(?,?,?,?,?,?,?,?,?)",
            [artist_id, hospitality_riders_file.name, hospitality_riders_file.data, hospitality_riders_file.size, hospitality_riders_file.encoding, hospitality_riders_file.tempFilePath, hospitality_riders_file.truncated, hospitality_riders_file.mimetype, hospitality_riders_file.md5],
            callback
        );
    }
    insertArtistContract(artist_contract_file: any, artist_id: number, callback: function){
        super.query("INSERT INTO artist_contractFile (artist_id, name, data, size, encoding, tempFilePath, truncated, mimetype, md5) values(?,?,?,?,?,?,?,?,?)",
            [artist_id, artist_contract_file.name, artist_contract_file.data, artist_contract_file.size, artist_contract_file.encoding, artist_contract_file.tempFilePath, artist_contract_file.truncated, artist_contract_file.mimetype, artist_contract_file.md5],
            callback
        );
    }
    updateRiders(riders_file: any, artist_id: number, callback: function){
        super.query(
            "UPDATE ridersFile  SET name = ?, data = ?, size = ?, encoding = ?, tempFilePath = ?, truncated = ?, mimetype = ?, md5 = ? WHERE artist_id = ?",
            [riders_file.name, riders_file.data, riders_file.size, riders_file.encoding, riders_file.tempFilePath, riders_file.truncated, riders_file.mimetype, riders_file.md5, artist_id],
            callback
        );
    }
    updateHospitalityRiders(hospitality_riders_file: any, artist_id: number, callback: function){
        super.query(
            "UPDATE hospitality_ridersFile  SET name = ?, data = ?, size = ?, encoding = ?, tempFilePath = ?, truncated = ?, mimetype = ?, md5 = ? WHERE artist_id = ?",
            [hospitality_riders_file.name, hospitality_riders_file.data, hospitality_riders_file.size, hospitality_riders_file.encoding,
                hospitality_riders_file.tempFilePath, hospitality_riders_file.truncated, hospitality_riders_file.mimetype, hospitality_riders_file.md5, artist_id],
            callback
        );
    }

    updateArtistContract(artist_contract_file: any, artist_id: number, callback: function){
        super.query(
            "UPDATE artist_contractFile  SET name = ?, data = ?, size = ?, encoding = ?, tempFilePath = ?, truncated = ?, mimetype = ?, md5 = ? WHERE artist_id = ?",
            [artist_contract_file.name, artist_contract_file.data, artist_contract_file.size, artist_contract_file.encoding,
                artist_contract_file.tempFilePath, artist_contract_file.truncated, artist_contract_file.mimetype, artist_contract_file.md5, artist_id],
            callback
        );
    }

    getRider(artist_id: number, callback: function){
        super.query(
            "SELECT * FROM file WHERE artist_id = ?",[artist_id], callback
        );
    }

    updateArtist(artistID:number,json:{artist_name: string, riders: File, hospitality_riders: File,
        artist_contract: File, email: string, phone: string, image: File}, callback:function){
        super.query(
          "UPDATE artist SET artist_name=?,riders=?,hospitality_riders=?,artist_contract=?,email=?,phone=? WHERE artist_id=?",
          [json.artist_name,json.riders,json.hospitality_riders,json.artist_contract,json.email,json.phone,artistID],
          callback
        );
    }

    setAccepted(artistID:number, json: {accepted: number}, callback:function){
        super.query(
            "UPDATE artist SET accepted = ? WHERE artist_id=?",
            [json.accepted, artistID],
            callback
        );
}

    /*
    deleteArtist(artist_id: number, callback: function) {
      super.query(
          "DELETE FROM artist WHERE artist_id = ?", [artist_id],
          callback
        );
    }*/

};
