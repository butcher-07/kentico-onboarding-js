import { IAction } from '../../actions/IAction';
import {
  GET_NODES_SUCCESS,
  GET_NODES_FAILURE,
  GET_NODES_START,
} from '../../actions/actionTypes';

export const isFetchingReducer = (state = true, action: IAction): boolean => {
  switch (action.type) {
    case GET_NODES_START:
      return true;

    case GET_NODES_FAILURE:
    case GET_NODES_SUCCESS:
      return false;

    default:
      return state;
  }
};
