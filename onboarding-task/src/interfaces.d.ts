import { IAction } from './actions/IAction';

/**
 * Merged Item data with Flags
 */
export interface IItemViewModel {
  /** Guid of item */
  guid: string;
  /** Value held by item */
  value: string;
  /** Shows whether item is opened for editation */
  isBeingEdited: boolean;
}

/**
 * Represents a generic reducer
 * @param state - state of reducer that is handled and returned
 * @param action - action to be executed
 */
export interface IReducer<T> {
  (state: T, action: IAction): T;
}
