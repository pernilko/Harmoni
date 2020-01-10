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


export class RegOrganization extends Component {
  organization: Organization = new Organization();
  user: User = new User();
  hidden: boolean = true;
  repeatedPassword: string = "";

  render(){
      return <div>
        <h2 className="card-header">Registrer en ny organisasjon </h2>
        <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
          <Form.Group>
            <Form.Label>Organisasjons navn:</Form.Label>
            <Form.Control type="String" placeholder="Skriv inn organisasjonsnavn "
                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.organization.org_name = event.target.value
                          }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tlf</Form.Label>
            <Form.Control type="number" placeholder="Skriv inn telefon nummer"
                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.organization.phone = event.target.value
                          }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Skriv inn organisjonens mail "
                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.organization.email = event.target.value
                          }}/>
          </Form.Group>
          <Button variant="primary" type="submit" style={{marginTop: 15 + 'px', marginBottom: 30 + 'px'}}
                  onClick={this.next}>Neste</Button>

        </Form>
        <div hidden={this.hidden}>
          <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
            <h2 className="card-header align-content-center">{"Registrer admin bruker for "+this.organization.org_name}</h2>
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
      </div>
  }

  mounted(): unknown {
    return undefined;
  }

  next(){
    console.log(this.organization.org_name);
    console.log(this.organization.phone);
    console.log(this.organization.email);
    if(this.organization.org_name.length != 0 && this.organization.email.length != 0 && this.organization.phone != 0) {
      this.hidden = false;
    }else{
      Alert.danger("Alle felt må fylles ut");
    }
    //Supposed to reveal a new component for registering an Admin-user
  }

  register(){
    // Register
    /*if(this.repeatedPassword != this.user.password && this.user.password.length>=8){
      Alert.danger("Passord må være like og ha minst 8 tegn");
    }
    else*/ if(this.user.email.length !=0 && this.user.address.length != 0 && this.user.user_name.length!=0
        &&this.user.phone.length != 0){
      console.log(this.organization.org_name);
      organizationService.addOrganization(this.organization.org_name, this.organization.phone, this.organization.email)
          .then(response=>{
            userService.register(response[0].org_id,this.user.email, this.user.privileges, this.user.user_name, this.user.password, this.user.address, this.user.phone, this.user.image);
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