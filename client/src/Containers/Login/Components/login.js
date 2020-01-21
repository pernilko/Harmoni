// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import {User, userService} from "../../../services/UserService";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Col, Spinner, Button} from "react-bootstrap";
import {Alert} from "../../../widgets";
import "./login.css";
import {sharedComponentData} from "react-simplified";
import { createHashHistory } from "history";
const history = createHashHistory();


export class Login extends Component{
    user: User= new User();
    move: boolean = true;
    loading: boolean = false;
    organizations: Organization[]= [];
    pickedOrg: Organization = new Organization();
    checkingOrg:boolean = false;
    checkedOrg:boolean = false;
    message: string = "Logg inn";

    render(){

      if(this.checkedOrg){
            return (
              <div className="body">
                <div className="mid">
                  <div id="chooseOrg2" className="wrapper">
                    <h3 style={{paddingTop: 50 + 'px'}}>Skriv inn passord</h3>
                    <form id="passwordForm" tabIndex="500" >
                      <div>
                        <input type="password"
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                 this.user.password = event.target.value
                               }}/>
                        <label>{"Passord for " + this.user.email}</label>
                      </div>
                      <div>
                        <button className="btn dark" type="submit" variant="success" onClick={this.login}>Logg inn</button>
                      </div>
                    </form>
                    <a
                       onClick={this.forgottenPass}>Glemt passord?</a>
                  </div>
                </div>
              </div>
            )

        }
        else if(!this.loading) {
            if(this.checkingOrg){
                //renders page for picking an organization
                return (
                  <div className="body">
                    <div className="mid">
                      <div id="chooseOrg" className="wrapper">
                        <h3>Velg organisasjon for å logge inn </h3>
                        {this.organizations.map(e=>(
                            <button className="dark-org" onClick = {()=>this.pickOrg(e)} style = {{margin: "5px"}} block>{e.org_name}</button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
            }else{
              return (
                // login main-page
                <div className="body">
                  <div className="mid">
                    <div className="login-btn splits">
                      <p>Bruker allerede?</p>
                      <button className="active" onClick={this.loginClicked}>Login</button>
                    </div>

                    <div className="rgstr-btn splits">
                      <p>Ny organisasjon?</p>
                      <button className={"rgstr-btn" + (this.move ? " move" : "")} onClick={this.registerNewOrganizationClicked}>Registrer</button>
                    </div>

                    <div className="wrapper">
                      <form id="loginForm" tabIndex="500">
                        <h3>Logg inn</h3>
                        <div>
                          <input type="e-mail"
                                 onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   this.user.email = event.target.value
                                 }}/>
                          <label>Email</label>
                        </div>
                        <div>
                          <button className="btn dark" type="submit" variant="primary" onClick={this.checkEmail}>Logg inn</button>
                        </div>
                      </form>
                    </div>

                    <div className="wrapper move">
                      <form>

                      </form>
                    </div>
                  </div>
                </div>
              )
            }
        }else{
            return(
                <div className="body">
                    <div className="mid">
                      <div id="waiting" className="wrapper">
                           <h3>{this.message}</h3>
                      </div>
                      <Spinner class="Spinner" animation="border" style = {{margin: "auto"}}></Spinner>
                    </div>
                </div>
            )
        }
    }

    forgottenPass() {
        organizationService
            .forgotPass(this.user.email, this.pickedOrg.org_id, this.pickedOrg.org_name)
            .then(res => {
                console.log(res);
                Alert.success("Sjekk din email for å gjenopprette passordet ditt.");
                history.push("/login");
            })
    }

    checkEmail(){
        console.log(this.user.email);
        this.message = "Checking email";
       organizationService.getOrganizationByEmail(this.user.email).then(org=>{
           if(org.length>0){
               this.organizations = org;
               this.checkingOrg = true;
           }else{
               Alert.danger("Finner ikke email i systemet");
           }
           this.loading=false;
       }).catch((error:Error)=>{
           this.loading = false;
           Alert.danger(error.message);
       });
        this.loading = true;
    }
    pickOrg(org: Organization){
        this.message = "Velg organisasjon";
        this.pickedOrg = org;
        this.checkedOrg = true;
    }
    login(){
        this.loading = true;
        userService.logIn(this.pickedOrg.org_id, this.user.email, this.user.password).then(() => {
                this.loading=false;
                Alert.success("Du ble logget inn");
                history.push("/allEvents");
            }).catch((error: Error)=>{
                Alert.danger(error.message);
                this.loading = false;
        });
    }
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
        this.loading = true;
        //eventuelt route videre til registreringsskjema her
    }

    loginClicked(){
      console.log("loginClicked");
      this.loading = true;
      this.move = false;

    }
}
