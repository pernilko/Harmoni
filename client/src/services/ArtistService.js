// @flow
import axios from 'axios';
import { createHashHistory } from 'history';
const history = createHashHistory();

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

/**
    ArtistService - Klasse for å håndtere all informasjon tilknytta artister
 */
class ArtistService {

    /**
        getAllArtists - henter alle artister
        @return {Artist[]} Alle artistene i DB.
     */
    getAllArtists() {
        return axios.get<Artist[]>(url + "artist/all").then(response => response.data);
    }

    /**
        getEventArtists - Henter alle artistene tilknyttet et konkret event
        @parameter {number} event_id - id til arrangementet det er snakk om.
        @return {Artist[]} Alle artistene som er tilknyttet arrangementet.
     */
    getEventArtists(event_id: number) {
        return axios.get<Artist[]>(url + "artist/event/" + event_id).then(response => response.data);
    }

    /**
        getArtistRider - henter rideren til en gitt artist
        @parameter {number} artist_id - id til en gitt artist
        @return {File} riderkontrakten til en artist.
     */
    getArtistRider(artist_id:number){
         return axios.get<File>(url+"artist/rider/"+artist_id).then(response => response.data[0]);
    }

    /**
        getOneArtist - henter en artist med en konkret id
        @parameter {number} id - id til artisten en skal hente.
        @return {Artist[]} raden i DB for artisten gjort om til et Artistobjekt.
     */
    getOneArtist(id: number) {
        return axios.get<Artist[]>(url + "artist/"+id).then(response => response.data[0]);
    }

    /**
        addArtist - legger til en ny artist i DB.
        @parameter {number} event_id - id til eventet artisten skal legges til i.
        @parameter {string} artist_name - navnet til artisten.
        @parameter {string} email - epostadressen til artisten.
        @parameter {File} ridersFile - fil med liste over ridersene til en artist.
        @parameter {File} hospitality_riders - fil med liste over hospitality-riders til en artist.
        @parameter {File} artist_contract - fil med kontrakten til en artist. 
     */
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
     * @param artist_contract {File} tar inn hvilken artistkontrakt som skal lastes opp til google cloud og kobles til artisten som skal redigeres.
     * @param email {string} tar inn den nye epost-addressen som skal sendes med put requestn til serveren for artisten som skal redigeres.
     * @param phone {number} tar inn det nye telefonnummeret som skal sendes til serveren og oppdatere artisten som skal redigeres.
     */
    updateArtist(artist_id: number, artist_name, ridersFile: File, hospitality_ridersFile: File, artist_contract: File, email, phone, event_id: number) {
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
            }).then(response=> response.data);
        });
    }

    /**
     * metode for å sende en sletterequest til serveren for en artist
     * @param id {number} tar inn id-en til artisten som skal slettes
     */
    deleteArtist(id: number) {
        return axios.delete<Artist, void>(url + "artist/delete/" + id).then(response => response.data);
    }

    /**
     * metode for å sende put-request for å oppdatere om artisten og all informasjon er akseptert.
     * @param id {number} tar inn id-en for artisten som skal redigeres.
     * @param accepted {number} tar inn tallet akseptert-tilstanden skal settes til på artisten.
     */

    setAccepted(id: number, accepted: number) {
        return axios.put<Artist, void>(url + "artist/accepted/" + id, {"accepted": accepted}).then(response => response.data);
    }
}

export let artistService = new ArtistService();