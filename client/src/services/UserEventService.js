// @flow
import axios from 'axios';
import {Ticket} from "./TicketService";
import {EventService} from "./EventService";

const url = "http://localhost:8080/";

export class UserEvent {
    user_id: number;
    event_id: number;
    job_position: string;
    user_name: string;

    constructor(user_id: number, event_id: number, job_position: string, user_name: string) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.job_position = job_position;
        this.user_name = user_name;
    }
}

class UserEventService {
    addUserEvent(user_id: number, event_id: number, job_position: string){
        return axios.post<{}, UserEvent>(url+"userEvent/add", {
            "user_id": user_id,
            "event_id": event_id,
            "job_position": job_position
        }).then(response => response.data);
    }
}

export let userEventService = new UserEventService();