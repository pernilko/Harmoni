// @flow
import axios from 'axios';

let url: string = "http://localhost:8080/";

export class UserEvent {
    user_id: number;
    event_id: number;
    job_position: string;
    accepted: boolean;

    constructor(user_id: number, event_id: number, job_position: string, accepted: boolean) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.job_position = job_position;
        this.accepted = accepted;
    }

    
}

class UserEventService {
    getAllUserEvent(id: number) {
        return axios.get<UserEvent[]>(url + "userevent/all/" + id).then(response => response.data);
    }
}

export let userEventService: UserEventService = new UserEventService();