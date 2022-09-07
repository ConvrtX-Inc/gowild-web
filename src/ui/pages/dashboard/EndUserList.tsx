import { Box } from '@mui/material';
import { FC } from 'react';
import { DashboardContentWrapper } from 'src/ui/components/dashboard/DashboardContentWrapper';

const EndUserList: FC = () => {
  return (
    <DashboardContentWrapper title='Users'>
      <Box sx={{ mt: '27px' }}>EndUserListContent</Box>
    </DashboardContentWrapper>
  );
};

export default EndUserList;
