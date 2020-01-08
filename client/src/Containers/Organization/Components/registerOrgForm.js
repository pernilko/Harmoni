//@flow


import * as React from 'react';
import {Organization} from '../../../services/OrganizationService';


export class RegOrganization extends Component {
  organization: Organization = new Organization();

  render(){
    return (
      <div>
        <h2 className="card-header">Register a new organization</h2>
        <Form>
          <Form.Group>
            <Form.Label>Organization name:</Form.Label>
            <Form.Control type="String" placeholder="Enter organization name"/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="number" placeholder="Enter phone number"/>
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="String" placeholder="Enter organization mail"/>
          </Form.Group>
          <Button variant="primary" type="submit">Register</Button>
        </Form>
      </div>

    )
  }
}