import { Alert, Box, Grid, Snackbar, TextField } from '@mui/material';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import translate from '../../../../i18n/translate';
import styles from './Editor.module.css';
import { RequestEditor } from './components/RequestEditor';
import { RequestResult } from './components/RequestResult';
import { IQuery } from './types';

interface GraphQlResponse {
  data: { [key: string]: unknown };
  errors?: Array<{ message: string }>;
}

async function makeRequest(api: string, query: IQuery): Promise<unknown> {
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
  const { register, watch } = useForm<{ graphQLApi: string }>({
    defaultValues: {
      graphQLApi: 'https://rickandmortyapi.graphcdn.app/',
    },
  });
  const watchGraphQLApi = watch('graphQLApi');
  const intl = useIntl();

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
              intl.formatMessage({ id: 'editorGraphQLUnhandledError' })
          );
          setGqlErrorSnackbar(true);
        });
    },
    [watchGraphQLApi, intl.formatMessage]
  );

  const handleInvalidOptionError = useCallback(
    (hasError: boolean) => {
      setGqlError(
        hasError ? intl.formatMessage({ id: 'editorOptionsJsonError' }) : null
      );
      setGqlErrorSnackbar(hasError);
    },
    [intl.formatMessage]
  );

  const handleClose = () => {
    setGqlErrorSnackbar(false);
  };

  return (
    <Box className={styles.container}>
      <TextField
        {...register('graphQLApi')}
        label="GraphQLapi"
        variant="outlined"
        disabled
        placeholder={intl.formatMessage({ id: 'editorGraphQLApiPlaceholder' })}
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
            <Alert severity="error">{translate('editorAlertError')}</Alert>
          </Snackbar>
        </Grid>
      </Box>
    </Box>
  );
};
