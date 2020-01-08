// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from "react-simplified";

export class LoginCard extends Component<{ children?: React.Node, user: User}> {
    render() {
        return (
            <form>
            <FormGroup
        text="e-mail: "
        type="text"
        placeholder="olaNormann@mail.com"
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {this.props.user.email = event.target.value}}
        />
        <FormGroup
        text="Passord: "
        type="password"
        placeholder="Passord"
        value={this.props.user.email}
        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {this.props.user.password = event.target.value}}
        user = {this.props.user.email}
        />
        {this.props.children}
    </form>
    )
    }
};
export class FormGroup extends Component<{ text: string, type: string, value: string, onChange: any, user: User, placeholder: string }>{
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
