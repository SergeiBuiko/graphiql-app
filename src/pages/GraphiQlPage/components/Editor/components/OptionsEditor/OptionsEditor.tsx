import { Box, Collapse, Icon, IconButton, Stack, Tooltip } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { IInvalidJsonError, OptionTabValue } from '../../types';
import { OptionTab } from '../OptionTab';
import { IEditorForm } from '../RequestEditor/RequestEditor';
import styles from './OptionsEditor.module.css';

type OptionsEditorProps = {
  invalidJsonErrors: IInvalidJsonError;
  register: UseFormRegister<IEditorForm>;
};

export const OptionsEditor: FC<OptionsEditorProps> = memo(
  ({ invalidJsonErrors, register }: OptionsEditorProps) => {
    const [activeOption, setactiveOption] = useState<OptionTabValue | null>();
    const toggleOption = useCallback((option: OptionTabValue | null) => {
      return () => setactiveOption(option);
    }, []);

    return (
      <>
        <Stack className={styles.tabs} direction="row" spacing={2}>
          <OptionTab
            toggleOption={toggleOption(OptionTabValue.Variables)}
            isActive={activeOption === OptionTabValue.Variables}
            error={invalidJsonErrors[OptionTabValue.Variables] || null}
          >
            Variables
          </OptionTab>
          <OptionTab
            toggleOption={toggleOption(OptionTabValue.Headers)}
            isActive={activeOption === OptionTabValue.Headers}
            error={invalidJsonErrors[OptionTabValue.Headers] || null}
          >
            Headers
          </OptionTab>
          <div
            className={styles.expandBtn}
            onClick={toggleOption(
              activeOption ? null : OptionTabValue.Variables
            )}
          >
            <IconButton size="small">
              <Icon>{activeOption ? 'expand_less' : 'expand_more'}</Icon>
            </IconButton>
          </div>
        </Stack>

        <Box width="100%">
          <Collapse in={!!activeOption}>
            <div className={styles.editorContainer}>
              {activeOption === 'Variables' ? (
                <textarea
                  key="variables"
                  {...register('variables')}
                  className={styles.editorField}
                />
              ) : (
                <textarea
                  key="headers"
                  {...register('headers')}
                  className={styles.editorField}
                />
              )}

              {activeOption && invalidJsonErrors[activeOption] ? (
                <Tooltip
                  title={invalidJsonErrors[activeOption]}
                  arrow={true}
                  placement="top"
                >
                  <Icon
                    className={styles.errorIcon}
                    color="error"
                    baseClassName="material-symbols-outlined"
                  >
                    info
                  </Icon>
                </Tooltip>
              ) : (
                ''
              )}
            </div>
          </Collapse>
        </Box>
      </>
    );
  }
);
