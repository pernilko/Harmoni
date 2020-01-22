// @flow
import axios from 'axios';

const url = "http://localhost:8080/";

export class Artist {
    artist_id: number;
    event_id: number;
    artist_name: string;
    email: string;
    phone: string;
    riders:File;
    hospitality_riders: File;
    artist_contract: File;
    accepted: number;

    constructor(artist_id: number, event_id: number, artist_name: string, email: string, phone: string, riders:File, hospitality_riders: File, artist_contract: File, accepted: number) {
        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.email = email;
        this.phone = phone;
        this.riders=riders;
        this.hospitality_riders = hospitality_riders;
        this.artist_contract = artist_contract;
        this.email = email;
        this.phone = phone;
        this.accepted = accepted;
    }
}

export class File{
    artist_id:number;
    name:string;
    data:any;
    mimetype:string;

    constructor(artist_id:number,name:string, data: any,mimetype:string){
        this.artist_id=artist_id;
        this.name=name;
        this.data=data;
        this.mimetype=mimetype;
    }
}


class ArtistService {
    getAllArtists() {
        return axios.get<Artist[]>(url + "artist/all").then(response => response.data);
    }

    getEventArtists(event_id: number) {
        return axios.get<Artist[]>(url + "artist/event/" + event_id).then(response => response.data);
    }

    getArtistRider(artist_id:number){
         return axios.get<File>(url+"artist/rider/"+artist_id).then(response => response.data[0]);
    }

    getOneArtist(id: number) {
        return axios.get<Artist[]>(url + "artist/"+id).then(response => response.data[0]);
    }

    addArtist(event_id: number, artist_name: string, email: string, phone: string, ridersFile: File, hospitality_riders: File, artist_contract: File) {
        let fd_riders:FormData = new FormData();
        fd_riders.append("riders", ridersFile);
        fd_riders.append("hospitality_rider", hospitality_riders);
        fd_riders.append("artist_contract", artist_contract);

        console.log("ridersFile from service: ");
        console.log(ridersFile);
        console.log(hospitality_riders);
        console.log(artist_contract);
        return axios.post<{}, Artist>(url + "artist/add", {
            "event_id": event_id,
            "artist_name": artist_name,
            "email": email,
            "phone": phone
        }).then(response => {
            console.log("response from post artist/add");
            console.log(response.data[0]);
            return axios<{}>({
                url: url +'upload/riders/' + response.data[0].artist_id,
                method: 'put',
                data: fd_riders,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        });
    }

    /**
     * Metode for å oppdatere informasjon om en artist. Legger først inn kontatkinfo, så filer for riders, hospitality riders og artistkontrakt.
     * @param artist_id {number} tar inn id for hvilken artist som skal redigeres.
     * @param artist_name {string} tar inn nytt navn på artist som skal redigeres.
     * @param ridersFile {File} tar inn hvilken riders pdf-fil som skal lastes opp til gcloud og kobles til artisten som skal redigeres.
     * @param hospitality_ridersFile {File} tar inn hvilken hospitality riders pdf-fil som skal lastes opp til gcloud og kobles til artisten som skal redigeres.
     * @param artist_contract
     * @param email
     * @param phone
     */
    updateArtist(artist_id: number, artist_name, ridersFile: File, hospitality_ridersFile: File, artist_contract: File, email, phone) {
        let fd_riders:FormData = new FormData();
        fd_riders.append("riders", ridersFile);
        fd_riders.append("hospitality_rider", hospitality_ridersFile);
        fd_riders.append("artist_contract", artist_contract);

        return axios.put<{}, Event>(url + "artist/"+artist_id, {
            "artist_name": artist_name,
            "email": email,
            "phone": phone
        }).then(()=> {
            return axios<{}>({
                url: url +'upload/riders/' + artist_id,
                method: 'put',
                data: fd_riders,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response=>response.data);
        });
    }

    deleteArtist(id: number) {
        return axios.delete<Artist, void>(url + "artist/delete/" + id).then(response => response.data);
    }

    setAccepted(id: number, accepted: number) {
        return axios.put<Artist, void>(url + "artist/accepted/" + id, {"accepted": accepted}).then(response => response.data);
    }
}

export let artistService = new ArtistService();