import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { jurisdictionApi } from "../../__fakeApi__/jurisdictionApi";
import { RouteListTable } from "../../components/dashboard/route-list";
import useMounted from "../../hooks/useMounted";
import NotificationIcon from "../../icons/WorkspaceNotification";
import useSettings from "../../hooks/useSettings";
import gtm from "../../lib/gtm";
import type { Jurisdiction } from "../../types/jurisdiction";

const RouteList: FC = () => {
  const mounted = useMounted();
  const { settings } = useSettings();
  const [workspaces, setWorkspaces] = useState<Jurisdiction[]>([]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const getWorkspaces = useCallback(async () => {
    try {
      const data = await jurisdictionApi.getWorkspaces();

      if (mounted.current) {
        setWorkspaces(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  useEffect(() => {
    getWorkspaces();
  }, [getWorkspaces]);

  return (
    <>
      <Helmet>
        <title>Workspace | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          // backgroundColor: "background.default",
          backgroundColor: "#1D140C",
          minHeight: "100%",
          pt: "55px",
          pb: "61px",
        }}
      >
        <StyledContainer
          maxWidth={settings.compact ? "xl" : false}
          sx={{ pl: "70px !important", pr: "60px !important" }}
        >
          <Grid container justifyContent="space-between">
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
                  src="/static/mock-images/avatars/gowild.png"
                  sx={{ width: 44, height: 44 }}
                />
              </Box>
            </FlexiGrid>
          </Grid>
          <Box sx={{ mt: "27px" }}>
            <RouteListTable normalRoutes={workspaces} />
          </Box>
        </StyledContainer>
      </Box>
    </>
  );
};

export default RouteList;

const StyledContainer = styled(Container)`
  && {
    padding-left: "70px !important";
    padding-right: "60px !important";
  }
`;

const ContentTitleTypography = styled(Typography)`
  && {
    font-family: "Samsung Sharp Sans Bold";
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 50px;

    color: #ffffff;
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
