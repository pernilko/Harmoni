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

    insertOne(json: {event_id: number, artist_name: string, riders: File, hospitality_riders: File,
                  artist_contract: File, email: string, phone: string, image: File}, callback: function) {

        console.log('Printing the rider tostring'+json.riders);
        super.query(
            "INSERT INTO artist (event_id, artist_name, riders, hospitality_riders, artist_contract, email, phone, image) values (?,?,?,?,?,?,?,?)",
            [json.event_id, json.artist_name, json.riders, json.hospitality_riders, json.artist_contract, json.email, json.phone, json.image],
            callback
        );
    }

    updateArtist(artistID:number,json:{artist_name: string, riders: File, hospitality_riders: File,
        artist_contract: File, email: string, phone: string, image: File}, callback:function){
        super.query(
          "UPDATE artist SET artist_name=?,riders=?,hospitality_riders=?,artist_contract=?,email=?,phone=?,image=? WHERE artist_id=?",
          [json.artist_name,{file_type:'pdf',file_size: json.riders.length,file: json.riders},
              {file_type:'pdf',file_size: json.hospitality_riders.length,file:json.hospitality_riders},
              {file_type:'pdf',file_size: json.artist_contract.length,file:json.artist_contract},json.email,json.phone,json.image,artistID],
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
