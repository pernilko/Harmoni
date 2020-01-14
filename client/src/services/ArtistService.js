// @flow
import axios from 'axios';
//import {FileReader} from "jsdom/lib/jsdom/browser/Window";

const url = "http://localhost:8080/";

export class Artist {
    artist_id: number;
    event_id: number;
    email: string;
    phone: string;
    image: Buffer;
    riders: FormData;

    constructor(artist_id: number, event_id: number, artist_name: string,email: string, phone: string, image: any, readStates:Object,states:Object) {
        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.email = email;
        this.phone = phone;
        this.image = image;
        this.readStates=readStates;
        this.states=states;
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
    addArtist(event_id: number, artist_name: string, email: string, phone: number, ridersFile: FormData) {
        axios.post<{}, Artist>(url + "artist/add", {
            "event_id": event_id,
            "artist_name": artist_name,
            "email": email,
            "phone": phone
        }).then(response => {
            axios.post<{}>(url + "uploadRider/" + response[0].artist_id, ridersFile
            ).then(res=>res.data);
        });
    }

    deleteArtist(id: number) {
        return axios.delete<Artist, void>(url + "artist/delete/" + id).then(response => response.data);
    }
}

export let artistService = new ArtistService();