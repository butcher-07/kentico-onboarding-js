import { connect } from 'react-redux';
import { NonEmptyInput } from '../components/NonEmptyInput.tsx';
import {
  startAddingNote,
  stopAddingNote,
} from '../actions/actionCreators';

const events = {
  onInputFocus: startAddingNote,
  onInputBlur: stopAddingNote,
};

export const AddListMemberInput = connect(
  null,
  events
)(NonEmptyInput);
