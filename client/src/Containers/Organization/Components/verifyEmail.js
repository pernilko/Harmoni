import * as React from 'react';
import{Component} from 'react-simplified';
import {Spinner} from "react-bootstrap";
import {organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";
import {Alert} from "../../../widgets";
import {sharedComponentData} from "react-simplified";
import { createHashHistory } from 'history';
import "./OrganizationProfile.css";
const history = createHashHistory();

/**
 * Klasse for å bekrefte at email er gyldig når man oppretter en ny bruker og organisasjon.
 */
export class verifyEmail extends Component<{ match: { params: { token: string } } }>{

    loading: boolean = false;

    /**
     * Funksjon som oppretter et HTML-komponent for å verifisere ny bruker.
     * @returns {*} Returnerer komponent for å verifisere din nye bruker.
     */
    render(){
        localStorage.removeItem("token");
        localStorage.setItem("invToken", this.props.match.params.token);
        if(this.loading){
            return <Spinner animation="border"></Spinner>

        }else{
            return (
              <div className="body">
                  <div className="mid">
                      <div id="verify" className="wrapper">
                    <div>
                      <b>Trykk for å verifisere</b>
                          <button id="verfiyButton" type = "button" className="dark" onClick={()=>this.verify()}>Verifiser min bruker og organisasjon</button>
                      </div>
                      </div>
                  </div>
              </div>
            )
        }
    }

    /**
     * Funksjon som sjekker om din token er gyldig eller ikke, og deretter oppretter bruker og organisasjon.
     */
    verify(){
        this.loading = true;
        organizationService.checkVerifyToken().then(res=>{
            organizationService.addOrganization(res.org_name, res.org_phone, res.org_email)
                .then(response=>{
                    userService.register(response[0].org_id, res.user_email, 1, res.user_name, res.user_password, res.user_address, res.user_phone, null);
                }).then(()=>Alert.success("Du og din organisasjon '" + res.org_name + "' ble registrert"))
                .then(()=>history.push("/Login"))
                .catch((error:Error)=>{
                    localStorage.removeItem("invToken");
                    Alert.danger("Noe gikk feil under oppretting og verifisering, prøv igjen");
                    history.push("/RegisterOrganization");
                });
        }).catch((error:Error)=>{
            Alert.danger("ugyldig link");
            localStorage.removeItem("invToken");
            history.push("/login");
        });
        localStorage.removeItem("invToken");
    }
}