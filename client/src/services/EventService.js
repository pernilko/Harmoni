// @flow
import axios from 'axios';

export class Event {
    event_id: number;
    org_id: number;
    event_name: string;
    place: string;
    event_start: string;
    event_end: string;
    longitude: number;
    latitude: number;

    constructor(event_id: number, org_id: number, event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number) {
        this.event_id = event_id;
        this.org_id = org_id;
        this.event_name = event_name;
        this.place = place;
        this.event_start = event_start;
        this.event_end = event_end;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}