import { errorToText } from '../../utils/text.utils';
import { TextField, styled } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { useField } from 'formik';
import { useMemo } from 'react';

export const FieldLabel = styled('label')(() => ({
  fontFamily: 'DM Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '0.875rem',
  lineHeight: '99.33%',
  letterSpacing: '-0.025em',
  marginBottom: '24px'
}));

export const StyledTextField = styled(TextField)`
  && {
    margin-top: 6px;
    margin-bottom: 20px;
    background: #ffffff;
    color: #22333b;
    font-family: 'Gilroy Medium';
    font-size: 1.11rem;
    line-height: 27px;
    border-radius: 22.1951px;
    && .Mui-focused fieldset {
      height: 67px;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
    }
    && input {
      height: 67px;
      padding: 20px 33px 20px 33px;
      font-family: 'Gilroy Medium';
      font-size: 1.11rem;
      line-height: 27px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: 'Gilroy Medium';
        font-size: 1.11rem;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      height: 67px;
      margin-top: 2px;
      border-style: hidden;
      border-radius: 22.1951px;
      /* border: 0; */
    }
  }
`;

export const StyledMultiTextField = styled(TextField)`
  && {
    margin-top: 6px;
    background: #ffffff;
    color: #22333b;
    font-family: 'Gilroy Medium';
    font-size: 1.11rem;
    line-height: 27px;
    border-radius: 22.1951px;
    && .MuiInputBase-multiline {
      padding: 0;
    }
    && .Mui-focused fieldset {
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
      border-radius: 22.1951px;
    }
    && textarea {
      padding: 20px 13px 12px 33px;
      font-family: 'Gilroy Medium';
      font-size: 1.11rem;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: 'Gilroy Medium';
        font-size: 1.11rem;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      margin-top: 2px;
      border-style: hidden;
      border-radius: 22.1951px;
      /* border: 0; */
    }
  }
`;

export const AppTextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props as any);
  const errorText = useMemo(
    () => errorToText(meta.touched && meta.error),
    [meta.error, meta.touched]
  );
  return (
    <TextField
      {...props}
      {...field}
      sx={{ fontFamily: 'Gilroy Medium', ...(props.sx ?? {}) }}
      helperText={errorText ? errorText : props.helperText}
      error={!!errorText}
      fullWidth
      variant='outlined'
    />
  );
};
