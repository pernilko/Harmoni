//@flow


import * as React from 'react';
import {Organization} from '../../../services/OrganizationService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import{Component} from 'react-simplified';
import {AdminUsrForm} from  '../../Organization/Components/AdminUsr';


export class RegOrganization extends Component {
  organization: Organization = new Organization();
  hidden = true;

  render(){
    return <div>
        <h2 className="card-header">Registrer en ny organisasjon </h2>
        <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
          <Form.Group>
            <Form.Label>Organisasjons navn:</Form.Label>
            <Form.Control type="String" placeholder="Skriv inn organisasjonsnavn "/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tlf</Form.Label>
            <Form.Control type="number" placeholder="Skriv inn telefon nummer"/>
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="String" placeholder="Skriv inn organisjonens mail "/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{marginTop:15 + 'px', marginBottom:30 + 'px'}} onClick={this.next}>Neste</Button>
        </Form>

      <AdminUsrForm hidden={this.hidden}/>
    </div>
  }

  mounted(): unknown {
    return undefined;
  }

  next(){

    this.hidden = false;
    //Supposed to reveal a new component for registering an Admin-user
  }
}