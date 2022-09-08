import type { Participant } from '../../../../types/chat';
import ArchiveIcon from '../../../icons/Archive';
import BanIcon from '../../../icons/Ban';
import BellIcon from '../../../icons/Bell';
import CameraIcon from '../../../icons/Camera';
import DotsHorizontalIcon from '../../../icons/DotsHorizontal';
import PhoneIcon from '../../../icons/Phone';
import TrashIcon from '../../../icons/Trash';
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  experimentalStyled
} from '@mui/material';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { useRef, useState } from 'react';

interface ChatThreadToolbarProps {
  participants: Participant[];
}

const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants, ...other } = props;
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // We hardcode the current user ID because the mocked that is not in sync with the auth provider.
  // When implementing this app with a real database, replace this ID with the ID from Auth Context.
  const otherParticipants = participants.filter(
    (participant) => participant.id !== '5e86809283e28b96d2d38537'
  );
  const displayNames = otherParticipants
    .reduce((names, participant) => [...names, participant.name], [])
    .join(', ');

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexShrink: 0,
        minHeight: 64,
        px: 2,
        py: 1
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          '& .MuiAvatar-root': otherParticipants.length > 1 && {
            height: 30,
            width: 30,
            '&:nth-of-type(2)': {
              mt: '10px'
            }
          }
        }}
      >
        <AvatarGroup max={2}>
          {otherParticipants.map((participant) => (
            <Avatar
              key={participant.id}
              src={participant.avatar}
              sx={{
                width: otherParticipants.length > 1 ? 30 : undefined,
                height: otherParticipants.length > 1 ? 30 : undefined
              }}
            />
          ))}
        </AvatarGroup>
        <Typography color='textPrimary' sx={{ ml: 2 }} variant='subtitle2'>
          {displayNames}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <PhoneIcon fontSize='small' />
      </IconButton>
      <IconButton>
        <CameraIcon fontSize='small' />
      </IconButton>
      <Tooltip title='More options'>
        <IconButton onClick={handleMenuOpen} ref={moreRef}>
          <DotsHorizontalIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        keepMounted
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <BanIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Block contact' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TrashIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Delete thread' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Archive thread' />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BellIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Mute notifications' />
        </MenuItem>
      </Menu>
    </Box>
  );
};

ChatThreadToolbar.propTypes = {
  participants: PropTypes['array']
};

ChatThreadToolbar.defaultProps = {
  participants: []
};

export default ChatThreadToolbar;