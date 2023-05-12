import { Button, Icon, Paper } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IInvalidJsonError, IQuery, OptionTabValue } from '../../types';
import { OptionsEditor } from '../OptionsEditor';
import styles from './RequestEditor.module.css';

export interface IEditorForm {
  query: string;
  variables: string;
  headers: string;
}

interface IRequestEditorProps {
  onSendQuery: (query: IQuery) => void;
  onInvalidOptionError: (hasError: boolean) => void;
}

function getJson(value: string): { [key: string]: unknown } | Error {
  try {
    return JSON.parse(value.trim() || '{}');
  } catch (err) {
    return err as Error;
  }
}

function getErrorMessage(error: unknown): string | null {
  if (error instanceof Error) {
    return error.message;
  }

  return null;
}

export const RequestEditor: FC<IRequestEditorProps> = memo(
  ({ onSendQuery, onInvalidOptionError }) => {
    const { register, getValues } = useForm<IEditorForm>({
      defaultValues: {
        variables: '{\n  \n}',
        headers: '{\n  \n}',
      },
    });
    const [invalidJsonErrors, setInvalidJsonErrors] =
      useState<IInvalidJsonError>({});

    const handleSendQuery = useCallback(async () => {
      const { query, variables, headers } = getValues();
      const options = {
        variables: getJson(variables),
        headers: getJson(headers),
      };

      setInvalidJsonErrors({
        [OptionTabValue.Variables]: getErrorMessage(options.variables),
        [OptionTabValue.Headers]: getErrorMessage(options.headers),
      });

      if (Object.values(options).some((value) => value instanceof Error)) {
        onInvalidOptionError(true);
        return;
      }

      onInvalidOptionError(false);

      await onSendQuery({
        query,
        variables: options.variables as { [key: string]: unknown },
        headers: options.headers as { [key: string]: unknown },
      });
    }, [onSendQuery]);

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

        <OptionsEditor
          invalidJsonErrors={invalidJsonErrors}
          register={register}
        ></OptionsEditor>
      </Paper>
    );
  }
);
