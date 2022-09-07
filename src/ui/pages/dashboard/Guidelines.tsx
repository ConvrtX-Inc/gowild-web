import { Box } from '@mui/material';
import { FC } from 'react';
import { DashboardContentWrapper } from 'src/ui/components/dashboard/DashboardContentWrapper';
import { GuidelinesContent } from 'src/ui/components/dashboard/guidelines';

const Guidelines: FC = () => {
  return (
    <DashboardContentWrapper title='Guidelines' metaDataTitle='Guidelines'>
      <Box sx={{ mt: '27px', height: 'calc(100vh - 157px)' }}>
        <GuidelinesContent />
      </Box>
    </DashboardContentWrapper>
  );
};

export default Guidelines;
