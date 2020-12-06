import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import './styles/main.scss';
import './styles/userForm.scss';
import './styles/userList.scss';
import './styles/search.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
