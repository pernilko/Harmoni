//@flow
const Dao = require("./dao.js");
const imageUrl = "https://storage.cloud.google.com/harmoni-files/";

module.exports = class artistDao extends Dao {

    //tested
    getAll(callback: function){
        super.query("SELECT * FROM artist", [], callback);
    }

    //tested
    getEventArtists(event_id: number, callback: function){
        super.query(
            "SELECT * FROM artist WHERE event_id = ?",
            [event_id], callback
        );
    }

    //tested
    getOne(artist_id: number, callback: function) {
        super.query(
            "select * from artist where artist_id = ?",
            [artist_id], callback
        );
    }

    updateRiders(artist_id: number, ridersfilename: string, hospitalityridersfilename: string, artistcontractfilename: string, callback: function){
        let rf: string = "";
        let hrf: string = "";
        let ac: string = "";

        if(ridersfilename.length>0){
            rf = imageUrl+ridersfilename;
        }
        if(hospitalityridersfilename.length>0){
            hrf = imageUrl + hospitalityridersfilename;
        }
        if(artistcontractfilename.length>0){
            ac = imageUrl+artistcontractfilename;
        }
        console.log("from artistDao: ");
        console.log(rf + ", " + hrf + ", "+ ac);
        console.log(rf.length + ", " + hrf.length + ", " + ac.length);

        if(rf.length >0 && hrf.length == 0 && ac.length == 0){
            super.query(
                "UPDATE artist SET riders = ? WHERE artist_id = ?",
                [rf, artist_id],
                callback
            );
        }else if(rf.length > 0 && hrf.length > 0 && ac.length == 0){
            super.query(
                "UPDATE artist SET riders = ?, hospitality_riders = ? WHERE artist_id = ?",
                [rf, hrf, artist_id],
                callback
            );
        } else if(rf.length > 0 && hrf.length > 0 && ac.length > 0 ){
            super.query(
                "UPDATE artist SET riders = ?, hospitality_riders = ?, artist_contract = ? WHERE artist_id = ?",
                [rf, hrf, ac, artist_id],
                callback
            );
        } else if(rf.length == 0 && hrf.length == 0 && ac.length > 0){
            super.query(
                "UPDATE artist SET artist_contract = ? WHERE artist_id = ?",
                [ac, artist_id],
                callback
            );
        } else if(rf.length == 0 && hrf.length >0 && ac.length > 0){
            super.query(
                "UPDATE artist SET hospitality_riders = ?, artist_contract = ? WHERE artist_id = ?",
                [rf, hrf, ac, artist_id],
                callback
            );
        } else if (rf.length > 0 && hrf.length == 0 && ac.length>0){
            super.query(
                "UPDATE artist SET riders = ?, artist_contract = ? WHERE artist_id = ?",
                [rf, ac, artist_id],
                callback
            );
        }else{
            super.query(
                "UPDATE artist SET hospitality_riders = ? WHERE artist_id = ?",
                [hrf, artist_id],
                callback
            );
        }
    }

    //tested
    updateArtist(artistID:number,json:{artist_name: string , email: string, phone: string, image: File}, callback:function){
        super.query(
          "UPDATE artist SET artist_name=?, email=?,phone=? WHERE artist_id=?",
          [json.artist_name, json.email, json.phone,artistID],
          callback
        );
    }

    //tested
    setAccepted(artistID:number, json: {accepted: number}, callback:function){
        super.query(
            "UPDATE artist SET accepted = ? WHERE artist_id=?",
            [json.accepted, artistID],
            callback
        );
}

};
