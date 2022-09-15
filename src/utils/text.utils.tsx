import { Typography } from '@mui/material';
import { FormikErrors } from 'formik';

export function errorToText(err: string | string[] | FormikErrors<any>[] | FormikErrors<any>) {
  if (!err) {
    return undefined;
  }

  if (Array.isArray(err)) {
    return <>{err.map(errorToText)}</>;
  }

  if (typeof err === 'string') {
    return <Typography variant='caption'>{err}</Typography>;
  } else {
    return <>{Object.values(err).map(errorToText)}</>;
  }
}
