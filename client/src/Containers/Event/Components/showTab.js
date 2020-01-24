import React, { Component, useState, useEffect } from 'react';
import { render } from "react-dom";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {EventList} from './showEvents';

import Tabs from './Tabs';
import Pagination from "react-bootstrap/Pagination";
require('./showTab.css');

/**
  ShowTab er en komponent som avgjør hvilke eventList som skal vises, dvs her velger man pending hvis man vil se eventList med eventene som er pendign.
 */
export class ShowTab extends Component<{all: boolean}>{

  render (){

    if (this.props.all){
      return (
        <Container fluid id="tabsAllEvents">
          <div className="row">
              <div className="col-md-12" style={{margin: 0}}>
                <div id="st" className="card-body">
                  <h1 id="tabs-header">Arrangement for hele organisasjonen</h1>
                  <Tabs>
                   <div label="Avlyst">
                       <EventList user={false} time={3}/>
                    </div>
                    <div label="Arkivert">
                        <EventList user={false} time={0}/>
                    </div>
                    <div label="Pågående">
                        <EventList user={false} time={1}/>
                    </div>
                    <div label="Kommende">
                        <EventList user={false} time={2}/>
                    </div>
                  </Tabs>
                </div>
              </div>
          </div>
        </Container>
      );
    } else {
      return (
        <div id="tabsAllEvents" className="container">
          <div className="row">
              <div className="col-md-12">
                <div>
                  <h1 id="tabs-header">Mine Arrangement</h1>
                  <Tabs>
                    <div label="Avlyst">
                        <EventList user={true} time={3}/>
                    </div>
                    <div label="Arkiv">
                        <EventList user={true} time={0}/>
                    </div>
                    <div label="Pågående">
                        <EventList user={false} time={1}/>
                    </div>
                    <div label="Kommende">
                        <EventList user={true} time={2}/>
                    </div>
                  </Tabs>
                </div>
              </div>
          </div>
        </div>
      );
    }
  }
}
