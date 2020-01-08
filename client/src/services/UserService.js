// @flow
import axios from 'axios';
import bcrypt from 'bcrypt';
const saltRounds: number = 10;

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
    logIn(email: string, password: string){
        var salt: string = bcrypt.genSaltSync(saltRounds);
        var hash: string = bcrypt.hashSync(password, salt);
        console.log(hash);
        //KJØR AXIOS FOR Å SJEKKE LOGIN HER
    }
}

export let userService = new UserService();

