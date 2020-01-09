// @flow
import axios from 'axios';
let url: string = "http://localhost:8080/";

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
    getAllOrganizations(){
        return axios.get<Organization[]>(url + 'organization').then(response=>response.data);
    }
    getOrganization(org_id: number){
        return axios.get<Organization>(url + 'organization/id/'+org_id).then(response=>response.data);
    }

    getOrganizationByEmail(email: string){
        return axios.get<Organization[]>(url+'organization/mail/'+email).then(response=>response.data);
    }
    addOrganization(org_name: string, phone: string, email:string){
        return axios.post<{}, Organization>(url + 'organization', {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }
    deleteOrganization(org_id: number){
        return axios.delete<{},Organization>(url+ 'organization'+org_id).then(response=>response.data);
    }
    /*
    updateOrganization(org_id: number, org_name: string, phone: string, phone:string, email: string){
        return axios.put<{}, Organization>(url+'organization'+org_id, {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }

     */
}

export let organizationService = new OrganizationService();