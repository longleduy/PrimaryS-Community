/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { ApolloLink,split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import merge from 'lodash/merge';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import { name as appName } from './app.json';
import { userInfoLocalState } from './src/graphql/localStates/userInfoLocalState'

const cache = new InMemoryCache({});
const stateLink = withClientState({
  cache,
  ...merge(userInfoLocalState),
})
//Todo: Websocket link
const wsLink = new WebSocketLink({
  uri: 'ws://192.168.137.1:4000/graphql',
  options: {
    reconnect: true,
  },
  credentials: 'include'
});
//Todo: Http link
const httpLink = createHttpLink({
  uri: 'http://192.168.137.1:4000/graphql',
  credentials: 'include'
});
//Todo: Apollo link context
const contextLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@token');
  //const token = JSON.parse(localStorage.getItem('token'));
  if (token != null && token != '') {
    return {
      headers: {
        ...headers,
        authorization: `Beare ${token}`
      }
    }
  }
})
const link = ApolloLink.from([stateLink, contextLink, split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)]);
const client = new ApolloClient({
  resolvers: {
    Mutation: {
      mutationUserInfo: (_, args, { cache }) => {
        cache.writeData({
          data: {
            queryUserInfo: {
              __typename: 'UserInfo',
              userID: args.userInfo.userID,
              isAuthen: args.userInfo.isAuthen,
              profileName: args.userInfo.profileName,
              email: args.userInfo.email,
              gender: args.userInfo.gender,
              dateOfBirth: args.userInfo.dateOfBirth,
              avatar: args.userInfo.avatar
            }
          }
        })
        return null
      }
    }
  },
  link,
  cache
});
const data = {
  queryUserInfo: {
    __typename: 'UserInfo',
    userID: null,
    isAuthen: false,
    profileName: null,
    email: null,
    avatar: null,
    dateOfBirth: null,
    gender: null
  }
}
client.onResetStore(() => cache.writeData({ data }));
export default function Main() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ApolloProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
