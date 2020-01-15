//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import { Nav, Image, Tab, Col, Spinner, Button, Card } from 'react-bootstrap';
import { User, userService } from '../../../services/UserService';
import { createHashHistory } from 'history';
import {Row, Alert} from '../../../widgets';
import {sharedComponentData} from 'react-simplified';
import Form from 'react-bootstrap/Form';

const history = createHashHistory();



export class Profile extends Component{
  user: User = new User();
  hidden: boolean = true;
  repeatedPassword: string = "";

  render() {
    if (userService.currentUser) {

      return <div>
        <h2 className="card-header"> Hei, {userService.currentUser.user_name}!</h2>
        <Tab.Container id="left-tabs-" defaultActiveKey="first">
          <Row>
            <Col lg={3}>
              <Image src="https://i.ytimg.com/vi/_c1NJQ0UP_Q/maxresdefault.jpg"
                     roundedCircle width={280 + 'px'}
                     height={250 + 'px'}/>
              <br/>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Bruker informasjon</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Endre brukernavn og/eller passord</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Slett brukerkonto</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Card>
                    <Card.Body>
                      <h2>Profil instillinger</h2>
                      <br/>
                      <h6>Email knyttet til bruker: </h6>
                      <p style={{color:'grey'}}>{userService.currentUser.email}</p>
                      <Button variant="primary" onClick={this.click}>Endre</Button>
                      <div hidden={this.hidden}>
                        <br/>
                        <Form.Group>
                          <Form.Label> Fyll inn ny e-mail adresse</Form.Label>
                          <Form.Control style={{width: 600 + 'px'}}
                                        type="input"
                                        placeholder={userService.currentUser.email}
                                        onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {this.user.email =
                                        event.target.value}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop: 20 + 'px'}} onClick={this.change}>Bekreft</Button>
                        <br/>
                        <br/>
                      </div>
                      <br/>
                      <br/>
                      <h3>Endre profilbilde</h3>
                      <Form.Group>
                          <Form.Label>Last opp bilde</Form.Label>
                          <Form.Control type="file" onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {this.user.image =
                            event.target.value}}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{marginTop: 20 + 'px'}} onClick={this.changePB}>Endre</Button>
                      <br/>
                      <br/>
                      <h3>Kontakt informasjon</h3>
                      <Form.Group>
                        <Form.Label>Endre adresse</Form.Label>
                        <Form.Control type="String" placeholder="Skriv inn adresse" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          this.user.address = event.target.value
                        }}/>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Endre telefon</Form.Label>
                        <Form.Control type="number" placeholder="Skriv inn telefon nummer" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                          this.user.phone = event.target.value
                        }}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" style={{marginTop: 20 + 'px'}} onClick={this.changeInfo}>Endre</Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                 <Card>
                   <Card.Body>
                     <h2>Endre brukernavn og/eller passord</h2>
                     <Form.Group>
                       <Form.Label>Endre brukernavn</Form.Label>
                       <Form.Control type="username" placeholder="Velg nytt brukernavn" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                         this.user.user_name = event.target.value
                       }}/>
                     </Form.Group>
                     <Form.Row>
                       <Form.Group as={Col}>
                         <Form.Label>Endre passord</Form.Label>
                         <Form.Control type="password" placeholder="Skriv inn nytt passord"onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           this.user.password = event.target.value;
                         }}/>

                       </Form.Group>
                       <Form.Group as={Col}>
                         <Form.Label>Bekreft passord</Form.Label>
                         <Form.Control type="password" placeholder="Gjenta passord"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           this.repeatedPassword = event.target.value
                         }}/>
                       </Form.Group>
                     </Form.Row>
                     <Button type="submit" variant="primary" onClick = {this.changeUP}>Endre</Button>
                   </Card.Body>
                 </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                 <Card>
                   <Card.Body>
                     <h2>Slett brukeren din</h2>
                     <Button type="submit" variant="danger" onClick = {this.delete}>Slett bruker</Button>
                     <Button type="submit" variant="secondary" onClick = {this.cancel}>Angre</Button>

                   </Card.Body>
                 </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    } else {
      return <Spinner animation="border"/>
    }
  }

  click() {
    this.hidden = false;
  }

  change(){
    //Change email
    if(this.user.email.length !==0){
      userService
        .updateEmail(userService.currentUser.user_id, this.user.email)
        .then(() => {
          if(userService.currentUser){
            Alert.success("Mail er oppdatert");
            userService.autoLogin();
            history.push("/Profile");
          }
        })
    }
  }
  // Change profile picture
  changePB(){
    if(this.user.image.length !==0){
      userService
        .updateImage(userService.currentUser.user_id, this.user.image)
        .then(() => {
          if(userService.currentUser){
            Alert.success("Profil bildet er oppdatert");
            userService.autoLogin();
            history.push("/Profile");
          }
        })
    }
  }
  // Change info
  changeInfo(){
    if(this.user.address.length !==0 || this.user.phone.length !==0){
      userService
        .updateInfo(userService.currentUser.user_id, this.user.address, this.user.phone)
        .then(() => {
          if(userService.currentUser){
            Alert.success("Kontaktinfo er oppdatert ");
            userService.autoLogin();
            history.push("/Profile");
          }
        })
    }
  }
  // Change username and password
  changeUP() {
    if (this.repeatedPassword != this.user.password && this.user.password.length >= 8) {
      Alert.danger("Passord må være like og ha minst 8 tegn");
    } else if (this.user.user_name.length !== 0) {
      userService
        .updateUsernamePassword(userService.currentUser.user_id, this.user.user_name, this.user.password)
        .then(() => {
          if (userService.currentUser) {
            Alert.success("Brukernavn/passord er oppdatert");
            userService.autoLogin();
            history.push("/Profile");
          }
        })
    }
  }

  //delete user
  delete(){
    console.log(userService.currentUser.user_id);
    userService
      .deleteUser(userService.currentUser.user_id)
      .then(() => {
        localStorage.setItem("token", "");
        if(userService.currentUser){
          userService.currentUser = null;
          Alert.success("Sletting gikk fint");
          history.push("/login");
        }
      })
  }

  // Cancel user deletion
  cancel(){
    Alert.info("Bruker ble ikke slettet");
    history.push("/allEvents");

  }
}