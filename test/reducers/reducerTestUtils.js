import { OrderedMap } from 'immutable';
import { ListItem } from '../../src/models/ListItem';

export const prepareActionWithUidPayload = (type, id) => {
  return {
    type,
    payload: {
      id,
    },
  };
};

export const prepareNoteRecord = (text, id, isEditActive) => {
  return new ListItem({
    text,
    id,
    isEditActive,
  });
};

export const prepareNotePayload = (text, id, isEditActive) => ({
  text,
  id,
  isEditActive,
});

export const prepareInitialState = () => {
  return {
    notes: OrderedMap(
      [
        [1, prepareNoteRecord('First test note', 1, false)],
        [2, prepareNoteRecord('Second test note', 2, false)],
      ],
    ),
    isAddListMemberTouched: false,
  };
};
