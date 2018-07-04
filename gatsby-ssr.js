import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import promise from './src/middleware/promise';
import rootReducer from './src/reducers'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
    
    const ConnectedBody = () => (
      <Provider store={createStoreWithMiddleware(rootReducer)}>
        {bodyComponent}
      </Provider>
    )
    replaceBodyHTMLString(renderToString(<ConnectedBody/>))
}