// @flow
import axios from 'axios';
import {Alert} from "../widgets";
import {sharedComponentData} from "react-simplified";
import {Organization, organizationService} from "./OrganizationService";
import {Artist, File} from "./ArtistService";
import { createHashHistory } from 'history';
const history = createHashHistory();

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
    image: File = null;
    reg_date: string = "";
    p_create_event: number = 0;
    p_read_contract: number = 0;
    p_read_riders: number = 0;
    p_archive: number = 0;

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
        if(localStorage.getItem("token")) {
            if (localStorage.getItem("token").length > 0) {
                return axios < User > ({
                    url: url + 'token',
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
                            this.getUser(response.data.user_id).then(res => {
                                console.log("response from getUser");
                                console.log(res);
                                this.currentUser = res;
                                organizationService.setCurrentOrganization(res.org_id);
                                // history.push("/alleEvents");
                            }).catch((error: Error) => Alert.danger(error.message));
                        }
                        console.log(response.data);
                    }).catch(error => {
                        this.currentUser = null;
                        Alert.danger("Du har blitt logget ut");
                        if (!localStorage.getItem("invToken")) {
                            history.push("/login");
                        }
                    });
            } else if (!localStorage.getItem("invToken")) {
                history.push("/login");
            }
        }else{
            history.push("/login");
        }
    }

    //for logging in
    logIn(org_id: number, email: string, password: string){
        console.log("logging in");
        return axios.post<{}, {jwt: string}>(url+'login', {
            "org_id":org_id,
            "email": email,
            "password": password
        }).then(response=>{
            console.log("got response from server");
            if(response.data.jwt){
                localStorage.setItem("token", response.data.jwt)
                userService.getUser(response.data.user_id).then(res=>{
                    this.currentUser = res;
                    organizationService.setCurrentOrganization(res.org_id);
                    console.log(this.currentUser);
                    history.push("/alleEvents");
                });
            }
        }).catch((error:Error)=>Alert.danger(error.message));
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


    addProfilePicture(user_id: number, picture: File) {
        let fd:FormData = new FormData();
        fd.append("myFile", picture);
        return axios<{}>({
                url: url +'upload/Profile/editImage/'+user_id,
                method: 'put',
                data: fd,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    }

    updateEmail(user_id: number, email: string){
        return axios.put<{}, User>(url + 'Profile/editEmail/' + user_id,
          {"email": email}) .then(response => response.data);
    }
    updateImage(user_id:number, image:string){
        return axios.put<{}, User>(url + 'Profile/editImage/' + user_id,
          {"image": image}) .then(response => response.data);
    }
    updateInfo(user_id:number, address:string, phone: string){
        return axios.put<{}, User>(url + 'Profile/editInfo/' + user_id, {
            "address": address,
            "phone": phone
        }) .then(response => response.data);
    }

    updatePrivileges(user_id: number, p_create_event: number, p_read_contract: number, p_read_riders: number, p_archive: number){
        return axios.put<{}, User>(url+ 'user/updatePrivileges/'+ user_id, {
            "p_create_event": p_create_event,
            "p_read_contract": p_read_contract,
            "p_read_riders": p_read_riders,
            "p_archive":p_archive
        }).then(response=>response.data);
    }
    updateUsernamePassword(user_id:number, user_name: string, password: string){
        return axios.put<{}, User>(url + 'Profile/edit/' + user_id, {
            "user_name": user_name,
            "password": password
        }).then(response => response.data);
    }

    updateUserName(user_id: number, user_name: string){
        return axios.put<{}, User>(url + 'Profile/updateUsername/'+ user_id, {
            "user_name": user_name
        }).then(response=>response.data);
    }

    deleteUser(user_id: number){
        return axios.delete<{}, User>(url + 'user/delete/' + user_id).then(response => response.data);
    }


    getUser(user_id){
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

    resetPass(org_id: number, email: string, password: string) {
        return axios.put<{}, User>(url + "user/resetPass", {
            "org_id": org_id,
            "email": email,
            "password": password
        }).then(res => res.data);
    }

    getAdminByOrgId(org_id: number){
        return axios.get<User[]>(url +"user/admin/"+ org_id).then(response => response.data)
    }
    
    verifiserAdminOgOrg(org_name: string, org_email: string, org_phone: string, user_email: string, user_privileges, user_user_name, user_password, user_address, user_phone){
        return axios.post<{}>(url+"verifyEmail", {
            "org_name": org_name,
            "org_email": org_email,
            "org_phone": org_phone,
            "user_email": user_email,
            "user_privileges": user_privileges,
            "user_user_name": user_user_name,
            "user_password": user_password,
            "user_address": user_address,
            "user_phone": user_phone
        }).then(res=>res.data);
    }

    makeAdmin(user_id: number) {
        return axios.put<{}>(url + "user/makeAdmin/"+user_id).then(res => res.data);
    }
}

export let userService: UserService = sharedComponentData(new UserService());

