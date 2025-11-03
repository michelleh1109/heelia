import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import { ScanProvider } from './context/ScanContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScanProvider>
        <App />
      </ScanProvider>
    </BrowserRouter>
  </React.StrictMode>
);
