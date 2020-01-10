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

    insertOne(json: {event_id: number, artist_name: string, riders: string, hospitality_riders: string,
                  artist_contract: string, email: string, phone: string, image: string}, callback: function) {
        super.query(
            "INSERT INTO artist (event_id, artist_name, riders, hospitality_riders, artist_contract, email, phone, image) values (?,?,?,?,?,?,?,?)",
            [json.event_id, json.artist_name, json.riders, json.hospitality_riders, json.artist_contract, json.email, json.phone, json.image],
            callback
        );
    }

    updateArtist(artistID:number,json:{artist_name: string, riders: Blob, hospitality_riders: Blob,
        artist_contract: Blob, email: string, phone: string, image: Blob}, callback:function){
        super.query(
          "UPDATE artist SET artist_name=?,riders=?,hospitality_riders=?,artist_contract=?,email=?,phone=?,image=? WHERE artist_id=?",
          [json.artist_name,json.riders,json.hospitality_riders,json.artist_contract,json.email,json.phone,json.image,artistID],
          callback
        );
    }

    deleteArtist(artist_id: number, callback: function) {
      super.query(
          "DELETE FROM artist WHERE artist_id = ?", [artist_id],
          callback
        );
    }

};
