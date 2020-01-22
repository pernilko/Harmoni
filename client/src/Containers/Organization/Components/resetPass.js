import * as React from 'react';
import Form from "react-bootstrap/Form";
import {Button, Col, Spinner} from "react-bootstrap";
import {Component} from 'react-simplified';
import {User, userService} from "../../../services/UserService";
import {Alert} from "../../../widgets";
import {Organization, organizationService} from "../../../services/OrganizationService";
import { createHashHistory } from 'history';
import "./OrganizationProfile.css";

const history = createHashHistory();

export class resetPass extends Component<{ match: { params: { token: string } } }> {
    password: string = "";
    repeatedPassword: string = "";
    loaded: boolean = false;
    org_id: number = 0;
    email: string = "";

    render() {
        if (this.loaded) {
        return (
            <div className="body">
                <div className="mid">
                    <div id="reset" className="wrapper">
                        <h3 style={{paddingTop: 10+'px'}}>Skriv inn nytt passord</h3>
                        <form id="passwordForm" tabIndex="500" >
                            <div>
                                <input type="password"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                           this.password = event.target.value
                                       }}/>
                                <label>Passord for</label>
                            </div>
                            <div>
                                <input type="password"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                           this.repeatedPassword = event.target.value
                                       }}/>
                                <label>Gjenta passord</label>
                            </div>
                            <div>
                                <button className="btn dark" type="button" variant="primary" onClick={this.reset}>Bekreft</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
        } else {
            return (
              <div className="body">
                  <div className="mid">
                      <div id="reset" className="wrapper">
                          <Spinner animation="border"></Spinner>
                      </div>
                  </div>
              </div>
            )
        }
    }

    mounted() {
        localStorage.setItem("resetToken", this.props.match.params.token);
        organizationService.checkResetToken().then(res => {
            console.log("fra USER: ");
            console.log(res.org_id);
            console.log(res.email);
            organizationService.getOrganization(res.org_id).then(response => {
                this.organization = response;
                this.org_id = res.org_id;
                this.email = res.email;
                this.loaded = true;
            }).catch((error:Error)=>{
                Alert.danger(error.message);
                this.loaded = true;
            })
        }).catch((error:Error)=>{
            Alert.danger("Ugyldig link");
            history.push("/login");
        });
    }

    reset() {
        if (this.repeatedPassword != this.password || this.password.length < 8) {
            Alert.danger("Passord må være like og ha minst 8 tegn");
        }
        else {
            console.log(this.org_id);
            console.log(this.email);
            console.log(this.password);
            userService.resetPass(this.org_id, this.email, this.password)
                .then(res => {
                    Alert.success("Passordet ditt har blitt oppdatert!");
                    history.push("/login");
                })
            }
    }
}