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

export class Employees extends Component <{employee: UserEvent}> {
    users: User[] = [];
    emp: UserEvent[] = [];
    position: string = "";
    render(){
            return (
                <Accordion>
                    <Card style={{border: "none"}}>
                        <Card.Header style={{border: "none"}}>
                            <Accordion.Toggle as={Button} variant="success" eventKey="0" style={{float: "left"}}>
                                Rediger
                            </Accordion.Toggle>
                            <button type="button" className="btn btn-danger"
                                    style={{marginLeft: 10 + "px", float: "left"}}
                                    onClick={() => this.deleteEmployee(this.props.employee)}>Slett
                            </button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" style={{border: "none"}}>
                            <Card.Body>
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
                                                <label>Ansatt: </label>
                                                <select multiple className="form-control" id="userSelect">
                                                    {this.users.map(user => (
                                                        <option value={user.user_id}
                                                                selected={true}>{user.user_name}</option>
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

    mounted() {
        let s: any = EmployeesDetails.instance();
        this.emp = s.emp;
        userService
            .getUserByOrgId(userService.currentUser.org_id) //fiks dette slik at currentuser kan gi org_id
            .then(res => {
                this.users = res;
            })
            .catch((error: Error) => Alert.danger("Noe gikk galt ved lasting av ansatte"));

    }

    add(){
        let userId = document.getElementById("userSelect").value;
        console.log(userId);
        const index = this.emp.indexOf(this.props.employee);
        userService
            .getUser(userId)
            .then(res => {
                this.emp[index] = new UserEvent(userId, 0, this.position,  res.user_name);
            })
            .catch((error: Error) => Alert.danger("kan ikke oppdatere navn"));
    }

    deleteEmployee(e: UserEvent) {
        const index = this.emp.indexOf(e);
        if (index > -1) {
            this.emp.splice(index, 1);
        }
    }
}

export class EmployeesDetails extends Component {
    emp: UserEvent[] = [];
    render(){
        return(
            <div className="card">
                <div className="card-header">
                    <h3>Personell:</h3>
                </div>
                <div className="card-body">
                    {this.emp.map( e => (
                        <div className="card-header">
                            <div className="row">
                                <div className="col"><label>Ansatt: {e.user_name}</label></div>
                                <div className="col"><label>Stilling:{e.job_position} </label></div>
                            </div>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <Employees buttonName={"Rediger"} employee={e}/>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => this.addNewPosition()}>Legg til personell</button>
                </div>
            </div>
        )
    }
    addNewPosition(){
        this.emp.push(new UserEvent(0, 0, "", ""));
    }
}