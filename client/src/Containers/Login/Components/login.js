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

/**
 * Komponent-klasse for login-siden for nettstedet. komponenten håndterer logikk og utseende på siden /login
 */
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
              <div className="container-fluid">
                <div className="mid">
                  <div id="fillPassword" className="wrapper">
                    <br/>
                    <br/>
                    <b>Valgt organisasjon: </b>
                    <b>{this.pickedOrg.org_name}</b>
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
                    <a type="button"
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
                      <div id="reg" className="registerOrg1">
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
                      <div>
                        <button className="active" onClick={this.loginClicked}>Login</button>
                      </div>
                    </div>

                    <div className="rgstr-btn splits">
                      <p>Ny organisasjon?</p>
                      <div>
                        <button className="rgstr-btn" onClick={this.registerNewOrganizationClicked}>Registrer</button>
                      </div>
                    </div>


                    <div hidden={this.showLogin} className="wrapper">
                      <img height="40%" width="70%" style={{padding:0, objectFit: "cover", paddingTop: 10}}
                        src="https://storage.cloud.google.com/harmoni-files/image.png"/>

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
                          <label>Telefonnummer</label>
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
                              <input type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.phone = event.target.value
                              }}/>
                              <label>Telefon nr</label>
                            </div>
                            <div>
                              <input type="string" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user2.email = event.target.value
                              }}/>
                              <label>E-mail</label>
                                <button className="light" type="button" style={{ marginTop: 20 + 'px', float: "left"}}
                                        onClick={this.back}> Tilbake </button>
                                <button className="light" type="button" style={{ marginTop: 20 + 'px', float: "right"}}
                                        onClick={this.register}> Registrer </button>
                            </div>
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

    /**
     * Metode som bruker de oppdaterte variablene for bruker-epost, organisasjons-id og navn på organisasjon i komponenten,
     * og kaller en service for å sende en glemt passord e-post.
     */
    forgottenPass() {
        organizationService
            .forgotPass(this.user.email, this.pickedOrg.org_id, this.pickedOrg.org_name)
            .then(res => {
                console.log(res);
                Alert.success("Sjekk din email for å gjenopprette passordet ditt.");
                  this.showLogin = false;
                  this.showRegOrgForm = true;
                  this.showRegAdminForm= true;
                  this.checkedOrg = false;
                  this.checkingOrg = false;
            })
    }

    /**
     * Metode som sjekker variabelen for brukerinput av epostaddresse og henter ut hvilke organisasjoner e-postaddressen er knyttet til, om gyldig addresse.
     */
    checkEmail(){
        //console.log(this.user.email);
        this.message = "Sjekker email";
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
           Alert.danger("Noe gikk galt.");
       });
        this.loading = true;
        window.scrollTo(0,0);
    }

    /**
     * Metode som blir kalt når bruker har valgt en organisasjon.
     * Den setter meldinga som vises på menyen til "Velg organisasjon" og lagrer valgt organisasjonm slik at neste vindu vises
     * @param org
     */
    pickOrg(org: Organization){
        this.message = "Velg organisasjon";
        this.pickedOrg = org;
        this.checkedOrg = true;
    }

    /**
     * Metode som kalles nå bruker har skrevet inn passord og forsøker å logge inn.
     * Den sender inn brukerinputen for epost, passord og valgt organisasjon til serviceklassen og gir feedback om innloggingen gikk bra.
     */
    login(){
        this.loading = true;
        userService.logIn(this.pickedOrg.org_id, this.user.email, this.user.password).then(() => {
                this.loading=false;
                //Alert.success("Du ble logget inn");
            }).catch((error: Error)=>{
                Alert.danger("feil passord");
                this.loading = false;
        });
    }

    /**
     * Metode som kalles når bruker vil registrere en ny organisasjon. Verdier på booleans endres slik at et registreringsskjema vises for brukeren.
     */
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
        this.loading = false;
        this.showLogin = true;
        this.showRegOrgForm = false;
        this.showRegAdminForm = true;

        console.log(this.showRegOrgForm);
    }

    /**
     * Metode som kalles når bruker er inne på skjemaet for registrering av organisasjon, og sender bruker til logg inn skjerm.
     */
    loginClicked(){
      console.log("loginClicked");
      this.showLogin = false;
      this.showRegOrgForm = true;
      this.showRegAdminForm = true;
    }

    /**
     * Metode som kalles når bruker har skrevet inn informasjon om organisasjon og har trykket neste.
     * Metoden sjekker om informasjonen er gyldig, før bruker kan gå videre til skjema for informasjon om brukeren og oppretting av passord.
     */
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

    back(){
        this.showLogin = false;
        this.showRegOrgForm = true;
        this.showRegAdminForm = true;
    }

    /**
     * Metoden kalles når bruker trykker på registrer
     * og sjekker om all informasjon er gyldig før den sender de videre til serviceklassen som vil gi en verifikasjonsurl sendt til brukerens innskrevne epostaddresse.
     */
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
        this.showLogin = false;
        this.showRegOrgForm = true;
        this.showRegAdminForm = true;
      }).catch((error:Error)=>{
        Alert.danger("Feil passord");
      })
    }else{
      Alert.danger("alle felt må fylles og passord må ha minst 8 bokstaver");
    }
  }
}
