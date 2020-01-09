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
    adress: string;
    phone: string;
    image: string;
    reg_date: string;

    constructor(user_id: number, org_id: number, email: string, privileges: number, user_name: string, password: string, adress: string, phone: string, image: string, reg_date: string) {
        this.user_id = user_id;
        this.org_id = org_id;
        this.email = email;
        this.privileges = privileges;
        this.user_name = user_name;
        this.password = password;
        this.adress = adress;
        this.phone = phone;
        this.image = image;
        this.reg_date = reg_date;
    }
}
class UserService {

    logIn(org: string, email: string, password: string){
        //KJØR AXIOS FOR Å SJEKKE LOGIN HER
    }
    getOrganizationByEmail(email: string){

    }


}

export let userService = new UserService();

