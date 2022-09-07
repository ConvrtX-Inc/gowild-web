import { Box } from '@mui/material';
import { FC } from 'react';
import { DashboardContentWrapper } from 'src/ui/components/dashboard/DashboardContentWrapper';
import { TreasureChestCreateForm } from 'src/ui/components/dashboard/treasure-chest';
import { StyledCard } from 'src/ui/style/dashboard';

const pageTitle = 'New Treasure Chest';
const TreasureChestCreate: FC = () => {
  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard sx={{ minHeight: '500px', height: 'calc(100% - 87.5px)' }}>
        <Box pt={2} px={2}>
          <TreasureChestCreateForm />
        </Box>
      </StyledCard>
    </DashboardContentWrapper>
  );
};

export default TreasureChestCreate;
