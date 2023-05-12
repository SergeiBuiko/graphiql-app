import { Grid, Paper } from '@mui/material';
import { Documentation } from './components/Documentation';
import { Editor } from './components/Editor';
import styles from './GraphiQlPage.module.css';

export function GraphiQlPage() {
  return (
    <Grid
      container
      className={styles.content}
      spacing={2}
      alignItems={'stretch'}
    >
      <Grid item xs={4} wrap="nowrap">
        <Paper>
          <Documentation />
        </Paper>
      </Grid>
      <Grid item xs={8} minWidth="320px">
        <Paper className={styles.content}>
          <Editor />
        </Paper>
      </Grid>
    </Grid>
  );
}
