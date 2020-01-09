// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import {FormElement, LoginCard} from "./Components";
import {User, userService} from "../../services/UserService";
import Row from "react-bootstrap/Row";
import {Col, Spinner, Button, Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";


export class Login extends Component{
    user: User= new User();
    loading: boolean = false;
    organizations: string[] = ["sukkerhuset", "snakkes", "studentersamfunnet"];
    pickedOrg: string = "";
    checkingOrg:boolean = false;
    checkedOrg:boolean = false;

    render(){

        if(this.checkedOrg){
            return (
                <Card style = {{width: "50%", margin: "auto"}}>
                    <Card.Header>
                        <b>{this.pickedOrg}</b>
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
                                    <Button variant="primary" onClick = {()=>this.pickOrg(e)} style = {{margin: "5px"}} block>{e}</Button>
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

       // userService.getOrganizationByEmail(this.user.email).then(this.checkedEmail = true);
        //this.loading = true;
        this.checkingOrg = true;
    }
    pickOrg(e: string){
        this.checkingOrg = false;
        this.checkedOrg = true;
        this.pickedOrg = e;
        //this.loading=true;
    }

    login(){
        userService.logIn(this.pickedOrg, this.user.email, this.user.password); // .then(route videre til valg av org/inn til org).
    }
    registerNewOrganizationClicked(){
        console.log("newOrgClicked");
    }
}