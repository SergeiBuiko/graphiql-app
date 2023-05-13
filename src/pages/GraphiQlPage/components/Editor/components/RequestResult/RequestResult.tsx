import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './RequestResults.module.css';

interface IRequestResultProps {
  result?: string;
  error?: string | null;
}

export const RequestResult: FC<IRequestResultProps> = memo(
  ({ result = '', error }) => {
    return (
      <Box className={styles.responseContainer}>
        {error ? (
          <Typography color="error" className={styles.response}>
            {error}
          </Typography>
        ) : (
          <p className={styles.response}>{result}</p>
        )}
      </Box>
    );
  }
);
