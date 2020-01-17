//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";
import {EventList} from '../../Event/Components/showEvents';

export class Home extends Component {
    loaded: boolean = false;

    constructor(props){
        super(props);
        this.loaded = true;
        this.state = {
            org: Object
        };
        this.mounted = this.mounted.bind(this);
    }

    render(){
            return(
                <div>
                    <Container fluid={true}>
                        <Row>
                            <Col md={6} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Pending</div>
                                    <div className="card-body"></div>
                                    <EventList user={true} prev={true}/>
                                </div>
                            </Col>
                            <Col md={6} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Kommende Arrangement</div>
                                    <div className="card-body">
                                      <EventList user={false} prev={false}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
    }
    mounted() {
        /*
        organizationService
            .getOrganization(userService.currentUser.org_id)
            .then(o => {
                let org = o;
                this.setState({org});
                this.loaded = true;
            })
            .catch((error: Error) => console.log(error.message));

         */
    }
}
