import { ChatSidebar, ChatThread } from '../../components/dashboard/chat';
import gtm from '../../lib/gtm';
import { getThreads } from '../../slices/chat';
import { useDispatch } from '../../store';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Chat: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch, getThreads]);

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
        <ChatThread />
      </Box>
    </>
  );
};

export default Chat;
