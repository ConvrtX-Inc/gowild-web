import ArchiveIcon from '../icons/Archive';
import DocumentTextIcon from '../icons/DocumentText';
import DotsHorizontalIcon from '../icons/DotsHorizontal';
import DownloadIcon from '../icons/Download';
import DuplicateIcon from '../icons/Duplicate';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import type { FC } from 'react';
import { memo, useRef, useState } from 'react';

const MoreMenu: FC = (props) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title='More options'>
        <IconButton onClick={handleMenuOpen} ref={anchorRef} {...props}>
          <DotsHorizontalIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{
          sx: {
            maxWidth: '100%',
            width: 256
          }
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <DownloadIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Import' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DocumentTextIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Export' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DuplicateIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Copy' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Archive' />
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(MoreMenu);
