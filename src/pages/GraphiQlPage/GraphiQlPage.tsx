import { Grid, Paper } from '@mui/material';
import { Documentation } from './components/Documentation';
import { Editor } from './components/Editor';

export function GraphiQlPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper>
          <Documentation />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <Editor />
        </Paper>
      </Grid>
    </Grid>
  );
}
