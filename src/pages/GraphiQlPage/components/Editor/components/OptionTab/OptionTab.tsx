import { Button } from '@mui/material';
import { PropsWithChildren, memo } from 'react';

type OptionTabProps = {
  isActive: boolean;
  error: string | null;
  toggleOption: () => void;
};

export const OptionTab = memo(
  ({
    isActive,
    error,
    toggleOption,
    children,
  }: PropsWithChildren<OptionTabProps>) => {
    return (
      <Button
        variant={isActive ? 'contained' : 'outlined'}
        onClick={toggleOption}
        color={error ? 'error' : 'primary'}
      >
        {children}
      </Button>
    );
  }
);
