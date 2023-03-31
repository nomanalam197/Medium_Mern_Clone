import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { store } from './store/store';
import { Provider } from 'react-redux';

import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <AlertProvider template={AlertTemplate} {...options}> */}
        <App />
        <ToastContainer />
      {/* </AlertProvider> */}
    </BrowserRouter>
  </Provider>
);

