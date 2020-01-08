// @flow
import axios from 'axios';

export class Artist {
    artist_id: number;
    event_id: number;
    artist_name: string;
    riders: string;
    hospitality_riders: string;
    artist_contract: string;
    email: string;
    phone: number;
    image: string;

    constructor(artist_id: number, event_id: number, artist_name: string, riders: string, hospitality_riders: string, artist_contract: string, email: string, phone: number, image: string) {
        this.artist_id = artist_id;
        this.event_id = event_id;
        this.artist_name = artist_name;
        this.riders = riders;
        this.hospitality_riders = hospitality_riders;
        this.artist_contract = artist_contract;
        this.email = email;
        this.phone = phone;
        this.image = image;
    }
}