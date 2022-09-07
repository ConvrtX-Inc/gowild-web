import { LoginAmplify, LoginAuth0, LoginJWT } from '../../components/authentication/login';
import { Box, Container, Link } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import SmallWhiteMoonIcon from 'src/ui/icons/LoginWhiteMoon';
import styled from 'styled-components';

const platformIcons = {
  Amplify: '/static/icons/amplify.svg',
  Auth0: '/static/icons/auth0.svg',
  Firebase: '/static/icons/firebase.svg',
  JWT: '/static/icons/jwt.svg'
};

const platform: string = 'JWT';

const Login: FC = () => {
  return (
    <>
      <Helmet>
        <title>Login | Go Wild</title>
      </Helmet>
      <BackgroundImg3rdLayer>
        <BackgroundGradient>
          <BackgroundImg2ndLayer>
            <Background1stLineWave>
              <TopBox>
                <SmallWhiteMoonIcon />
              </TopBox>
              <SecondToTopBox>
                <SmallWhiteMoonIcon />
              </SecondToTopBox>
              <ThirdToTopBox>
                <SmallWhiteMoonIcon />
              </ThirdToTopBox>
              <OpaqueMoonTop src='/static/login/opaque-ellipse.svg' />
              <OpaqueMoonLeft src='/static/login/opaque-ellipse.svg' />
              <OpaqueMoonRight src='/static/login/opaque-ellipse.svg' />

              <LogoWrapper>
                <RouterLink to='/'>
                  <img src='/static/login/group-logo.png' alt='nexxus-one-login-logo' />
                </RouterLink>
              </LogoWrapper>
              <FormContainer maxWidth='sm'>
                <Box sx={{ alignItems: 'center' }}>
                  <div>
                    <LoginTitle sx={{ mb: '16px' }}>Sign in to manage</LoginTitle>
                    <SubTitle>Enter your details below</SubTitle>
                  </div>

                  {/* ------------------DYNAMIC FORMS------------------ */}
                  {platform !== 'JWT' && platform !== 'Axios' && (
                    <Box
                      sx={{
                        height: 32,
                        '& > img': {
                          maxHeight: '100%',
                          width: 'auto'
                        }
                      }}
                    >
                      <img alt='Auth platform' src={platformIcons[platform]} />
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    mt: '54px'
                  }}
                >
                  {platform === 'Amplify' && <LoginAmplify />}
                  {platform === 'Auth0' && <LoginAuth0 />}
                  {platform === 'JWT' && <LoginJWT />}
                  {platform === 'Axios' && <LoginJWT />}
                </Box>
                {platform === 'Amplify' && (
                  <Link
                    color='textSecondary'
                    component={RouterLink}
                    sx={{ mt: 1 }}
                    to='/authentication/password-recovery'
                    variant='body2'
                  >
                    Forgot password
                  </Link>
                )}
              </FormContainer>
            </Background1stLineWave>
          </BackgroundImg2ndLayer>
        </BackgroundGradient>
      </BackgroundImg3rdLayer>
    </>
  );
};

export default Login;

const Background1stLineWave = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-image: url('/static/login/line-wave.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    /* position: relative; */
    overflow: auto;
  }
`;

const BackgroundImg2ndLayer = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-image: url('/static/login/second-layer-background.svg');
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 1080px;
    /* background-size: contain; */
  }
`;

const BackgroundImg3rdLayer = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-image: url('/static/login/third-layer-background.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const BackgroundGradient = styled(Box)`
  && {
    height: 100%;
    width: 100%;
    background: linear-gradient(
      359.74deg,
      rgba(0, 117, 94, 0.5) -4.05%,
      rgba(196, 196, 196, 0) 94.88%
    );
  }
`;

const LogoWrapper = styled(Box)`
  && {
    position: absolute;
    top: 104px;
    left: 104px;
  }
`;

const TopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 45px;
    right: 424px;
  }
`;

const SecondToTopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 201px;
    left: 622px;
  }
`;

const ThirdToTopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 298px;
    left: 324.5px;
  }
`;

const OpaqueMoonTop = styled.img`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 74px;
    left: 632px;
  }
`;

const OpaqueMoonLeft = styled.img`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 286px;
    left: 70.5px;
  }
`;

const OpaqueMoonRight = styled.img`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 626px;
    right: 104px;
  }
`;

const FormContainer = styled(Container)`
  && {
    width: 386px;
    padding: 0 0 0 0;
    position: absolute;
    top: 172px;
    right: 266px;
  }
`;

const LoginTitle = styled(Box)`
  && {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 3rem;
    line-height: 100%;
    letter-spacing: -0.045em;
    color: #ffffff;
  }
`;

const SubTitle = styled(Box)`
  && {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: -0.025em;
    color: #ffffff;
  }
`;
