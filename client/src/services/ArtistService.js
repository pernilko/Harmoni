// @flow
import axios from 'axios';

const url = "http://localhost:8080/";

export class Artist {
    artist_id: number;
    event_id: number;
    artist_name: string;
    riders: any;
    hospitality_riders: any;
    artist_contract: any;
    email: string;
    phone: string;
    accepted: number;

    constructor(artist_id: number, event_id: number, artist_name: string, riders: any, hospitality_riders: any, artist_contract: any, email: string, phone: string, accepted: number) {

        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.riders = riders;
        this.hospitality_riders = hospitality_riders;
        this.artist_contract = artist_contract;
        this.email = email;
        this.phone = phone;
        this.accepted = accepted;
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


    addArtist(event_id: number, artist_name: string, riders: File, hospitality_riders: File, artist_contract: File, email: string, phone: number) {
        return axios.post<{}, Artist>(url + "artist/add", {
            "event_id": event_id,
            "artist_name": artist_name,
            "riders": riders,
            "hospitality_riders": hospitality_riders,
            "artist_contract": artist_contract,
            "email": email,
            "phone": phone
        }).then(response => response.data);
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

    setAccepted(id: number, accepted: number) {
        return axios.put<Artist, void>(url + "artist/accepted/" + id).then(response => response.data);
    }
}

export let artistService = new ArtistService();