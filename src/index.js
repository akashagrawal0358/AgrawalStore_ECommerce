import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './contexts/productContext'
import { FilterContextProvider } from './contexts/filter_context';
import { CartContextProvider } from './contexts/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* AppProvider is providing all the data  */}
    <AppProvider>

      {/* FilterContextProvider is providing all the data to products page  */}
      <FilterContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </FilterContextProvider>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
