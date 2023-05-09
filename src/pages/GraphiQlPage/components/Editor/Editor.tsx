import { gql } from '@apollo/client';
import { Pokemon } from '@favware/graphql-pokemon';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { WritableDraft } from 'immer/dist/internal';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PokemonApiClient } from '../../../../api';
import styles from './Editor.module.css';

type Tool = 'Variables' | 'Headers';

async function getPokemons(query: string) {
  return PokemonApiClient.query<{
    getAllPokemon: WritableDraft<Pokemon>[];
  }>({
    query: gql`
      ${query}
    `,
    variables: { take: 20, offset: 100 },
  }).then((response) => response && response.data.getAllPokemon);
}

export function Editor() {
  const { register, getValues, reset } = useForm<{
    query: string;
    variables: string;
    headers: string;
  }>({
    defaultValues: {
      headers: '{ }',
    },
  });
  const [result, setResult] = useState<string>();
  const [openTool, setOpenTool] = useState<'Variables' | 'Headers' | null>();
  const containerRef = useRef(null);

  const playCb = useCallback(() => {
    getPokemons(getValues().query).then((pokemons) => {
      setResult(JSON.stringify(pokemons, null, 2));
    });
  }, []);

  const toggleTools = useCallback((tool: Tool | null) => {
    setOpenTool(tool);
  }, []);

  return (
    <Grid className={styles.content} container spacing={2}>
      <Grid item xs={8}>
        <Paper className={styles.editor}>
          <div className={styles.playBtn}>
            <textarea
              {...register('query')}
              className={styles.editorField}
            ></textarea>

            <div className={styles.toolsContainer}>
              <Button variant="contained" onClick={playCb}>
                {/* <Icon>play</Icon> */}
                <Icon>play_arrow</Icon>
              </Button>
            </div>
          </div>

          <Stack className={styles.toolsTabs} direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => toggleTools('Variables')}>
              Variables
            </Button>
            <Button variant="outlined" onClick={() => toggleTools('Headers')}>
              Headers
            </Button>

            <div
              className={styles.expandBtn}
              onClick={() => toggleTools(openTool ? null : 'Variables')}
            >
              <Button size="small">
                <Icon>{openTool ? 'expand_less' : 'expand_more'}</Icon>
              </Button>
            </div>
          </Stack>

          <Box className={styles.variablesContainer}>
            <Collapse in={openTool === 'Variables'}>
              {/* &#123; */}
              <textarea
                {...register('variables')}
                className={styles.editorField}
              ></textarea>
              {/* &#125; */}
            </Collapse>

            <Collapse in={openTool === 'Headers'}>
              <textarea
                {...register('headers')}
                className={styles.editorField}
              ></textarea>
            </Collapse>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={4}>
        <Box className={styles.responseContainer} padding="8px">
          <Typography className={styles.response}>{result}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
