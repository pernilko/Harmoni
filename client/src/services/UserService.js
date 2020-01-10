// @flow
import axios from 'axios';
import {sharedComponentData} from "react-simplified";

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
    currentUser:_User;
    //auto login
    autoLoginv2(){
        if(localStorage.getItem("token")){
            return axios.post<{}, User>(url+'token',{

            });
        }
    }

    autoLogin(){
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
                        this.getUser(response.data.user_id).then(res=>{
                            this.currentUser = new User();
                            this.currentUser = res[0];
                        })
                    }
                    console.log(response);
                }).catch(error => this.bruker = null);
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
                    this.currentUser = res[0];
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
    getUser(user_id){
        return axios.get<User>(url+ 'user/'+ user_id).then(response=>response.data);
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

}

export let userService: UserService = sharedComponentData(new UserService());

