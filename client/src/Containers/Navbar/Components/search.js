import * as React from 'react';
import {Component} from "react-simplified";
import {eventService} from "../../../services/EventService";
import {Container, Image, ListGroup, ListGroupItem, Nav, Spinner, Row} from "react-bootstrap";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import Col from "react-bootstrap/Col";
import {UserEvent, userEventService} from "../../../services/UserEventService";

/**
 * React-komponent som viser søkeresultater via en søkestren som er skrevet inn i navigasjonsbaren.
 */
export class SearchResults extends Component <{match: {params: {search: string}}}> {
    events: Event[] | any = [];
    temp: Event[] = [];
    users: UserEvent[] = [];

    org_id: number = 0;

    today: Date = new Date();
    hidden: boolean = true;
    event_start: string = "";
    event_end: string = "";

    loaded: boolean = false;
    ready: boolean = false;

    months: string[] = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

    render() {
        if (userService.currentUser) {
             if (!this.loaded) {
                this.load();
                console.log("Events: " + this.events);
                this.loaded = true;
            }
            if (this.ready) {
                return (
                    <div className="searchResults">
                        <Container style={{padding: 0}}>
                            <div className="card-header" style={{marginTop:'5%'}}>
                                <h4> Søkeresultater for: {this.props.match.params.search}</h4>
                            </div>
                            <div className="card-header">
                              <a style={{margin:'10px', color:'white'}} href={"#/search_result/" + this.props.match.params.search}
                                 onClick={this.all}>Hele resultatet</a>
                                <a style={{margin:'10px', color:'white'}} href={"#/search_result/" + this.props.match.params.search}
                                   onClick={this.upcoming}>Kommende </a>
                                <a style={{margin:'10px', color:'white'}} href={"#/search_result/" + this.props.match.params.search}
                                   onClick={this.finished}>Utløpte </a>
                                <a style={{margin:'10px', color:'white'}} href={"#/search_result/" + this.props.match.params.search} onClick={this.show}> Dato
                                    <div hidden={this.hidden}>
                                        <div className="form-inline" style={{position: 'initial', marginLeft:'20%', marginTop:'10px'}}>
                                            <label>Søk fra dato: </label>
                                            <input className="form-control" type="date" value={this.event_start}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_start = event.target.value)}/>
<br/>
                                            <label> til dato: </label>
                                            <input className="form-control" type="date" value={this.event_end}
                                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_end = event.target.value)}/>

                                            <button className="btn btn-primary submit" style={{margin: 10 + 'px'}}
                                                    onClick={this.date}>Søk
                                            </button>
                                        </div>
                                    </div>
                                </a>
                            </div>
            <div className={"w-100 mx-auto "}>

                        {this.temp.map((e, i) =>
                            <Container>
                                <div id="eventcard" style={{ marginBottom: "2%", borderRadius: 6+"px", border: "none"}}>
                                    <Row style={{margin: 0}}>
                                        <Col sm={4} style={{padding: 0}}>
                                          <a href={'#/showEvent/' + e.event_id}>
                                            <img id="image"
                                                 src={e.image ? e.image : "https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"}/>
                                          </a>
                                        </Col>
                                      <Col sm={8} style={{padding: 0}} className="card-body">
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>


                                            <div style={{padding:0, background: 'none'}}>
                                                    <div className="card-text" style={{float: "left", textAlign: "left", color: '#281121', height: 'inherit'}}>
                                                        <h2 style={{textAlign: "left", paddingLeft: 20}}> {e.event_name} </h2>
                                                        <p><b> Sted: </b> {e.place} </p>
                                                        <p><b> Stilling: </b>{this.getUserEvent(e.event_id) ? "Du er satt opp som " + this.getUserEvent(e.event_id).job_position + ".\n Bekreft valget ditt med knappene på venstre side." : "Du er ikke satt på dette arrangementet"}.</p>
                                                        <p><b> Tidspunkt: {this.setFormat(e.event_start, e.event_end)}</b></p>
                                                    </div>

                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        )}
                    </div>
                    </Container>
                    </div>
                )
            } else {
                return (
                    <Spinner animation={"border"}/>
                )
            }
        } else {
            return (
                <Spinner animation={"border"}/>
            )
        }
    }

    /**
     * Metoden kalles før komponenten lastes inn og setter innlastet-variabel til å være usann.
     */
    mounted() {
        console.log("HEI");
        this.loaded = false;
        //this.load();
    }

    /**
     * Metode som kalles så snart innlogget brukers informasjon er lastet inn, slik at komponenten kan vises riktig.
     * Metoden laster inn det som informasjon om events som stemmer overens med søkestrengen tilhørende komponenten.
     * når all informasjon er mottatt fra server vil komponentens objektvariabler bli forandret og gjøres klar til rendering.
     */
    load() {
    this.org_id = userService.currentUser.org_id;
    console.log("ORG_ID: ", this.org_id);
    eventService.getEventbySearch(this.props.match.params.search, this.org_id)
            .then(event => {
                this.events = event;
                this.temp = event;
                this.ready = true;
            })
            .catch((error: Error) => console.log(error.message))
    }

    /**
     * Metoden kalles når bruker klikker "Dato" og setter en boolean til false som bestemmer om datofiltrering for arrangement skal vises eller ikke.
     */
    show(){
        this.hidden = false;
    }

    /**
     * Metode som kalles når bruker trykker på "Hele resultatet" og setter variabler slik at datofiltrering ikke vises og alle arrangement vises istedenfor filtrerte.
     */
    all(){
      this.hidden = true;
      this.temp = this.events;

    }

    /**
     * Metode som kalles når bruker trykker på "Kommende" og fjerner visning av
     * datofiltrering og filtrerer alle viste arrangementer til å vise kun de som ikke har skjedd enda.
     */
    upcoming(){
        this.hidden = true;
        this.temp = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date > 0);
    }

    /**
     * Metode som filtrerer liste med viste arrangementer, slik at kun ferdige arrangementer vises.
     */
    finished(){
        this.hidden = true;
        this.temp = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date < 0)
    }

    /**
     * Metode som kalles for hvert arrangement som renderes.
     * Metoden går gjennom alle oppsatte stillinger og sjekker om innlogget bruker er oppsatt på arrangementet det gjelder.
     * @param event_id {number} tar inn id-en på gjeldende event.
     * @returns {undefined|*} gir tilbake et UserEvent-objekt / stilling om stilling blir funnet og undefined om den ikke finnes
     */
    getUserEvent(event_id: number){
        if (userService.currentUser){
            let u: UserEvent[] = this.users;

            let userList = u.filter(list => {
                return (list.some(user => {
                    if (user) return user.event_id === event_id;
                    return false;
                }))
            });
            if (userList.length > 0){
                let users = userList[0];
                return users.find(user => user.event_id === event_id && userService.currentUser.user_id === user.user_id);
            }
        }
        return undefined;
    }

    /**
     * Metode for å lage dato-formatet som brukes på arrangementfremvisningen.
     * @param start {string} tar inn startdato som brukes i formatteringen.
     * @param end {string} tar inn sluttdato som brukes i formatteringen.
     * @returns {string} gir tilbake en formattert streng for fremvisning av dato.
     */
    setFormat(start: string, end: string) {
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
     * Metode som kalles når bruker trykker "søk" etter å ha valgt et tidsrom søket skal filtreres på.
     * Metoden filtrerer arrangementene som vises på siden slik at de stemmer overens med datofiltreringen.
     */
    date() {
        console.log(this.events.filter(a => new Date(a.event_start.slice(0,10)).getTime() >= new Date(this.event_start).getTime()));
        console.log(new Date(this.events[0].event_start.slice(0,10)));
        this.temp = this.events.filter(a =>
            new Date(a.event_start.slice(0,10)).getTime() >= new Date(this.event_start).getTime()
            && new Date(a.event_end.slice(0,10)).getTime() <= new Date(this.event_end).getTime());
    }
}