import { User } from '../../../services/UserService';
import { Organization } from '../../../services/OrganizationService';
import "./login.css";
import {Component} from 'react-simplified';
import * as React from 'react';

export class NewLogin extends Component {
  organization: Organization = new Organization();
  user: User = new User();
  hidden: boolean = true;
  repeatedPassword: string = "";

  render() {
    return (
      <div className="body">
        <div className="mid">
          <div className="splits">
            <p>Ny organisasjon?</p>
            <button className="rgstr-btn"onClick={this.move}>Register</button>
          </div>
          <div className="splits">
            <p>Bruker allerede?</p>
            <button className="active" onClick={this.loginMove}>Login</button>
          </div>

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


          <div hidden={this.hidden} className="registerOrg">
            <form>
              <h3>Registrer admin bruker for </h3> <b>{this.organization.org_name}</b>
              <div>
                <input type="username" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  this.user.user_name = event.target.value
                }}/>
                <label>Brukernavn</label>
              </div>
              <div className="row">
                <div className="col">
                  <input type="password" placeholder="Skriv inn passord"
                         onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           this.user.password = event.target.value;
                         }}/>
                  <label>Passord</label>
                </div>
                <div className="col">
                  <input type="password" placeholder="Gjenta passord"
                         onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           this.repeatedPassword = event.target.value
                         }}/>
                  <label> </label>
                </div>
              </div>

              <div>
                <input type="String" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  this.user.address = event.target.value
                }}/>
                <label>Adresse</label>
              </div>
              <div>
                <input type="number" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  this.user.phone = event.target.value
                }}/>
                <label>Telefon nr</label>
              </div>
              <div>
                <input type="string" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                  this.user.email = event.target.value
                }}/>
                <label>E-mail</label>
              </div>

              <div>
                <input type="file"/>
                <label>Last opp bilde</label>
              </div>
              <button className="btn light" type="submit" style={{ marginTop: 20 + 'px' }}
                      onClick={this.register}> Registrer
              </button>
            </form>
          </div>
        </div>
      </div>

    )
  }

  loginMove(){

  }

  register(){

  }


}


