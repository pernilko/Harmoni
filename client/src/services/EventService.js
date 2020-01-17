// @flow
import axios from 'axios';

const url = "http://localhost:8080/";

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
    image: File;

    constructor(event_id: number, org_id: number, user_id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number, image: File) {

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
    }
}

export class EventService {
    getAllEvents() {
        return axios.get<Event[]>(url + "event/all").then(response => response.data);
    }

    getEventId(id: number) {
        return axios.get<Event[]>(url + "event/" + id).then(response => response.data[0]);
    }

    postEvent(org_id: number, event_name: string, user_id: number, description: string, place: string, event_start: any, event_end: any, longitude: number, latitude: number, image: File) {
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
            "image": image,
        }).then(response => response.data);
    }
    getEventsByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/user/"+ user_id).then(response=>response.data);
    }
    getEventsByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/org/" + org_id).then(response=>response.data);
    }

    getEventsUpcomingByUser_id(user_id: number){
        return axios.get<Event[]>(url+"event/upcoming/user/"+ user_id).then(response=>response.data);
    }
    getEventsUpcomingByOrg_id(org_id: number){
        return axios.get<Event[]>(url+"event/upcoming/org/" + org_id).then(response=>response.data);
    }

    updateEvent(id: number, event_name: string, description: string, place: string, event_start: string, event_end: string, longitude: number, latitude: number, image: File) {
        return axios.put<{}, Event>(url + "event/edit/"+id, {
            "event_name": event_name,
            "description": description,
            "place": place,
            "event_start": event_start,
            "event_end": event_end,
            "longitude": longitude,
            "latitude": latitude,
            "image": image
        }).then(response => response.data);
    }

    deleteEvent(id: number) {
        return axios.delete<Event, {}>(url + "event/delete/"+id).then(response => response.data);
    }

    getEventbySearch(search: string, org_id: number){
        return axios.get<Event[]>(url + "event/search/" + search + "/" + org_id).then(response => response.data);
    }
}

export let eventService = new EventService();
