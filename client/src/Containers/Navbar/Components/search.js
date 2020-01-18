import * as React from 'react';
import {Component} from "react-simplified";
import {eventService} from "../../../services/EventService";
import {Container, Image, ListGroup, ListGroupItem, Nav} from "react-bootstrap";
import {sharedComponentData} from "react-simplified";
import {userService} from "../../../services/UserService";

export class SearchResults extends Component <{match: {params: {search: string}}}> {
    events: Event[] | any = [];
    org_id: number = 0;
    loaded: boolean = false;
    today: Date = new Date();
    hidden: boolean = true;
    event_start: string = "";
    event_end: string = "";

    render() {
        return (
            <div className="searchResults">
                <Container style={{padding: 0}}>
                    <div className="card-header" style={{color: 'white', backgroundColor: '#53265F'}}>
                        <h4> Søkeresultater for: {this.props.match.params.search}</h4></div>
                    <a href={"#/search_result/" + this.props.match.params.search} onClick={this.upcoming}>Kommende </a>
                    <a href={"#/search_result/" + this.props.match.params.search} onClick={this.finished}>Utløpte </a>
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
                            <button className="btn btn-primary submit" style={{margin:10 +'px'}} onClick={this.date}>Søk</button>
                        </div>
                    </a>

                    {this.events.map(e => (
                        <div style={{maxHeight: 100 + '%'}}>
                            <ListGroup>
                                <ListGroupItem style={{width: 100 + '%', height: "200px", padding: 0}}>
                                    <div className="row" style={{paddingLeft: 15 + "px", paddingRight: 15 + "px"}}>
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
    }

    mounted() {
        console.log("HEI");
        this.load();
    }

    load() {
    this.org_id = userService.currentUser.org_id;
    console.log("ORG_ID: ", this.org_id);
    eventService.getEventbySearch(this.props.match.params.search, this.org_id)
            .then(event => this.events = event)
            .catch((error: Error) => console.log(error.message))
    }

    show(){
        this.hidden = false;
    }

    upcoming(){
        this.events = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date > 0)
       }


    finished(){
        this.events = this.events.filter(a => new Date(a.event_start.slice(0,10)) - new Date < 0)
    }

    date() {
        this.events = this.events.filter(a => new Date(a.event_start.slice(0,10)) >= this.event_start && a.event_end.slice(0,10) <= this.event_end);
        this.hidden = true;
    }
}