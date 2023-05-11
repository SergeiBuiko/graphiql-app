import { Box, Button, Collapse, Icon, Paper, Stack } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IQuery } from '../../types';
import styles from './RequestEditor.module.css';

type Tool = 'Variables' | 'Headers';

interface IRequestEditorProps {
  onSendQuery: (query: IQuery) => void;
}

export const RequestEditor: FC<IRequestEditorProps> = memo(
  ({ onSendQuery }) => {
    const [openTool, setOpenTool] = useState<'Variables' | 'Headers' | null>();
    const { register, getValues, reset } = useForm<{
      query: string;
      variables: string;
      headers: string;
    }>({
      defaultValues: {
        headers: '{ }',
      },
    });

    const handleSendQuery = useCallback(async () => {
      const queryValue = getValues();

      await onSendQuery(queryValue);
    }, [onSendQuery]);

    const toggleTools = useCallback((tool: Tool | null) => {
      return () => setOpenTool(tool);
    }, []);

    return (
      <Paper className={styles.editor}>
        <div className={styles.playBtn}>
          <textarea
            {...register('query')}
            className={styles.editorField}
          ></textarea>

          <div className={styles.toolsContainer}>
            <Button variant="contained" onClick={handleSendQuery}>
              <Icon>play_arrow</Icon>
            </Button>
          </div>
        </div>

        <Stack className={styles.toolsTabs} direction="row" spacing={2}>
          <Button
            variant={openTool === 'Variables' ? 'contained' : 'outlined'}
            onClick={toggleTools('Variables')}
          >
            Variables
          </Button>
          <Button
            variant={openTool === 'Headers' ? 'contained' : 'outlined'}
            onClick={toggleTools('Headers')}
          >
            Headers
          </Button>

          <div
            className={styles.expandBtn}
            onClick={toggleTools(openTool ? null : 'Variables')}
          >
            <Button size="small">
              <Icon>{openTool ? 'expand_more' : 'expand_less'}</Icon>
            </Button>
          </div>
        </Stack>

        <Box width="100%">
          <Collapse in={!!openTool}>
            {openTool === 'Variables' ? (
              <textarea
                {...register('variables')}
                className={styles.editorField}
              />
            ) : (
              <textarea
                {...register('headers')}
                className={styles.editorField}
              />
            )}
          </Collapse>
        </Box>
      </Paper>
    );
  }
);
