import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import {store} from './redux/store';
import { Provider } from 'react-redux';
import {fetchBaseCurrency} from './redux/appSlice';
import lc from 'locale-currency';

store.dispatch(fetchBaseCurrency(lc.getCurrency(window.navigator.language)));

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter basename={'/currency-converter'}>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
