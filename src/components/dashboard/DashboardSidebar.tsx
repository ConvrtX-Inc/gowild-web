import useAuth from '../../hooks/useAuth';
import CardsIcon from '../../icons/GoWildNavCards';
import GuidelinesIcon from '../../icons/GoWildNavGuidelines';
import HomeIcon from '../../icons/GoWildNavHome';
import RouteListIcon from '../../icons/GoWildNavRouteList';
import SubAdminsIcon from '../../icons/GoWildNavSubAdmins';
import SupportIcon from '../../icons/GoWildNavSupport';
import TreasureChestListIcon from '../../icons/GoWildNavTreasureChestList';
import TreasureHuntIcon from '../../icons/GoWildNavTreasureHunt';
import TreasureHuntEWaiverIcon from '../../icons/GoWildNavTreasureHuntEWaiver';
import UsersIcon from '../../icons/GoWildNavUsers';
import UsersRouteIcon from '../../icons/GoWildNavUsersRoute';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import type { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Box, Button, CardMedia, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('DashboardSidebar');

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    id: 'General',
    items: [
      {
        title: 'Home',
        path: '/',
        icon: <HomeIcon fontSize='small' />
      },
      {
        title: 'Sub Admins',
        path: '/dashboard/sub-admins',
        icon: <SubAdminsIcon fontSize='small' />
      },
      {
        title: 'Cards',
        path: '/dashboard/cards',
        icon: <CardsIcon fontSize='small' />
      },
      {
        title: 'Route List',
        path: '/dashboard/route-list',
        icon: <RouteListIcon fontSize='small' />
      },
      {
        title: 'Treasure Chest List',
        path: '/dashboard/treasure-chest-list',
        icon: <TreasureChestListIcon fontSize='small' />
      },
      {
        title: 'Users',
        path: '/dashboard/users-list',
        icon: <UsersIcon fontSize='small' />
      },
      {
        title: 'Users Route',
        path: '/dashboard/users-route',
        icon: <UsersRouteIcon fontSize='small' />
      },
      {
        title: 'Treasure Hunt',
        path: '/dashboard/treasure-hunt',
        icon: <TreasureHuntIcon fontSize='small' />
      },
      {
        title: 'Support',
        path: '/dashboard/support',
        icon: <SupportIcon fontSize='small' />
      },
      {
        title: 'Guidelines',
        path: '/dashboard/guidelines',
        icon: <GuidelinesIcon fontSize='small' />
      },
      {
        title: 'Treasure Hunt E Waiver',
        path: '/dashboard/treasure-hunt-ewaiver',
        icon: <TreasureHuntEWaiverIcon fontSize='small' />
      }
    ]
  }
];

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      logger.error(err);
    }
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <LogoContainer>
          <RouterLink to='/dashboard/account'>
            <CardMedia sx={{ height: '101px', width: '91px' }} image='/static/logo.svg' />
          </RouterLink>
        </LogoContainer>
        <Box sx={{ p: 2, pr: '10px', pl: '9px' }}>
          {sections.map((section) => (
            <NavSection
              key={section.id}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            sx={{
              color: 'rgba(255,255,255, 1)',
              borderColor: 'rgba(255,255,255, 1)'
            }}
            fullWidth
            onClick={handleLogout}
            variant='outlined'
          >
            Logout
          </Button>
        </Box>
      </Scrollbar>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: '#2995A8',
            // backgroundColor: "background.paper",
            // height: "calc(100% - 64px) !important",
            minHeight: '920px',
            top: '0px !Important',
            width: '239px',
            borderRight: 0
          }
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          width: '239px'
        }
      }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;

const LogoContainer = styled(Box)`
  && {
    align-items: center;
    background-color: #2995a8;
    display: flex;
    overflow: hidden;
    padding: 0 74px 0 74px;
    margin: 50px 0 24.02px 0;
  }
`;
