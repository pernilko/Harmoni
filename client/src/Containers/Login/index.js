// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import {FormElement, LoginCard} from "./Components";
import {User, userService} from "../../services/UserService";
import {Organization, organizationService} from "../../services/OrganizationService";
import Row from "react-bootstrap/Row";
import {Col, Spinner, Button, Container} from "react-bootstrap";
import {Alert} from "../../widgets";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


export class Login extends Component{
    user: User= new User();
    loading: boolean = false;
    organizations: Organization[]= [];
    pickedOrg: Organization = new Organization();
    checkingOrg:boolean = false;
    checkedOrg:boolean = false;

    render(){
        if(this.checkedOrg){
            return (
                <Card style = {{width: "50%", margin: "auto"}}>
                    <Card.Header>
                        <b>{this.pickedOrg.org_name}</b>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <FormElement
                                text={"Passord for "+ this.user.email}
                                type="password"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                    this.user.password = event.target.value
                                }}
                                placeholder="Skriv passord her"/>
                        </Form>
                        <Row style = {{width: "60%", margin: "auto"}}>
                                <Button variant="success" onClick={this.login} block>Logg inn</Button>
                        </Row>
                    </Card.Body>
                </Card>
            )

        }
        else if(!this.loading) {

            if(this.checkingOrg){
                //for å velge organisasjon
                return (
                    <Card style = {{width: "50%", margin: "auto"}}>
                        <Card.Header>
                            Velg organisasjon
                        </Card.Header>
                        <Card.Body style = {{margin: "auto"}}>
                                {this.organizations.map(e=>(
                                    <Button variant="primary" onClick = {()=>this.pickOrg(e)} style = {{margin: "5px"}} block>{e.org_name}</Button>
                                    )
                                )}
                            </Card.Body>
                    </Card>
                )
            }else{
                return (
                    <Card style = {{width: "50%", margin: "auto"}}>
                        <Card.Header>
                            Logg inn
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <FormElement
                                    text="Email: "
                                    type="e-mail"
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                        this.user.email = event.target.value
                                    }}
                                    placeholder="olaNormann@mail.com"/>
                            </Form>
                        <Row style = {{width: "60%", margin: "auto"}}>
                            <Col>
                                <Button variant="success" onClick={this.checkEmail}>Logg inn</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={this.registerNewOrganizationClicked}>Registrer ny
                                    organisasjon</Button>
                            </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                )
            }
        }else{
            return(
                <Card style = {{width: "50%", margin: "auto"}}>
                    <Card.Header>
                        Logg inn
                    </Card.Header>
                    <Card.Body>
                    <Spinner animation="border"></Spinner>
                    </Card.Body>
                </Card>
            )
        }
    }
    checkEmail(){
       organizationService.getOrganizationByEmail(this.user.email).then(org=>{
           if(org.length>0){
               this.organizations = org;
               this.checkingOrg = true;
           }else{
               Alert.danger("Finner ikke email i systemet");
           }
           this.loading=false;
       });
        this.loading = true;
    }
    pickOrg(org: Organization){
        this.pickedOrg = org;
        this.checkedOrg = true;
    }

    login(){
        userService.logIn(this.pickedOrg.org_id, this.user.email, this.user.password).then(json => {
                localStorage.setItem("token", json.jwt);
                this.loading=false;
                Alert.success("Du ble logget inn");
            }).catch((error: Error)=>Alert.danger("feil passord"));
        this.loading = true;
    }
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
        //eventuelt route videre til registreringsskjema her
    }
}