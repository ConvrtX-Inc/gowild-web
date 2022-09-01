import {
  addRecipient,
  getParticipants,
  getThread,
  markThreadAsSeen,
  removeRecipient,
  resetActiveThread
} from '../../../slices/chat';
import { useDispatch, useSelector } from '../../../store';
import type { RootState } from '../../../store';
import ChatMessageAdd from './ChatMessageAdd';
import ChatMessages from './ChatMessages';
import ChatThreadComposer from './ChatThreadComposer';
import ChatThreadToolbar from './ChatThreadToolbar';
import { Box, Divider } from '@mui/material';
import { useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('ChatThread');

const threadSelector = (state: RootState): any => {
  const { threads, activeThreadId } = state.chat;
  const thread = threads.byId[activeThreadId];

  if (thread) {
    return thread;
  }

  return {
    id: null,
    messages: [],
    participants: [],
    unreadMessages: 0
  };
};

const ChatThread: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threadKey } = useParams();
  const { activeThreadId, participants, recipients } = useSelector((state) => state.chat);
  const thread = useSelector((state) => threadSelector(state));

  const getDetails = async (): Promise<void> => {
    dispatch(getParticipants(threadKey));

    try {
      await dispatch(getThread(threadKey));
    } catch (err) {
      dispatch(resetActiveThread());
      // If thread key is not a valid key (thread id or username)
      // the server throws an error, this means that the user tried a shady route
      // and we redirect him on the compose route
      logger.error(err);
      navigate('/dashboard/chat/new');
    }
  };

  useEffect(() => {
    if (threadKey) {
      getDetails();
    }
  }, [threadKey, getDetails]);

  useEffect(() => {
    if (activeThreadId) {
      dispatch(markThreadAsSeen(activeThreadId));
    }
  }, [activeThreadId, dispatch, markThreadAsSeen]);

  // In our case there two possible routes
  // one that contains chat/new and one with a chat/:threadKey
  // if threadKey does not exist, it means that the chat is in compose mode
  const mode = threadKey ? 'DETAIL' : 'COMPOSE';

  const handleAddRecipient = (recipient: any): void => {
    dispatch(addRecipient(recipient));
  };

  const handleRemoveRecipient = (recipientId: string): void => {
    dispatch(removeRecipient(recipientId));
  };

  const handleSendMessage = async (): Promise<void> => {
    try {
      // Handle send message
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}
    >
      {mode === 'DETAIL' && <ChatThreadToolbar participants={participants} />}
      {mode === 'COMPOSE' && (
        <ChatThreadComposer
          onAddRecipient={handleAddRecipient}
          onRemoveRecipient={handleRemoveRecipient}
          recipients={recipients}
        />
      )}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto'
        }}
      >
        <ChatMessages messages={thread.messages} participants={thread.participants} />
      </Box>
      <Divider />
      <ChatMessageAdd disabled={false} onSend={handleSendMessage} />
    </Box>
  );
};

export default ChatThread;
