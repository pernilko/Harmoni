// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from "react-simplified";
import {Form} from "react-bootstrap";

export class FormElement extends Component<{ text: string, type: string, value: string, onChange: function, value: string, placeholder: string }>{
    render() {
        return (
                <Form.Group>
                    <Form.Label>{this.props.text}</Form.Label>
                    <Form.Control
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        onChange={this.props.onChange}
                        value = {this.props.value}>
                    </Form.Control>
                </Form.Group>
        )

    }
};
