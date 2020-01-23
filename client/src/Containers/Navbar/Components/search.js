import * as React from 'react';
import {Component} from "react-simplified";
import {eventService} from "../../../services/EventService";
import {Container, Image, ListGroup, ListGroupItem, Nav, Spinner, Row} from "react-bootstrap";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";
import Col from "react-bootstrap/Col";
import {UserEvent, userEventService} from "../../../services/UserEventService";

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


    /*
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
                            <div className="card-header" style={{color: 'white', backgroundColor: '#53265F'}}>
                                <h4> Søkeresultater for: {this.props.match.params.search}</h4></div>
                            <a href={"#/search_result/" + this.props.match.params.search}
                               onClick={this.upcoming}>Kommende </a>
                            <a href={"#/search_result/" + this.props.match.params.search}
                               onClick={this.finished}>Utløpte </a>
                            <a href={"#/search_result/" + this.props.match.params.search} onClick={this.show}> Dato
                                <div hidden={this.hidden}>
                                    <div className="col">
                                        <label>Søk fra dato:</label>
                                        <input id="help" className="form-control" type="date" value={this.event_start}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_start = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>til dato:</label>
                                        <input id="help" className="form-control" type="date" value={this.event_end}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_end = event.target.value)}/>
                                    </div>
                                    <button className="btn btn-primary submit" style={{margin: 10 + 'px'}}
                                            onClick={this.date}>Søk
                                    </button>
                                </div>
                            </a>

                            {this.temp.map(e => (
                                <div style={{maxHeight: 100 + '%'}}>
                                    <ListGroup>
                                        <ListGroupItem style={{width: 100 + '%', height: "200px", padding: 0}}>
                                            <div className="row"
                                                 style={{paddingLeft: 15 + "px", paddingRight: 15 + "px"}}>
                                                <div className="col-5" style={{padding: 0}}>
                                                    <Image
                                                        src="https://kampanje.com/contentassets/0c30c67529294a8c8e59d84740c27e90/eventbilde-sponsor-og-event.jpg?width=1600&height=1300&mode=carve"
                                                        height="200px" width="300px" style={{objectFit: "cover"}}/>
                                                </div>
                                                <div className="col-7" style={{padding: 0}}>
                                                    <p style={{
                                                        color: "#D35400",
                                                        fontSize: '25px',
                                                        fontWeight: "bold"
                                                    }}>Arrangement
                                                        start: {e.event_start.slice(8, 10) + "." + e.event_start.slice(5, 7) + "." + e.event_start.slice(0, 4)
                                                        + " kl: " + e.event_start.slice(11, 16)}</p>
                                                    <Nav.Link href={"#/showEvent/" + e.event_id} style={{padding: 0}}><p
                                                        style={{
                                                            color: 'black',
                                                            fontSize: '40px',
                                                            fontWeight: "bold"
                                                        }}>{e.event_name}</p></Nav.Link>
                                                    <p style={{color: 'black', fontSize: '20px'}}>{(e.place)}</p>
                                                </div>
                                            </div>
                                        </ListGroupItem>
                                    </ListGroup>
                                </div>
                            ))}
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
    }*/

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
                            <div className="card-header" style={{color: 'white', backgroundColor: '#53265F'}}>
                                <h4> Søkeresultater for: {this.props.match.params.search}</h4></div>
                            <a href={"#/search_result/" + this.props.match.params.search}
                               onClick={this.upcoming}>Kommende </a>
                            <a href={"#/search_result/" + this.props.match.params.search}
                               onClick={this.finished}>Utløpte </a>
                            <a href={"#/search_result/" + this.props.match.params.search} onClick={this.show}> Dato
                                <div hidden={this.hidden}>
                                    <div className="col">
                                        <label>Søk fra dato:</label>
                                        <input id="help" className="form-control" type="date" value={this.event_start}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_start = event.target.value)}/>
                                    </div>
                                    <div className="col">
                                        <label>til dato:</label>
                                        <input id="help" className="form-control" type="date" value={this.event_end}
                                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.event_end = event.target.value)}/>
                                    </div>
                                    <button className="btn btn-primary submit" style={{margin: 10 + 'px'}}
                                            onClick={this.date}>Søk
                                    </button>
                                </div>
                            </a>
            <div className={"w-100 mx-auto "}>
                        {this.temp.map((e, i) =>
                            <Container>
                                <div id="eventcard" className="card" style={{marginLeft: "18%", marginRight: "18%", marginBottom: "2%", borderRadius: 6+"px", border: "none"}}>
                                    <Row style={{margin: 0}}>
                                        <Col sm={2} style={{padding: 0}}>
                                            <div
                                                className={"banner" + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 1 ? " greenBG" : "") + (this.getUserEvent(e.event_id) && this.getUserEvent(e.event_id).accepted === 0 ? " redBG" : "")}
                                                id={i}>
                                                {this.getUserEvent(e.event_id) ? (this.getUserEvent(e.event_id).accepted === 2 ?
                                                   <></> : <></>) : <></>}
                                            </div>
                                        </Col>
                                        <Col sm={10} style={{padding: 0}}>
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                                            <link href="https://fonts.googleapis.com/css?family=PT+Serif|Ubuntu&display=swap" rel="stylesheet"/>
                                            <div id = "eventcard-body" className="card-body" style={{padding:0}}>
                                                <a href={'#/showEvent/' + e.event_id}>
                                                    <img id="image"
                                                         src={e.image ? e.image : "https://celebrityaccess.com/wp-content/uploads/2019/09/pexels-photo-2747449-988x416.jpeg"}/>
                                                    <div id="eventcard-text" className="card-text" style={{float: "left", textAlign: "left"}}>
                                                        <h2 style={{textAlign: "left", paddingLeft: 20}}> {e.event_name} </h2>
                                                        <p><b> Sted: </b> {e.place} </p>
                                                        <p><b> Stilling: </b>{this.getUserEvent(e.event_id) ? "Du er satt opp som " + this.getUserEvent(e.event_id).job_position + ".\n Bekreft valget ditt med knappene på venstre side." : "Du er ikke satt på dette arrangementet"}.
                                                        </p>
                                                        <p>
                                                            <b> Tidspunkt: {this.setFormat(e.event_start, e.event_end)}</b>
                                                        </p>
                                                    </div>
                                                </a>
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

    mounted() {
        console.log("HEI");
        this.loaded = false;
        //this.load();
    }

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

    show(){
        this.hidden = false;
    }

    upcoming(){
        this.hidden = true;
        this.temp = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date > 0);
       }

    finished(){
        this.hidden = true;
        this.temp = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date < 0)
    }

    getUserEvent(event_id: number){
        if (userService.currentUser){
            let u = this.users;

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

    date() {
        console.log(this.events.filter(a => new Date(a.event_start.slice(0,10)).getTime() >= new Date(this.event_start).getTime()));
        console.log(new Date(this.events[0].event_start.slice(0,10)));
        this.temp = this.events.filter(a =>
            new Date(a.event_start.slice(0,10)).getTime() >= new Date(this.event_start).getTime()
            && new Date(a.event_end.slice(0,10)).getTime() <= new Date(this.event_end).getTime());
    }

    
}