// @flow
import axios from 'axios';

export class Organization {
    org_id: number;
    org_name: string;
    phone: string;
    email: string;

    constructor(org_id: number, org_name: string, phone: string, email: string) {
        this.org_id = org_id;
        this.org_name = org_name;
        this.phone = phone;
        this.email = email;
    }
}