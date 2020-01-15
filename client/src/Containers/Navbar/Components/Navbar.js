//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Button,Navbar,Nav, NavDropdown, Form, FormControl} from 'react-bootstrap';
import {User, userService} from '../../../services/UserService';
import { createHashHistory } from 'history';
import {Alert} from '../../../widgets'
import {sharedComponentData} from "react-simplified";


const history = createHashHistory();


export class Navigation extends Component {

  render() {
    //If there is a logged in user
    console.log(this.user);

    if (userService.currentUser) {
      return <div>
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Harmoni</Navbar.Brand>
          <Form inline  style={{paddingRight: 60 + 'px'}} >
            <FormControl type="search"
                         className="ml-sm-2 navbar-nav "
                         placeholder="Søk"
                         value={this.search}
                         onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                           (this.search = event.target.value)}/> <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Nav>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav.Link href="#/allEvents" > Alle arrangement</Nav.Link>
              <Nav.Link href="#/inviterBruker"> Inviter Bruker</Nav.Link>
              <Navbar.Text> Logget inn som:
                <a>
                  <NavDropdown title={userService.currentUser.user_name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#/myEvents"  style={{color: "black"}}>Mine arrangement</NavDropdown.Item>
                    <NavDropdown.Item href="#/event" style={{color: "black"}}>Opprett arrangement</NavDropdown.Item>
                    <NavDropdown.Item href="#/Profile" style={{color: "black"}}>Rediger profil</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <Button variant="danger" onClick={this.logout}>Logg ut</Button>
                  </NavDropdown>
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Nav>
        </Navbar>
      </div>
    } else {
      return <div>
        <Navbar sticky="top"
                bg="dark"
                variant="dark"
                expand="lg">
          <Navbar.Brand href="#home">Harmoni</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline
                  style={{paddingRight: 60 + 'px'}} >
              <FormControl type="text"
                         placeholder="Search"
                         className="ml-sm-2"
                         value={this.search}
                         onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                           (this.search = event.target.value)}/><Button variant="outline-success">Search</Button>
            </Form>
            <Nav className="mr-sm-2"
                 style={{paddingLeft: 700 + 'px'}}>
              <Navbar.Text>
                <Button
                  type="button"
                  variant="success"
                  onClick={this.login}
                  style={{float:"left"}}> Logg inn</Button>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    }
  }
  mounted (newUsr: User|any){

  }

  logout(){
    history.push("/");
    this.user = null;
    userService.currentUser = null;
    localStorage.setItem("token", "");
    Alert.danger("Du er nå logget ut.");

  }

  login(){
    history.push("/login");
  }

}
