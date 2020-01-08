// @flow
import axios from 'axios';

export class UserEvent {
    user_id: number;
    event_id: number;
    job_position: string;

    constructor(user_id: number, event_id: number, job_position: string) {
        this.user_id = user_id;
        this.event_id = event_id;
        this.job_position = job_position;
    }
}