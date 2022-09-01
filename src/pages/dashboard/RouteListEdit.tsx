import { RouteEditForm } from '../../components/dashboard/route-list';
import useMounted from '../../hooks/useMounted';
import useSettings from '../../hooks/useSettings';
import NotificationIcon from '../../icons/WorkspaceNotification';
import gtm from '../../lib/gtm';
import { setRouteListIsLoading } from '../../slices/route-list';
import { useDispatch } from '../../store';
import type { SingleRoute } from '../../types/route-lists';
import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('Route Edit');

const RouteListEdit: FC = () => {
  const { state } = useLocation();
  const { routeId } = state as any;
  const mounted = useMounted();
  const { settings } = useSettings();
  const dispatch = useDispatch();
  const [selectedRoute, setSelectedRoute] = useState<SingleRoute[]>([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getOneRoute = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('token');
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route/${routeId}`;
      const CONFIG = {
        headers: {
          Authorization: `bearer ${token}`
        }
      };
      const apiResponse = await axios.get(URL, CONFIG);
      logger.debug('Route Lists', apiResponse.data);
      dispatch(setRouteListIsLoading(false));

      if (mounted.current) {
        setSelectedRoute(apiResponse.data);
      }
    } catch (err) {
      logger.error(err);
    }
  }, [mounted, dispatch, routeId]);

  // INITIAL LOAD LIST
  useEffect(() => {
    getOneRoute();
  }, [getOneRoute]);

  return (
    <>
      <Helmet>
        <title>Route List Edit | Go Wild</title>
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
            <RouteEditForm singleRoute={selectedRoute} />
          </Box>
        </StyledContainer>
      </Box>
    </>
  );
};

export default RouteListEdit;

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
