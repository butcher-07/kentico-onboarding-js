import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput.tsx';
import { ErrorMessageListMember } from './ErrorMessageListMember.tsx';
import { isNoteValid } from '../utils/isNoteValid.ts';

export class ListMemberEditor extends PureComponent {

  static propTypes = {
    note: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
    }).isRequired,
    number: PropTypes.number.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onCancelEditor: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentNoteText: props.note.text,
    };
  }

  onNoteEditing = (newText) =>
    this.setState({
      currentNoteText: newText,
    });

  onSaveClick = () =>
    this.props.onSaveClick(this.state.currentNoteText);

  render() {
    const isValid = isNoteValid(this.state.currentNoteText);
    const isError = !isValid && this.props.note.isEditActive;
    const errorMessage = 'Invalid note. You cannot change note\'s text to empty.';

    return (
      <div>
        <div className="input-group">
          <div className="input-group-addon">
            <label>{this.props.number + '.'}</label>
          </div>
          <NonEmptyInput
            text={this.state.currentNoteText}
            addInsertedText={this.onSaveClick}
            updateInsertedText={this.onNoteEditing}
            isError={isError}
            inputClassName="form-control"
            onCancelEditing={this.onCancelEditor}
            enableAutoFocus={true}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={isError}
              className="btn btn-primary"
              onClick={this.onSaveClick}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.props.onCancelEditor}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
        <ErrorMessageListMember
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
