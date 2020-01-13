import * as React from 'react';
import Form from "react-bootstrap/Form";
import {Button, Col} from "react-bootstrap";
import {Component} from 'react-simplified';
import {User} from "../../../services/UserService";

export class userForm extends Component {
    user: User = new User();
    repeatedPassword: string = "";
    render(){
        return (
            <div hidden={this.props.hidden}>
                <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
                    <h2 className="card-header align-content-center">{"Registrer ny bruker"}</h2>
                    <Form.Group>
                        <Form.Label>Brukernavn</Form.Label>
                        <Form.Control type="username" placeholder="Velg brukernavn" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.user.user_name = event.target.value
                        }}/>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Passord</Form.Label>
                            <Form.Control type="password" placeholder="Skriv inn passord"onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.user.password = event.target.value;
                            }}/>

                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label> </Form.Label>
                            <Form.Control type="password" placeholder="Gjenta passord" style={{marginTop: 8 + 'px'}} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                this.repeatedPassword = event.target.value
                            }}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group>
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.user.address = event.target.value
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefon nr</Form.Label>
                        <Form.Control type="number" placeholder="Skriv inn telefon nummer" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.user.phone = event.target.value
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="string" placeholder="personligEmail@mail.com" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.user.email = event.target.value
                        }}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last opp bilde</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{marginTop: 20 + 'px'}} onClick={this.register}> Registrer</Button>
                </Form>
            </div>
        )
    }
}