import * as memoize from 'memoizee';

import { IItemFlags } from './ItemFlags';
import { IItemData } from './ItemData';
import { emptyUuid } from '../utils/constants';

export interface IViewItem {
  id: string;
  index: number;
  text: string;
  isBeingEdited: boolean;
  isStored: boolean;
  error?: any;
}

const createViewModel = (index: number, data: IItemData, flags: IItemFlags): IViewItem => (
  {
    id: data.id || emptyUuid,
    index,
    text: data.text,
    isBeingEdited: flags.isBeingEdited,
    isStored: flags.isStored,
    error: flags.error,
  }
);

const createItemRecordMemoized: (index: number, data: IItemData, flags: IItemFlags) => IViewItem
  = memoize(createViewModel);

export { createItemRecordMemoized as ViewItem };
