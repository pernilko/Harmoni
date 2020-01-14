//@flow

import * as React from 'react';
import {Component} from 'react-simplified';
import { Nav, Image, Container, Spinner, TabContent, FormLabel, TabPane } from 'react-bootstrap';
import {User, userService} from '../../../services/UserService';
import { createHashHistory } from 'history';
import { Alert, Column, Row } from '../../../widgets';
import {sharedComponentData} from 'react-simplified';


export class Profile extends Component{

  active: boolean = true;
  
  render() {

    if (userService.currentUser) {


      return <div>
        <h2 className="card-header"> Hei {userService.currentUser.user_name} </h2>
        <Container style={{backgroundColor: "light"}}>
          <Row>
            <Column width={40}>
              <br/>
              <Image src="https://about.gitlab.com/images/new_logo/A.jpg"
                     roundedCircle width={280 + 'px'}
                     height={250 + 'px'}/>
              <br/>
              <br/>

              <Nav className="flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <Nav.Link  id="v-pills-changePB-tab"
                           data-toggle="pill"
                           href="#Profile/editPB"
                           role="tab"
                           aria-controls="v-pills-changePB" > Endre profil bilde</Nav.Link>
                <Nav.Link id="v-pills-changeInfo-tab"
                          data-toggle="pill" href="#Profile/editInfo"
                          role="tab"
                          aria-controls="v-pills-changeInfo"
                          aria-selected="false">Endre kontaktinfo</Nav.Link>
                <Nav.Link id="v-pills-changeUP-tab"
                          data-toggle="pill"
                          href="#Profile/editUP"
                          role="tab"
                          aria-controls="v-pills-changeUP"
                          aria-selected="false">Endre brukernavn og/eller passord</Nav.Link>
                <Nav.Link id="v-pills-deleteUser-tab"
                          data-toggle="pill"
                          href="#Profile/deleteUser"
                          role="tab"
                          aria-controls="v-pills-deleteUser"
                          aria-selected="false">Slett brukerkonto</Nav.Link>
              </Nav>
            </Column>
            <Column>
              <TabContent id="tabContent">
                <TabPane active={this.active} className="fade show" to="/Profile/v-pills-changePB" role="tabpanel" aria-labelledby="v-pills-changePB-tab">

                </TabPane>
                <TabPane className="fade" id="v-pills-changeInfo" role="tabpanel" aria-labelledby="v-pills-changeInfo-tab">

                </TabPane>
                <TabPane className="fade" id="v-pills-changeUP" role="tabpanel" aria-labelledby="v-pills-changeUP-tab">

                </TabPane>
                <TabPane className="fade" id="v-pills-deleteUser" role="tabpanel" aria-labelledby="v-pills-deleteUser-tab">

                </TabPane>
              </TabContent>
            </Column>
          </Row>
        </Container>
      </div>
    } else {
      return <Spinner animation="border"/>
    }
  }
  change(){
    if(this.active){
      this.active = true;
    }else {
      this.active = false;
    }
  }
}