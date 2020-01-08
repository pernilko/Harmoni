// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from "react-simplified";
import { Bruker, brukerStore, Sak } from "../../../Stores";
import { Button, Card, Alert } from '../../../widgets';
import { createHashHistory } from 'history';
var history = createHashHistory();

export class LoginCard extends Component<{ children?: React.Node, bruker: Bruker }> {
    render() {
        return (
            <Card title = "">
            <form>
            <FormGroup
        text="Brukernavn: "
        type="text"
        placeholder="Brukernavn"
        value={this.props.bruker.brukernavn}
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {this.props.bruker.brukernavn = event.target.value}}
        />
        <FormGroup
        text="Passord: "
        type="password"
        placeholder="Passord"
        value={this.props.bruker.passord}
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {this.props.bruker.passord = event.target.value}}
        bruker = {this.props.bruker}
        />
        {this.props.children}
    </form>
        </Card>
    )
    }
};
export class FormGroup extends Component<{ text: string, type: string, value: string, onChange: any, placeholder: string }>{
    render() {
        return (
            <div className="form-group">
            <label><b>{this.props.text}</b></label>
        <input
        type={this.props.type}
        className="form-control"
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        />
        </div>
    );
    }
};
