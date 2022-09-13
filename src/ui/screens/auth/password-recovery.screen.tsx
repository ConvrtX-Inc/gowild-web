import {toast, useToasterStore} from "react-hot-toast";
import {useEffect} from "react";
import {useMounted} from "../../../lib/hooks/use-mounted";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import {getLogger} from "../../../lib/logging";
import {useFormik} from "formik";
import {Helmet} from "react-helmet-async";
import {
    ActionTypography,
    FormContainer,
    LoginTitle,
    RowBox,
    StyledForm,
    StyledLink,
    SubTitle
} from "../../components/login";
import {Box} from "@mui/material";
import {useAppDispatch} from "../../../lib/store";
import {useAuthControllerForgotPasswordMutation} from "../../../lib/api/go-wild.api";
import {setToken} from "../../../lib/store/auth.slice";
import PopOverToast from "../../components/toasts/pop-over.toast";
import {ActionButton} from "../../components/buttons";
import {FieldLabel, StyledTextField} from "../../components/text-field";

const logger = getLogger('PasswordRecovery');

const validationSchema = Yup['object']().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
});

export function PasswordRecoveryScreen() {
    const mounted = useMounted();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [forgotPassword] = useAuthControllerForgotPasswordMutation();

    const {toasts} = useToasterStore();
    const TOAST_LIMIT = 2;

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
            .forEach((t) => toast.remove(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

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
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, {setErrors, setStatus, setSubmitting}) => {
            try {
                const result = await forgotPassword({authForgotPasswordDto: {email: values.email, phone: null,},});
                if ('data' in result) {
                    dispatch(setToken(result.data as any));
                    navigate('/authentication/password-reset', {
                        state: {
                            username: values.email
                        }
                    });
                    toast.custom((t) => <PopOverToast customClick={() => toast.remove(t.id)}/>);
                    return;
                }

                if (mounted.current) {
                    setStatus({success: true});
                    setSubmitting(false);
                }
            } catch (err) {
                logger.error('Login JWT Error ', err);
            }
        },
    });

    return (
        <>
            <Helmet>
                <title>Password Recovery | Go Wild</title>
            </Helmet>

            <FormContainer maxWidth='sm'>
                <Box sx={{alignItems: 'center'}}>
                    <div>
                        <LoginTitle sx={{mb: '16px'}}>Password recovery</LoginTitle>
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
                        <FieldLabel color='white' htmlFor='email'>Email Address</FieldLabel>
                        <StyledTextField
                            autoFocus
                            autoComplete='off'
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            placeholder='type here'
                            margin='normal'
                            id='email'
                            name='email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type='email'
                            value={values.email}
                            variant='outlined'
                            size='small'
                        />
                        <RowBox>
                            <StyledLink component={RouterLink} to='/authentication'>
                                <ActionTypography>To Login</ActionTypography>
                            </StyledLink>
                        </RowBox>
                        <Box>
                            <ActionButton
                                disabled={isSubmitting}
                                fullWidth
                                size='large'
                                type='submit'
                                variant='contained'
                            >
                                Reset Password
                            </ActionButton>
                        </Box>
                    </StyledForm>
                </Box>
            </FormContainer>
        </>
    )
}
