import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.scss';
import HeaderFilter from './components/HeaderFilter/HeaderFilter';
import FlightList from './components/FlightList';
import TransferFilter from './components/TransferFilter';
import logo from './assets/Logo.svg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className="page-cover">
      <img
        src={logo}
        alt="Logo"
        style={{ width: '100px', height: '100px', margin: '20px' }}
      />
      <div className="main-page">
        <TransferFilter />
        <div className="flights">
          <HeaderFilter />
          <FlightList />
        </div>
      </div>
    </div>
  </Provider>
);
