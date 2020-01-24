import * as React from 'react';
import { Component } from "react-simplified";
import {eventService} from '../../../services/EventService';
import {Event} from "../../../services/EventService.js";
import { Alert, Card, NavBar, Button, Row, Column } from '../../../widgets.js';
import {NavLink} from "react-router-dom";
import MapContainer from "./map";
import {ticketService} from "../../../services/TicketService";
import {Artist, artistService} from "../../../services/ArtistService";
import "./event.css";

import Popup from "reactjs-popup";
import { createHashHistory } from 'history';
import {organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";
import {UserEvent, userEventService} from "../../../services/UserEventService";
import {Spinner} from "react-bootstrap";

const history = createHashHistory();

/**
 * Denne klassen skal lage en komponenet for å vide detaljene til en event.
 * Man skal og kunne redigere eller godta detaljer til et event dersom man har tilgang.
 *
 * @Constructor
 * @param {{number}} match.params.id - Denne klassen trenger IDen til arrangementet for å vise detaljene
 */
export class EventDetails extends Component<{ match: { params: { id: number } } }>  {
    event_id = this.props.match.params.id;
    loaded = [false, false, false, false, false];
    loadedtwo: boolean = false;
    hidden: boolean = true;
    cancel: boolean = true;
    bugreport: string = "";
    months: string[] = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

    /**
     * Konstruktøren setter arrangement, bruker, billett og artist tilstander
     */
    constructor(props){
        super(props);
        this.state = {
            event: [],
            users: [],
            tickets: [],
            artists: [],
            admins: []
        };
    }

    /**
     * Denne metoden skal generere en HTML komponent til å se arrangement detaljer
     * @returns {*} HTML komponent til å vise frem arrangement detaljene
     */
    render() {

        console.log("event from event.js");
        console.log(this.state["event"]);
        if(userService.currentUser && !this.loadedtwo){
            this.load();
            this.loadedtwo= true;
        }
        if (this.loaded.some(l => !l)) {
            return <Spinner animation="border"></Spinner>
        }
        else if (userService.currentUser && this.state["event"].org_id === userService.currentUser.org_id){
            let e: Event = this.state["event"];
            let u = userService.currentUser;
            if(e.completed !== -1) {
                return (
                  <div  id="whole-page" className="container-fluid">
                    <div id="con" className="container" >
                      <div className={"w-50 mx-auto shadow-lg mt-4"}>
                          <div id="eventPreview" className="card card-cascade wider reverse C">
                              <link rel="stylesheet"
                                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                              <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap"
                                    rel="stylesheet"/>
                              <div className="view view-cascade overlay">
                                  <div id="cardImg">
                                      <img className="card-img-top shadow-lg"
                                           src={e.image ? e.image : "https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"}
                                           alt="Card image cap">
                                      </img>
                                  </div>
                                  <a href="#!">
                                      <div className="mask rgba-white-slight"></div>
                                  </a>
                              </div>

                              <br/>
                              <Row>

                                  {e.accepted > 0 ?
                                      <div id="underPlanning" className="col-md-6">
                                          <div id="topBanner" className="artistBanner greenBG">
                                              Arrangementet er helt klart!
                                          </div>
                                      </div>
                                      :
                                      <Column>
                                          { /* if admin or user created the event */}
                                          {u.privileges > 0 || e.user_id === u.user_id ?
                                              <Row>
                                                  <div id="underPlanning" className="col-md-6">
                                                      <div id="topBanner" className={"artistBanner redBG"}>
                                                          Arrangementet er under planlegging
                                                      </div>
                                                  </div>
                                                  <div id="acceptEventButton" className="col-md-2">

                                                      <Popup contentStyle={{background: '#505050', width: 130 +'%', position: 'absolute', padding:0}} trigger={<a id="save"
                                                          hidden={userService.currentUser.user_id != e.user_id && userService.currentUser.privileges != 1}
                                                          className="btn btn-success">
                                                          <div
                                                              className="whiteTextOnAcceptButtonAtTopOfEventPageToAcceptEntireEventGivingAnAdditionalOptionToDeclineViaAPopoupWIndowThatJulieDesignedEarlierThisWeekIReallyMustSayThatThisCodeWasElegantlyWrittenAndOfGreatUseForThisParticularFeatureAsWellIHavetoStopWritingSoonAsTheClockHasPassed1600AndItIsTimeForMeToHeadHomeThankYouForReadingDontForgetToSmashTheSubscribeButton">Godkjenn
                                                          </div>
                                                      </a>}>
                                                          {close => (
                                                              <div className="popup-content">
                                                                  <Row>
                                                                      <p style={{padding: 5}}><b>Dette vil markere hele arrangementet som klart,
                                                                          det vil bety at riders, og kontrakter bør være
                                                                          ferdigstilt</b></p>
                                                                  </Row>
                                                                  <Row>
                                                                      <button type = "button" className="btn btn-warning float-left ml-3" style={{margin: 0, float: "left"}}
                                                                              onClick={() => {
                                                                                  close();
                                                                              }}>Avbryt
                                                                      </button>
                                                                      <button type = "button" className="btn btn-success float-right mr-3" style={{margin: 0, float: "left"}}
                                                                              onClick={() => this.setAcceptedEvent(e.event_id, 1)}>Fortsett
                                                                      </button>
                                                                  </Row>
                                                              </div>
                                                          )}
                                                      </Popup>
                                                  </div>
                                              </Row>
                                              :
                                              <Column width="12">
                                                  <div id="topBanner" className={"artistBanner w94 redBG"}>
                                                      Arrangementet er under planlegging
                                                  </div>
                                              </Column>}
                                      </Column>
                                  }


                              </Row>
                              <div id="eventBody" className="card-body card-body-cascade text-center">
                                  <h1 className="card-title text">{e.event_name}</h1>

                                  <h6 className="font-weight-bold indigo-text py-2">{e.place}</h6>
                                  <h6 className="card-subtitle mb-2 text-muted">
                                      <b> {this.setFormat(e.event_start, e.event_end)}</b>
                                  </h6>
                                  <p className="card-text">{e.description}</p>
                                  <br/>
                                  <br/>
                                  <p id="acceptwork">Stilling i vaktlisten kan aksepteres nedenfor.</p>
                                  <br/>
                                  <br/>
                                  <h2 className={"text"}>Artister</h2>
                                  <br/>

                                  <Row className={"artistContainer"}>
                                      {this.state["artists"].map((a, i) =>
                                          <Column  className="card" width={6}>
                                              <div id="artistBox" className="shadow-lg ">
                                              <div className="artistCard">
                                                  <div
                                                      className={"artistBanner" + (a.accepted === 1 ? " greenBG" : " redBG")}/>
                                                  <h5 className="card-title">{a.artist_name}</h5>
                                                  <p className="card-text">
                                                      Kontakt informasjon:
                                                      <h6> Epost: {a.email}</h6>
                                                      <h6> tlf: {a.phone} </h6>
                                                  </p><div style = {{text_align: "center"}}>
                                                  {a.riders && (userService.currentUser.p_read_riders > 0 || userService.currentUser.privileges >0)? <p><a href={a.riders} target = "blank">riders</a></p>:<div></div>}
                                                 {a.hospitality_riders && (userService.currentUser.p_read_riders > 0 || userService.currentUser.privileges >0)? <p><a href={a.hospitality_riders} target = "blank">hospitality riders</a></p>:<div></div>}
                                                 {a.artist_contract && (userService.currentUser.p_read_contract > 0 || userService.currentUser.privileges >0)? <p><a href={a.artist_contract} target = "blank">artistkontrakt</a></p>:<div></div>}
                                              </div>
                                                  <br/>

                                                  {u.privileges > 0 || u.p_read_contract ?
                                                      <div className={"buttonContainer"}>
                                                         <p className="card-text">Godkjenning av artist</p>
                                                          <button onClick={() => this.acceptArtist(a.artist_id, 0)}
                                                                  type="button"
                                                                  className="btn btn-info btn-circle">
                                                              <i className="fa fa-times"></i>
                                                          </button>

                                                          <button onClick={() => this.acceptArtist(a.artist_id, 1)}
                                                                  type="button"
                                                                  className="btn btn-info btn-circle">
                                                              <i className="fa fa-check"></i>
                                                          </button>
                                                      </div>
                                                      : <></>}
                                              </div>
                                              </div>
                                          </Column>
                                      )}
                                  </Row>

                                  <br/>
                                  <h2 className={"text"}>Billetter</h2>
                                  <br/>

                                  <Row id="ticketContainer" className={"ticketContainer"}>
                                      {this.state["tickets"].map(t =>
                                          <Column className="card" width={6}>
                                              <div className="card-body shadow-lg">
                                                  <h5 className="card-title">{t.ticket_type}</h5>
                                                  <p className="card-text">
                                                      <h6>{t.description}</h6>
                                                      <h6>Pris: {t.price==0?"Gratisbillett":t.price + " kr"}</h6>
                                                      <h6>Antall: {t.amount}</h6>
                                                  </p>
                                              </div>
                                          </Column>
                                      )}
                                  </Row>

                                  <br/>
                                  <h2 className={"text"}>Vakter</h2>
                                  <br/>
                                  <table className={"table shadow-lg text"}>
                                      <thead className="tableHead">
                                      <tr>
                                          <th scope="col" className={"nameCol"}>Navn</th>
                                          <th scope="col" className={"positionCol"}>Stilling</th>
                                          <th scope="col" className={"buttonCol"}></th>
                                      </tr>
                                      </thead>

                                      <tbody>
                                      {this.state["users"].map(row =>
                                          <tr id="rad" className={(row.accepted === 1 ? "greenBG" : "") + (row.accepted === 0 ? "redBG" : "")}>
                                              <td className={"borderControl"}>{row.user_name}</td>
                                              <td>{row.job_position}</td>
                                              {this.getUserEvent(row.user_id) ?
                                                  <div>
                                                    <td className={"noBorder"}>
                                                      <div className="buttonHorizontal"
                                                           onClick={() => this.setAccepted(userService.currentUser.user_id, e.event_id, 1)}>
                                                          <button id="top" type="button"
                                                                  className="btn btn-info btn-circle">
                                                              <i className="fa fa-check"></i>
                                                          </button>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div className="buttonHorizontal"
                                                           onClick={() => this.setAccepted(userService.currentUser.user_id, e.event_id, 0)}>
                                                          <button id="top" type="button"
                                                                  className="btn btn-info btn-circle">
                                                              <i className="fa fa-times"></i>
                                                          </button>
                                                      </div>
                                                  </td>
                                              </div> : <div/>}
                                          </tr>
                                      )}
                                      </tbody>
                                  </table>

                                  <div id="row-button" className="row">
                                      <div className="col-md-12">
                                      <a hidden={userService.currentUser.user_id != e.user_id && userService.currentUser.privileges != 1}
                                         href={"#/editEvent/" + this.event_id} className="card-link">Rediger</a>
                                         
                                          <div hidden={userService.currentUser.user_id != e.user_id && userService.currentUser.privileges != 1} className="row btn-group cancel-section">
                                              <Popup trigger={<a style={{cursor: "pointer"}} id="avlys"
                                                className="card-link" >Avlys</a>}>
                                                  {close => (
                                                      <div>
                                                        <Row>
                                                            <p><b>Vil du avlyse dette arrangementet?</b></p>
                                                        </Row>
                                                        <Row>
                                                            <button className="btn btn-warning float-left ml-3" style={{margin: 0, float: "left"}} onClick={() => {
                                                                close();
                                                            }}> Nei
                                                            </button>
                                                            <button className="btn btn-success float-right mr-3" style={{margin: 0, float: "left"}}
                                                                    onClick={() => this.cancelled(this.event_id)}>Ja
                                                            </button>
                                                        </Row>
                                                      </div>
                                                  )}
                                              </Popup>
                                             </div>

                                      </div>
                                  </div>

                                  <br/>
                                  <h2 className={"text"}>Kart</h2>
                                  <br/>
                                  <MapContainer lat={e.latitude} lng={e.longitude} show={true}/>
                                  <br/>
                                  <div style={{textAlign:'center', marginBottom: '20px'}}>
                                      <a href={"#/showEvent/" + this.event_id} className="button"
                                         onClick={this.show}> Rapporter problem
                                          <div hidden={this.hidden} style={{left:'-5%', marginTop: '20px'}}>
                                              <textarea rows="4" cols="40"
                                                        placeholder="Beskriv feilmelding"
                                                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.bugreport = event.target.value)}/>
                                              <br/>
                                              <button className="btn btn-primary submit" style={{margin: 10 + 'px'}}
                                                      onClick={this.sendReport}>Rapporter problem
                                              </button>
                                          </div>
                                      </a>
                                  </div>

                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                );
            }else{
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
                           src={e.image?e.image:"https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"}
                           alt="Card image cap"
                           style={{filter:"grayscale(90%"}}/>
                           <p className="text-block">Avlyst</p>

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
                      <a href={"#/showEvent/" + this.event_id} className="button" onClick={this.show}> Rapporter problem
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
            }
        }
        else {
            history.push("/home");
            return <div/>;
        }
    }

    /**
     * Dette er en metode som kjører en gang før render kjører.
     * Det er her man laster inn data som skal bli vist i nettsiden.
     */
    load() {
        if (userService.currentUser) {
            console.log("Event requested");
            eventService.getEventId(this.event_id).then(r => {
                console.log("Event received");
                let event = r;
                this.loaded[0] = true;
                this.setState({event});

            });

            console.log("tickets requested");
            ticketService.getEventTickets(this.event_id).then(r => {
                console.log("Tickets received");
                let tickets = r;
                this.loaded[1] = true;
                this.setState({tickets});

            });

            console.log("artists requested");
            artistService.getEventArtists(this.event_id).then(r => {
                console.log("artists received");
                let artists = r;
                this.loaded[2] = true;
                this.setState({artists});

            });
            console.log("Users requested");
            userEventService.getAllbyId(this.event_id).then( res => {
                console.log("users received");
                let users = res;
                this.loaded[3] = true;
                this.setState({users});

            });

            userService.getAdminByOrgId(userService.currentUser.org_id).then(res => {
                let admins = res;
                this.setState({admins});
                this.loaded[4] = true;
            })

        }
    }

    setFormat(start, end) {
        let date = "";

        let startTime = start.slice(11, 16);
        let endTime = end.slice(11, 16);
        let startDay = start.slice(8, 10);
        let endDay = end.slice(8, 10);
        let startMonth = start.slice(6, 8);
        let endMonth = start.slice(6, 8);
        let startYear = start.slice(0, 4);
        let endYear = end.slice(0, 4);

        if (startYear !== endYear) {
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)-1] + " " + startYear + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }
        else if (startMonth !== endMonth) {
            date = "kl. " + startTime + ", " + parseInt(startDay) + ". "+ this.months[parseInt(startMonth)-1] + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }
        else {
            date = "kl. " + startTime + " - " + endTime + ", " + endDay + ". "+ this.months[parseInt(endMonth)-1] + " " + endYear;
        }

        return date;
    }

    /**
     * Det er her logikken ligger for å håndtere å godta en bruker. Dette skal bare bli vist for brukere som har lov å godkjenne seg selv.
     * Til slutt setter den bruker staten, og oppdaterer siden
     * @param user_id - bruker IDen til brukeren som skal bli godkjent
     * @param event_id - Dette er arrangement IDen som brukeren kommer til å være med på
     * @param accepted - Dette er en booleansk variabel som sier om brukeren er godskjent eller ikke.
     * True= godskjent
     * False=Ikke godskjent
     */
    setAccepted(user_id: number, event_id: number, accepted: number) {
        userEventService.setAccepted(user_id, event_id, accepted);
        let users = this.state["users"];

        users = users.map(u => {
            if (u.user_id === user_id) {
                u.accepted = accepted;
            }
            return u;
        });
        this.setState({users});
    }

    /**
     * Dette er en metode for å godta at artisten skal komme.
     * Bare brukere som kan redigere arangementet vil kunne bruke denne funksjonen.
     * @param id - Dette er IDen til artisten som skal godskjennes
     * @param accepted - Dette er en booleansk variabel som sier oss om artisten er godskjent eller ikke.
     * True=godskjent
     * False=Ikke godskjent
     */
    acceptArtist(id: number, accepted: number){
        artistService.setAccepted(id, accepted);

        let artists: Artist[] = this.state["artists"];
        artists = artists.map(a => {
            if (a.artist_id === id) {
                a.accepted = accepted;
            }
            return a;
        });
        this.setState({artists});
    }

    /**
     * Denne metoden skal la oss hente alle artistene som er knyttet til en event. Disse brukerne er synelige for alle som kan se arrangementet.
     * @param BANG - Dette er arrangement IDen til arrangementene man skal hente alle relaterte brukere fra
     * @returns {undefined|*} - Metoden returnerer en liste over alle brukere knyttet til et arangement
     */
    getUserEvent(BANG: number){
        if (userService.currentUser){
            let u = this.state["users"];

            if (u.length > 0){
                return u.find(user => userService.currentUser.user_id === BANG);
            }
            return undefined;
        }
        return undefined;
    }

    /**
     * Denne metoden skal sende en bug rapport som brukeren har skrevet til administratoren.
     */
    sendReport(){
        if (this.bugreport !== "") {
        this.state["admins"].map(a => {
            organizationService.reportBug(a.email, userService.currentUser.org_id, organizationService.currentOrganization.org_name, this.bugreport)
            .then((e) => {
                Alert.success("Feilrapport sendt!");
                this.hidden = true;
                this.email = "";
            })
            .catch((error: Error) => console.log(error.message))
        })
        } else {
            Alert.danger("Vennligst beskriv problemet");
        }
    }

    /**
     * Denne metoden skal kansellere et arrangement, og vil da sende mail om kanselasjon til alle brukere involvert.
     * Bare brukeren som lager arrangementet og administrator kan starte denne metoden.
     * @param event_id - dette er arrangement IDen til arrangementet som skal kanselleres
     */
    cancelled(event_id: number) {
        eventService
            .cancelEvent(event_id)
            .then((response) => {
                this.sendCancellationMail();
                console.log(response);
                history.push("/showEvent/" + event_id);
                Alert.danger("Arrangementet ble avlyst");
                this.cancel = true;
                window.reload();
            })
            .catch((error: Error) => console.log(error.message));
    }

    /**
     * Denne metoden er en hjelpemetode som skal faktisk sende mail til alle brukere om kansellering av arrangement
     */
    sendCancellationMail(){

        this.state["users"].map(e => {
            if (e) {
                organizationService.sendCancellationMail(e.email, userService.currentUser.org_id, organizationService.currentOrganization.org_name, this.state["event"].event_name)
                    .then((e) => {
                        Alert.success("Ansatte har fått varsel om kanselering");
                        this.email = "";
                    }).catch((error: Error) => console.log(error.message))
            }
        })
    }

    /**
     * Dette er en metode man bruker for å vise frem HTML dokumentet
     */
    show(){
        this.hidden = false;
    }

    setAcceptedEvent(id, accepted){
        eventService.setAcceptedEvent(id, accepted);

        let event = this.state["event"];
        event.accepted = accepted;

        this.setState({event});
    }
}
// <MapContainer lat={this.state["event"].latitude} lng={this.state["event"].longitude}/>