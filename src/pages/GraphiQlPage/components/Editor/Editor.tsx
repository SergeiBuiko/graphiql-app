import { Alert, Box, Grid, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { RequestEditor } from './components/RequestEditor';
import { RequestResult } from './components/RequestResult';
import { IQuery } from './types';
import styles from './Editor.module.css';
import { useForm } from 'react-hook-form';

interface GraphQlResponse {
  data: { [key: string]: unknown };
  errors?: Array<{ message: string }>;
}

async function makeRequest(api: string, query: IQuery): Promise<unknown> {
  const endpoint = 'https://graphqlpokemon.favware.tech/v7';
  const defaultHeaders = {
    'content-type': 'application/json',
  };
  const { headers, ...gqlData } = query;

  return axios({
    url: api,
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
  const { register, watch, getValues } = useForm<{ graphQLApi: string }>();
  const watchGraphQLApi = watch('graphQLApi');

  const handleSendQuery = useCallback(
    (GQLQuery: IQuery) => {
      makeRequest(watchGraphQLApi, GQLQuery)
        .then((pokemons) => {
          setResult(JSON.stringify(pokemons, null, 2));
          setGqlError(null);
        })
        .catch((err) => {
          setGqlError(
            err.response?.data?.errors?.[0]?.message ||
              err.message ||
              'Unhandled Graphql error'
          );
          setGqlErrorSnackbar(true);
        });
    },
    [watchGraphQLApi]
  );

  const handleInvalidOptionError = useCallback((hasError: boolean) => {
    setGqlError(hasError ? 'Json Error in the Options editor' : null);
    setGqlErrorSnackbar(hasError);
  }, []);

  const handleClose = () => {
    setGqlErrorSnackbar(false);
  };

  return (
    <Box className={styles.container}>
      <TextField
        {...register('graphQLApi')}
        label="GraphQLapi"
        variant="outlined"
        placeholder="Please enter some graphQL api"
      />

      <Box
        className={`${styles.editor} ${watchGraphQLApi ? '' : styles.disabled}`}
      >
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
      </Box>
    </Box>
  );
};
