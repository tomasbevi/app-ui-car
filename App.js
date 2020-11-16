import React, {useEffect} from 'react';
import { ApolloClient , createHttpLink , InMemoryCache , ApolloProvider, from } from '@apollo/client';
import fetch from 'node-fetch';
import {setContext} from 'apollo-link-context'
import * as SecureStore from 'expo-secure-store';
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes.js';

console.disableYellowBox = true;

const httpLink = createHttpLink({
  uri: 'http://rapicar-api.herokuapp.com/graphql' , fetch
})


  const authLink = setContext(async (req, { headers }) => {
    const token = await SecureStore.getItemAsync('token');
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      },
    };
  });

  const apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: from([authLink, httpLink])
    })

    

  const App = () => {
    return (
      <ApolloProvider client={apolloClient}>
          <Provider store={store}>
              <Routes /> 
         </Provider>
      </ApolloProvider>
    );
  };
  
  export default App;
  


