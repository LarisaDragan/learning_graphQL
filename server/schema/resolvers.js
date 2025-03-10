const { UserList, MovieList } = require("../fakeData");
const _ = require("lodash");

// in Resolvers each type should have own resolvers functions for the fields defined in the typeDefinition (typeDef)

const resolvers = {
  //  function that make call to the DB, that do something will exists here
  //  first we define the highest level -> Query

  Query: {
    //   each field from the typeDefs has a corresponding resolver function from the Query field
    //   User resolver
    users: () => {
      return UserList;
    },
    // argument grabbed from a resolver function
    user: (parent, args, context, info) => {
      const id = args.id;
      const user = UserList.find((user) => user.id === Number(id));
      return user;
    },

    // Movie resolver
    movies: () => {
      return MovieList;
    },

    movie: (_, { name }) => {
      const movie = MovieList.find((movie) => movie.name === name);
      return movie;
    },
  },

  User: {
    favoriteMovies: () => {
      const favMovies = MovieList.filter(
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
      return favMovies;
    },
  },

  // mutation type -> functions related to mutating the data
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (_, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
