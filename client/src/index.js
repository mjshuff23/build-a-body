import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
