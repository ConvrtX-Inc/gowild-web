import { useEffect } from "react";
import type { FC } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, CardMedia, Drawer } from "@mui/material";
import type { Theme } from "@material-ui/core";
import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import useAuth from "../../hooks/useAuth";

import DashboardIcon from "../../icons/NexxusNavDashboard";
import WorkspaceReceivedIcon from "../../icons/NexxusNavWorkspaceReceived";
import JurisdictionsIcon from "../../icons/NexxusNavJurisdictions";
import SupportIcon from "../../icons/NexxusNavSupport";
import GuidelinesIcon from "../../icons/NexxusNavGuidelines";
import VideoCallTrialIcon from "../../icons/NexxusNavVideoCallTrial";
import NavSection from "../NavSection";
import Scrollbar from "../Scrollbar";

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    id: "General",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: <DashboardIcon fontSize="small" />,
      },
      {
        title: "Workspace Received",
        path: "/dashboard/workspace-received",
        icon: <WorkspaceReceivedIcon fontSize="small" />,
      },
      {
        title: "Jurisdictions",
        path: "/dashboard/jurisdictions",
        icon: <JurisdictionsIcon fontSize="small" />,
      },
      {
        title: "Support",
        path: "/dashboard/chat",
        icon: <SupportIcon fontSize="small" />,
      },
      {
        title: "Guidelines",
        path: "/dashboard/guidelines",
        icon: <GuidelinesIcon fontSize="small" />,
      },
      {
        title: "Video Call Trial",
        path: "/dashboard/video-call-trial",
        icon: <VideoCallTrialIcon fontSize="small" />,
      },
    ],
  },
];

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <LogoContainer>
          <RouterLink to="/dashboard/account">
            <CardMedia
              sx={{ height: "47.91px", width: "47.91px" }}
              image="/static/logo.svg"
            />
          </RouterLink>
        </LogoContainer>
        <Box sx={{ p: 2, pr: "23px", pl: "23px" }}>
          {sections.map((section) => (
            <NavSection
              key={section.id}
              pathname={location.pathname}
              sx={{
                "& + &": {
                  mt: 3,
                },
              }}
              {...section}
            />
          ))}
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            sx={{
              color: "rgba(9, 17, 14, 0.5)",
              borderColor: "rgba(9, 17, 14, 0.5)",
            }}
            fullWidth
            onClick={handleLogout}
            variant="outlined"
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
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "background.paper",
            // height: "calc(100% - 64px) !important",
            minHeight: "920px",
            top: "0px !Important",
            width: "251px",
            borderRight: 0,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{
        sx: {
          backgroundColor: "background.paper",
          width: 251,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default DashboardSidebar;

const LogoContainer = styled(Box)`
  && {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    overflow: hidden;
    padding: 16px 16px 26px 23px;
    margin: 43px 0 0 0;
  }
`;
