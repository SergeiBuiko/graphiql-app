import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './RequestResults.module.css';

interface IRequestResultProps {
  result?: string;
}

export const RequestResult: FC<IRequestResultProps> = memo(
  ({ result = '' }) => {
    return (
      <Box className={styles.responseContainer} padding="8px 0">
        <Typography className={styles.response}>{result}</Typography>
      </Box>
    );
  }
);
