//@flow
import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Nav, Spinner, Tab} from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert, Row} from "../../../widgets";
import Accordion from "react-bootstrap/Accordion";
import "./Profile.css";

export class OrgProfile extends Component {
    admin: User[] = [];
    members: User[] = [];
    isAdmin: boolean = false;
    isDisabled: boolean = true;
    border: string = "none";
    inEdit: boolean = false;

    org_name: string = "";
    org_email: string = "";
    org_phone: string = "";

    loaded: boolean = false;

    render() {
        if (userService.currentUser && organizationService.currentOrganization) {
            if (!this.loaded) {
                this.load();
            }
            return (
                <div className="container-fluid" style={{height: "100%"}}>
                    <div className="row" style={{height: "100%"}}>
                        <div className="col-6" style={{padding: 0, paddingLeft: 0 + "px", height: "100%"}}>
                            <div className="card" style={{border: "none", height: "100%"}}>
                                <div className="card-body" style={{padding: 0}}>
                                    <div className="card-img" style={{textAlign: "center"}}>
                                        <img src={"https://s1.logaster.com/static/v3/img/products/logo.png"}/>
                                    </div>
                                    <div className="card-body" style={{paddingBottom: 0, textAlign: "center"}}>
                                        <h2><input className="inputLabel" style={{border: this.border, background: "white", textAlign:"center"}}
                                                   value={this.org_name} disabled={this.isDisabled}
                                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_name = event.target.value)}/></h2>
                                        <p>Opprettet: 20.01.2020</p>
                                    </div>
                                    <div className="card-header">
                                        <h4>Kontakt info:
                                            <Button id="button" hidden={!this.isAdmin} variant="outline-secondary" style={{float: "right"}}
                                                    onClick={this.editOrg}>Rediger</Button>
                                            <Button id="button" hidden={!this.inEdit} variant="danger" style={{float: "right"}}
                                                    onClick={this.cancelEdit}>Avbryt</Button>
                                            <Button id="button" hidden={!this.inEdit} variant="success" style={{float: "right"}}
                                                    onClick={this.saveEdit}>Lagre</Button>
                                        </h4>
                                    </div>
                                    <div className="card-body" style={{paddingBottom: 0}}>
                                        <div className="card-text">
                                            <label style={{marginLeft: 10 + "px"}}>Epost: </label>
                                            <input className="inputLabel" style={{margin: 10 + "px", border: this.border, background: "white"}}
                                                   value={this.org_email} disabled={this.isDisabled}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_email = event.target.value)}/>
                                        </div>
                                        <div className="card-text">
                                            <label style={{marginLeft: 10 + "px"}}>Tlf: </label>
                                            <input className="inputLabel" style={{margin: 10 + "px", border: this.border, background: "white"}}
                                                   value={this.org_phone} disabled={this.isDisabled}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_phone = event.target.value)}/>
                                        </div>
                                        <div className="row" style={{marginTop: 10+"px"}}>
                                            <div className="col-auto">
                                                <div className="card-text" style={{marginLeft: 10 + "px"}}>
                                                    Admin:
                                                </div>
                                            </div>
                                            <div className="col-auto" style={{padding: 0}}>
                                                {this.admin.map(a => (
                                                    <div className="card-text">{"   " + a.user_name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6" style={{padding: 0, paddingLeft: 0 + "px", height: "100%"}}>
                            <div className="card-header" style={{backgroundColor: "#53265F", color: "white"}}>
                                <h5>Medlemmer</h5></div>
                                <div style={{maxHeight: "100%", overflow: "auto"}}>
                                    <ListGroup>
                                        {this.members.map(m => (
                                            <Accordion>
                                            <ListGroupItem>
                                                <div className="row">
                                                    <div className="col-2" style={{padding: 0}}>
                                                        <Image
                                                            src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                            roundedCircle width={70 + "px"} height={60 + "px"}
                                                            style={{objectFit: "cover", marginLeft: 10 + "%"}}/>
                                                    </div>
                                                    <div className="col-7" style={{padding: 0}}>
                                                        <p style={{margin: "0", marginTop: 3}}>Navn: {m.user_name}</p>
                                                        <p style={{margin: "0"}}>Email: {m.email}</p>
                                                    </div>
                                                    <div className="col-1">
                                                        <Accordion.Toggle as={Button} hidden={!this.isAdmin} variant="btn btn-outline-secondary" eventKey={m.user_id}
                                                               style={{marginTop: 9}}>rediger</Accordion.Toggle>
                                                    </div>
                                                </div>
                                                <Accordion.Collapse eventKey={m.user_id}>
                                                    <div className="card-body">
                                                        <h6>Endre Rettigheter</h6>
                                                        <Form>
                                                            <Form.Check>
                                                                <Form.Check.Input/>
                                                                <Form.Check.Label>{"Opprette og redigere arrangement"}</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check >
                                                                <Form.Check.Input/>
                                                                <Form.Check.Label>{"Se kontrakter"}</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check >
                                                                <Form.Check.Input/>
                                                                <Form.Check.Label>{"Se raiders"}</Form.Check.Label>
                                                            </Form.Check>
                                                            <Form.Check >
                                                                <Form.Check.Input/>
                                                                <Form.Check.Label>{"Godkjenne for arkivering"}</Form.Check.Label>
                                                            </Form.Check>
                                                        </Form>
                                                        <Accordion.Toggle as={Button} variant="btn btn-success" style={{marginTop: 20+"px"}} eventKey={m.user_id}>Lagre</Accordion.Toggle>
                                                    </div>
                                                </Accordion.Collapse>
                                            </ListGroupItem>
                                            </Accordion>
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        }else{
            return(
                <Spinner animation={"border"}/>
            )
        }
    }
    load(){
        userService
            .getUserByOrgId(userService.currentUser.org_id)
            .then(response => {
                this.members = response;
                let temp = this.members;
                this.admin = temp.filter(r => r.privileges === 1);
                if(this.admin.some(u => u.user_id === userService.currentUser.user_id)){
                    this.isAdmin = true;
                }
                this.org_name = organizationService.currentOrganization.org_name;
                this.org_email = organizationService.currentOrganization.email;
                this.org_phone = organizationService.currentOrganization.phone;
                this.loaded = true;
            })
            .catch((error: Error) => console.log(error.message))
    }
    editOrg(){
        console.log("show edit");
        this.isDisabled = false;
        this.border = "groove";
        this.inEdit = true;
        this.isAdmin = false;
    }
    saveEdit(){
        console.log("Save edit");

        organizationService
            .updateOrganization(organizationService.currentOrganization.org_id, this.org_name, this.org_phone, this.org_email)
            .then(() => {
                this.isDisabled = true;
                this.border = "none";
                this.inEdit = false;
                this.isAdmin = true;
            })
            .catch((error: Error) => console.log(error.message));
    }
    cancelEdit(){
        console.log("Cancel edit");
        this.org_email = organizationService.currentOrganization.email;
        this.org_phone = organizationService.currentOrganization.phone;
        this.org_name = organizationService.currentOrganization.org_name;
        this.isDisabled = true;
        this.border = "none";
        this.inEdit = false;
        this.isAdmin = true;
    }
}