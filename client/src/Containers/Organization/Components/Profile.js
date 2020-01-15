//@flow
import * as React from 'react';
import {User, userService} from '../../../services/UserService';
import Form from 'react-bootstrap/Form';
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Nav, Spinner, Tab} from 'react-bootstrap';
import {Component} from 'react-simplified';
import {Organization, organizationService} from "../../../services/OrganizationService";
import {Alert, Row} from "../../../widgets";

export class OrgProfile extends Component {
    org: Organization = new Organization();

    render() {
        return(
        <div className="container-fluid" style={{height: "100%"}}>
            <div className="row" style={{height: "100%"}}>
                <div className="col-6" style={{padding: 0, paddingLeft: 0+"px", height: "100%"}}>
                    <div className="card" style={{border: "none", height: "100%"}}>
                        <div className="card-body" style={{padding: 0}}>
                            <div className="card-img" style={{marginLeft: 20+"px"}}>
                                <img src={"https://s1.logaster.com/static/v3/img/products/logo.png"}/>
                            </div>
                            <div className="card-body" style={{paddingBottom: 0}}>
                                <h2>Organisasjon AS</h2>
                                <p>Opprettet: 20. Januar, 2020</p>
                            </div>
                            <div className="card-header"><h5>Kontakt info: </h5></div>
                            <div className="card-body" style={{paddingBottom: 0}}>
                                <div className="card-text" style={{margin: 10+"px"}}>Epost: navn@mail.com</div>
                                <div className="card-text" style={{margin: 10+"px"}}>Tlf: +47 33333333</div>
                                <div className="card-text" style={{margin: 10+"px"}}>Admin: Navn Navnesen</div>
                            </div>
                        </div>
                        <div>
                        <Button variant="outline-secondary" style={{marginLeft: 20, marginTop: 9}}>rediger</Button>
                        </div>
                    </div>
                </div>
                <div className="col-6" style={{padding: 0, paddingLeft: 0+"px",height: "100%"}}>
                        <div className="card-header" style={{backgroundColor: "#53265F", color: "white"}}><h5>Medlemmer</h5></div>
                            <div style={{maxHeight: "100%", overflow: "auto"}}>
                                <ListGroup>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                    roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="row">
                                            <div className="col-2" style={{padding: 0}}>
                                                <Image src={"https://cdn1.vectorstock.com/i/1000x1000/78/80/young-woman-head-avatar-cartoon-face-character-vector-21787880.jpg"}
                                                       roundedCircle width={70+"px"} height={60+"px"} style={{objectFit: "cover", marginLeft: 10+"%"}}/>
                                            </div>
                                            <div className="col-7" style={{padding: 0}}>
                                                <p style={{margin: "0", marginTop: 3}}>Navn: Nancy Drew</p>
                                                <p style={{margin: "0"}}>Email: nancydrew@mail.com</p>
                                            </div>
                                            <div className="col-1">
                                                <Button variant="outline-secondary" style = {{marginTop: 9}}>rediger</Button>
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
    mounted(){
        organizationService
            .getOrganization(6)
            .then(response => this.org = response)
            .catch((error: Error) => console.log(error.message));
    }
}