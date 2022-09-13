import {useMounted} from "../../../lib/hooks/use-mounted";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getLogger} from "../../../lib/logging";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Helmet} from "react-helmet-async";
import {Box, InputAdornment} from "@mui/material";
import {FormContainer, LoginTitle, StyledForm, SubTitle} from "../../components/login";
import LoginPadlock from "../../icons/LoginPadlock";
import {useAuthControllerResetPasswordMutation} from "../../../lib/api/go-wild.api";
import {ActionButton} from "../../components/buttons";
import {FieldLabel, StyledTextField} from "../../components/text-field";

const logger = getLogger('Password Reset');

const validationSchema = Yup['object']().shape({
    password: Yup.string()
        .min(7, 'Must be at least 7 characters')
        .max(255)
        .required('Required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
});

export function PasswordResetScreen() {
    const mounted = useMounted();
    const navigate = useNavigate();
    const [resetPassword] = useAuthControllerResetPasswordMutation();
    const [searchParams] = useSearchParams();

    const {
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
    } = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {setStatus, setSubmitting}): Promise<void> => {
            try {
                await resetPassword({
                    authResetPasswordDto: {
                        password: values.password,
                        hash: searchParams.get('hash'),
                    }
                });
                logger.debug('Created New Password Successfully');
                navigate('/authentication/login');
            } catch (err) {
                logger.error('Cannot reset password', err);
                if (mounted.current) {
                    setStatus({success: false});
                    setSubmitting(false);
                }
            }
        }
    })

    return (
        <>
            <Helmet>
                <title>Password reset | Go Wild</title>
            </Helmet>

            <FormContainer maxWidth='sm'>
                <Box sx={{alignItems: 'center'}}>
                    <div>
                        <LoginTitle sx={{mb: '16px'}}>Password reset</LoginTitle>
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
                            <FieldLabel color='white' htmlFor='password'>New Password</FieldLabel>
                            <StyledTextField
                                error={Boolean(touched.password && errors.password)}
                                fullWidth
                                helperText={touched.password && errors.password}
                                placeholder='Password'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment sx={{pl: '18px', pr: '16px'}} position='start'>
                                            <LoginPadlock fontSize='small'/>
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

                        <FieldLabel color='white' htmlFor='passwordConfirm'>Re-type New Password</FieldLabel>
                        <StyledTextField
                            error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                            fullWidth
                            helperText={touched.passwordConfirm && errors.passwordConfirm}
                            placeholder='Password'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment sx={{pl: '18px', pr: '16px'}} position='start'>
                                        <LoginPadlock fontSize='small'/>
                                    </InputAdornment>
                                )
                            }}
                            margin='normal'
                            name='passwordConfirm'
                            id='passwordConfirm'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type='password'
                            value={values.passwordConfirm}
                            variant='outlined'
                            size='small'
                        />
                        <Box>
                            <ActionButton
                                disabled={isSubmitting}
                                fullWidth
                                type='submit'
                                variant='contained'
                            >
                                Create New Password
                            </ActionButton>
                        </Box>
                    </StyledForm>
                </Box>
            </FormContainer>
        </>
    );
}
