//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import { Nav, Image, Tab, Col, Spinner, Button, Card } from 'react-bootstrap';
import { User, userService } from '../../../services/UserService';
import { createHashHistory } from 'history';
import {Row} from '../../../widgets';
import {sharedComponentData} from 'react-simplified';
import Form from 'react-bootstrap/Form';



export class Profile extends Component{
  user: User[] = [];
  hidden: boolean = true;

  render() {
    if (userService.currentUser) {

      return <div>
        <h2 className="card-header"> Hei {userService.currentUser.user_name} </h2>
        <Tab.Container id="left-tabs-" defaultActiveKey="first">
          <Row>
            <Col lg={3}>
              <Image src="https://purepng.com/public/uploads/large/purepng.com-mouth-smilemouth-smilefacial-expressionduchenne-smilesmileclipartlips-1421526971728gfkke.png"
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
                  <Card border="warning">
                    <Card.Body>
                      <h2>Account settings</h2>
                      <br/>
                      <h6>Email knyttet til bruker: </h6>
                      <p>{userService.currentUser.email}</p>
                      <Button variant="primary" type="button" onClick={this.change}>Endre</Button>

                      <div hidden={this.hidden}>
                        <br/>
                        <Form.Group>
                          <Form.Label> Fyll inn ny e-mail adresse</Form.Label>
                          <Form.Control style={{width: 600 + 'px'}}
                                        type="input"
                                        placeholder={userService.currentUser.email}
                                        onChange = {(event: SyntheticInputEvent <HTMLInputElement>) => {this.user.mail =
                                        event.target.value}}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop: 20 + 'px'}} onClick={this.ok}>Bekreft</Button>

                      </div>
                      <br/>
                      <br/>

                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div/>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div/>
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
  change() {
    console.log(this.user.email);
    if (this.user.email != 0) {
      this.hidden = false;
    }
  }

  ok(){
    //Change email
  }


  changePB(){
  }
}