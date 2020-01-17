import * as React from 'react';
import Form from "react-bootstrap/Form";
import {Button, Col, Spinner} from "react-bootstrap";
import {Component} from 'react-simplified';
import {User, userService} from "../../../services/UserService";
import {Alert} from "../../../widgets";
import {Organization, organizationService} from "../../../services/OrganizationService";
import { createHashHistory } from 'history';

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
            <div>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Passord</Form.Label>
                        <Form.Control type="password" placeholder="Skriv inn passord"
                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                            this.password = event.target.value;
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
                <Button variant="primary" type="button" style={{marginTop: 20 + 'px'}}
                                onClick={this.reset}> Endre passord </Button>
                </Form>
            </div>
        )
        } else {
            return (
                <Spinner animation="border"></Spinner>
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