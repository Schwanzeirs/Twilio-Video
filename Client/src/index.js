import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/user-context';
import { VideoContextProvider } from './context/video-context';
import { BrowserRouter as Router } from 'react-router-dom';
const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <VideoContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </VideoContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
