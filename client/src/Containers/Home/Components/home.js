//@flow
import * as React from 'react';
import { Component } from "react-simplified";
import {Alert} from "../../../widgets";
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {Organization, organizationService} from "../../../services/OrganizationService";
import {userService} from "../../../services/UserService";
import {EventList} from '../../Event/Components/showEvents';
import {Pending} from "../../Event/Components/showPending";
import {sharedComponentData} from "react-simplified";

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
        if (userService.currentUser) {
            if (userService.currentUser.p_archive == 1 || userService.currentUser.privileges == 1) {
            return(
                <div>
                    <Container fluid={true}>
                        <Row>
                            <Col md={6} style={{padding: '1'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Fullførte arrangement</div>
                                    <div className="card-body">
                                        <Pending/>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} style={{padding: '1'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header">Kommende Arrangement</div>
                                    <div className="card-body">
                                      <EventList user={false} time={2}/>
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
                            <Col md={6} style={{padding: '0'}}>
                                <div className="card" style={{margin: "none"}}>
                                    <div className="card-header"></div>
                                    <div className="card-body">
                                      <EventList user={false} time={2}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            }
        }
        else {
            return (
                <div>
                    Du har ingen kommende arrangement
                </div>
            )
        }
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

            if(true || false){
                return true;
            }else{
                return false;
            }

         */
    }
}
