import FilterTabs from './FilterTabs';
import TableHeadActions from './TableHeadActions';
import UserTable from './UserTable';
import { Box } from '@mui/material';
import { FC } from 'react';
import { StyledCard } from 'src/shared-styled-components/dashboard';
import styled from 'styled-components';

const EndUserListContent: FC = () => {
  return (
    <StyledCard>
      <Box padding={3} sx={{ height: 'calc(100% - 101px)' }}>
        <FilterTabs />
        <TableStyledContainer mt={3}>
          <TableHeadActions />
          <UserTable />
        </TableStyledContainer>
      </Box>
    </StyledCard>
  );
};

export default EndUserListContent;

const TableStyledContainer = styled(Box)`
  && {
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px #00000033;
    border-radius: 8px 8px 20px 20px;
  }
`;
