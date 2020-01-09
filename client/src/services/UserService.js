// @flow
import axios from 'axios';
//import bcrypt from 'bcrypt';

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

    logIn(org_id: number, email: string, password: string){
        //KJØR AXIOS FOR Å SJEKKE LOGIN HER
        return axios.post<{}, {jwt: string}>('http://localhost:8080/login', {
            "org_id":org_id,
            "email": email,
            "password": password
        }).then(response=>response.data);
    }
    register(org_id: number, email: string, privileges: number, user_name: string, password: string, address, phone: string, image: string){
        return axios.post<{}, User>('http://localhost:8080/registrer',{
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
    postToken(email: string) {
        return fetch("http://localhost:8080/token",
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

