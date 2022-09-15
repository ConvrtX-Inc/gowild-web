import * as Yup from 'yup';
import { useAuthControllerLoginMutation } from '../../../lib/api/go-wild.api';
import { useMounted } from '../../../lib/hooks/use-mounted';
import { getLogger } from '../../../lib/logging';
import { useAppDispatch } from '../../../lib/store';
import { setToken } from '../../../lib/store/auth.slice';
import { ActionButton } from '../../components/buttons';
import {
  ActionTypography,
  FormContainer,
  LoginTitle,
  StyledForm,
  StyledLink,
  SubTitle
} from '../../components/login';
import { FieldLabel, StyledTextField } from '../../components/text-field';
import LoginEmail from '../../icons/LoginEmail';
import LoginPadlock from '../../icons/LoginPadlock';
import { Box, InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const loginJWTLogger = getLogger('Login JWT');

const yupSchema = Yup['object']().shape({
  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  password: Yup.string().max(255).required('Password is required')
});

export function LoginScreen() {
  const navigate = useNavigate();
  const mounted = useMounted();
  const [login] = useAuthControllerLoginMutation();
  const dispatch = useAppDispatch();
  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: yupSchema,
      onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const result = await login({ authEmailLoginDto: values });
          if ('data' in result) {
            dispatch(setToken(result.data as any));
            navigate('/');
            return;
          }

          if (mounted.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          loginJWTLogger.error('Login JWT Error ', err);
        }
      }
    });

  return (
    <>
      <Helmet>
        <title>Login | Go Wild</title>
      </Helmet>

      <FormContainer maxWidth='sm'>
        <Box sx={{ alignItems: 'center' }}>
          <div>
            <LoginTitle sx={{ mb: '16px' }}>Sign in to manage</LoginTitle>
            <SubTitle>Enter your details below</SubTitle>
          </div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            mt: '54px'
          }}
        >
          <StyledForm noValidate onSubmit={handleSubmit}>
            <Box>
              <FieldLabel color='white' htmlFor='email'>
                Email Address
              </FieldLabel>
              <StyledTextField
                autoFocus
                autoComplete='off'
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                placeholder='Email'
                InputProps={{
                  startAdornment: (
                    <InputAdornment sx={{ pl: '18px', pr: '16px' }} position='start'>
                      <LoginEmail fontSize='medium' />
                    </InputAdornment>
                  )
                }}
                margin='normal'
                name='email'
                id='email'
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
                value={values.email}
                variant='outlined'
                size='small'
              />
            </Box>
            <Box>
              <FieldLabel color='white' htmlFor='password'>
                Password
              </FieldLabel>
              <StyledTextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                placeholder='Password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment sx={{ pl: '18px', pr: '16px' }} position='start'>
                      <LoginPadlock fontSize='small' />
                    </InputAdornment>
                  )
                }}
                margin='normal'
                name='password'
                id='password'
                onBlur={handleBlur}
                onChange={handleChange}
                type='password'
                value={values.password}
                variant='outlined'
                size='small'
              />
            </Box>

            <StyledLink component={RouterLink} to='/authentication/password-recovery'>
              <ActionTypography>Forgot password?</ActionTypography>
            </StyledLink>

            <Box>
              <ActionButton
                size='large'
                disabled={isSubmitting}
                fullWidth
                type='submit'
                variant='contained'
              >
                Log In
              </ActionButton>
            </Box>
          </StyledForm>
        </Box>
      </FormContainer>
    </>
  );
}
