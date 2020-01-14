// @flow
import axios from 'axios';

const url = "http://localhost:8080/";

export class Artist {
    artist_id: number;
    event_id: number;
    artist_name: string;
    riders: File;
    hospitality_riders:File;
    contract:File;
    email: string;
    phone: string;
    image: File;

    constructor(artist_id: number, event_id: number, artist_name: string,riders:Object,hospitality_riders:Object, contract:Object, email: string, phone: string, image: Object) {
        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.riders=riders;
        this.hospitality_riders=hospitality_riders;
        this.contract=contract;
        this.email = email;
        this.phone = phone;
        this.image = image;
    }
}

class ArtistService {
    getAllArtists() {
        axios.get<Artist[]>(url + "artist/all").then(response => response.data);
    }

    getEventArtists(event_id: number){
        axios.get<Artist[]>(url + "artist/event/" + event_id).then(response => response.data);
    }

    getOneArtist(id: number) {
        axios.get<Artist[]>(url + "artist/"+id).then(response => response.data[0]);
    }
    addArtist(event_id: number, artist_name: string, riders:File, hospitality_riders:File,contract:File,email: string, phone: number, image:File) {
        axios.post<{}, Artist>(url + "artist/add", {
            "event_id": event_id,
            "artist_name": artist_name,
            "riders": riders,
            "hospitality_riders": hospitality_riders,
            "artist_contract":contract,
            "email": email,
            "phone": phone
        }).then(response => response.data);
    }

    deleteArtist(id: number) {
        return axios.delete<Artist, void>(url + "artist/delete/" + id).then(response => response.data);
    }
}

export let artistService = new ArtistService();