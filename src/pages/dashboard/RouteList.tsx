import { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import styled from "styled-components";
import { jurisdictionApi } from "../../__fakeApi__/jurisdictionApi";
import { RouteListTable } from "../../components/dashboard/route-list";
import useMounted from "../../hooks/useMounted";
import SearchIcon from "../../icons/Search";
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
          backgroundColor: "#FAFBFC",
          minHeight: "100%",
          pt: "49px",
          pb: "30px",
        }}
      >
        <StyledContainer
          maxWidth={settings.compact ? "xl" : false}
          sx={{ pl: "70px !important", pr: "60px !important" }}
        >
          <Grid container justifyContent="space-between">
            <Grid item>
              <ContentTitleTypography>
                Workspace Received
              </ContentTitleTypography>
            </Grid>
            <FlexiGrid item>
              <Box sx={{}}>
                <StyledTextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        sx={{ pl: "11px", pr: "15px" }}
                        position="start"
                      >
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  // onChange={handleQueryChange}
                  placeholder="Search"
                  // value={query}
                  variant="outlined"
                />
              </Box>

              <IconBox>
                <IconButton>
                  <NotificationIcon />
                </IconButton>
              </IconBox>
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
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 50px;
    line-height: 75px;

    letter-spacing: -3px;

    color: #09110e;
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

const StyledTextField = styled(TextField)`
  && {
    width: 283px;
    background: #ffffff;
    border-radius: 10px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #09110e;
    && .Mui-focused fieldset {
      border-width: 0 !important;
    }
    && input {
      padding: 14px 0 14px 0;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #09110e;
      &::placeholder {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #09110e;
        opacity: 0.5;
      }
    }
    && fieldset {
      border-style: hidden;
      border-radius: 10px;
      /* border: 0; */
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
