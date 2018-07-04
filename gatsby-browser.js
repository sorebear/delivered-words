import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import promise from './src/middleware/promise';
import rootReducer from './src/reducers'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export const replaceRouterComponent = ({ history }) => {

  const ConnectedRouterWrapper = ({ children }) => (
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return ConnectedRouterWrapper;
}