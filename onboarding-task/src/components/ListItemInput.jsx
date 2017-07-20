import React from 'react';
import PropTypes from 'prop-types';

export class ListItemInput extends React.PureComponent {
  static displayName = 'ListItemInput';
  static propTypes = {
    onCreateItem: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleInputOnEnter);
  }

  componentWillMount() {
    document.removeEventListener('keydown', this._handleInputOnEnter);
  }

  _handleInputOnEnter = (e) => {
    if ((e.key === 'Enter') && this.state.value && document.activeElement === this.textInput) {
      this._handleCreateItemClick();
    }
  };

  _handleInputChanged = (e) => {
    const value = e.target.value;
    this.setState(() => {
      return {
        value,
      };
    });
  };

  _handleCreateItemClick = () => {
    if (!this.state.value) {
      return;
    }
    this.props.onCreateItem(this.state.value);
    this.setState(() => {
      return {
        value: '',
      };
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="col-sm-12 top-offset">
        <div className="input-group">
          <span className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this._handleCreateItemClick}>Add</button>
          </span>
          <input
            type="text"
            className="form-control enlarge"
            onChange={this._handleInputChanged}
            value={value}
            ref={(input) => {
              this.textInput = input;
            }}
          />
        </div>
      </div>
    );
  }
}
