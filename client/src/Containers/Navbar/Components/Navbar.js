//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Button, Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {userService} from '../../../services/UserService';
import "./Navbar.css";
import { createHashHistory } from 'history';
import {Alert} from '../../../widgets'
import {sharedComponentData} from "react-simplified";


const history = createHashHistory();

/**
 * React-komponent klasse som viser navigasjonsbaren for innloggede brukere.
 */
export class Navigation extends Component {


  render() {
    //If there is a logged in user
    console.log(this.user);

    if (userService.currentUser) {
      return <div>
        <Navbar className="NavbarColor alertNav" sticky="top" expand="lg">
          <Nav.Link id="home" onClick={this.change} className="brand" href="#home">
            <img alt=" "
                 src="https://storage.cloud.google.com/harmoni-files/Logo.jpg"
                 width={"30"}
                 height={"30"}
                 className="d-inline-block align-top"
                 /> {' '}
                 Harmoni
          </Nav.Link>
          <Nav className="mr-auto">
            <Form inline>
              <FormControl type="search" style={{paddingLeft: 10+'px'}}
                           className="ml-sm-2 navbar-nav "
                           placeholder="Søk"
                           value={this.search}
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                               (this.search = event.target.value)}/>
              <Button type = "submit" className="btn btn-secondary" onClick={this.find}>Søk</Button>
            </Form>
          </Nav>
          <Navbar.Toggle style={{borderColor: "white", background: "white"}}  aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse className="ml-auto" >
            <Nav className="ml-auto" >
                <Nav.Link href="#/alleEvents"> Alle arrangement</Nav.Link>
                <Nav.Link href="#/inviterBruker" hidden = {userService.currentUser.privileges !== 1} > Inviter Bruker</Nav.Link>
                <Nav.Link hidden = {userService.currentUser.p_create_event === 0 && userService.currentUser.privileges !== 1} href="#/event" >Opprett arrangement</Nav.Link>
                <NavDropdown title={"Logget inn som: " + userService.currentUser.user_name}
                             id="basic-nav-dropdown"
                             style={{color: '#FFF' }}>
                  <NavDropdown.Item href="#/mineEvents"  style={{color: "black"}}>Mine arrangement</NavDropdown.Item>
                  <NavDropdown.Item href="#/Profile" style={{color: "black"}}>Rediger profil</NavDropdown.Item>
                  <NavDropdown.Item href={"#/organizationProfile"}style={{color: "black"}}>Min organisasjon</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="#" onClick={this.logout} style={{color: "black", backgroundColor: 'white'}}>Logg ut</NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    } else {
      return (
          <div/>

      )
    }
  }

  /**
   * Metode som kalles når bruker trykker "søk" og sender dem til søkeresultat-siden med søket som er skrevet inn på et inputfelt i navigasjonsbaren.
   */
  find(){
    history.push("/search_result/" + this.search);
  }

  /**
   * Metode som kalles når bruker klikker "logg ut".
   * Metoden fjerner token for identifikasjon fra localstorage og setter innlogget-bruker variabelen til å være null, som påvirker hvordan alle komponenter oppfører seg.
   *
   */
  logout(){
    history.push("/login");
    this.user = null;
    userService.currentUser = null;
    localStorage.setItem("token", "");
    Alert.danger("Du er nå logget ut.");
  }
}
