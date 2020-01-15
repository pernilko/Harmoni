// @flow
import axios from 'axios';
import {User} from './UserService';

const url = "http://localhost:8080/";

export class UserEvent {
    user_id: number;
    event_id: number;
    job_position: string;
    user_name: string;
    accepted: number;

    constructor(user_id: number, event_id: number, job_position: string, user_name: string, accepted: number ) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.job_position = job_position;
        this.user_name = user_name;
        this.accepted = accepted;
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

    getAllbyId(event_id: number) {
        return axios.get<UserEvent[]>(url + "userEvent/" + event_id)
            .then(response => response.data);
    }

    getUserbyId(event_id: number) {
        return axios.get<User[]>(url + "userEvent/users/" + event_id)
        .then(response => response.data);
    }
    getAllUserEvent(id: number) {
        return axios.get<UserEvent[]>(url + "userevent/all/" + id).then(response => response.data);
    }

    setAccepted(user_id: number, event_id: number, accepted: number) {
        return axios.put<{}>(url + "userevent/accepted/", {
            "user_id": user_id,
            "event_id": event_id,
            "accepted": accepted
        }).then(response => response.data);
    }

    deleteUserEvent(user_id: number, event_id: number){
        return axios.delete<{}, UserEvent>(url + "userEvent/delete/" + user_id + "/" + event_id).then(response => response.data);
    }
}

export let userEventService = new UserEventService();