import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(
      PropTypes.string,
    ).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  render() {
    let { messages, label } = this.props;

    messages = message(messages)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button
            type='button'
            role='button'
            tabIndex='-1'
            aria-disabled='false'
            className={cn({
              btn: true
            })}
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type='button'
            role='button'
            tabIndex='-1'
            aria-disabled='false'
            className={cn({
              btn: true
            })}
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type='button'
            role='button'
            tabIndex='-1'
            aria-disabled='false'
            className={cn({
              btn: true
            })}
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>

        <h2 className='rbc-toolbar-label'>
          { label }
        </h2>

        <span className='rbc-btn-group'>
        {
          this.viewNamesGroup(messages)
        }
        </span>
      </div>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return (
        viewNames.map(name =>
          <button
            type='button'
            role='tab'
            tabIndex={ view === name ? '0' : '-1' }
            aria-selected={ view === name ? true : false }
            aria-controls='rbc-view'
            key={name}
            className={cn({
              btn: true,
              'rbc-active': view === name
            })}
            onClick={this.view.bind(null, name)}
          >
            {messages[name]}
          </button>
        )
      )
    }
  }
}

export default Toolbar;
