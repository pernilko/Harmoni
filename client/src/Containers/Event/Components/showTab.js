import React, { Component } from 'react';
import { render } from "react-dom";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {EventList} from './showEvents';

import Tabs from './Tabs';
import Pagination from "react-bootstrap/Pagination";
require('./showTab.css');

export class ShowTab extends Component<{all: boolean}>{

  render (){
      let active = 1;
      let items = [];
      for (let number = 1; number <= 5; number++) {
          items.push(
              <Pagination.Item key={number} active={number === active}>
                  {number}
              </Pagination.Item>,
          );
      }

      const paginationBasic = (
          <div>
              <Pagination>{items}</Pagination>
          </div>
      );

    if (this.props.all){
      return (
        <Container fluid id="tabsAllEvents">
          <div className="row">
              <div className="col-md-12">
                <div>
                  <h1>Organisasjonens arrangement</h1>
                  <Tabs>
                    <div label="Avlyste">
                        <EventList user={false} time={3}/>
                    </div>
                    <div label="Tidligere">
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
            <Pagination>{items}</Pagination>
        </Container>
      );
    } else {
      return (
        <div id="tabsAllEvents" className="container">
          <div className="row">
              <div className="col-md-12">
                <div>
                  <h1>Mine Arrangement</h1>
                  <Tabs>
                    <div label="Avlyste">
                        <EventList user={true} time={3}/>
                    </div>
                    <div label="Tidligere">
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
            <div>

            </div>
        </div>
      );
    }
  }
}
