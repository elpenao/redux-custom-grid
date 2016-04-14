import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { Map } from 'immutable'

import App from './containers/gridContainer';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const logger = createLogger();

const initialState = {sheet: {
  grid: [{'100': {type: 'ID', width: 200, id: '100', data: "hi"}}],
  columnHeaders: [{ type: 'ID', name: 'Record Name', id: '100'}],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }}

const store = createStore(
  reducers, 
  initialState,
  applyMiddleware(logger)
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
