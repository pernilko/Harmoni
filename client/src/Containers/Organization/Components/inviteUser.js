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


const history = createHashHistory();

export class inviteUser extends Component {
    email: string = "";

    render() {
        return <div>
        <h2 className="card-header">Inviter en bruker til din organisasjon </h2>
        <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
          <Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="string" placeholder="personligEmail@mail.com" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                this.email = event.target.value
              }}/>
            </Form.Group>
            </Form.Group>
          <Button variant="primary" type="submit" style={{marginTop: 15 + 'px', marginBottom: 30 + 'px'}}
                  onClick={this.send}>Neste</Button>
          </Form>
        </div>
    }

    send() {
      organizationService
        .inviteUser(this.email, userService.currentUser.org_id)
        .then(history.push("/"))
        .catch((error: Error) => console.log(error.message))
    }
}
