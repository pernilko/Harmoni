//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";


export class Home extends Component {
    loaded: boolean = false;

    constructor(props){
        super(props);
        this.loaded = false;
        this.state = {
            org: Object
        };
        this.mounted = this.mounted.bind(this);
    }

    render(){
        if(this.loaded){
            return(
                <div>
                    <Container fluid={true}>
                        <Row>
                            <Col md={4} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">{this.state.org.org_name}</div>
                                    <div className="card-body">
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Kommende Arrangement</div>
                                    <div className="card-body">
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        } else {
            return (
                <div>
                    <Container fluid={true}>
                        <Row>
                            <Col md={4} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header"><Spinner animation="border"/></div>
                                    <div className="card-body">
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Kommende Arrangement</div>
                                    <div className="card-body">
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
    mounted() {
        organizationService
            .getOrganization(userService.currentUser.org_id)
            .then(o => {
                let org = o;
                this.setState({org});
                this.loaded = true;
            })
            .catch((error: Error) => console.log(error.message));
    }
}