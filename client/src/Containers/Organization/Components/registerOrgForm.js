//@flow


import * as React from 'react';
import {Organization, organizationService} from '../../../services/OrganizationService';
import {User, userService} from "../../../services/UserService";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import{Component} from 'react-simplified';
import {Alert} from "../../../widgets";
import {Col} from "react-bootstrap";
import { createHashHistory } from 'history';
const history = createHashHistory();

let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


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
            <Form.Control type="text" placeholder="Skriv inn organisjonens mail "
                          onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            this.organization.email = event.target.value
                          }}/>
          </Form.Group>
          <Button variant="primary" style={{marginTop: 15 + 'px', marginBottom: 30 + 'px'}}
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
    if(this.organization.org_name.length != 0 && this.organization.email.length != 0 && this.organization.phone != 0 && emailRegEx.test(this.organization.email)) {
      this.hidden = false;
    }else{
      Alert.danger("Alle felt må fylles ut, og gyldig e-post addresse må skrives inn");
    }
    //Supposed to reveal a new component for registering an Admin-user
  }

  register(){
    // Register
    if(this.repeatedPassword != this.user.password || this.user.password.length<8){
      Alert.danger("Passord må være like og ha minst 8 tegn");
    }
    else if(!emailRegEx.test(this.user.email)){
      Alert.danger("Ikke gyldig E-mail addresse");
    }
    else if(this.user.email.length !=0 && this.user.address.length != 0 && this.user.user_name.length!=0
        &&this.user.phone.length != 0 && emailRegEx.test(this.user.email)){
      console.log(this.organization.org_name);
      /*
      organizationService.addOrganization(this.organization.org_name, this.organization.phone, this.organization.email)
          .then(response=>{
            userService.register(response[0].org_id, this.user.email, 1, this.user.user_name, this.user.password, this.user.address, this.user.phone, this.user.image);
          }).then(()=>Alert.success("Du og din organisasjon ble registret"))
          .then(()=>history.push("/Login"))
          .catch((error:Error)=>Alert.danger(error.message));
       */
      userService.verifiserAdminOgOrg(this.organization.org_name,
          this.organization.email,
          this.organization.phone,
          this.user.email,
          1,
          this.user.user_name,
          this.user.password, this.user.address, this.user.phone).then(res=>{
            Alert.success("En verifiserings-Email har blitt sendt til din personlige Email-bruker");
      }).catch((error:Error)=>{
        Alert.danger(error.message);
      })
    }else{
      Alert.danger("alle felt må fylles og passord må ha minst 8 bokstaver");
    }
  }
}
