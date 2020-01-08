import * as React from 'react';
import { Component } from "react-simplified";
import {LoginCard} from "./Components";
import {User, userService} from "../../services/UserService";



export class Login extends Component{
    user: User= new User();

    render(){
        return(
            <div>
        <LoginCard user = {this.user}>
        </LoginCard>
                <button onClick= {this.login}>Logg inn</button>
            </div>
        )
    }
    login(){
        userService.logIn(this.user.email, this.user.password);
        console.log(this.user.email + ", " + this.user.password);
    }
}