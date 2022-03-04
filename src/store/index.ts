import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { IAppStore, reducers } from './reducers';

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IAppStore> = useSelector;
