// import useAuth from "../../../hooks/useAuth";
// import type { Location } from "history";
import * as Yup from 'yup';
import useMounted from '../../../hooks/useMounted';
import PasswordIcon from '../../../icons/LoginPadlock';
import { Box, Button, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('PasswordResetJwt');

const PasswordResetJWT: FC = () => {
  const mounted = useMounted();
  // const { passwordReset } = useAuth() as any;
  // const location = useLocation() as Location<LocationState>;
  const navigate = useNavigate();
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, 6);
  }, []);

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirm: '',
        submit: null
      }}
      validationSchema={Yup['object']().shape({
        password: Yup.string()
          .min(7, 'Must be at least 7 characters')
          .max(255)
          .required('Required'),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          // await passwordReset(values.password);
          logger.debug('Created New Password Successfully');
          navigate('/authentication/login');
        } catch (err) {
          logger.error(err);
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
        <StyledForm noValidate onSubmit={handleSubmit}>
          <FieldLabel>New Password</FieldLabel>
          <StyledTextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            // label="Password"
            placeholder='type here'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
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
          />
          <FieldLabel>Re-type New Password</FieldLabel>
          <StyledTextField
            error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
            fullWidth
            helperText={touched.passwordConfirm && errors.passwordConfirm}
            // label="Password Confirmation"
            placeholder='type here'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PasswordIcon fontSize='small' />
                </InputAdornment>
              )
            }}
            margin='normal'
            name='passwordConfirm'
            onBlur={handleBlur}
            onChange={handleChange}
            type='password'
            value={values.passwordConfirm}
            variant='outlined'
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorMessage(errors.submit)}</FormHelperText>
            </Box>
          )}
          <SubmitHelperText>{errorMessage(errors.submit)}</SubmitHelperText>
          <Box>
            <CreateNewPassButton
              disabled={isSubmitting}
              fullWidth
              type='submit'
              variant='contained'
            >
              Create New Password
            </CreateNewPassButton>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export default PasswordResetJWT;

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

const CreateNewPassButton = styled(Button)`
  && {
    height: 50px;
    padding: 17px 0;
    background: #021f3d;
    border-radius: 16px;
    font-family: 'Poppins';
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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 15px;
    margin-bottom: 25px;
    background: rgba(50, 54, 69, 1);
    background: linear-gradient(270deg, rgba(50, 54, 69, 0.4) 0%, rgba(50, 54, 69, 1) 90%);
    border-radius: 10px;

    color: #8a8a8a;
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
      color: #8a8a8a;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      display: flex;
      align-items: center;
      opacity: 1;
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
      border-radius: 10px;
      /* border: 0; */
    }
  }
`;
