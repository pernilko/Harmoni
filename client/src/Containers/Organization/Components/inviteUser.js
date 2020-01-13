//@flow

import * as React from 'react';
import {Organization, organizationService} from '../../../services/OrganizationService';
import {User, userService} from "../../../services/UserService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import{Component} from 'react-simplified';
import {AdminUsrForm} from  '../../Organization/Components/AdminUsr';
import {Alert} from "../../../widgets";
import {Col} from "react-bootstrap";
import {sharedComponentData} from "react-simplified";
import { createHashHistory } from 'history';
import {Spinner} from 'react-bootstrap';


const history = createHashHistory();

export class inviteUser extends Component {
    email: string = "";

    render() {
      if (userService.currentUser && organizationService.currentOrganization) {
        return <div>
        <h2 className="card-header">Inviter en bruker til din organisasjon </h2>
        <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
          <Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="string" value =  {this.email} placeholder="personligEmail@mail.com" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                this.email = event.target.value
              }}/>
            </Form.Group>
            </Form.Group>
          <Button variant="primary" type="submit" style={{marginTop: 15 + 'px', marginBottom: 30 + 'px'}}
                  onClick={this.send}>Neste</Button>
          </Form>
        </div>
      } else {
        return <Spinner animation="border"/>
      }
    }

    send() {
      if (this.email == "") {
        Alert.danger("Skriv inn emailen.")
      } else {
      organizationService
        .inviteUser(this.email, userService.currentUser.org_id, organizationService.currentOrganization.org_name)
        .then((e) => {
          Alert.success("Email sendt!");
          this.email = "";
          })
        .catch((error: Error) => console.log(error.message))
      }
      this.email = "";
    }
}
