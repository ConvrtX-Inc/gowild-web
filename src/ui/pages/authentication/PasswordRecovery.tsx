import { useAuth } from '../../../lib/hooks/use-auth';
import { PasswordRecoveryJWT } from '../../components/authentication/password-recovery';
import { Box, Container } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const PasswordRecovery: FC = () => {
  const { platform } = useAuth() as any;
  return (
    <>
      <Helmet>
        <title>Password Recovery | Go Wild</title>
      </Helmet>
      <BackgroundImgBox>
        <BackgroundGradient>
          <StyledContainer maxWidth='sm'>
            <Box sx={{ width: '472px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  mb: '15.47px',
                  height: '72px'
                }}
              >
                <RouterLink to='/'>
                  <img src='/static/login/group-logo.png' alt='nexxus-one-login-logo' />
                </RouterLink>
              </Box>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: '71px'
                }}
              >
                <div>
                  <LoginTitle>Forgot Password?</LoginTitle>
                  <SubTitle>Enter your details below</SubTitle>
                </div>

                <Box
                  sx={{
                    height: 32,
                    '& > img': {
                      maxHeight: '100%',
                      width: 'auto'
                    }
                  }}
                >
                  <img alt='Auth platform' src='/static/icons/jwt.svg' />
                </Box>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                <PasswordRecoveryJWT />
              </Box>
            </Box>
          </StyledContainer>
        </BackgroundGradient>
      </BackgroundImgBox>
    </>
  );
};

export default PasswordRecovery;

const BackgroundImgBox = styled(Box)`
  && {
    background-image: url('/static/login/background.webp');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const BackgroundGradient = styled(Box)`
  && {
    background: linear-gradient(57.19deg, #282a37 34.14%, rgba(41, 43, 56, 0) 238.39%);
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
    font-family: 'Poppins';
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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: 1.5px;
    color: #ffffff;
  }
`;
