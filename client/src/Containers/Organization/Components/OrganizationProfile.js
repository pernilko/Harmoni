//@flow
import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Nav, Spinner, Tab} from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert, Row} from "../../../widgets";
import Accordion from "react-bootstrap/Accordion";
import "./OrganizationProfile.css";

/**
 * Klasse for å vise frem profilen til en organisasjon.
 */
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
    ready:boolean = false;

    /**
     * Funksjon som oppretter et HTML-komponent for å vise profilen til organisasjonen.
     * @returns {*} Funksjonen returnerer et komponent som viser profilen til organisasjon.
     */
    render() {
        if (userService.currentUser && organizationService.currentOrganization) {
            if (!this.loaded) {
                this.load();
                this.loaded = true;
            }
            if(this.ready) {
                return (
                    <div id={"orgContainer"} className="container-fluid">
                        <div className="row">
                            <div className="col-4" >
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-img" style={{textAlign: "center"}}>
                                            <img src={"https://s1.logaster.com/static/v3/img/products/logo.png"}/>
                                        </div>
                                        <div className="card-body" style={{paddingBottom: 0, textAlign: "center"}}>
                                            <h2><input className="inputLabel"
                                                       value={this.org_name} disabled={this.isDisabled}
                                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_name = event.target.value)}/>
                                            </h2>
                                            <p>Opprettet: {organizationService.currentOrganization.reg_date}</p>
                                        </div>
                                        <div className="card-header">
                                            <h4>Kontakt info:
                                                <Button id="button" hidden={!this.isAdmin} variant="outline-secondary"
                                                        style={{float: "right"}}
                                                        onClick={this.editOrg}>Rediger</Button>
                                                <Button id="button" hidden={!this.inEdit} variant="danger"
                                                        style={{float: "right"}}
                                                        onClick={this.cancelEdit}>Avbryt</Button>
                                                <Button id="button" hidden={!this.inEdit} variant="success"
                                                        style={{float: "right"}}
                                                        onClick={this.saveEdit}>Lagre</Button>
                                            </h4>
                                        </div>
                                        <div className="card-body" style={{paddingBottom: 0}}>
                                            <div className="card-text">
                                                <label style={{marginLeft: 10 + "px"}}>Epost: </label>
                                                <input className="inputLabel" style={{
                                                    margin: 10 + "px",
                                                    border: this.border,
                                                    background: "white"
                                                }}
                                                       value={this.org_email} disabled={this.isDisabled}
                                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_email = event.target.value)}/>
                                            </div>
                                            <div className="card-text">
                                                <label style={{marginLeft: 10 + "px"}}>Tlf: </label>
                                                <input className="inputLabel" style={{
                                                    margin: 10 + "px",
                                                    border: this.border,
                                                    background: "white"
                                                }}
                                                       value={this.org_phone} disabled={this.isDisabled}
                                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_phone = event.target.value)}/>
                                            </div>
                                            <div className="row" style={{marginTop: 10 + "px"}}>
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
                            <div className="col-5" style={{padding: 0, paddingLeft: 0 + "px", height: "100%"}}>
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
                                                            <p style={{
                                                                margin: "0",
                                                                marginTop: 3
                                                            }}>Navn: {m.user_name}</p>
                                                            <p style={{margin: "0"}}>Email: {m.email}</p>
                                                        </div>
                                                        <div className="col-1">
                                                            <Accordion.Toggle as={Button} hidden={!this.isAdmin}
                                                                              variant="btn btn-outline-secondary"
                                                                              eventKey={m.user_id}
                                                                              style={{marginTop: 9}}>rediger</Accordion.Toggle>
                                                        </div>
                                                    </div>
                                                    <Accordion.Collapse eventKey={m.user_id}>
                                                        <div className="card-body">
                                                            <h6>Endre Rettigheter</h6>
                                                            <Form>
                                                                <Form.Check>
                                                                    <Form.Check.Input defaultChecked={m.p_create_event}
                                                                                      id={m.user_id + "p_create_event"}/>
                                                                    <Form.Check.Label>{"Opprette og redigere arrangement"}</Form.Check.Label>
                                                                </Form.Check>
                                                                <Form.Check>
                                                                    <Form.Check.Input defaultChecked={m.p_read_contract}
                                                                                      id={m.user_id + "p_read_contract"}/>
                                                                    <Form.Check.Label>{"Se kontrakter"}</Form.Check.Label>
                                                                </Form.Check>
                                                                <Form.Check>
                                                                    <Form.Check.Input defaultChecked={m.p_read_riders}
                                                                                      id={m.user_id + "p_read_riders"}/>
                                                                    <Form.Check.Label>{"Se raiders"}</Form.Check.Label>
                                                                </Form.Check>
                                                                <Form.Check>
                                                                    <Form.Check.Input defaultChecked={m.p_archive}
                                                                                      id={m.user_id + "p_archive"}/>
                                                                    <Form.Check.Label>{"Godkjenne for arkivering"}</Form.Check.Label>
                                                                </Form.Check>
                                                            </Form>
                                                            <Accordion.Toggle as={Button} variant="btn btn-success"
                                                                              style={{marginTop: 20 + "px"}}
                                                                              eventKey={m.user_id}
                                                                              onClick={() => this.updatePrivileges(m)}>Lagre</Accordion.Toggle>
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
        }else{
            return(
                <Spinner animation={"border"}/>
            )
        }
    }

    /**
     * Funksjon som laster inn all data knyttet til organisasjonen.
     */
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
                this.ready = true;
            })
            .catch((error: Error) => console.log(error.message))
    }

    /**
     * Funksjon som sjekker om brukeren har mulighet til å redigere organisasjonen.
     */
    editOrg(){
        if(userService.currentUser.privileges == 1) {
            console.log("show edit");
            this.isDisabled = false;
            this.border = "groove";
            this.inEdit = true;
            this.isAdmin = false;
        }else{
            Alert.danger("ikke autorisert");
        }
    }

    /**
     * Funksjon for å lagre endringer man har gjort ved organisasjonen.
     */
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

    /**
     * Funksjon for å kansellere redigering av organisasjon.
     */
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

    /**
     * Funksjon for å kunne endre rettighetene til en gitt bruker i organisasjonen.
     * @param {user} Tar inn som parameter den brukeren man ønsker å endre rettighetene til.
     */
    updatePrivileges(user: User){
        //console.log(user.user_id);
        if(userService.currentUser.privileges == 1) {
            user.p_create_event = document.getElementById("" + user.user_id + "p_create_event").checked ? 1 : 0;
            user.p_read_contract = document.getElementById("" + user.user_id + "p_read_contract").checked ? 1 : 0;
            user.p_read_riders = document.getElementById("" + user.user_id + "p_read_riders").checked ? 1 : 0;
            user.p_archive = document.getElementById("" + user.user_id + "p_archive").checked ? 1 : 0;
            userService.updatePrivileges(user.user_id, user.p_create_event, user.p_read_contract, user.p_read_riders, user.p_archive).then(()=>{
                if(user.user_id == userService.currentUser.user_id) {
                    userService.currentUser.p_create_event = user.p_create_event;
                    userService.currentUser.p_read_contract = user.p_read_contract;
                    userService.currentUser.p_read_riders = user.p_read_riders;
                    userService.currentUser.p_archive = user.p_archive;
                }
            }).catch((error: Error) => {
                Alert.danger(error.message);
            });
        }else{
            Alert.danger("ikke autorisert");
        }
    }
}