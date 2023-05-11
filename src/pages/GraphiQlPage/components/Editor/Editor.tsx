import { gql } from '@apollo/client';
import { Pokemon } from '@favware/graphql-pokemon';
import { Grid } from '@mui/material';
import { WritableDraft } from 'immer/dist/internal';
import { useCallback, useState } from 'react';
import { PokemonApiClient } from '../../../../api';
import { RequestEditor } from './components/RequestEditor';
import { RequestResult } from './components/RequestResult';
import { IQuery } from './types';

async function getPokemons(query: string) {
  return PokemonApiClient.query<{
    getAllPokemon: WritableDraft<Pokemon>[];
  }>({
    query: gql`
      ${query}
    `,
    variables: { take: 10, offset: 100 },
  }).then((response) => response && response.data.getAllPokemon);
}

export const Editor = () => {
  const [result, setResult] = useState<string>();

  const handleSendQuery = useCallback((GQLQuery: IQuery) => {
    getPokemons(GQLQuery.query).then((pokemons) => {
      setResult(JSON.stringify(pokemons, null, 2));
    });
  }, []);

  return (
    <Grid height="100%" container spacing={2}>
      <Grid item xs={6}>
        <RequestEditor onSendQuery={handleSendQuery} />
      </Grid>

      <Grid item xs={6}>
        <RequestResult result={result} />
      </Grid>
    </Grid>
  );
};
