import * as Yup from 'yup';
import { useAuth } from '../../../../lib/hooks/useAuth';
import useMounted from '../../../../lib/hooks/useMounted';
import { Box, Button, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('PasswordRecoveryAmplify');

const PasswordRecoveryAmplify: FC = () => {
  const mounted = useMounted();
  const { passwordRecovery } = useAuth() as any;
  const navigate = useNavigate();

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
          await passwordRecovery(values.email);

          navigate('/authentication/password-reset', {
            state: {
              username: values.email
            }
          });
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
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            autoFocus
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label='Email Address'
            margin='normal'
            name='email'
            onBlur={handleBlur}
            onChange={handleChange}
            type='email'
            value={values.email}
            variant='outlined'
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errorMessage(errors.submit)}</FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 3 }}>
            <Button
              color='primary'
              disabled={isSubmitting}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
            >
              Recover Password
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default PasswordRecoveryAmplify;
