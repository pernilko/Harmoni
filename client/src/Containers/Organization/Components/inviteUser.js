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
    emailAlreadyUsed = false;
    usersToCheck: User[] = [];

    render() {
      if (userService.currentUser && organizationService.currentOrganization) {
          if(userService.currentUser.privileges == 1) {
              return <div>
                  <h2 className="card-header">Inviter en bruker til din organisasjon </h2>
                  <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
                      <Form.Group>
                          <Form.Group>
                              <Form.Label>E-mail</Form.Label>
                              <Form.Control type="string" value={this.email} placeholder="personligEmail@mail.com"
                                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                                this.email = event.target.value
                                            }}/>
                          </Form.Group>
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{marginTop: 15 + 'px', marginBottom: 30 + 'px'}}
                              onClick={this.send}>Neste</Button>
                  </Form>
              </div>
          } else{
              Alert.danger("Ikke autorisert");
              return <div>

              </div>
          }
      } else {
        return <Spinner animation="border"/>
      }
    }
    mounted(){
        if(!localStorage.getItem("token")){
            Alert.danger("Innlogging kreves");
            history.push("/login");
        }
    }

    send() {
      if (this.email == "") {
        Alert.danger("Skriv inn emailen.")
      } else {
          let tempEmail = this.email;
          userService.getUserByOrgId(userService.currentUser.org_id).then(response=> {
              response.some(e => tempEmail == e.email)?Alert.danger("finnes allerede"): organizationService
                  .inviteUser(tempEmail, userService.currentUser.org_id, organizationService.currentOrganization.org_name)
                  .then((e) => {
                      Alert.success("Email sendt!");
                      this.email = "";
                  })
                  .catch((error: Error) => Alert.danger(error.message));
          })
      this.email = "";
      }
    }
}
