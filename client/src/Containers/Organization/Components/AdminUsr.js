//@flow

import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import { Button, Col } from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert} from "../../../widgets";
import { createHashHistory } from 'history';
const history = createHashHistory();

/**
 * Klasse for å opprette en admin-bruker.
 */
export class AdminUsrForm extends Component <{hidden: boolean, organization: Organization}>{
  admin: User = new User();
  organization: Organization = this.props.organization;
  repeatedPassword: string = "";

  /**
   * Funksjon som oppretter et HTML-komponent for å kunne opprette en admin-bruker.
   * @returns {*} Funksjonen returner et komponent for opprettelse av admin-bruker.
   */
  render(){
    return (
      <div hidden={this.props.hidden}>
      <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
        <h2 className="card-header align-content-center">{"Registrer admin bruker for "+this.organization.org_name}</h2>
        <Form.Group>
          <Form.Label>Brukernavn</Form.Label>
          <Form.Control type="username" placeholder="Velg brukernavn" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.admin.user_name = event.target.value
          }}/>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Passord</Form.Label>
            <Form.Control type="password" placeholder="Skriv inn passord"onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.admin.password = event.target.value;
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
            this.admin.address = event.target.value
          }}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefon nr</Form.Label>
          <Form.Control type="number" placeholder="Skriv inn telefon nummer" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.admin.phone = event.target.value
          }}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="string" placeholder="personligEmail@mail.com" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
            this.admin.email = event.target.value
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

  /**
   * Funksjon som sjekker om bruker har gyldig token.
   * @returns {undefined} Returner undefined.
   */
  mounted() {
      if(!localStorage.getItem("token")){
        Alert.danger("Innlogging kreves");
        history.push("/login");
      }
    return undefined;
  }

  /**
   * Funksjon som oppretter admin-bruker og laster det opp til database.
   */
  register(){
    // Register
    if(this.repeatedPassword != this.admin.password && this.admin.password.length>=8){
      Alert.danger("Passord må være like og ha minst 8 tegn");
    }
    else if(this.admin.email.length !=0 && this.admin.address.length != 0 && this.admin.user_name.length!=0
    &&this.admin.phone.length != 0){
      console.log(this.props.organization.org_name);
      organizationService.addOrganization(this.props.organization.org_name, this.props.organization.phone, this.props.organization.email)
          .then(response=>{
            console.log(response.data.org_id);
          }).then(()=>Alert.success("Du og din organisasjon ble registret"))
          .catch((error:Error)=>Alert.danger(error.message));


      /*userService.register(1, this.admin.email, 1, this.admin.user_name, this.admin.password, this.admin.address, this.admin.phone, this.admin.image)
          .then(()=>Alert.success("Du og din organisasjon ble registret"))
          .catch((error:Error)=>Alert.danger(error.message))
       */
    }else{
      Alert.danger("alle felt må fylles og passord må ha minst 8 bokstaver");
    }
  }
}