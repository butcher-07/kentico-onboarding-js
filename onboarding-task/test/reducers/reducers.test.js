import { OrderedMap } from 'immutable';
import { ListItem as ListItemModel } from '../../src/models/ListItem';
import { generateGuid } from '../../src/utils/generateGuid';
import { listApp } from '../../src/reducers/reducers';
import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../../src/constants/actionTypes';
import { itemFactory } from '../../src/utils/itemFactory';
import { createItem } from '../../src/actions/userActions';

describe('List App reducer', () => {
  const _guid1 = generateGuid();
  const _guid2 = generateGuid();
  const initialState = new OrderedMap([
    [_guid1, new ListItemModel({ guid: _guid1, value: 'Make coffee' })],
    [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
  ]);

  it('Adds new item properly', () => {
    const newItem = itemFactory('Make a sandwich');
    const expectedStoreState = new OrderedMap([
      [_guid1, new ListItemModel({ guid: _guid1, value: 'Make coffee' })],
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
      [newItem.guid, newItem],
    ]);

    const result = listApp(initialState, createItem(newItem));

    expect(result).toEqual(expectedStoreState);
  });

  it('Updates item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_guid1, new ListItemModel({ guid: _guid1, value: 'Do stuff' })],
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
    ]);

    const testStore = listApp(initialState, {
      type: UPDATE_ITEM,
      item: {
        guid: _guid1,
        value: 'Do stuff',
      },
    });

    expect(testStore).toEqual(expectedStoreState);
  });

  it('Deletes item properly', () => {
    const expectedStoreState = new OrderedMap([
      [_guid2, new ListItemModel({ guid: _guid2, value: 'Master React' })],
    ]);

    const testStore = listApp(initialState, {
      type: DELETE_ITEM,
      itemGuid: _guid1,
    });

    expect(testStore).toEqual(expectedStoreState);
  });
});
