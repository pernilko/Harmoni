//@Flow
import * as React from 'react';
import { Component } from "react-simplified";
import {EventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";
import Popup from "reactjs-popup";
import { createHashHistory } from 'history';
import {organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";
import "./event.css";
const history = createHashHistory();

let eventService = new EventService();

/**
 * @requires react
 * @requires react-simplified
 * @requires history
 * @requires reactjs-popup
 * @requires react-router-dom
 * @extends Component
 * @constructor
 * @param {{number}} match.params.id - Dette skal være arrangement IDen som skal kanselleres
 */
export class CancelledEvent extends Component<{ match: { params: { id: number } } }>  {
  event_id = this.props.match.params.id;
  loaded: boolean = false;
  hidden: boolean = true;
  bugreport: string = "";

  /**
   * Denne konstruktøren lager en tilstand for arangement, slik at den oppdateres hver gang det kommer et nytt arrangement
   */
  constructor(props){
    super(props);
    this.loaded = false;
    this.state = {
      event: []
    };
    this.mounted = this.mounted.bind(this);
  }

  /**
   * Denne funksjonen vil lage en komponent for en popup som kommer når du skal kansellere et arangement
   * @returns {*} komponent som vises når man klikker på avlys arangement
   */
  render() {
    if(this.loaded){
      let e: Event = this.state["event"];
      return (
        <div id="whole-page" className="container-fluid">
          <div id="con" className="container">
            <div className={"w-50 mx-auto shadow-lg mt-4"}>
              <div id="eventPreview" className="card card-cascade wider reverse C">
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap"
                      rel="stylesheet"/>
                  <div className="view view-cascade overlay">
                    <div id="cardImg">
                      <img className="card-img-top shadow-lg"
                           src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                           alt="Card image cap"
                           style={{filter:"grayscale(90%"}}/>
                           <div className="text-block">
                             <p>Avlyst</p>
                           </div>
                    </div>
                    <br/>

                    <div id="eventBody" className="card-body card-body-cascade text-center">
                      <h1 className="card-title text">{e.event_name}</h1>
                      <h6 className="font-weight-bold indigo-text py-2">{e.place}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        <b></b> {e.event_start.slice(0, 10)}, {e.event_start.slice(11, 16)}-{e.event_end.slice(11, 16)}
                      </h6>
                      <p className="card-text">{e.description}</p>
                      <br/>
                      <br/>
                      <a href={"#/showEvent/" + this.event_id} className="card-link" onClick={this.show}> Rapporter problem
                        <div hidden={this.hidden}>
                          <textarea rows="4" cols="40"
                                    style={{margin: '10px'}}
                                    placeholder="Beskriv feilmelding"
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.bugreport = event.target.value)}/>
                          <br/>
                          <button className="btn btn-primary submit" style={{margin:10 +'px'}} onClick={this.sendReport}>Rapporter problem</button>
                        </div>
                      </a>
                      <br/>
                      <br/>
                      <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return <div/>
    }
  }

  /**
   * Dette er en funskjon som kjøres en gang før render kjøres
   */
  mounted() {
    eventService.getEventId(this.event_id).then(r => {
      let event = r;
      console.log(event);
      this.setState({event});
      this.loaded = true;
    })
  }

  /**
   * Dette er en funskjon som gjør komponenten synlig
   */
  show(){
    this.hidden = false;
  }


  /**
   * Denne metoden sender en bug rapport til administrator
   */
  sendReport(){
    organizationService.reportBug("pernilko@stud.ntnu.no", userService.currentUser.org_id, organizationService.currentOrganization.org_name, this.bugreport)
      .then((e) => {
        Alert.success("Bug report sendt!");
        this.hidden = true;
        this.email = "";
      })
      .catch((error: Error) => console.log(error.message))
  }
}
