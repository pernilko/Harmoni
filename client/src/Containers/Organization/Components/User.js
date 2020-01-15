import * as React from 'react';
import Form from "react-bootstrap/Form";
import {Button, Col, Spinner} from "react-bootstrap";
import {Component} from 'react-simplified';
import {User, userService} from "../../../services/UserService";
import {Alert} from "../../../widgets";
import {Organization, organizationService} from "../../../services/OrganizationService";
import { createHashHistory } from 'history';

const history = createHashHistory();

export class userForm extends Component <{ match: { params: { token: string } } }>{
    user: User = new User();
    organization: Organization = new Organization();
    loaded: boolean = false;
    repeatedPassword: string = "";
    render(){
        if(this.loaded){
            return (
                <div>
                    <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
                        <h2 className="card-header align-content-center">{"Registrer ny bruker for organisasjonen: " + this.organization.org_name}</h2>
                        <Form.Group>
                            <Form.Label>Brukernavn</Form.Label>
                            <Form.Control type="username" placeholder="Velg brukernavn"
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                              this.user.user_name = event.target.value
                                          }}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Passord</Form.Label>
                                <Form.Control type="password" placeholder="Skriv inn passord"
                                              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                                  this.user.password = event.target.value;
                                              }}/>

                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label> </Form.Label>
                                <Form.Control type="password" placeholder="Gjenta passord" style={{marginTop: 8 + 'px'}}
                                              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                                  this.repeatedPassword = event.target.value
                                              }}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user.address = event.target.value
                            }}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefon nr</Form.Label>
                            <Form.Control type="number" placeholder="Skriv inn telefon nummer"
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                              this.user.phone = event.target.value
                                          }}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="string" placeholder="personligEmail@mail.com"
                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                              this.user.email = event.target.value
                                          }}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last opp bilde</Form.Label>
                            <Form.Control type="file"/>
                        </Form.Group>
                        <Button variant="primary" type="button" style={{marginTop: 20 + 'px'}}
                                onClick={this.register}> Registrer</Button>
                    </Form>
                </div>
            )
        }else{
            return (
                <Spinner animation="border"></Spinner>
            )
        }
    }

    register(){
            // Register
        if(this.repeatedPassword != this.user.password || this.user.password.length<8){
                Alert.danger("Passord må være like og ha minst 8 tegn");
        }
        else if(this.user.email.length !=0 && this.user.address.length != 0 && this.user.user_name.length!=0
                &&this.user.phone.length != 0){
            userService.register(this.organization.org_id, this.user.email, 0, this.user.user_name, this.user.password, this.user.address, this.user.phone, this.user.image)
                .then(response=>{
                    Alert.success("Du ble registrert hos: " + this.organization.org_name);
                    history.push("/login");
                })
        }else{
                Alert.danger("alle felt må fylles og passord må ha minst 8 bokstaver");
        }
    }
    mounted() {
        localStorage.setItem("invToken", this.props.match.params.token);
        organizationService.checkInvToken().then(res => {
            console.log("fra USER: ");
            console.log(res.org_id);
            organizationService.getOrganization(res.org_id).then(response => {
                this.organization = response[0];
                this.loaded = true;
            }).catch((error:Error)=>{
                Alert.danger(error.message);
                this.loaded = true;
            })
        })/*.catch((error:Error)=>{
            Alert.danger("Ugyldig link");
            history.push("/login");
        })*/;
    }
}