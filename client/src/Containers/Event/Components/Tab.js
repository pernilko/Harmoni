import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
  håndterer logikken for visningen av en enkelt "tab".
 */
class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  /**
    håndterer hva som skal skje når man trykker på en enkelt tab.
   */
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  /**
    viser frem selve "tab"-en.
   */
  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <li
        className={className}
        onClick={onClick}
      >
        {label}
      </li>
    );
  }
}

export default Tab;
