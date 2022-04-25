import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import useAuth from "../../../hooks/useAuth";
import useMounted from "../../../hooks/useMounted";
import PasswordIcon from "../../../icons/LoginPadlock";

const LoginJWT: FC = (props) => {
  const mounted = useMounted();
  const { login } = useAuth() as any;

  return (
    <Formik
      initialValues={{
        // email: "admin@nexxusone.com",
        // password: "Qwerty123",
        email: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          await login(values.email, values.password);
          // API REQUEST HERE
          // const URL = "process.env.REACT_APP_BACKEND_URL" + "api/v1/login";
          // const BODY = {
          //   username: email,
          //   password: password,
          // };
          // const apiResponse = await axios.post(URL, BODY)
          // sessionStorage.setItem("accessToken", apiResponse.data.access_token);

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          if (err.message === "401") {
            err.message = "Invalid credentials";
          }
          console.error("Login JWT Error ", err.message);
          console.error(err);
          if (mounted.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }): JSX.Element => (
        <StyledForm noValidate onSubmit={handleSubmit} {...props}>
          <FieldLabel>Email Address</FieldLabel>
          <StyledTextField
            // autoFocus
            autoComplete="off"
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            placeholder="type here"
            // label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
            size="small"
          />
          <RowBox>
            <FieldLabel>Password</FieldLabel>
            <StyledLink
              component={RouterLink}
              to="/authentication/password-recovery"
            >
              <ActionTypography>Forgot password?</ActionTypography>
            </StyledLink>
          </RowBox>
          <StyledTextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            placeholder="type here"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            // label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            size="small"
          />
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}
          <SubmitHelperText>{errors.submit}</SubmitHelperText>
          <Box>
            <LoginButton
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
            >
              Login
            </LoginButton>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginJWT;

const StyledForm = styled.form`
  && {
    && p.Mui-error {
      /* color: white; */
      position: absolute;
      bottom: -20px;
    }
  }
`;

const SubmitHelperText = styled(FormHelperText)`
  && {
    position: absolute;
    top: 645px;
    left: 303px;
    color: #f44336;
  }
`;

const LoginButton = styled(Button)`
  && {
    height: 50px;
    padding: 17px 0;
    background: #021f3d;
    border-radius: 16px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 16px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    letter-spacing: 0.5px;
  }
`;

const FieldLabel = styled(Box)`
  && {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
  }
`;

const ActionTypography = styled(Box)`
  && {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 20px;
    text-align: right;
    color: #ffffff;
  }
`;

const RowBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  && {
    text-decoration: none;
    margin: 0 0 0 auto;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 15px;
    margin-bottom: 25px;
    background: rgba(50, 54, 69, 1);
    background: linear-gradient(
      270deg,
      rgba(50, 54, 69, 0.4) 0%,
      rgba(50, 54, 69, 1) 90%
    );
    border-radius: 10px;

    color: #8a8a8a;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    && .Mui-focused fieldset {
      border-width: 1px !important;
      border-color: #2955a0;
      border-style: solid;
    }
    && input {
      color: #8a8a8a;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      display: flex;
      align-items: center;
      opacity: 1;
      border: 0;
      &::placeholder {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        display: flex;
        align-items: center;
        color: #8a8a8a;
        opacity: 0.85;
      }
    }
    && fieldset {
      border-style: hidden;
      border-radius: 10px;
      /* border: 0; */
    }
  }
`;
