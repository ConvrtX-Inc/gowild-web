import { AddAPhoto, AttachFile, Send } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, TextField, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
import { useAuth } from 'src/lib/hooks/use-auth';

interface ChatMessageAddProps {
  disabled?: boolean;
  onSend?: (value: string) => void;
}

const ChatMessageAdd: FC<ChatMessageAddProps> = (props) => {
  const { disabled, onSend, ...other } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth();
  const [body, setBody] = useState<string>('');

  const handleAttach = (): void => {
    fileInputRef.current.click();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setBody(event.target.value);
  };

  const handleSend = (): void => {
    if (!body) {
      return;
    }

    onSend?.(body);
    setBody('');
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'ENTER') {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexShrink: 0,
        px: 2,
        py: 1
      }}
      {...other}
    >
      <Avatar
        sx={{
          display: {
            xs: 'none',
            sm: 'inline'
          },
          mr: 2
        }}
        src={user.picture}
      />
      <TextField
        disabled={disabled}
        fullWidth
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder='Leave a message'
        value={body}
        size='small'
        variant='outlined'
      />
      <Tooltip title='Send'>
        <span>
          <IconButton color='primary' disabled={!body || disabled} onClick={handleSend}>
            <Send fontSize='small' />
          </IconButton>
        </span>
      </Tooltip>
      <Box
        sx={{
          alignItems: 'center',
          display: {
            xs: 'none',
            sm: 'flex'
          }
        }}
      >
        <Divider orientation='vertical' sx={{ height: 24 }} />
        <Tooltip title='Attach photo'>
          <span>
            <IconButton disabled={disabled} edge='end' onClick={handleAttach}>
              <AddAPhoto fontSize='small' />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title='Attach file'>
          <span>
            <IconButton disabled={disabled} edge='end' onClick={handleAttach}>
              <AttachFile fontSize='small' />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <input hidden ref={fileInputRef} type='file' />
    </Box>
  );
};

ChatMessageAdd.propTypes = {
  disabled: PropTypes.bool,
  onSend: PropTypes.func
};

ChatMessageAdd.defaultProps = {
  disabled: false
};

export default ChatMessageAdd;
