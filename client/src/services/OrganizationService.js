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

    currentOrganization: Organization = null;
    //not tested
    getAllOrganizations(){
        return axios.get<Organization[]>(url + 'organization').then(response=>response.data);
    }
    //not tested
    getOrganization(org_id: number){
        return axios.get<Organization>(url + 'organization/id/'+org_id).then(response=> response.data[0]);
    }
    //tested
    getOrganizationByEmail(email: string){
        return axios.get<Organization[]>(url+'organization/mail/'+email).then(response=>response.data);
    }

    setCurrentOrganization(org_id: number){
        this.getOrganization(org_id).then(response=>{
            this.currentOrganization = response;
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

    checkResetToken() {
        console.log(localStorage.getItem("resetToken"));
        if (localStorage.getItem("resetToken")) {
            return axios<User>({
                url: url + "resetToken",
                method: "post",
                headers: {
                    "x-access-token": localStorage.getItem("resetToken"),
                    "Content-type": "application/json; charset=utf-8"
                }
            }).then(res => res.data);
        } else {
            Alert.danger("Mangler token");
        }
    }

    checkVerifyToken(token: string) {
        return axios({
            url: url + "verifyToken",
            method: "post",
            headers: {
                "x-access-token": token,
                "Content-type": "application/json; charset=utf-8"
            }
        }).then(res=>res.data);
    }

    inviteUser(email: string, org_id: number, org_name: string) {
        return axios.post<{}, {}>(url + 'inviteUser', {
            "email": email,
            "org_id": org_id,
            "org_name": org_name
        }).then(response => response.data);
    }

    reportBug(email: string, org_id: number, org_name: string, text: string) {
        return axios.post<{}, {}>(url + 'bugreport', {
            "email": email,
            "org_id": org_id,
            "org_name": org_name,
            "text" : text
        }).then(response => response.data);
    }

    forgotPass(email: string, org_id: number, org_name: string) {
        console.log("EMAIL: ", email);
        console.log("ORG_ID: ", org_id);
        console.log("ORG_NAME: ", org_name);
        return axios.post<{}, {}>(url + "forgotPass", {
            "email": email,
            "org_id": org_id,
            "org_name": org_name
        }).then(res => res.data);
    }

    updateOrganization(org_id: number, org_name: string, phone: string, email: string){
        return axios.put<{}, Organization>(url+'organization/edit/'+org_id, {
            "org_name": org_name,
            "phone": phone,
            "email": email
        }).then(response=>response.data);
    }
}

export let organizationService: OrganizationService = sharedComponentData(new OrganizationService());