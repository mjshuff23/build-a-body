import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();
console.log('HEAR ME OUT');

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
