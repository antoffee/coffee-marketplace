import { combineReducers } from 'redux';

import { counterReducer, ICounterReducer } from './counter';

export interface IAppStore {
    counter: ICounterReducer;
}

export const reducers = combineReducers({
    counter: counterReducer,
});
