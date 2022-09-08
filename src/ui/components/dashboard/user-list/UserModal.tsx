import { Box, Button, FormControl, MenuItem, Modal, TextField, Typography } from '@mui/material';
import format from 'date-fns/format';
import MuiPhoneNumber from 'material-ui-phone-number';
import { FC } from 'react';
import { RootState, useAppSelector } from 'src/lib/store';
import X from 'src/ui/icons/X';
import styled from 'styled-components';

interface UserModalProps {
  open: boolean;
  handleClose: (e) => void;
}

enum ModalAction {
  REJECT = 'Reject',
  APPROVE = 'Approve'
}

const genders = ['Male', 'Female'];

const UserModal: FC<UserModalProps> = ({ open, handleClose }) => {
  const { user } = useAppSelector((state: any) => (state as any).userList);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <ModalContent>
        <ModalBody>
          <X
            onClick={handleClose}
            sx={{
              cursor: 'pointer'
            }}
          />

          <Box mr='10px'>
            <ModalTitle>Personal data</ModalTitle>
            <StyledFormControl variant='standard'>
              <StyledInputLabel component='label' htmlFor='firstName'>
                First name
              </StyledInputLabel>
              <ModalTextField
                variant='standard'
                id='lastName'
                defaultValue={user?.full_name.split(' ')[0]} // TODO: Request API must have first name
                disabled
              />
            </StyledFormControl>
            <StyledFormControl>
              <StyledInputLabel component='label' htmlFor='lastName'>
                Last name
              </StyledInputLabel>
              <ModalTextField
                variant='standard'
                id='firstName'
                disabled
                defaultValue={user?.full_name.split(' ')[user?.full_name.split(' ').length - 1]}
                // TODO: Request API must have last name
              />
            </StyledFormControl>
            <StyledFormControl>
              <StyledInputLabel component='label' htmlFor='phoneNumber'>
                Phone number
              </StyledInputLabel>
              <StyledPhoneNumber
                variant='standard'
                onChange={() => null}
                defaultCountry='ca'
                id='phoneNumber'
                value={user?.phone_no}
                disabled
              />
            </StyledFormControl>
            <StyledFormControl>
              <StyledInputLabel component='label' htmlFor='gender'>
                Gender
              </StyledInputLabel>
              <ModalTextField select value={genders[0]} variant='standard' id='gender' disabled>
                {genders.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </ModalTextField>
            </StyledFormControl>
            <StyledFormControl>
              <StyledInputLabel component='label' htmlFor='dob'>
                Date of birth
              </StyledInputLabel>
              <ModalTextField
                variant='standard'
                id='dob'
                type='date'
                value={user?.created_date ? format(new Date(user.created_date), 'yyyy-MM-dd') : ''}
                disabled
              />
            </StyledFormControl>
          </Box>
          <Box ml='10px'>
            <IDBox />
            <Box height='50px' />
            <IDBox />
          </Box>
        </ModalBody>
        <ModalFooter>
          <ModalButton>Reject</ModalButton>
          <ModalButton payload={ModalAction.APPROVE}>Approve</ModalButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;

const IDBox = styled(Box)`
  && {
    height: 45%;
    background-color: #e2e4e5;
  }
`;

const ModalFooter = styled(Box)`
  && {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    padding-bottom: 51px;
  }
`;

const ModalButton = styled(Button)<{ payload?: ModalAction }>`
  && {
    background: ${(props) => {
      if (props?.payload === ModalAction.APPROVE) return '#0D5351';

      return '#F87878';
    }};
    border-radius: 16px;
    height: 60px;
    width: 204px;
    color: #fff;
  }
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 32px;
  }
`;

const ModalTextField = styled(TextField)`
  && {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #242426;

    && .MuiInputBase-root {
      height: 44px;
      padding: 10px;
      &::before {
        border-color: #e2e4e5;
      }
      &::after {
        border-color: rgba(228, 87, 46, 0.8);
      }
    }

    &input::after:hover {
      border: 2px solid rgba(255, 120, 81, 0.2) !important;
    }
  }
`;

const StyledPhoneNumber = styled(MuiPhoneNumber)`
  && {
    && .MuiInputBase-root {
      height: 44px;
      padding: 10px;
      &::before {
        border-color: #e2e4e5;
      }
      &::after {
        border-color: rgba(228, 87, 46, 0.8);
      }
    }
  }
`;

const ModalTitle = styled(Typography)`
  && {
    font-family: 'Poppins';
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 32px;
  }
`;

const StyledInputLabel = styled(Typography)<{ component: any; htmlFor: string }>`
  && {
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

const ModalBody = styled(Box)`
  && {
    display: flex;
    position: relative;
    padding: 49px 78px 41px 78px;
    & > .MuiSvgIcon-root {
      position: absolute;
      right: 26px;
      top: 36px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex: 1;
      width: 100%;
      border: 1px solid #e2e4e5;
      border-radius: 20px;
      padding: 32px;
      overflow-y: auto;
    }

    font-family: 'Poppins';
    color: #e4572e;
  }
`;

const ModalContent = styled(Box)`
  && {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    width: 811px;
    height: 654px;
    overflow-y: auto;

    @media only screen and (min-height: 900px) {
      width: 1050px;
      height: 847px;
    }
  }
`;
