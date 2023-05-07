import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename="/">
    <CssBaseline />
    <App />
  </BrowserRouter>
);
