import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { FormEvent } from 'react';
import { IAction } from '../models/IAction';

export interface INonEmptyInputDataProps {
  readonly text: string;
  readonly isError: boolean;
  readonly inputClassName: string;
  readonly enableAutoFocus: boolean;
}

export interface INonEmptyInputCallbacksProps {
  readonly updateInsertedText: (insertedText: string) => void;
  readonly addInsertedText: (newText?: string) => void;
  readonly onInputFocus?: () => IAction;
  readonly onInputBlur?: () => IAction;
  readonly onCancelEditing?: () => void;
}

type NonEmptyInputProps = INonEmptyInputDataProps & INonEmptyInputCallbacksProps;

export class NonEmptyInput extends React.PureComponent<NonEmptyInputProps> {
  static displayName = 'NonEmptyInput';

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    addInsertedText: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    inputClassName: PropTypes.string.isRequired,
    enableAutoFocus: PropTypes.bool.isRequired,
    onInputFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onCancelEditing: PropTypes.func,
  };

  private textInput: HTMLInputElement;

  onInputFocus = (): void => {
    if (this.props.onInputFocus) {
      this.props.onInputFocus();
    }
  };

  onExitingInput = (): void => {
    if (this.props.onInputBlur) {
      this.props.onInputBlur();
    }
  };

  onInputChange = (event: FormEvent<HTMLInputElement>): void =>
    this.props.updateInsertedText(event.currentTarget.value);

  componentDidMount(): void {
    if (this.props.enableAutoFocus) {
      const length = this.textInput.value.length;
      this.textInput.focus();
      this.textInput.setSelectionRange(length, length);
    }
  }

  onCancelFocusOfInput = (): void => {
    if (this.props.onCancelEditing) {
      this.props.onCancelEditing();
    } else {
      this.textInput.blur();
    }
  };

  onSaveChanges = (): void => {
    if (this.props.text) {
      this.textInput.blur();
      this.props.addInsertedText(this.props.text);
    }
  };

  render(): JSX.Element {
    const handlers = {
      'cancelEditing': () => this.onCancelFocusOfInput(),
      'saveChanges': () => this.onSaveChanges(),
    };

    const inputErrorCssClass = this.props.isError
      ? 'has-error'
      : '';

    return (
      <div className={inputErrorCssClass}>
        <HotKeys handlers={handlers}>
          <input
            type="text"
            ref={(input: HTMLInputElement) => {
              this.textInput = input;
            }}
            className={this.props.inputClassName}
            onChange={this.onInputChange}
            value={this.props.text}
            onFocus={this.onInputFocus}
            onBlur={this.onExitingInput}
          />
        </HotKeys>
      </div>
    );
  }
}

