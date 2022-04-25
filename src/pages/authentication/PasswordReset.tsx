import { useEffect } from "react";
import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Box, Container } from "@mui/material";
import styled from "styled-components";
import {
  PasswordResetAmplify,
  PasswordResetJWT,
} from "../../components/authentication/password-reset";
import useAuth from "../../hooks/useAuth";
import gtm from "../../lib/gtm";

const platformIcons = {
  Amplify: "/static/icons/amplify.svg",
  Auth0: "/static/icons/auth0.svg",
  Firebase: "/static/icons/firebase.svg",
  JWT: "/static/icons/jwt.svg",
};

const PasswordReset: FC = () => {
  const { platform } = useAuth() as any;

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Password Reset | Go Wild</title>
      </Helmet>

      <BackgroundImgBox>
        <BackgroundGradient>
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
                  <LoginTitle>Reset Password</LoginTitle>
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
                {platform === "JWT" && <PasswordResetJWT />}
                {platform === "Amplify" && <PasswordResetAmplify />}
              </Box>
              {/* <Divider sx={{ my: 3 }} />
              {platform === "Amplify" && (
                <Link
                  color="textSecondary"
                  component={RouterLink}
                  to="/authentication/password-recovery"
                  variant="body2"
                >
                  Did you not receive the code?
                </Link>
              )} */}
            </Box>
          </StyledContainer>
        </BackgroundGradient>
      </BackgroundImgBox>
    </>
  );
};

export default PasswordReset;

const BackgroundImgBox = styled(Box)`
  && {
    background-image: url("/static/login/background.webp");
    background-repeat: no-repeat;
    background-size: cover;
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
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 3.125rem;
    line-height: 75px;
    letter-spacing: 0.5px;
    color: #ffffff;
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
