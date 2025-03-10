import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  // configure the apollo client to comunicate with a GraphQL server
  // cache: caches local the data from the server to avoid multiple requests
  // uri: the server address on which Apollo client is connected to
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  /**
   * ApolloProvider provides the Apollo client to all components in the application
   * allowing the use of useQuery or useMutation to communicate with the GraphQL server
   */

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
