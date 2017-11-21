import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { textIsEmpty } from '../utils/validation';

class NewItemForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newItemText: '',
    };
  }

  onInputChange = (e) => {
    this.setState({ newItemText: e.target.value });
  };

  onAdd = () => {
    const { newItemText } = this.state;
    this.props.onAdd(newItemText);
    this.setState({ newItemText: '' });
  };

  onKeyPress = (target) => {
    if (target.charCode === 13) {
      const { newItemText } = this.state;

      if (!textIsEmpty(newItemText)) {
        this.onAdd();
      }
    }
  };

  render() {
    const { newItemText } = this.state;
    const enableAddButton = !textIsEmpty(newItemText);

    return (
      <div className="form-inline">
        <input
          className="form-control col-md-5"
          type="text"
          placeholder="Item name cannot be empty"
          value={newItemText}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          autoFocus={true}
        />

        <button
          className="btn btn-primary"
          onClick={this.onAdd}
          disabled={!enableAddButton}
        >
          Add
        </button>
      </div>
    );
  }
}

NewItemForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export { NewItemForm };
