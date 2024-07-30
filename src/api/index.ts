import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const httpLink = createHttpLink({
  uri: "https://proplan.work/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getTokenStorage();

  return {
    headers: {
      ...headers,
      Authorization: token ? `bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

const TOKEN_FIELD = "token";

export const setTokenStorage = (token: string) => {
  localStorage.setItem(TOKEN_FIELD, token);
};

export const deleteTokenStorage = () => {
  localStorage.removeItem(TOKEN_FIELD);
};

const getTokenStorage = () => {
  return localStorage.getItem(TOKEN_FIELD) || null;
};

export const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!) {
    login(login: $login, password: $password) {
      accessToken
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query getProducts {
    products {
      id
      name
      company {
        id
        name
      }
    }
  }
`;
