import React, { useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USER = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      isInTheaters
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");

  // create user states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  // graphQL hooks
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(QUERY_ALL_USER);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  // used to fetch data: 1st param - function that triggers the query when called, 2nd param - response from the GraphQL query: data/error
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (userLoading) {
    return <h1>Data is loading...</h1>;
  }

  if (userError) {
    console.log("An error is diaplayed: ", userError);
  }

  if (movieError) {
    console.log("Movie error:", movieError);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => {
            setNationality(event.target.value.toUpperCase());
          }}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create user
        </button>
      </div>
      <div>Users </div>
      {userData &&
        userData.users.map((user) => {
          return (
            <div key={user.id}>
              <h3>Name: {user.name}</h3>
              <h3>Username: {user.username}</h3>
              <h3>Age: {user.age}</h3>
              <h3>Nationality: {user.nationality}</h3>
            </div>
          );
        })}

      <div>Movies</div>
      {movieData &&
        movieData.movies.map((movie) => {
          return <h3>Movie Name: {movie.name}</h3>;
        })}

      <div>
        <input
          type="text"
          placeholder="Search a movie"
          onChange={(event) => setMovieSearched(event.target.value)}
        />
        <button
          onClick={() => fetchMovie({ variables: { name: movieSearched } })}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h3>Movie name: {movieSearchedData.movie.name}</h3>
              <h3>
                Year of publication: {movieSearchedData.movie.yearOfPublication}
              </h3>
            </div>
          )}
          {movieError && <h3>There was an error fetching the data</h3>}
        </div>
      </div>
    </div>
  );
}
export default DisplayData;
