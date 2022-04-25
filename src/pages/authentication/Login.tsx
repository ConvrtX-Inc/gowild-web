import { useEffect } from "react";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Box, Container, Link } from "@mui/material";
import {
  LoginAmplify,
  LoginAuth0,
  LoginFirebase,
  LoginJWT,
} from "../../components/authentication/login";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import gtm from "../../lib/gtm";

const platformIcons = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const Login: FC = () => {
  const { platform } = useAuth() as any;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Login | Go Wild</title>
      </Helmet>
      <BackgroundImgBox>
        {/* <BackgroundGradient> */}
          <StyledContainer maxWidth="sm">
            <Box sx={{ width: "472px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mb: "15.47px",
                  height: "72px",
                }}
              >
                <RouterLink to="/">
                  <img
                    src="/static/login/group-logo.png"
                    alt="nexxus-one-login-logo"
                  />
                </RouterLink>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "71px",
                }}
              >
                <div>
                  <LoginTitle>Sign in to manage</LoginTitle>
                  <SubTitle>Enter your details below</SubTitle>
                </div>

                {/* ------------------DYNAMIC FORMS------------------ */}
                {platform !== "JWT" && (
                  <Box
                    sx={{
                      height: 32,
                      "& > img": {
                        maxHeight: "100%",
                        width: "auto",
                      },
                    }}
                  >
                    <img alt="Auth platform" src={platformIcons[platform]} />
                  </Box>
                )}
              </Box>
              
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                {platform === "Amplify" && <LoginAmplify />}
                {platform === "Auth0" && <LoginAuth0 />}
                {platform === "Firebase" && <LoginFirebase />}
                {platform === "JWT" && <LoginJWT />}
              </Box>
              {platform === "Amplify" && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  sx={{ mt: 1 }}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Forgot password
                </Link>
              )}
            </Box>
          </StyledContainer>
        {/* </BackgroundGradient> */}
      </BackgroundImgBox>
    </>
  );
};

export default Login;

const BackgroundImgBox = styled(Box)`
  && {
    background-image: url("/static/login/topbackground.png");
    background-repeat: no-repeat;
    /* background-size: cover; */
  }
`;

const BackgroundGradient = styled(Box)`
  && {
    background: linear-gradient(
      57.19deg,
      #282a37 34.14%,
      rgba(41, 43, 56, 0) 238.39%
    );
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

const StyledContainer = styled(Container)`
  && {
    margin-top: 201px;
    margin-left: 112px;
    padding: 0 0 0 0;
  }
`;

const LoginTitle = styled(Box)`
  && {
    font-family: 'DM Sans';
font-style: normal;
font-weight: 500;
font-size: 48px;
line-height: 100%;
letter-spacing: -0.045em;
color: #FFFFFF;
  }
`;

const SubTitle = styled(Box)`
  && {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 1.5px;
    color: #ffffff;
  }
`;
