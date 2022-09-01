import { FormikErrors } from 'formik';

export function errorMessage(
  value: string | string[] | FormikErrors<any> | FormikErrors<any>[]
): string {
  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return value.toString();
}
