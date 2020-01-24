//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import {Alert} from "../../../widgets";
import {User, userService} from "../../../services/UserService";
import {UserEvent} from "../../../services/UserEventService";
import {Spinner} from "react-bootstrap";
import {sharedComponentData} from "react-simplified";
import Form from "react-bootstrap/Form";

let del_employee: UserEvent[] = [];
/**
    Employees - Komponent for å legge til nye ansatte 
 */
export class Employees extends Component <{buttonName: string, employee: UserEvent}> {
    users: User[] = [];
    emp: UserEvent[] = [];
    position: string = this.props.employee.job_position;
    user_name: string = this.props.employee.user_name;
    user_id: number = userService.currentUser.user_id;
    email: string = this.props.employee.email;
    hidden: bool = true;

    /**
        render - lager det som skal vises på siden i html-format
        @return html-elementet som inneholder visningen av komponenten.
     */
    render(){
            return (
                <Accordion>
                    <Card style={{border: "none"}}>
                        <Card.Header style={{border: "none"}}>
                            <Accordion.Toggle as={Button} hidden={this.hidden} variant="success" eventKey="0" style = {{float: "left"}}>
                                {this.props.buttonName}
                            </Accordion.Toggle>
                            <button type="button" className="btn btn-danger"
                                    style={{marginLeft: 10 + "px", float: "left"}}
                                    onClick={() => this.deleteEmployee(this.props.employee)}>Slett
                            </button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" style={{border: "none"}}>
                            <Card.Body style={{width: "70%"}}>
                                <form style={{
                                    padding: 20 + 'px',
                                    width: "100%",
                                    position: "sticky",
                                    overflow: "visible"
                                }}>
                                    <div className="form-group">
                                        <row>
                                            <h4>Registrer ansatte for arrangement: </h4><br/>
                                            <div className="form-group">
                                                <label>Ansatte: </label>
                                                <select className="form-control" id="userSelect" value={this.user_id}
                                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.user_id = event.target.value)}>
                                                    {this.users.map(user => (
                                                        <option value={user.user_id}>{user.user_name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Stilling </label>
                                                <input type="text" className="form-control" placeholder="stilling"
                                                       value={this.position}
                                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.position = event.target.value)}/>
                                            </div>
                                            <br/>
                                            <div className="form-group" align="center">
                                                <Accordion.Toggle type="button" as={Button} variant="success"
                                                                  eventKey="0" onClick={this.add}>
                                                    Lagre
                                                </Accordion.Toggle>
                                            </div>
                                        </row>
                                    </div>
                                </form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )
        }

    /**
        mounted - metode som kjøres når komponenten opprettes. Den gjør klar variablene for korrekt visning.
     */
    mounted() {
        let s: any = EmployeesDetails.instance();
        this.emp = s.emp;
        this.hidden = s.hidden;
        this.getUsers(userService.currentUser.org_id);
        //this.users = s.users;
        /*
        if (userService.currentUser) {
            userService
            .getUserByOrgId(userService.currentUser.org_id) //fiks dette slik at currentuser kan gi org_id
            .then(res => {
                this.users = res;
            })
            .catch((error: Error) => Alert.danger("Noe gikk galt ved lasting av ansatte"));
        }*/
    }

    /**
        getUsers - henter brukere som er med i en organisasjon.
        @parameter {number} val - id til organisasjonen det er snakk om.
        @return Alle brukerne som er i en organisasjon.
     */
    getUsers(val: number) {
        userService
            .getUserByOrgId(val)
            .then(users => this.users = users)
    }

    /**
        add - Når skjemaet er ferdig utfylt av brukeren kjøres denne funksjonen for å legge til den nye ansatte.
     */
    add(){
        //let userId = document.getElementById("userSelect").value;
        this.hidden = true;
        const index = this.emp.indexOf(this.props.employee);
        console.log(this.user_id);
        userService
            .getUser(this.user_id)
            .then(res => this.emp[index] = new UserEvent(parseInt(this.user_id), 0, this.position, res.user_name, res.email, 2))
            .catch((error: Error) => console.log(error.message))
    }

    /**
        sletter en ansatt som ble lagt til tidligere.
     */
    deleteEmployee(e: UserEvent) {
        del_employee.push(e);
        const index = this.emp.indexOf(e);
        if (index > -1) {
            this.emp[index] = null;
        }
    }
}

/**
     Viser frem informasjonen om de ansatte som er lagt til.
 */
export class EmployeesDetails extends Component {
    emp: UserEvent[] = [];
    hidden: bool = true;
    //users: User[] = [];

    /**
        funksjonen generer html for å vise frem komponenten
        @return html-element som inneholder komponenten.
     */
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Personell:</h3>
                </div>
                <div className="card-body">
                    {this.emp.map( e => {if (e) { return(
                        <div className="card-header">
                            <div className="row">
                                <div className="col"><label>Ansatt: {e.user_name}</label></div>
                                <div className="col"><label>Stilling: {e.job_position} </label></div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <Employees buttonName={"Rediger"} employee={e}/>
                                </div>
                            </div>
                        </div>
                    )}})}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewPosition()}>Legg til personell</button>
                </div>
            </div>
        )
    }

    /**
        Legger til en ny blank ansatt som kan redigeres senere
     */
    addNewPosition(){
        this.emp.push(new UserEvent(0, 0, "", "", "", 2));
        this.hidden = false;
    }
}

export { del_employee }