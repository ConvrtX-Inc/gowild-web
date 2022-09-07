import { useAppDispatch } from '../../../lib/store';
import UsersIcon from '../../icons/Users';
import { Box, IconButton, Popover, Tooltip, Typography } from '@mui/material';
import type { FC } from 'react';
import { useRef, useState } from 'react';

const ContactsPopover: FC = () => {
  const dispatch = useAppDispatch();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='Contacts'>
        <IconButton color='inherit' onClick={handleOpen} ref={anchorRef}>
          <UsersIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            p: 2,
            width: 320
          }
        }}
      >
        <Typography color='textPrimary' variant='h6'>
          Contacts
        </Typography>
        <Box sx={{ mt: 2 }}>Contacts</Box>
      </Popover>
    </>
  );
};

export default ContactsPopover;
