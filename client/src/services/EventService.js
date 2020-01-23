// @flow
import axios from 'axios';

const url = "http://localhost:8080/";


/**
 * hjelpeklasse for tabellen 'event' i databasen med objektsvariabler som matcher attributtene i tabellen.
 */
export class Event {
    event_id: number;
    org_id: number;
    user_id: number;
    event_name: string;
    description: string;
    place: string;
    event_start: any;
    event_end: any;
    longitude: number;
    latitude: number;
    image: string;
    completed: boolean;
    accepted: number;

    constructor(event_id: number, org_id: number, user_id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number, image: string, accepted: number, completed: number) {
        this.event_id = event_id;
        this.org_id = org_id;
        this.user_id = user_id;
        this.event_name = event_name;
        this.description = description;
        this.place = place;
        this.event_start = event_start;
        this.event_end = event_end;
        this.longitude = longitude;
        this.latitude = latitude;
        this.image = image;
        this.accepted = accepted;
        this.completed = completed;
    }
}

/**
 * Service klasse for events. brukes for å hente informasjon fra server og gjør dem tilgjengelig for klient.
 */
export class EventService {
    getAllEvents() {
        return axios.get<Event[]>(url + "event/all").then(response => response.data);
    }

    /**
     * Metode for å hente all informasjon om et event fra server via event_id
     * @param id {number} tar inn event_id for eventet vi skal hente fra server.
     * @returns {boolean} et promise som vil returnere som et Event-objekt med fylte objektsvariabler når serveren gir et svar.
     */
    getEventId(id: number) {
        return axios.get<Event[]>(url + "event/" + id).then(response => response.data[0]);
    }

    /**
     * Metode for å legge til et event fra klienten til serveren.
     * @param org_id {number} tar inn org_id for eventet som skal legges til
     * @param event_name {string} tar inn navnet som skal settes på det nye eventet.
     * @param user_id {numer} tar inn id på bruker som har opprettet eventet.
     * @param description {string} tar inn beskrivelse av eventet som skall opprettes.
     * @param place {string} tar inn lokasjon på eventet som skal opprettes.
     * @param event_start tar inn startstidspunkt for eventet som skal opprettes
     * @param event_end tar inn sluttidspunkt for eventet som skal opprettes.
     * @param longitude tar inn lengdegrad for nøyaktig plassering i google-maps for eventet.
     * @param latitude tar inn breddegrad for nøyaktig plassering i google-maps for eventet.
     */
    postEvent(org_id: number, event_name: string, user_id: number, description: string, place: string, event_start: any, event_end: any, longitude: number, latitude: number) {
        return axios.post<{}, Event>(url + "event/add", {
            "org_id": org_id,
            "event_name": event_name,
            "user_id": user_id,
            "description": description,
            "place": place,
            "event_start": event_start,
            "event_end": event_end,
            "longitude": longitude,
            "latitude": latitude,
            "image": "",
        }).then(response => response.data);
    }
    getEventsByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/user/"+ user_id).then(response=>response.data);
    }
    getEventsByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/org/" + org_id).then(response=>response.data);
    }

    /**
     * Metode for å få events opprettet av en bruker som ikke har startet enda
     * @param user_id {number} tar inn id-en for brukeren eventsene skal hentes for.
     * @returns {boolean} gir tilbake en tabell med events opprettet av gjeldende bruker som ikke har startet enda.
     */
    getEventsUpcomingByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/upcoming/user/"+ user_id).then(response=>response.data);
    }

    /**
     * Metode for å hente alle events koblet til en organisasjon som ikke har startet enda.
     * @param org_id {number} tar inn org_id-en for gjeldende organisasjon.
     * @returns {boolean} gir tilbake en tabell med events som ikke har startet enda koblet til en organisasjon.
     */
    getEventsUpcomingByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/upcoming/org/" + org_id).then(response=>response.data);
    }

    /**
     * Metode for å hente alle events lagd av en spesifikk bruker som er pågående.
     * @param user_id {number} tar inn id på gjeldende bruker.
     * @returns {boolean} gir tilbake en liste med events som er pågående, lagd av en spesifikk bruker.
     */
    getEventsCurrentByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/current/user/"+ user_id).then(response=>response.data);
    }

    /**
     * Metode for å hente alle events som er pågående og koblet til en spesifikk organisasjon.
     * @param org_id {number} tar inn id-en på gjeldende organisasjon.
     * @returns {boolean} gir tilbake en liste med events som er pågående og koblet til en organisasjon.
     */
    getEventsCurrentByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/current/org/" + org_id).then(response=>response.data);
    }

    /**
     * Metode for å få events fra server som er ferdige og koblet til en spesifikk bruker.
     * @param user_id {number} tar inn id-en for gjeldende bruker.
     * @returns {boolean} gir tilbake en liste med ferdige events kobla til en spesifikk bruker
     */
    getEventsPreviousByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/previous/user/"+ user_id).then(response=>response.data);
    }

    /**
     * Metode for å hente events fra server som er ferdige og koblet til en spesifikk organisasjon.
     * @param org_id {number} tar inn id-en for gjeldende organisasjon.
     * @returns {boolean} gir tilbake en liste med ferdige events koblet til en spesifikk organisasjon
     */
    getEventsPreviousByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/previous/org/" + org_id).then(response=>response.data);
    }

    /**
     * Metode for å hente events som ikke er godkjent i systemet enda og koblet til en spesifikk bruker.
     * @param user_id {number} tar inn id-en for gjeldende bruker.
     * @returns {boolean} gir tilbake en liste med events som ikke er godkjent og koblet til en spesifikk bruker.
     */
    getEventsPending(user_id: number){
        return axios.get<Event[]>(url+"event/pending/" + user_id).then(response=>response.data);
    }

    /**
     * Metode for å hente events som er avlyst og opprettet av en spesifikk bruker.
     * @param user_id {number} tar inn id-en for gjeldende bruker.
     * @returns {boolean} gir tilbake en liste med events som er avlyst og opprettet av en spesifikk bruker.
     */
    getEventsCancelledUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/cancelled/user/" + user_id).then(response=>response.data);
    }

    /**
     * Metode for å hente avlyste events koblet til en spesifikk organisasjon.
     * @param org_id {number} tar inn id-en på gjeldende organisasjon.
     * @returns {boolean} gir tilbake en liste med events som er avlyst og koblet til den spesifikke organisasjonen.
     */
    getEventsCancelledOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/cancelled/org/" + org_id).then(response=>response.data);
    }

    /**
     * Metode for å markere et gitt event som godkjent og ferdig.
     * @param user_id {number} tar inn id-en for gjeldende bruker.
     * @returns {boolean} gir tilbake info om oppdateringen ble utført eller ikke.
     */
    setCompleted(event_id: number){
        return axios.put<Event[]>(url+"event/pending/" + event_id).then(response=>response.data);
    }

    /**
     * Metode for å oppdatere et event
     * @param id {number} tar inn id-en for eventet som skal oppdateres.
     * @param event_name {string} tar inn det nye navnet på eventet som skal redigeres.
     * @param description {string} tar inn beskrivelsen av eventet som skal redigeres.
     * @param place {string} tar inn navnet på stedet på eventet som skal redigeres.
     * @param event_start tar inn startstidspunktet på eventet som skal redigeres.
     * @param event_end tar inn sluttidspunktet på eventet som skal redigeres
     * @param longitude tar inn lengdegraden for nøyaktig plassering av eventet som skal redigeres.
     * @param latitude tar inn breddegraden for nøyaktig plassering av eventet som skal redigeres.
     */
    updateEvent(id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number) {
        return axios.put<{}, Event>(url + "event/edit/"+id, {
            "event_name": event_name,
            "description": description,
            "place": place,
            "event_start": event_start,
            "event_end": event_end,
            "longitude": longitude,
            "latitude": latitude,
        }).then(response => response.data);
    }

    /**
     * Metode for å avlyse et event.
     * @param id {number} tar inn id-en for eventet som skal avlyses.
     */
    cancelEvent(id : number){
        return axios.put<{}, Event>(url + "event/cancel/" + id).then(response => response.data)
    }

    /**
     * Metode for å hente ut events som er koblet til en spesifikk organisasjon fra server og basert på en søkestreng.
     * @param search {string} tar inn en søkestreng som brukes for å filtrere hvilke events som kommer tilbake.
     * @param org_id {number} tar inn id-en for gjeldende organisasjon.
     * @returns {boolean} gir tilbake en liste med events.
     */
    getEventbySearch(search: string, org_id: number){
        return axios.get<Event[]>(url + "event/search/" + search + "/" + org_id).then(response => response.data);
    }

    /**
     * Metode for å markere et event godkjent/ikke godkjent.
     * @param id {number} tar inn id-en for gjeldende event.
     * @param accepted {number} tar inn tallet som representerer om eventet er godkjent eller ikke.
     */
    setAcceptedEvent(id: number, accepted: number) {
        return axios.put<Event, void>(url + "event/accepted/" + id, {"accepted": accepted}).then(response => response.data);
    }

    /**
     * Metode for å oppdatere bildet til et spesifikt event.
     * @param event_id {number} tar inn id-en for gjeldende event.
     * @param picture {File} tar inn fila som skal lastes opp til gcloud og settes som bilde for gjeldende event.
     * @returns {boolean} gir tilbake info om opplastingen fungerte.
     */
    updateEventImage(event_id: number, picture: File) {
        let fd:FormData = new FormData();
        fd.append("myFile", picture);
        return axios<{}>({
                url: url +'upload/event/editImage/'+event_id,
                method: 'post',
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    }
}

export let eventService = new EventService();
