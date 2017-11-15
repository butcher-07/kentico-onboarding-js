import { connect } from 'react-redux';
import { List } from '../components/List';
import { getAllIds } from '../selectors/notes/list/listOfNotes';

const mapStateToProps = (state) => ({
  notesIds: getAllIds(state.notes.listOfNotes),
});

export const ListContainer = connect(
  mapStateToProps,
)(List);
