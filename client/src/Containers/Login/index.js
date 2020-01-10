// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import {FormElement, LoginCard} from "./Components";
import {User, userService} from "../../services/UserService";
import {Organization, organizationService} from "../../services/OrganizationService";
import Row from "react-bootstrap/Row";
import {Col, Spinner, Button} from "react-bootstrap";
import {Alert} from "../../widgets";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {NavLink} from "react-router-dom";
import {sharedComponentData} from "react-simplified";
import { createHashHistory } from "history";
const history = createHashHistory();


export class Login extends Component{
    user: User= new User();
    loading: boolean = false;
    organizations: Organization[]= [];
    pickedOrg: Organization = new Organization();
    checkingOrg:boolean = false;
    checkedOrg:boolean = false;
    message: string = "Logg inn";

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
                                <NavLink to = "/RegisterOrganization">
                                <Button variant="primary" onClick={this.registerNewOrganizationClicked}>Registrer ny
                                    organisasjon</Button>
                                </NavLink>
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
                        {this.message}
                    </Card.Header>
                    <Card.Body>
                    <Spinner animation="border"></Spinner>
                    </Card.Body>
                </Card>
            )
        }
    }
    checkEmail(){
        this.message = "Checking email";
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
        this.message = "Velg organisasjon";
        this.pickedOrg = org;
        this.checkedOrg = true;
    }
    login(){
        this.loading = true;
        userService.logIn(this.pickedOrg.org_id, this.user.email, this.user.password).then(() => {
                this.loading=false;
                Alert.success("Du ble logget inn");
                history.push("/event");
            }).catch((error: Error)=>Alert.danger(error.message));
    }
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
        this.loading = true;
        //eventuelt route videre til registreringsskjema her
    }
}