// @flow
import axios from 'axios';
url: string = "http://localhost:8080/";

export class User {
    user_id: number;
    org_id: number;
    email: string;
    privileges: number;
    user_name: string;
    password: string;
    address: string;
    phone: string;
    image: string;
    reg_date: string;

    constructor(user_id: number, org_id: number, email: string, privileges: number, user_name: string, password: string, address: string, phone: string, image: string, reg_date: string) {
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
}
class UserService {
    //for logging in
    logIn(org_id: number, email: string, password: string){
        return axios.post<{}, {jwt: string}>(url+'login', {
            "org_id":org_id,
            "email": email,
            "password": password
        }).then(response=>response.data);
    }
    //for registering a new user
    register(org_id: number, email: string, privileges: number, user_name: string, password: string, address, phone: string, image: string){
        return axios.post<{}, User>(url+'registrer',{
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
    //to refresh token
    postToken(email: string) {
        return fetch(url + 'token',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-access-token": localStorage.getItem("token")
                },
                body: JSON.stringify({"email": email})
            })
            .then(response => response.json());
    }

}

export let userService = new UserService();

