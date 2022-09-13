import {Link as RouterLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Avatar, Box, Button, CardMedia, Container, Grid, IconButton} from "@mui/material";
import {LogoContainer} from "../components/logo-container";
import GoWildNavCards from '../icons/GoWildNavCards';
import GoWildNavGuidelines from '../icons/GoWildNavGuidelines';
import GoWildNavRouteList from '../icons/GoWildNavRouteList';
import GoWildNavSubAdmins from '../icons/GoWildNavSubAdmins';
import GoWildNavSupport from '../icons/GoWildNavSupport';
import GoWildNavTreasureChestList from '../icons/GoWildNavTreasureChestList';
import GoWildNavTreasureHunt from '../icons/GoWildNavTreasureHunt';
import GoWildNavTreasureHuntEWaiver from '../icons/GoWildNavTreasureHuntEWaiver';
import GoWildNavUsers from '../icons/GoWildNavUsers';
import GoWildNavUsersRoute from '../icons/GoWildNavUsersRoute';
import GoWildNavHome from "../icons/GoWildNavHome";
import NavSection from "../components/nav-section";
import {removeToken} from "../../lib/store/auth.slice";
import {getLogger} from "../../lib/logging";
import {useAppDispatch} from "../../lib/store";
import {Helmet} from "react-helmet-async";
import Menu from "../icons/Menu";
import WorkspaceNotification from "../icons/WorkspaceNotification";
import {TitleIconButton} from "../components/buttons";
import {MenuDrawer} from "../components/drawers";
import {PageTitle} from "../components/title";

const logger = getLogger('DashboardSidebar');

const drawerWidth = 256;

const sections = [
    {
        id: 'General',
        items: [
            {
                title: 'Home',
                path: '/',
                icon: <GoWildNavHome fontSize='small'/>
            },
            {
                title: 'Sub Admins',
                path: '/dashboard/sub-admins',
                icon: <GoWildNavSubAdmins fontSize='small'/>
            },
            {
                title: 'Cards',
                path: '/dashboard/cards',
                icon: <GoWildNavCards fontSize='small'/>
            },
            {
                title: 'Route List',
                path: '/dashboard/route-lists',
                icon: <GoWildNavRouteList fontSize='small'/>
            },
            {
                title: 'Treasure Chest List',
                path: '/dashboard/treasure-chests',
                icon: <GoWildNavTreasureChestList fontSize='small'/>
            },
            {
                title: 'Users',
                path: '/dashboard/users-list',
                icon: <GoWildNavUsers fontSize='small'/>
            },
            {
                title: 'Users Route',
                path: '/dashboard/users-route',
                icon: <GoWildNavUsersRoute fontSize='small'/>
            },
            {
                title: 'Treasure Hunt',
                path: '/dashboard/treasure-hunt',
                icon: <GoWildNavTreasureHunt fontSize='small'/>
            },
            {
                title: 'Support',
                path: '/dashboard/support',
                icon: <GoWildNavSupport fontSize='small'/>
            },
            {
                title: 'Guidelines',
                path: '/dashboard/guidelines',
                icon: <GoWildNavGuidelines fontSize='small'/>
            },
            {
                title: 'Treasure Hunt E Waiver',
                path: '/dashboard/treasure-hunt-ewaiver',
                icon: <GoWildNavTreasureHuntEWaiver fontSize='small'/>
            }
        ]
    }
];

export function MainWrapper() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleLogout = async (): Promise<void> => {
        try {
            dispatch(removeToken());
            navigate('/');
        } catch (err) {
            logger.error('Cannot logout', err);
        }
    };
    const drawer = (
        <Box minHeight='100%'>
            <LogoContainer>
                <RouterLink to='/dashboard/account'>
                    <CardMedia sx={{height: '101px', width: '91px'}} image='/static/logo.svg'/>
                </RouterLink>
            </LogoContainer>
            <Box sx={{p: 2, pr: '10px', pl: '9px'}}>
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
            <Box sx={{p: 2}}>
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
        </Box>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <>
            <Helmet>
                <title>Dashboard | Go Wild</title>
            </Helmet>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                <MenuDrawer
                    drawerWidth={drawerWidth}
                    id='drawer-small-screen'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', md: 'none'},
                    }}
                >
                    {drawer}
                </MenuDrawer>
                <MenuDrawer
                    drawerWidth={drawerWidth}
                    id='drawer-large-screen'
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', md: 'block'},
                    }}
                    anchor="left"
                    open
                >
                    {drawer}
                </MenuDrawer>
            </Box>
            <Box
                component="main"
                bgcolor='#1D140C'
                minHeight='100vh'
                sx={{flexGrow: 1, width: {md: `calc(100% - ${drawerWidth}px)`}, ml: {md: `${drawerWidth}px`}}}
            >
                <Container>
                    <Grid container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Box display='flex' alignItems='center'>
                                <IconButton
                                    onClick={handleDrawerToggle}
                                    size="large"
                                    edge="start"
                                    color="default"
                                    aria-label="menu"
                                    sx={{
                                        mr: 2,
                                        width: '48px',
                                        height: '48px',
                                        display: {xs: 'block', md: 'none'},
                                    }}
                                >
                                    <Menu/>
                                </IconButton>
                                <PageTitle/>
                            </Box>
                        </Grid>

                        <Grid item>
                            <Box display='flex'>
                                <TitleIconButton size="large">
                                    <WorkspaceNotification/>
                                </TitleIconButton>
                                <Avatar
                                    src='/static/mock-images/avatars/gowild.png'
                                    sx={{width: 44, height: 44}}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>

                <Outlet/>
            </Box>
        </>
    )
}
