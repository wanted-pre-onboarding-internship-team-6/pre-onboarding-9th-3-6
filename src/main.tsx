import React from 'react';

import ReactDOM from 'react-dom/client';

import { Global } from '@emotion/react';

import resetCss from '@/styles/reset';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={resetCss} />
    <App />
  </React.StrictMode>,
);
