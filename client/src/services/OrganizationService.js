// @flow
import axios from 'axios';
import {Alert} from "../widgets";
import {User} from "./UserService";
import {sharedComponentData} from "react-simplified";

let url: string = "http://localhost:8080/";

export class Organization {
    org_id: number = -1;
    org_name: string = "";
    phone: string = "";
    email: string = "";

    /*
    constructor(org_id: number, org_name: string, phone: string, email: string) {
        this.org_id = org_id;
        this.org_name = org_name;
        this.phone = phone;
        this.email = email;
    }

     */
}

class OrganizationService{

    currentOrganization: Organization;
    //not tested
    getAllOrganizations(){
        return axios.get<Organization[]>(url + 'organization').then(response=>response.data);
    }
    //not tested
    getOrganization(org_id: number){
        return axios.get<Organization>(url + 'organization/id/'+org_id).then(response=> response.data);
    }
    //tested
    getOrganizationByEmail(email: string){
        return axios.get<Organization[]>(url+'organization/mail/'+email).then(response=>response.data);
    }

    setCurrentOrganization(org_id: number){
        this.getOrganization(org_id).then(response=>{
            this.currentOrganization = response[0];
            console.log("current org: ");
            console.log(this.currentOrganization);
        });
    }
    //tested
    addOrganization(org_name: string, phone: string, email:string){
        return axios.post<{}, Organization>(url + 'organization/add', {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }
    //not tested
    deleteOrganization(org_id: number){
        return axios.delete<{},Organization>(url+ 'organization'+org_id).then(response=>response.data);
    }
    checkInvToken(){
        console.log("auto-logging in with token from localStorage: " + localStorage.getItem("invToken"));
        if (localStorage.getItem("invToken")) {
            return axios<User>({
                url: url +'invToken',
                method: 'post',
                headers: {
                    "x-access-token": localStorage.getItem("invToken"),
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(res=>
                res.data
            );
        }else{
            Alert.danger("Mangler token");
        }
    }



    inviteUser(email: string, org_id: number, org_name: string) {
        return axios.post<{}, {}>(url + 'inviteUser', {
            "email": email,
            "org_id": org_id,
            "org_name": org_name
        }).then(response => response.data);
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

export let organizationService: OrganizationService = sharedComponentData(new OrganizationService());