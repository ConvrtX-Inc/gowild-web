import useSettings from '../../../lib/hooks/useSettings';
import { RouteCreateForm } from '../../components/dashboard/route-list';
import NotificationIcon from '../../icons/WorkspaceNotification';
import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const RouteListCreate: FC = () => {
  const { settings } = useSettings();
  return (
    <>
      <Helmet>
        <title>Route List Add | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          // backgroundColor: "background.default",
          backgroundColor: '#1D140C',
          minHeight: '100%',
          pt: '55px',
          pb: '61px'
        }}
      >
        <StyledContainer
          maxWidth={settings.compact ? 'xl' : false}
          sx={{ pl: '28px !important', pr: '89px !important' }}
        >
          <Grid container justifyContent='space-between'>
            <Grid item>
              <ContentTitleTypography>Normal Route</ContentTitleTypography>
            </Grid>
            <FlexiGrid item>
              <IconBox>
                <IconButton>
                  <NotificationIcon />
                </IconButton>
              </IconBox>
              <Box>
                <Avatar
                  src='/static/mock-images/avatars/gowild.png'
                  sx={{ width: 44, height: 44 }}
                />
              </Box>
            </FlexiGrid>
          </Grid>
          <Box sx={{ mt: '27px' }}>
            <RouteCreateForm />
          </Box>
        </StyledContainer>
      </Box>
    </>
  );
};

export default RouteListCreate;

const StyledContainer = styled(Container)`
  && {
    padding-left: '70px !important';
    padding-right: '60px !important';
  }
`;

const ContentTitleTypography = styled(Typography)`
  && {
    font-family: 'Samsung Sharp Sans Bold';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 50px;
    color: #ffffff;
    margin-left: 38px;
  }
`;

const FlexiGrid = styled(Grid)`
  && {
    /* padding-left: 8px; */
    margin-bottom: 7.5px;
    width: 353px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
`;

const IconBox = styled(Box)`
  && {
    width: 48px;
    height: 48px;
    background: #ffffff;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    margin-left: auto;
    margin-right: 71px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
