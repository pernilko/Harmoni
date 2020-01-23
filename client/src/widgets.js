// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import './Containers/Event/Components/event.css';

export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  static nextId = 0;

  render() {
    let alert: { id: number, text: React.Node, type: string } = this.alerts[this.alerts.length- 1];
    
    return (
      <>
        { (alert ? 
          <div key={alert.id} className={'alert alertDesign alert-' + alert.type} role="alert">
            {alert.text}
            <button
              type="button"
              className="close"
              onClick={() => {
                this.alerts = [];
              }}
            >                                                                                                    
              &times;
            </button>
          </div>
        : " ")}
      </>
    );
  }

  static success(text: React.Node) {
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'danger' });
    });
  }
}


class ButtonDanger extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {
  render() {
    return (
        <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    );
  }
}

class ButtonSuccess extends Component<{
  onClick: () => mixed, // Any function
  children?: React.Node
}> {
  render() {
    return (
        <button type="button" className="btn btn-success" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    );
  }
}
class ButtonPrimary extends Component<{
  onClick: () => mixed,
  children?: React.Node
}>{
  render(){
    return (
        <button type = "button" className="btn btn-primary" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    )
  }
}
class ButtonSecondary extends Component<{
  onClick: () => mixed,
  children?: React.Node
}>{
  render(){
    return (
        <button type = "button" className="btn btn-secondary" onClick={this.props.onClick}>
          {this.props.children}
        </button>
    )
  }
}

/**
 * Renders a button using Bootstrap classes
 */
export class Button {
  static Danger = ButtonDanger;
  static Success = ButtonSuccess;
  static Primary = ButtonPrimary;
  static Secondary = ButtonSecondary;
}

export class Row extends Component<{ children?: React.Node }> {
  render() {
    return <div className="row">{this.props.children}</div>;
  }
}

/**
 * Renders a column with specified width using Bootstrap classes
 */
export class Column extends Component<{ width?: number, right?: boolean, children?: React.Node }> {
  render() {
    return (
        <div
            className={'col' + (this.props.width ? '-' + this.props.width : '') + (this.props.right ? ' text-right' : '')}
        >
          {this.props.children}
        </div>
    );
  }
}
