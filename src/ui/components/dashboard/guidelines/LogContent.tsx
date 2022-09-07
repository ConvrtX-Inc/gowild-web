import LogItem from './LogItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { FC } from 'react';
import { GuidelineLog } from 'src/types/guidelines';
import styled from 'styled-components';

interface LogContentProps {
  logs: GuidelineLog[];
}

const LogContent: FC<LogContentProps> = ({ logs }) => {
  return (
    <LogBox pl={2}>
      <TitleHeading variant='h5' mb={2}>
        {logs !== null && logs.length > 0 && format(new Date(logs[0].last_update_date), 'PP')}
      </TitleHeading>
      <Typography sx={{ opacity: '0.3', fontFamily: 'Poppins' }}>Update Logs</Typography>
      {logs?.map((_, i, logsArr) => {
        const item = logsArr[logsArr.length - 1 - i];
        return (
          <LogItem date={item.last_update_date} type={item.guideline_type} key={`${item.id}`} />
        );
      })}
    </LogBox>
  );
};

export default LogContent;

const TitleHeading = styled(Typography)`
  && {
    color: #000;
    font-weight: 700;
    font-family: 'Gilroy SemiBold', 'Gilroy Bold';
  }
`;

const LogBox = styled(Box)`
  && {
    height: 100%;
    border-left: 1px dashed rgba(0, 0, 0, 0.2);
    color: #979797;
    overflow-y: auto;
  }
`;
