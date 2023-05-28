import { Grid, Paper } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Editor } from './components/Editor';
import styles from './GraphiQlPage.module.css';
import { Loading } from '../../components/Loading';

const Documentation = lazy(() =>
  import('./components/Documentation').then(({ Documentation }) => ({
    default: Documentation,
  }))
);

export function GraphiQlPage() {
  return (
    <Grid
      container
      className={styles.content}
      spacing={2}
      alignItems={'stretch'}
    >
      <Grid item xs={12} sm={4}>
        <Paper>
          <Suspense fallback={<Loading />}>
            <Documentation />
          </Suspense>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} minWidth="320px">
        <Paper className={styles.content}>
          <Editor />
        </Paper>
      </Grid>
    </Grid>
  );
}
