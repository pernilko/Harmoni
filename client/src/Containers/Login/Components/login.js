// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import {User, userService} from "../../../services/UserService";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Spinner} from "react-bootstrap";
import {Alert} from "../../../widgets";
import "./login.css";
import {sharedComponentData} from "react-simplified";
import { createHashHistory } from "history";
const history = createHashHistory();


let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class Login extends Component{
    user: User = new User();
    user2: User = new User();
    repeatedPassword: string = "";
    loading: boolean = false;
    organizations: Organization[] = [];
    newOrganization: Organization = new Organization();
    pickedOrg: Organization = new Organization();
    checkingOrg:boolean = false;
    checkedOrg:boolean = false;
    message: string = "Logg inn";

    showLogin: boolean = false;
    showRegOrgForm: boolean = true;
    showRegAdminForm: boolean = true;

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
                        <button type = "button" className="btn dark" variant="success" onClick={()=>this.login()}>Logg inn</button>
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
                      <button className="rgstr-btn" onClick={this.registerNewOrganizationClicked}>Registrer</button>
                    </div>


                    <div hidden={this.showLogin} className="wrapper">
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
                          <button className="btn dark" variant="primary" onClick={this.checkEmail}>Logg inn</button>
                        </div>
                      </form>
                    </div>



                    <div hidden={this.showRegOrgForm} className="registerOrg1">
                      <form>
                        <h3 style={{paddingTop: 20 + 'px',paddingBottom: 20 + 'px'}}>Registrer ny organisasjon</h3>
                        <div>
                          <input type="String"
                                 onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   this.newOrganization.org_name = event.target.value
                                 }}/>
                          <label>Velg navn på organisasjon</label>
                        </div>
                        <div>
                          <input type="String"
                                 onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   this.newOrganization.phone = event.target.value
                                 }}/>
                          <label>Telefon nummer</label>
                        </div>
                        <div>
                        <input type="e-mail"
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                 this.newOrganization.email = event.target.value
                               }}/>
                          <label>E-mail</label>
                        </div>
                        <button className="light" type="button" style={{ marginTop: 20 + 'px' }}
                                onClick={this.next}> Neste </button>
                      </form>
                    </div>

                      <div hidden = {this.showRegAdminForm} className="registerOrg">
                          <form id="registerForm" tabIndex="500">
                            <h3>Registrer admin bruker for </h3> <b>{this.newOrganization.org_name}</b>
                            <div>
                              <input type="username" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.user_name = event.target.value
                              }}/>
                              <label>Brukernavn</label>
                            </div>
                            <div className="row">
                              <div className="col">
                                <input type="password" placeholder="Skriv inn passord"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                         this.user2.password = event.target.value;
                                       }}/>
                                <label>Passord</label>
                              </div>
                              <div className="col">
                                <input type="password" placeholder="Gjenta passord"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                         this.repeatedPassword = event.target.value
                                       }}/>
                                <label> </label>
                              </div>
                            </div>
                            <div>
                              <input type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.address = event.target.value
                              }}/>
                              <label>Adresse</label>
                            </div>
                            <div>
                              <input type="number" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.phone = event.target.value
                              }}/>
                              <label>Telefon nr</label>
                            </div>
                            <div>
                              <input type="string" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.email = event.target.value
                              }}/>
                              <label>E-mail</label>
                            </div>

                            <div>
                              <input type="file"/>
                              <label>Last opp bilde</label>
                            </div>
                            <button className="light" type="button" style={{ marginTop: 20 + 'px' }}
                                    onClick={this.register}> Registrer </button>
                          </form>
                    </div>
                  </div>
                </div>

              )
            }
        }else{
            return(
                <div className="body">
                  <h3>{this.message}</h3>
                  <Spinner animation="border" style = {{margin: "auto"}}></Spinner>
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
        //console.log(this.user.email);
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
            }).catch((error: Error)=>{
                Alert.danger("feil passord");
                this.loading = false;
        });
    }
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
        this.loading = false;
        this.showLogin = true;
        this.showRegOrgForm = false;

        console.log(this.showRegOrgForm);
        //eventuelt route videre til registreringsskjema her
    }

    loginClicked(){
      console.log("loginClicked");
      this.showLogin = false;
      this.showRegOrgForm = true;
    }

    next(){
      console.log(this.newOrganization.org_name);
      console.log(this.newOrganization.phone);
      console.log(this.newOrganization.email);
      if(this.newOrganization.org_name.length !== 0 && this.newOrganization.email.length !== 0 && this.newOrganization.phone !== 0 && emailRegEx.test(this.newOrganization.email)) {
        this.loading = false;
        this.showLogin = true;
        this.showRegOrgForm = true;
        this.showRegAdminForm = false;

      }else{
        Alert.danger("Alle felt må fylles ut, og gyldig e-post addresse må skrives inn");
      }
      //Supposed to reveal a new component for registering an Admin-user
    }

  register(){
    // Register
    if(this.repeatedPassword !== this.user2.password || this.user2.password.length<8){
      Alert.danger("Passord må være like og ha minst 8 tegn");
    }
    else if(!emailRegEx.test(this.user2.email)){
      Alert.danger("Ikke gyldig E-mail addresse");
    }
    else if(this.user2.email.length !==0 && this.user2.address.length !== 0 && this.user2.user_name.length!==0
      &&this.user2.phone.length !== 0 && emailRegEx.test(this.user2.email)){
      console.log(this.newOrganization.org_name);
      userService.verifiserAdminOgOrg(this.newOrganization.org_name,
        this.newOrganization.email,
        this.newOrganization.phone,
        this.user2.email,
        1,
        this.user2.user_name,
        this.user2.password, this.user2.address, this.user2.phone).then(res=>{
        Alert.success("En verifiserings-Email har blitt sendt til din personlige Email-bruker");
      }).catch((error:Error)=>{
        Alert.danger(error.message);
      })
    }else{
      Alert.danger("alle felt må fylles og passord må ha minst 8 bokstaver");
    }
  }
}
