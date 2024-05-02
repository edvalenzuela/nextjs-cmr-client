import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})

let token;
const authLink = setContext((_, { headers }) => {
  //leer el storage almacenado
  token = localStorage.getItem('token');
  
  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client