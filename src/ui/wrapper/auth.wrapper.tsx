import {
  Background1stLineWave,
  BackgroundGradient,
  BackgroundImg2ndLayer,
  BackgroundImg3rdLayer,
  LogoWrapper,
  OpaqueMoonLeft,
  OpaqueMoonRight,
  OpaqueMoonTop,
  SecondToTopBox,
  ThirdToTopBox,
  TopBox
} from '../components/login';
import { LoginWhiteMoon } from '../components/login-white-moon';
import { Helmet } from 'react-helmet-async';
import { Outlet, Link as RouterLink } from 'react-router-dom';

export function AuthWrapper() {
  return (
    <>
      <Helmet>
        <title>Auth | Go Wild</title>
      </Helmet>
      <BackgroundImg3rdLayer>
        <BackgroundGradient>
          <BackgroundImg2ndLayer>
            <Background1stLineWave>
              <TopBox>
                <LoginWhiteMoon />
              </TopBox>
              <SecondToTopBox>
                <LoginWhiteMoon />
              </SecondToTopBox>
              <ThirdToTopBox>
                <LoginWhiteMoon />
              </ThirdToTopBox>
              <OpaqueMoonTop src='/static/login/opaque-ellipse.svg' />
              <OpaqueMoonLeft src='/static/login/opaque-ellipse.svg' />
              <OpaqueMoonRight src='/static/login/opaque-ellipse.svg' />

              <LogoWrapper>
                <RouterLink to='/'>
                  <img src='/static/login/group-logo.png' alt='nexxus-one-login-logo' />
                </RouterLink>
              </LogoWrapper>

              <Outlet />
            </Background1stLineWave>
          </BackgroundImg2ndLayer>
        </BackgroundGradient>
      </BackgroundImg3rdLayer>
    </>
  );
}
