import * as Yup from 'yup';
import useMounted from '../../../../lib/hooks/use-mounted';
import PopOverToast from './PopOverToast';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useEffect } from 'react';
import toast, { useToasterStore } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('PasswordRecoveryJwt');

const PasswordRecoveryJWT: FC = () => {
  const mounted = useMounted();
  // const { passwordRecovery } = useAuth() as any;
  const navigate = useNavigate();

  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 2;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.remove(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null
      }}
      validationSchema={Yup['object']().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          // await passwordRecovery(values.email);

          navigate('/authentication/password-reset', {
            state: {
              username: values.email
            }
          });
          toast.custom((t) => <PopOverToast customClick={() => toast.remove(t.id)} />);
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
          <FieldLabel>Email Address</FieldLabel>
          <StyledTextField
            // autoFocus
            autoComplete='off'
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            placeholder='type here'
            // label="Email Address"
            margin='normal'
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
            size='small'
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorMessage(errors.submit)}</FormHelperText>
            </Box>
          )}
          <Box>
            <ResetPassButton
              color='primary'
              disabled={isSubmitting}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Reset Password
            </ResetPassButton>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export default PasswordRecoveryJWT;

const StyledForm = styled.form`
  && {
    && p.Mui-error {
      /* color: white; */
      position: absolute;
      bottom: -20px;
    }
  }
`;

const ResetPassButton = styled(Button)`
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
