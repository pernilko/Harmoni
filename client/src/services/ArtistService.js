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

    constructor(artist_id: number, event_id: number, artist_name: string, email: string, phone: string, riders:File, hospitality_riders: File, artist_contract: File) {
        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.email = email;
        this.phone = phone;
        this.riders=riders;
        this.hospitality_riders = hospitality_riders;
        this.artist_contract = artist_contract;
    }
}

class ArtistService {
    getAllArtists() {
        return axios.get<Artist[]>(url + "artist/all").then(response => response.data);
    }

    getEventArtists(event_id: number) {
        return axios.get<Artist[]>(url + "artist/event/" + event_id).then(response => response.data);
    }

    getOneArtist(id: number) {
        return axios.get<Artist[]>(url + "artist/"+id).then(response => response.data[0]);
    }
    addArtist(event_id: number, artist_name: string, email: string, phone: number, ridersFile: File, hospitality_rider: File, artist_contract: File) {
        let fd_riders:FormData = new FormData();
        fd_riders.append("riders", ridersFile);
        fd_riders.append("hospitality_rider", hospitality_rider);
        fd_riders.append("artist_contract", artist_contract);

        console.log("ridersFile from service: ");
        console.log(ridersFile);
        console.log(hospitality_rider);
        console.log(artist_contract);
        return axios.post<{}, Artist>(url + "artist/add", {
            "event_id": event_id,
            "artist_name": artist_name,
            "email": email,
            "phone": phone
        }).then(response => {
            console.log("response from post artist/add");
            console.log(response.data);
            return axios<{}>({
                url: url +'uploadRiders/' + response.data[0].artist_id,
                method: 'post',
                data: fd_riders,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        });
    }

    updateArtist(artist_id: number, artist_name, riders, hospitality_riders, artist_contract, email, phone) {
        return axios.put<{}, Event>(url + "artist/"+artist_id, {
            "artist_name": artist_name,
            "riders": riders,
            "hospitality_riders": hospitality_riders,
            "artist_contract": artist_contract,
            "email": email,
            "phone": phone
        }).then(response => response.data);
    }

    deleteArtist(id: number) {
        return axios.delete<Artist, void>(url + "artist/delete/" + id).then(response => response.data);
    }
}

export let artistService = new ArtistService();