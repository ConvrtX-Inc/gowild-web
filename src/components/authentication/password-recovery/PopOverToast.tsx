import React from "react";
import { Box, CardMedia, IconButton } from "@mui/material";
import styled from "styled-components";
import XIcon from "../../../icons/CloseToaster";

const PopOverToast = (props: any) => {
  const { customClick } = props;

  const handleClose = () => {
    customClick();
  };

  return (
    <StyledBox sx={{ background: "white" }}>
      <FlexiBox>
        <Box>
          {/* <img
            src="/static/login/password-recovery/EmailSent.svg"
            // width="98px"
            // height="83px"
            alt="email-sent"
          /> */}
          <XWrapper>
            <IconButton onClick={handleClose}>
              <XIcon fontSize="small" />
            </IconButton>
          </XWrapper>
          <CardMedia
            sx={{
              height: "83px",
              width: "98px",
              mb: "15px",
              backgroundSize: "auto",
            }}
            image="/static/login/password-recovery/EmailSent.svg"
          />
        </Box>
        <ToastTypography>
          Your reset password link has been sent to your email.
        </ToastTypography>
      </FlexiBox>
    </StyledBox>
  );
};

export default PopOverToast;

const StyledBox = styled(Box)`
  && {
    width: 483px;
    height: 246px;
    padding: 52px 65px 36px 66px;
    margin-right: 70px;
    margin-bottom: 60px;
    background: rgba(77, 82, 99, 0.79);
    border-radius: 10px;
    position: relative;
  }
`;

const ToastTypography = styled(Box)`
  && {
    font-family: "Poppins";
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 2px;
    color: #ffffff;
  }
`;

const FlexiBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const XWrapper = styled(Box)`
  && {
    position: absolute;
    top: 13px;
    right: 12px;
  }
`;
