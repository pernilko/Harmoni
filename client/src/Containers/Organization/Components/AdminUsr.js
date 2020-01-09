//@flow

import * as React from 'react';
import {User} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import { Button, Col } from 'react-bootstrap';
import {Component} from 'react-simplified';

export class AdminUsrForm extends Component <{hidden: boolean}>{
  admin: User = new User();

  render(){
    return (
      <div hidden={this.props.hidden}>
      <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
        <h2 className="card-header align-content-center">Registrer admin bruker</h2>
        <Form.Group>
          <Form.Label>Brukernavn</Form.Label>
          <Form.Control type="username" placeholder="Velg brukernavn"/>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Passord</Form.Label>
            <Form.Control type="password" placeholder="Skriv inn passord"/>

          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label> </Form.Label>
            <Form.Control type="password" placeholder="Gjenta passord" style={{marginTop: 8 + 'px'}}/>
          </Form.Group>
        </Form.Row>

        <Form.Group>
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="String"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefon nr</Form.Label>
          <Form.Control type="number" placeholder="Skriv inn telefon nummer"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="string" placeholder="Skriv inn organisjonens mail"/>
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
  register(){
    // Register
  }
}