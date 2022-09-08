import * as Yup from 'yup';
import { useAuthControllerLoginMutation } from '../../../../lib/api/go-wild.api';
import useMounted from '../../../../lib/hooks/use-mounted';
import { useAppDispatch } from '../../../../lib/store';
import { setToken } from '../../../../lib/store/auth.slice';
import EmailIcon from '../../../icons/LoginEmail';
import PasswordIcon from '../../../icons/LoginPadlock';
import { Box, Button, FormHelperText, InputAdornment, Link, TextField } from '@mui/material';
import { Formik } from 'formik';
import type { FC } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const loginJWTLogger = getLogger('Login JWT');

const LoginJWT: FC = (props) => {
  const mounted = useMounted();
  const [login] = useAuthControllerLoginMutation();
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup['object']().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const result = await login({ authEmailLoginDto: values });
          if ('data' in result) {
            dispatch(setToken(result.data as any));
          }

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          if (err.response.status === 422) {
            err.message = 'Invalid credentials';
          }
          loginJWTLogger.error('Login JWT Error ', err);
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
        values
      }): JSX.Element => (
        <StyledForm noValidate onSubmit={handleSubmit} {...props}>
          <FieldLabel sx={{ mb: '16px' }}>Email Address</FieldLabel>
          <StyledTextField
            // autoFocus
            autoComplete='off'
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            placeholder='Email'
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ pl: '18px', pr: '16px' }} position='start'>
                  <EmailIcon fontSize='medium' />
                </InputAdornment>
              )
            }}
            margin='normal'
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
            size='small'
          />
          <RowBox>
            <FieldLabel sx={{ mb: '5px' }}>Password</FieldLabel>
            <StyledLink component={RouterLink} to='/authentication/password-recovery'>
              <ActionTypography>Forgot password?</ActionTypography>
            </StyledLink>
          </RowBox>
          <StyledTextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            placeholder='Password'
            InputProps={{
              startAdornment: (
                <InputAdornment sx={{ pl: '18px', pr: '16px' }} position='start'>
                  <PasswordIcon fontSize='small' />
                </InputAdornment>
              )
            }}
            margin='normal'
            name='password'
            onBlur={handleBlur}
            onChange={handleChange}
            type='password'
            value={values.password}
            variant='outlined'
            size='small'
          />
          {errors.submit && <FormHelperText error>{errorMessage(errors.submit)}</FormHelperText>}
          <Box>
            <LoginButton disabled={isSubmitting} fullWidth type='submit' variant='contained'>
              Log In
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

const LoginButton = styled(Button)`
  && {
    height: 57px;
    padding: 21px auto 17px auto;
    background-image: url('/static/login/login-btn.webp');
    background-color: #00755e;
    border-radius: 10px;
    font-family: 'Gilroy Bold';
    font-size: 1rem;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }
`;

const FieldLabel = styled(Box)`
  && {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 99.33%;
    letter-spacing: -0.025em;
    color: #ffffff;
  }
`;

const ActionTypography = styled(Box)`
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

const RowBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledLink = styled(Link)<{ component: typeof RouterLink; to: string }>`
  && {
    text-decoration: none;
    margin: 0 0 12px auto;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 0;
    margin-bottom: 38px;
    background: #ffffff;
    border-radius: 16px;

    color: #292930;
    font-family: 'Poppins';
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
      height: 55px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #292930;
      display: flex;
      align-items: center;
      border: 0;
      &::placeholder {
        font-family: 'Poppins';
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
      border-radius: 16px;
      /* border: 0; */
    }
  }
`;
