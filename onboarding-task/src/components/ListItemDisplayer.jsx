import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListItemDisplayer extends Component {

  render() {
    return (
      <div className="row">
        <li onClick={() => this.props.toggleEdit(this.props.uid)}>
          {this.props.text}
        </li>
      </div>
    );
  }
}

ListItemDisplayer.propTypes = {
  text: PropTypes.string,
  uid: PropTypes.string,
  toggleEdit: PropTypes.func,
};

export { ListItemDisplayer };
