import {Box, Container, Link, styled} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

export const Background1stLineWave = styled(Box)`
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

export const BackgroundImg2ndLayer = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-image: url('/static/login/second-layer-background.svg');
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 1080px;
  }
`;

export const BackgroundImg3rdLayer = styled(Box)`
  && {
    width: 100%;
    height: 100%;
    background-image: url('/static/login/third-layer-background.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

export const BackgroundGradient = styled(Box)`
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

export const LogoWrapper = styled(Box)`
  && {
    position: absolute;
    top: 104px;
    left: 104px;
  }
`;

export const TopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 45px;
    right: 424px;
  }
`;

export const SecondToTopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 201px;
    left: 622px;
  }
`;

export const ThirdToTopBox = styled(Box)`
  && {
    height: 18px;
    position: absolute;
    top: 298px;
    left: 324.5px;
  }
`;

export const OpaqueMoonTop = styled('img')`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 74px;
    left: 632px;
  }
`;

export const OpaqueMoonLeft = styled('img')`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 286px;
    left: 70.5px;
  }
`;

export const OpaqueMoonRight = styled('img')`
  && {
    height: 42px;
    width: 42px;
    position: absolute;
    top: 626px;
    right: 104px;
  }
`;

export const FormContainer = styled(Container)`
  && {
    width: 386px;
    padding: 0 0 0 0;
    position: absolute;
    top: 172px;
    right: 266px;
  }
`;

export const LoginTitle = styled(Box)`
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

export const SubTitle = styled(Box)`
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


export const StyledForm = styled('form')`
  && {
    && p.Mui-error {
      position: absolute;
      bottom: -20px;
    }
  }
`;

export const ActionTypography = styled(Box)`
  && {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 24px;
    text-align: right;
    letter-spacing: -0.025em;
    color: #eeeef3;
  }
`;

export const RowBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const StyledLink = styled(Link)<{ component: typeof RouterLink; to: string }>`
  && {
    text-decoration: none;
    margin: 0 0 16px auto;
  }
`;
