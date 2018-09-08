import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
// import { createUploadLink } from 'apollo-upload-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

dotenv.config();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL || 'http://localhost:8081',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const Xtoken = localStorage.getItem('token');
  const XrefreshToken = localStorage.getItem('refreshToken');
  // return the headers to the context so httpLink can read them
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Xtoken,
      XrefreshToken,
    },
  }));

  return forward(operation);
});

const authLink = setContext((_, { headers }) => {
  const { xtoken, xrefreshToken } = headers;

  const token = xtoken;
  const refreshToken = xrefreshToken;

  if (token) {
    localStorage.setItem('token', token);
  }

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
});

const client = new ApolloClient({
  link: from([authMiddleware, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
