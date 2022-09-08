import { ChatSidebar } from '../../components/dashboard/chat';
import { Box, Typography } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Chat: FC = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard: Support | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          height: '100%'
        }}
      >
        <ChatSidebar />

        <Typography>Thread is coming soon</Typography>
      </Box>
    </>
  );
};

export default Chat;
