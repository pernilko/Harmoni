import React, { Component } from 'react';
import { render } from "react-dom";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {EventList} from './showEvents';

import Tabs from './Tabs';
require('./showTab.css');

export class ShowTab extends Component<{all: boolean}>{

  render (){
    if (this.props.all){
      return (
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                  <div>
                    <h1>Alle Arrangement</h1>
                    <Tabs>
                      <div label="Tidligere">
                          <EventList user={false} prev={true}/>
                      </div>
                      <div label="Kommende">
                          <EventList user={false} prev={false}/>
                      </div>
                    </Tabs>
                  </div>
                </Col>
            </Row>
        </Container>
      );
    } else {
      return (
        <Container fluid={true}>
            <Row>
                <Col md={12}>
                  <div>
                    <h1>Mine Arrangement</h1>
                    <Tabs>
                      <div label="Tidligere">
                          <EventList user={true} prev={true}/>
                      </div>
                      <div label="Kommende">
                          <EventList user={true} prev={false}/>
                      </div>
                    </Tabs>
                  </div>
                </Col>
            </Row>
        </Container>
      );
    }
  }
}
