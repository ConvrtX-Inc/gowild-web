// import styled from "styled-components";
import * as Yup from 'yup';
import wait from '../../../../utils/wait';
import { Box, Button, Card } from '@mui/material';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('HistoricalEditForm');

interface HistoricalEditFormProps {
  customer: any;
}

const HistoricalEditForm: FC<HistoricalEditFormProps> = (props) => {
  const { customer, ...other } = props;

  return (
    <Formik
      initialValues={{
        address1: customer.address1 || '',
        submit: null
      }}
      validationSchema={Yup['object']().shape({
        address1: Yup.string().max(255)
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          // NOTE: Make API request
          await wait(500);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
          toast.success('Customer updated!');
        } catch (err) {
          logger.error(err);
          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting }): JSX.Element => (
        <form onSubmit={handleSubmit} {...other}>
          <Card>
            <Box sx={{ p: 3 }}>
              {/* //Your Form here */}
              <Box sx={{ mt: 2 }}>
                <Button color='primary' disabled={isSubmitting} type='submit' variant='contained'>
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

HistoricalEditForm.propTypes = {
  customer: PropTypes['object'].isRequired
};

export default HistoricalEditForm;
