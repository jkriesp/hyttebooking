import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.tsx';
import './index.css';
import Wrapper from './Wrapper.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="jenske.eu.auth0.com"
      clientId="OZ2vAgSAMmptmrvOLNGO3S10Jbme8rHQ"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Wrapper>
        <App />
      </Wrapper>
    </Auth0Provider>
  </React.StrictMode>,
);
