// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

export class Alert extends Component {
  alerts: { id: number, text: React.Node, type: string }[] = [];
  static nextId = 0;

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              type="button"
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
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
