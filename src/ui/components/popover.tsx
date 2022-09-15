import { Popover, styled } from '@mui/material';

export const StyledPopOver = styled(Popover)(() => ({
  '&& .MuiPopover-paper': {
    minWidth: 196,
    maxWidth: 256,
    padding: 24,
    background: 'white',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 0
  }
}));
