import { Alert, Grid, Snackbar } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { RequestEditor } from './components/RequestEditor';
import { RequestResult } from './components/RequestResult';
import { IQuery } from './types';

interface GraphQlResponse {
  data: { [key: string]: unknown };
  errors?: Array<{ message: string }>;
}

async function getPokemons(query: IQuery) {
  const endpoint = 'https://graphqlpokemon.favware.tech/v7';
  const defaultHeaders = {
    'content-type': 'application/json',
  };
  const { headers, ...gqlData } = query;

  return axios({
    url: endpoint,
    method: 'post',
    headers: { ...headers, ...defaultHeaders },
    data: JSON.stringify(gqlData),
  }).then((res: GraphQlResponse) => {
    return res && Object.values(res.data);
  });
}

export const Editor = () => {
  const [result, setResult] = useState<string>();
  const [gqlError, setGqlError] = useState<string | null>();
  const [gqlErrorSnackbar, setGqlErrorSnackbar] = useState<boolean>();

  const handleSendQuery = useCallback((GQLQuery: IQuery) => {
    getPokemons(GQLQuery)
      .then((pokemons) => {
        setResult(JSON.stringify(pokemons, null, 2));
        setGqlError(null);
      })
      .catch((err) => {
        setGqlError(
          err.response?.data?.errors?.[0]?.message || 'Unhandled Graphql error'
        );
        setGqlErrorSnackbar(true);
      });
  }, []);

  const handleInvalidOptionError = useCallback((hasError: boolean) => {
    setGqlError(hasError ? 'Json Error in the Options editor' : null);
    setGqlErrorSnackbar(hasError);
  }, []);

  const handleClose = () => {
    setGqlErrorSnackbar(false);
  };

  return (
    <Grid height="100%" container spacing={2}>
      <Grid item xs={12} md={6}>
        <RequestEditor
          onSendQuery={handleSendQuery}
          onInvalidOptionError={handleInvalidOptionError}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <RequestResult result={result} error={gqlError} />
      </Grid>

      <Snackbar
        open={!!gqlErrorSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert severity="error">Error</Alert>
      </Snackbar>
    </Grid>
  );
};
