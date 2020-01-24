
import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Nav, Spinner, Tab} from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert, Row} from "../../../widgets";
import Accordion from "react-bootstrap/Accordion";
import "./OrganizationProfile.css";

let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


/**
 * Klasse som viser info om din organisasjon.
 */
export class OrgProfile2 extends Component {
    admin: User[] = [];
    members: User[] = [];
    isAdmin: boolean = false;
    isDisabled: boolean = true;
    border: string = "none";
    backgroundColor: string = "white";
    inEdit: boolean = false;

    org_name: string = "";
    org_email: string = "";
    org_phone: string = "";
    org_image: string = "";

    loaded: boolean = false;
    ready:boolean = false;

    /**
     * Funksjon som oppretter et HTML komponent for å vise info om din organisasjon.
     * @returns {*} Funksjonen returnerer et komponent som viser din organisasjon.
     */
    render() {
        if (userService.currentUser && organizationService.currentOrganization) {
            if (!this.loaded) {
                this.load();
                this.loaded = true;
            }
            if (this.ready) {
                return (
                    <div className="container-fluid">
                        <div className="container">
                            <div>
                                <h3 style={{margin:5 + '%'}}>Min Organisasjon</h3>
                            </div>
                        </div>
                        <div className="container">
                            <Tab.Container id="left-tabs-" defaultActiveKey="first">
                                <Row>
                                    <div className="col-lg-5">
                                        <div className="container">
                                            <div className="card-body">
                                                <div id ="card-header" className="card-header">
                                                    <h4>Kontakt info
                                                        <Button id="button" hidden={!this.isAdmin}
                                                                variant="outline-secondary"
                                                                style={{float: "right", color: "white", border: "none"}}
                                                                onClick={this.editOrg}>Rediger</Button>

                                                        <Button id="button" hidden={!this.inEdit} variant="danger"
                                                                style={{float: "right", background: "#C70039", borderColor: "#C70039"}}
                                                                onClick={this.cancelEdit}>Avbryt</Button>

                                                        <Button id="button" hidden={!this.inEdit} variant="success"
                                                                style={{float: "right", background: "#b2cf7f", borderColor: "#b2cf7f"}}
                                                                onClick={this.saveEdit}>Lagre</Button>
                                                    </h4>
                                                </div>
                                                <div className="card-img" style={{textAlign: "center"}}>
                                                    <img id = "org_image" style={{width: 'inherit', height: "auto", display: "cover"}}
                                                        src={this.org_image ? this.org_image : "https://storage.cloud.google.com/harmoni-files/org.png"}/>
                                                </div>
                                                <div>
                                                    <h3 id="orgLabel"> {this.org_name}</h3>
                                                </div>
                                                <div className="form-inline-block">
                                                    <div className="form-group">
                                                        <label>Epost: </label> {this.org_email}</div>
                                                    <div className="form-group">
                                                        <label>Tlf: </label> {this.org_phone}
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Admin: </label> {this.admin.map((a,i) =>  <ul style={{display:'inline'}}>{a.user_name}</ul>
                                                    )}
                                                    </div>
                                                    <div hidden={!this.inEdit} className="card-text" style={{marginLeft: 10 + "px", marginTop: 10 + "px", marginBottom: 20 + "px", float: "left"}}>
                                                        <Form.Group>
                                                            <Form.Label>Endre org. navn </Form.Label>
                                                            <Form.Control type="text" disabled={this.isDisabled}
                                                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_name = event.target.value)}/>
                                                        </Form.Group>

                                                        <Form.Group>
                                                            <Form.Label>Tlf: </Form.Label>
                                                            <Form.Control type="text" disabled={this.isDisabled}
                                                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_phone = event.target.value)}/>
                                                        </Form.Group>

                                                        <Form.Group>
                                                            <Form.Label>E-post: </Form.Label>
                                                            <Form.Control type="text" disabled={this.isDisabled}
                                                                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_email = event.target.value)}/>
                                                        </Form.Group>

                                                        <Form.Group>
                                                            <Form.Label>Last opp bilde</Form.Label>
                                                            <Form.Control accept = "image/*" type="file" onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {
                                                                this.org_image = event.target.files[0];
                                                                let reader = new FileReader();
                                                                reader.onload = (
                                                                    function(fileToRead: File)
                                                                    {
                                                                        return function(e) {
                                                                            document.getElementById("org_image").src = e.target.result;
                                                                        };
                                                                    })(this.org_image);
                                                                reader.readAsDataURL(event.target.files[0]);
                                                            }}/>
                                                        </Form.Group>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div id = "card-header" className="card-header">
                                            <h4>Medlemmer</h4>
                                        </div>
                                            <ListGroup>
                                                {this.members.map(m => (
                                                    <Accordion>
                                                        <ListGroupItem>
                                                            <div className="row">
                                                                <div className="col-lg-2">
                                                                    <Image
                                                                        src={m.image ? m.image : "https://storage.cloud.google.com/harmoni-files/pb.png"}
                                                                        roundedCircle width={70 + "px"} height={70 + "px"}
                                                                        style={{objectFit: "cover"}}/>
                                                                </div>
                                                                <div className="col-lg-5">
                                                                    <p>Navn: {m.user_name}</p>
                                                                    <p>Email:{m.email}</p>
                                                                </div>
                                                                <div className="col-lg-4" style={{textAlign: "right", marginRight: 1 + '%'}}>
                                                                    <Accordion.Toggle as={Button} hidden={!this.isAdmin || m.user_id == userService.currentUser.user_id}
                                                                                      variant="btn btn-outline-secondary"
                                                                                      eventKey={m.user_id}
                                                                                      style={{marginTop: 9}}>Rediger</Accordion.Toggle>
                                                                </div>
                                                            </div>
                                                            <Accordion.Collapse eventKey={m.user_id}>
                                                                <div id="rights" className="card-body">
                                                                    <h6>Endre Rettigheter</h6>
                                                                    <Form>
                                                                        <Form.Check style={{textAlign: "left"}}>
                                                                            <Form.Check.Input defaultChecked={m.p_create_event}
                                                                                              id={m.user_id + "p_create_event"}/>
                                                                            <Form.Check.Label>{"Opprette og redigere arrangement"}</Form.Check.Label>
                                                                        </Form.Check>
                                                                        <Form.Check style={{textAlign: "left"}}>
                                                                            <Form.Check.Input defaultChecked={m.p_read_contract}
                                                                                              id={m.user_id + "p_read_contract"}/>
                                                                            <Form.Check.Label>{"Se kontrakter"}</Form.Check.Label>
                                                                        </Form.Check>
                                                                        <Form.Check style={{textAlign: "left"}}>
                                                                            <Form.Check.Input defaultChecked={m.p_read_riders}
                                                                                              id={m.user_id + "p_read_riders"}/>
                                                                            <Form.Check.Label>{"Se riders"}</Form.Check.Label>
                                                                        </Form.Check>
                                                                        <Form.Check style={{textAlign: "left"}}>
                                                                            <Form.Check.Input defaultChecked={m.p_archive}
                                                                                              id={m.user_id + "p_archive"}/>
                                                                            <Form.Check.Label>{"Godkjenne for arkivering"}</Form.Check.Label>
                                                                        </Form.Check>
                                                                    </Form>
                                                                    <Accordion.Toggle as={Button} variant="btn btn-success"
                                                                                      style={{marginTop: 20 + "px"}}
                                                                                      eventKey={m.user_id}
                                                                                      onClick={() => this.updatePrivileges(m)}>Lagre</Accordion.Toggle>
                                                                    <Accordion.Toggle as={Button} hidden={m.privileges == 1} onClick={() => this.makeAdmin(m.user_id)} variant="warning" style={{float: "right", marginTop: 20+"px"}}>Gjør til Admin</Accordion.Toggle>
                                                                </div>
                                                            </Accordion.Collapse>
                                                        </ListGroupItem>
                                                    </Accordion>
                                                ))}
                                            </ListGroup>
                                    </div>
                                </Row>
                            </Tab.Container>
                        </div>
                    </div>
                );
            } else {
                return (
                    <Spinner animation={"border"}/>
                )
            }
        } else {
            return (
                <Spinner animation={"border"}/>
            )
        }
    }

    /**
     * Funksjon som laster inn all data knyttet til din organisasjon.
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
                this.org_image = organizationService.currentOrganization.image;
                this.ready = true;
                console.log(organizationService.currentOrganization);
            })
            .catch((error: Error) => console.log(error.message))
    }

    /**
     * Klasse som tillater bruker å redigere organisasjon.
     */
    editOrg(){
        if(userService.currentUser.privileges == 1) {
            console.log("show edit");
            this.isDisabled = false;
            this.border = "none";
            this.backgroundColor = "lightgrey";
            this.inEdit = true;
            this.isAdmin = false;
        }else{
            Alert.danger("ikke autorisert");
        }
    }

    /**
     * Klasse som lar deg lagre endringer ved organisasjonen-
     */
    saveEdit(){
        console.log("Save edit");

        this.updateOrg();
        this.changePic(organizationService.currentOrganization.org_id);
    }

    /**
     * Klasse for å endre profilbildet til organisasjonen.
     * @param {val} Tar inn parameter som sier hvilken organisasjon man skal endre bildet på.
     */
    changePic(val: number){
        console.log("BILDE: ", this.org_image);
          organizationService
            .updateOrgImage(val, this.org_image)
            .then(() => {
              if(userService.currentUser){
                userService.autoLogin();
              }
            })
    }

    /**
     * Funksjon som oppdaterer organisasjonen din.
     */
    updateOrg() {
        if (emailRegEx.test(this.org_email)) {
        organizationService
            .updateOrganization(organizationService.currentOrganization.org_id, this.org_name, this.org_phone, this.org_email)
            .then(() => {
                this.isDisabled = true;
                this.border = "none";
                this.backgroundColor = "white";
                this.inEdit = false;
                this.isAdmin = true;
            })
            .catch((error: Error) => console.log(error.message));
        } else {
            Alert.danger("Ikke gyldig email.");
        }
    }


    /**
     * Funksjon for å kansellere redigering av organisasjonen din.
     */
    cancelEdit(){
        console.log("Cancel edit");
        this.org_email = organizationService.currentOrganization.email;
        this.org_phone = organizationService.currentOrganization.phone;
        this.org_name = organizationService.currentOrganization.org_name;
        this.isDisabled = true;
        this.border = "none";
        this.backgroundColor = "white";
        this.inEdit = false;
        this.isAdmin = true;
    }

    /**
     * Funksjon for å oppdatere rettighetene til brukere ved din organisasjon.
     * @param  {user} Parameter sier hvilken bruker man skal endre rettighetene til.
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

    /**
     * Funksjon for å gjøre en bruker til admin.
     * @param {val} Paramter sier hvem som skal bli gjort til admin.
     */
    makeAdmin(val: number) {
        console.log("MAKE ADMIN");
        userService
            .makeAdmin(val)
            .then(Alert.success("Denne brukeren er nå admin."))
            .catch((error: Error) => Alert.danger("Noe gikk galt."))
    }
}