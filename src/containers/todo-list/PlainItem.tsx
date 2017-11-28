import { connect, Dispatch } from 'react-redux';
import { PlainItem } from '../../components/todo-list/PlainItem';
import {
  editItem,
} from '../../actions/actionCreators';
import { IAppState } from '../../IAppState';
import { IndexedItem } from '../../models/IndexedItem';

interface IProps {
  item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps) => ({
  onEditStart: () => dispatch(editItem(ownProps.item.id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

export { connectedComponent as PlainItem };
