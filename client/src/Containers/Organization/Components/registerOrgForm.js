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
    return(
      <div className="wrapper">
        <form>
          <h3> Registrer ny organisasjon</h3>
          <div>
            <input type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.org_name = event.target.value
            }}/>
            <label>Organisasjons navn:</label>
          </div>
          <div>
            <input type="number" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.phone = event.target.value
            }}/>
            <label>Tlf</label>
          </div>
          <div>
            <input type="E-mail" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.email = event.target.value
            }}/>
            <label>Email</label>
          </div>
          <div>
            <button className="btn dark" type="button" onClick={this.next}>Neste</button>
          </div>
        </form>
      </div>
    )}

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
