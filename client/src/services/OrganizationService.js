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

class OrganizationService{

    getOrganizationByEmail(email: string){
        return axios.get<Organization[]>('http://localhost:8080/organization/mail/'+email).then(response=>response.data);
    }
}

export let organizationService = new OrganizationService();