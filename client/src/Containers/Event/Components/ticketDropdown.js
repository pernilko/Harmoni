//@flow

import * as React from 'react';
import { Component } from "react-simplified";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

export class Ticket extends Component {
    render(){
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width: "100%", position: "relative", overflow: "visible", border: "none"}}>
                   Legg til billett
                </Dropdown.Toggle>

                <Dropdown.Menu style={{width: "100%"}}>
                    <form style={{padding: 20 + 'px', width: "100%", borderStyle: "outset", position: "absolute", overflow: "visible"}}>
                        <div className="form-group">
                            <row>
                                <h4>Registrer billetter for arrangement: </h4><br/>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">Billettype: </label>
                                    <input type="ticket_type" className="form-control" placeholder="Ståplass foran"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput2">Beskrivelse av billettype: </label>
                                    <textarea type="description" className="form-control" placeholder="Denne billettypen innebærer..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput3">Antall billetter tilgjengelig: </label>
                                    <input type="amount" className="form-control" placeholder="75"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlInput3">Pris per billett: (kr)</label>
                                    <input type="price" className="form-control" placeholder="350"></input>
                                </div>
                                <br/>
                                <div className="form-group" align="center">
                                    <Button type="submit" className="btn btn-primary" onClick={this.add}>Legg til</Button>
                                </div>
                            </row>
                        </div>
                    </form>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
    add(){
        //this func adds an artist to the form over the add artist dropdown, and stores the info in a temporary array.
        //also needs a button for editing artist after add.
    }
}