import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import createLogger from 'redux-logger';
import { Map } from 'immutable'

import App from './containers/gridContainer';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
// const logger = createLogger();

const initialState = {sheet: {
  grid: [{'100': {type: 'ID', width: 200, id: '100', data: "hi"}, '101': {type: 'Text', width: 200, id: '101', data: "hello"}},{'100': {type: 'ID', width: 200, id: '102', data: "it"}, '101': {type: 'Text', width: 200, id: '103', data: "me"}}],
  columnHeaders: [{ type: 'ID', name: 'Record Name', id: '100'},{ type: 'Text', name: 'Text', id: '101'}],
  showRowModal: false,
  modalRow: {data:null,rowIdx:null} }}

const store = createStore(
  reducers, 
  initialState, compose(
    applyMiddleware(),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
