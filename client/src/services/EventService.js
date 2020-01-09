// @flow
import axios from 'axios';

const url = "http://localhost:3000/";

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

class EventService {
    getAllEvents() {
        return axios.get<Event[]>(url + "event/all").then(response => response.data);
    }

    getEventId(id: number) {
        return axios.get<Event[]>(url + "event/" + id).then(response => response.data[0]);
    }

    postEvent(org_id: number, event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number) {
        return axios.post<{}, Event>(url + "event/add", {
            "org_id": org_id,
            "event_name": event_name,
            "place": place,
            "event_start": event_start,
            "event_end": event_end,
            "longitude": longitude,
            "latitude": latitude
        }).then(response => response.data);
    }

    updateEvent(id: number, org_id: number, event_name: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number) {
        return axios.put<{}, Event>(url + "event/edit/"+id, {
            "org_id": org_id,
            "event_name": event_name,
            "place": place,
            "event_start": event_start,
            "event_end": event_end,
            "longitude": longitude,
            "latitude": latitude
        }).then(response => response.data);
    }

    deleteEvent(id: number) {
        return axios.delete<Event, {}>(url + "event/delete/"+id).then(response => response.data);
    }
}

export let eventService = new EventService();

