// @flow
import axios from 'axios';
import {Alert} from "../widgets";
import {sharedComponentData} from "react-simplified";
import {Organization, organizationService} from "./OrganizationService";

let url: string = "http://localhost:8080/";

export class User {
    user_id: number = -1;
    org_id: number = -1;
    email: string = "";
    privileges: number = -1;
    user_name: string = "";
    password: string = -1;
    address: string = "";
    phone: string = "";
    image: string = "";
    reg_date: string = "";

    /*constructor(user_id: number, org_id: number, email: string, privileges: number, user_name: string, password: string, address: string, phone: string, image: string, reg_date: string) {
        this.user_id = user_id;
        this.org_id = org_id;
        this.email = email;
        this.privileges = privileges;
        this.user_name = user_name;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.image = image;
        this.reg_date = reg_date;
    }
     */
}
class UserService {
    currentUser: User;
    //auto login

    autoLogin(){
        console.log("auto-logging in with token from localStorage: " + localStorage.getItem("token"));
        if (localStorage.getItem("token")) {
            return axios<User>({
                url: url +'token',
                method: 'post',
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
                .then(response => {
                    if (response.data.jwt) {
                        localStorage.setItem("token", response.data.jwt);
                        console.log("user_id: " + response.data.user_id);
                        this.getUser(response.data.user_id).then(res=>{
                            console.log(res);
                            this.currentUser = new User();
                            this.currentUser = res;
                            organizationService.setCurrentOrganization(res.org_id);
                        })
                    }
                    console.log(response.data);
                }).catch(error => {
                    Alert.danger(error.message);
                    this.currentUser = null;
                });
        }
    }

    //for logging in
    logIn(org_id: number, email: string, password: string){
        return axios.post<{}, {jwt: string}>(url+'login', {
            "org_id":org_id,
            "email": email,
            "password": password
        }).then(response=>{
            if(response.data.jwt){
                localStorage.setItem("token", response.data.jwt)
                userService.getUser(response.data.user_id).then(res=>{
                    this.currentUser = new User();
                    this.currentUser = res;
                    organizationService.setCurrentOrganization(res.org_id);
                    console.log(this.currentUser);
                });
            }
        });
    }
    //for registering a new user
    register(org_id: number, email: string, privileges: number, user_name: string, password: string, address: string, phone: string, image: string){
        return axios.post<{}, User>(url+'register',{
            "org_id": org_id,
            "email": email,
            "privileges": privileges,
            "user_name": user_name,
            "password": password,
            "address": address,
            "phone": phone,
            "image": image
        }).then(response=>response.data);
    }
    getUser(user_id: number){
        return axios.get<User>(url+ 'user/'+ user_id).then(response=>response.data[0]);
    }
    //to refresh token
    //not tested
    postToken(user_id: string) {
        return fetch(url + 'token',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-access-token": localStorage.getItem("token")
                },
                body: JSON.stringify({"user_id": user_id})
            })
            .then(response => response.json());
    }

    getUserByOrgId(org_id: number){
        console.log("ORG_ID: ", org_id)
        return axios.get<User[]>(url +"user/all/"+ org_id).then(response => response.data);
    }

}

export let userService: UserService = sharedComponentData(new UserService());
