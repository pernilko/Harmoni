
import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Nav, Spinner, Tab} from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert, Row} from "../../../widgets";
import Accordion from "react-bootstrap/Accordion";
import "./OrganizationProfile.css";

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

    render() {
        if (userService.currentUser && organizationService.currentOrganization) {
            if (!this.loaded) {
                this.load();
                this.loaded = true;
            }
            if (this.ready) {
                return (
                    <div>
                        <Container fluid style={{padding: 0}}>
                            <div style={{backgroundImage: "linear-gradient(to bottom right, #581845 , #900C3F)", height: 60, color: "white", textAlign: "center", paddingTop: 10}}>
                                <h3>Min Organisasjon</h3>
                            </div>
                        </Container>
                        <Container fluid>
                            <Tab.Container id="left-tabs-" defaultActiveKey="first">
                                <Row>
                                    <Col lg={5} style={{padding: 0, paddingRight: 4, paddingLeft: 4}}>
                                        <div className="card">
                                            <div className="card-body" style={{padding: 0}}>
                                                <div className="card-header" style={{backgroundImage: "linear-gradient(to bottom right, #581845 , #900C3F)"}}>
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
                                                    <img style={{width: "100%", height: "auto", display: "cover"}}
                                                        src={this.org_image}/>
                                                </div>
                                                <h3 style={{textAlign: "center"}}><input className="inputLabel" style={{
                                                    border: this.border,
                                                    textAlign: "center",
                                                    background: this.backgroundColor,
                                                    width: "90%",
                                                    height: "5%",
                                                    marginTop: 10+"px"
                                                }}
                                                           value={this.org_name} disabled={this.isDisabled}
                                                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_name = event.target.value)}/>
                                                </h3>
                                                <div style={{float: "left"}}>
                                                    <div className="card-text">
                                                        <label style={{marginLeft: 10 + "px",marginTop: 10 + "px", float: "left"}}>Epost: </label>
                                                        <input className="inputLabel" style={{
                                                            margin: 10 + "px",
                                                            border: this.border,
                                                            background: this.backgroundColor
                                                        }}
                                                               value={this.org_email} disabled={this.isDisabled}
                                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_email = event.target.value)}/>
                                                    </div>
                                                    <div className="card-text">
                                                        <label style={{marginLeft: 10 + "px", marginTop: 10 + "px", float: "left"}}>Tlf: </label>
                                                        <input className="inputLabel" style={{
                                                            margin: 10 + "px",
                                                            border: this.border,
                                                            background: this.backgroundColor
                                                        }}
                                                               value={this.org_phone} disabled={this.isDisabled}
                                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.org_phone = event.target.value)}/>
                                                    </div>
                                                    <div className="card-text" style={{marginLeft: 10 + "px", marginTop: 10 + "px", float: "left"}}>
                                                        Admin:
                                                    </div>
                                                    <div>
                                                    {this.admin.map(a => (
                                                        <div className="card-text" style={{marginLeft: 10 + "px", marginTop: 10 + "px", marginBottom: 20 + "px", float: "left"}}>{"   " + a.user_name}</div>
                                                    ))}
                                                    </div>
                                                    <div hidden={!this.inEdit} className="card-text" style={{marginLeft: 10 + "px", marginTop: 10 + "px", marginBottom: 20 + "px", float: "left"}}>
                                                        <Form.Group>
                                                            <Form.Label>Last opp bilde</Form.Label>
                                                            <Form.Control accept = "image/*" type="file" onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {this.org_image =
                                                            event.target.files[0]}}/>
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={7} style={{padding: 0, paddingLeft: 4, paddingRight: 4, height: "inherit"}}>
                                        <div className="card-header" style={{backgroundImage: "linear-gradient(to bottom right, #581845 , #900C3F)", color: "white"}}>
                                            <h4>Medlemmer</h4>
                                        </div>
                                            <ListGroup>
                                                {this.members.map(m => (
                                                    <Accordion>
                                                        <ListGroupItem>
                                                            <Row style={{margin: "none"}}>
                                                                <Col lg={2} style={{padding: 0}}>
                                                                    <Image
                                                                        src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                                        roundedCircle width={70 + "px"} height={60 + "px"}
                                                                        style={{objectFit: "cover"}}/>
                                                                </Col>
                                                                <Col lg={5} style={{padding: 0, textAlign: "left", paddingTop: 3, paddingLeft: 10}}>
                                                                    <p style={{
                                                                        margin: "0",
                                                                        marginRight: 10
                                                                    }}>Navn: {m.user_name}</p>
                                                                    <br/>
                                                                    <p style={{margin: "0"}}>Email: {m.email}</p>
                                                                </Col>
                                                                <Col lg={5} style={{textAlign: "right"}}>
                                                                    <Accordion.Toggle as={Button} hidden={!this.isAdmin}
                                                                                      variant="btn btn-outline-secondary"
                                                                                      eventKey={m.user_id}
                                                                                      style={{marginTop: 9}}>rediger</Accordion.Toggle>
                                                                </Col>
                                                            </Row>
                                                            <Accordion.Collapse eventKey={m.user_id}>
                                                                <div className="card-body">
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
                                                                            <Form.Check.Label>{"Se raiders"}</Form.Check.Label>
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
                                                                    <Button hidden={m.privileges == 1} onClick={() => this.makeAdmin(m.user_id)} variant="warning" style={{float: "right", marginTop: 20+"px"}}>Gjør til Admin</Button>
                                                                </div>
                                                            </Accordion.Collapse>
                                                        </ListGroupItem>
                                                    </Accordion>
                                                ))}
                                            </ListGroup>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Container>
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
    saveEdit(){
        console.log("Save edit");

        this.updateOrg();
        this.changePic(organizationService.currentOrganization.org_id);
    }

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

    updateOrg() {
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
    }


    
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

    makeAdmin(val: number) {
        console.log("MAKE ADMIN");
        userService
            .makeAdmin(val)
            .then(Alert.success("Denne brukeren er nå admin."))
            .catch((error: Error) => Alert.danger("Noe gikk galt."))
    }
}