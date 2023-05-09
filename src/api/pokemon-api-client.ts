import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Query } from '@favware/graphql-pokemon';

export type GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> =
  {
    data: Record<K, Omit<Query[K], '__typename'>>;
  };

const cache = new InMemoryCache();

export const PokemonApiClient = new ApolloClient({
  cache: cache,
  uri: 'https://graphqlpokemon.favware.tech/v7',
  name: 'graphql-pokemon-client',
  version: '1.0',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
