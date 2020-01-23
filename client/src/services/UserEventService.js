// @flow
import axios from 'axios';
import {User} from './UserService';

const url = "http://localhost:8080/";

/**
    UserEvent - Klasse som beskriver "UserEvent"-tabellen i DB, hver rad er en vakt i systemet.
 */
export class UserEvent {
    user_id: number;
    event_id: number;
    job_position: string;
    user_name: string;
    email: string;
    accepted: number;

    /**
        @constructor Konstruktør for UserEvent
        @parameter {number} user_id - beskriver id til brukerkolonnen
        @parameter {number} event_id - beskriver eventet det er snakk om.
        @parameter {string] job_position - beskriver stillingen til vakten.
        @parameter {string} user_name - beskriver navnet til personen
        @parameter {string} email - beskriver eposten til brukeren.
        @parameter {number} accepted - beskriver om brukeren har akseptert vakta si eller ikke.
     */

    constructor(user_id: number, event_id: number, job_position: string, user_name: string, email: string, accepted: number ) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.job_position = job_position;
        this.user_name = user_name;
        this.email = email;
        this.accepted = accepted;
    }
}


/**
    UserEventService - Klasse for å hente rader fra UserEventtabellen i DB. Den omgjør resultatene til UserEvent objekter.
 */
class UserEventService {

    /**
        addUserEvent - Legger til en ny rad i UserEvent-tabellen i DB.
        @parameter {number} user_id - beskriver id til brukerkolonnen
        @parameter {number} event_id - beskriver eventet det er snakk om.
        @parameter {string] job_position - beskriver stillingen til vakten.
        @parameter {number} accepted - beskriver om brukeren har akseptert vakta si eller ikke. 0 --> Nei, 1 --> ja, ellers --> Ikke svart enda.
        @return antallet rader som ble påvirker av kallet.
     */
    addUserEvent(user_id: number, event_id: number, job_position: string, accepted: number){
        return axios.post<{}, UserEvent>(url+"userEvent/add", {
            "user_id": user_id,
            "event_id": event_id,
            "job_position": job_position,
            "accepted": accepted
        }).then(response => response.data);
    }

    /**
        getAllbyId - Henter alle vakter som er relatert til et gitt event, men med brukeren sitt navn, og deres email i tillegg.
        @parameter {number} event_id - id til eventet det er snakk om.
        @return alle vaktene som tilhører eventet det er snakk om + navn og email.
     */
    getAllbyId(event_id: number) {
        return axios.get<UserEvent[]>(url + "userEvent/" + event_id)
            .then(response => response.data);
    }

    /**
        getUserbyId - Henter alle brukerne som er tilknytta et event
        @parameter {number} event_id - id til eventet det er snakk om.
        @return alle brukerne som har et vakt i eventet det er snakk om.
     */
    getUserbyId(event_id: number) {
        return axios.get<User[]>(url + "userEvent/users/" + event_id)
        .then(response => response.data);
    }

    /**
        getAlluserEvent - henter alle vakter tilknytta et event.
        @parameter {number} id - id til eventet det er snakk om.
        @return alle vaktene som er tilknytta eventet.
     */
    getAllUserEvent(id: number) {
        return axios.get<UserEvent[]>(url + "userevent/all/" + id).then(response => response.data);
    }

    /**
        setAccepted - Endrer akseptverdien til et konkret vakt. Det vil si å legge inn om personen kan møte opp på vakta eller ikke.
        @parameter {number} user_id - id som beskriver hvilken bruker det gjelder.
        @parameter {number} event_id - beskriver hvilket event det er snakk om.
        @parameter {number} accepted - den nye akseptverdien til vakta. 0-->nei, 1-->ja, 2-->vet ikke.
        @return antallet rader som ble påvirket av kallet.
     */
    setAccepted(user_id: number, event_id: number, accepted: number) {
        return axios.put<{}>(url + "userevent/accepted/", {
            "user_id": user_id,
            "event_id": event_id,
            "accepted": accepted
        }).then(response => response.data);
    }

    /**
        deleteUserEvent - slette en rad i UserEvent-tabellen
        @parameter {number} user_id - id som beskriver hvilken bruker det gjelder.
        @parameter {number} event_id - beskriver hvilket event det er snakk om.
        @return antallet rader som ble påvirket av kallet.
     */
    deleteUserEvent(user_id: number, event_id: number){
        return axios.delete<{}, UserEvent>(url + "userEvent/delete/" + user_id + "/" + event_id).then(response => response.data);
    }

    /**
        notify - Sender email til brukeren om hvilken vakt de er satt opp på.
        @parameter {number} event_id - id til eventet som de er satt opp på.
        @parameter {string} name - navnet på personen som har er satt opp.
        @parameter {string} job_position - beskrivelse av stillingen deres under vakta.
        @parameter {string} email - eposten til brukeren som mottar tilbudet.
        @return URl til eventet personen ble invitert til.
     */
    notify(event_id: number, name: string, job_position: string, email: string) {
        return axios.post<{}, UserEvent[]>(url + "event/add/notify/"+event_id, {
            "name": name,
            "job_position": job_position,
            "email": email
        }).then(res => res.data);
    }

    /**
        notifyDelete - Sender email til en bruker om at de ikke lenger har vakt på et gitt arrangement.
        @parameter {number} event_id - id til eventet som de var satt opp på.
        @parameter {string} name - navnet på personen som har var satt opp.
        @parameter {string} job_position - beskrivelse av stillingen deres under vakta.
        @parameter {string} email - eposten til brukeren som ikke lenger er satt opp.
        @return URl til eventet personen ikke lenger skal jobbe på.
     */
    notifyDelete(event_id: number, name: string, job_position: string, email: string) {
        return axios.post<{}, UserEvent[]>(url + "event/delete/notify/"+event_id, {
            "name": name,
            "job_position": job_position,
            "email": email
        }).then(res => res.data);
    }

    /**
        notifyEdit - Sender email til en bruker om et arrangement de er satt opp på som vakt har blitt endret.
        @parameter {number} event_id - id til eventet som de er satt opp på.
        @parameter {string} name - navnet på personen som har er satt opp.
        @parameter {string} job_position - beskrivelse av stillingen deres under vakta.
        @parameter {string} email - eposten til brukeren som mottar tilbudet.
        @return URl til eventet personen ble invitert til.
     */
    notifyEdit(event_id: number, name: string, job_position: string, email: string) {
        return axios.post<{}, UserEvent[]>(url + "event/edit/notify/"+event_id, {
            "name": name,
            "job_position": job_position,
            "email": email
        }).then(res => res.data);
    }

}

export let userEventService = new UserEventService();