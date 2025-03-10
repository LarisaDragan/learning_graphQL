const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/typeDefinitions");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/* 
typeDefs => all code (type, query) defined in graphQL will exists in this variable
resolver => functions that resolve those types (above), all the calls to API/DB  
*/

server.listen().then(({ url }) => {
  console.log(`API is running at ${url}`);
});
