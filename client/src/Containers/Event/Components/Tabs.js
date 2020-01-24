import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import "./showTab.css";


/**
  håndterer logikk for visnigen av flere "tabs"
 */
class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[3].props.label,
    };
  }

  /**
    Marker hvilken tab som siste ble trykket på.
   */
  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  /**
    viser frem alle tabsene
   */
  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <ul className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </ul>
    );
  }
}

export default Tabs;
