//@flow


import * as React from 'react';
import {Organization, organizationService} from '../../../services/OrganizationService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import{Component} from 'react-simplified';
import {AdminUsrForm} from  '../../Organization/Components/AdminUsr';
import {Alert} from "../../../widgets";


export class RegOrganization extends Component {
  organization: Organization = new Organization();
  hidden = true;

  render(){
    this.organization.org_name = "";
    this.organization.email = "";
    this.organization.phone = "";
    return <div>
        <h2 className="card-header">Registrer en ny organisasjon </h2>
        <Form style={{marginTop: 20 + 'px', paddingLeft: 200 + 'px', paddingRight: 200 + 'px'}}>
          <Form.Group>
            <Form.Label>Organisasjons navn:</Form.Label>
            <Form.Control type="String" placeholder="Skriv inn organisasjonsnavn "onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.org_name = event.target.value
            }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Tlf</Form.Label>
            <Form.Control type="number" placeholder="Skriv inn telefon nummer" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.phone= event.target.value
            }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="String" placeholder="Skriv inn organisjonens mail " onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
              this.organization.email = event.target.value
            }}/>
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
    console.log(this.organization.org_name);
    console.log(this.organization.phone);
    console.log(this.organization.email);
    if(this.organization.org_name.length != 0 && this.organization.email.length != 0 && this.organization.phone != 0) {
      this.hidden = false;
      organizationService.addOrganization(this.organization.org_name, this.organization.phone, this.organization.email).catch((error: Error)=>Alert.danger("serverfeil"));
    }else{
      Alert.danger("Alle felt må fylles ut");
    }
    //Supposed to reveal a new component for registering an Admin-user
  }
}