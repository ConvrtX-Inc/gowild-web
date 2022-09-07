import {
  TableCellStyled as CustomTableCell,
  OptionsBox,
  StyledOption
} from '../../../style/dashboard';
import TableList from '../TableList';
import UserModal from './UserModal';
import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useAppDispatch } from 'src/lib/store';
import { EndUser } from 'src/types/end-user';
import DisableCircle from 'src/ui/icons/DisableCircle';
import UserOutline from 'src/ui/icons/UserOutline';
import styled from 'styled-components';

const headers = ['NAME', 'ONLINE STATUS', 'LOCATION', 'ACCOUNT STATUS'];

enum RowAction {
  DISABLE = 'Disable',
  VIEW = 'View'
}

const rowOptions = [
  {
    label: RowAction.VIEW,
    icon: <UserOutline fontSize='small' viewBox='0 0 12 12' />,
    value: 'View Profile'
  },
  {
    label: RowAction.DISABLE,
    icon: <DisableCircle fontSize='small' viewBox='0 0 13 13' />,
    value: 'Disable User'
  }
];

const elementsBuilder = (item: EndUser) => {
  return [
    <StyledTableCell key='01'>
      <FlexBox>
        <NameBox>
          <CircularAvatar component='img' src={item?.img_url} />
          <Box
            sx={{
              wordBreak: 'break-all'
            }}
          >
            <NameTypography>{item.full_name}</NameTypography>
            <EmailTypography>{item.email}</EmailTypography>
          </Box>
        </NameBox>
      </FlexBox>
    </StyledTableCell>,
    <StyledTableCell key='02'>
      <FlexBox>
        <OnlineStatusBox>
          <CircleStatus $inactive={!item?.status?.is_active} />
          <OnlineTypography $inactive={!item?.status?.is_active}>
            {item?.status?.is_active ? 'Active' : 'Inactive'}
          </OnlineTypography>
        </OnlineStatusBox>
      </FlexBox>
    </StyledTableCell>,
    <StyledTableCell key='03'>
      <LocationTypography>
        {item?.address_line1 ? item.address_line1 : item?.address_line2 ? item.address_line2 : ''}
      </LocationTypography>
    </StyledTableCell>,
    <StyledTableCell key='04'></StyledTableCell>
  ];
};

const UserTable: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [actionLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { users, isLoading } = {} as any;

  const rowOptionsBuilder = (tc: EndUser, _handleClose: (e) => void) => {
    return tc
      ? actionLoading
        ? [
            <ActionLoadingBox key={`ActionLoadingBox--${tc.id}`}>
              <CircularProgress color='success' />
              Deleting
            </ActionLoadingBox>
          ]
        : rowOptions.map((option) => (
            <OptionsBox key={`${tc.id}-${option.label}`} onClick={async (e) => {}}>
              <OptionIconBox label={option.label}>{option.icon}</OptionIconBox>
              <RowOption value={option.value}>{option.label}</RowOption>
            </OptionsBox>
          ))
      : null;
  };

  return (
    <>
      <TableList
        headers={headers}
        items={users}
        rowElementsBuilder={elementsBuilder}
        rowOptionsBuilder={rowOptionsBuilder}
        loading={isLoading}
      />
      <UserModal open={open} handleClose={handleClose} />
    </>
  );
};

export default UserTable;

const OptionIconBox = styled(Box)<{ label: RowAction }>`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10.0882px;
    padding: 5px 12px;
    background-color: ${(props) => {
      switch (props.label) {
        case RowAction.VIEW:
          return '#062D62';
        case RowAction.DISABLE:
          return '#FE7171';
        default:
          return '';
      }
    }};
    && .MuiSvgIcon-root {
      font-size: 10px;
      color: #fff;
    }
  }
`;

const RowOption = styled(StyledOption)`
  && {
    font-family: 'Gilroy Regular';
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;

    color: #878787;
  }
`;

const ActionLoadingBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 161px;
    height: 142.43px;
    font-family: 'Gilroy Medium';
    font-size: 25px;
    color: #878787;
  }
`;

const OnlineStatusBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    width: min-content;
    background: #e6e6f2;
    border-radius: 10px;
    padding: 5px 8px;
  }
`;

const CircleStatus = styled(Box)<{ $inactive?: boolean }>`
  && {
    width: 6px;
    height: 6px;
    background: ${(props) => (props.$inactive ? '#6E6893' : '#ff7851')};
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const NameTypography = styled(Typography)`
  && {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #25213b;
    margin-bottom: 5px;
  }
`;
const EmailTypography = styled(Typography)`
  && {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #6e6893;
  }
`;
const LocationTypography = styled(Typography)`
  && {
    font-family: 'Gilroy SemiBold';
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    text-align: center;
    text-transform: uppercase;

    color: #25213b;
  }
`;
const OnlineTypography = styled(Typography)<{ $inactive?: boolean }>`
  && {
    font-family: 'Inter';
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${(props) => (props.$inactive ? '#6E6893' : '#ff7851')};
  }
`;

const AccountTypography = styled(Typography)<{ $inactive?: boolean }>`
  && {
    font-family: 'Gilroy SemiBold';
    font-size: 14px;
    line-height: 12px;

    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: ${(props) => (props.$inactive ? '#FF2F6D' : '#00cc52')};
  }
`;

const FlexBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NameBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    width: 250px;
    > * {
      &:last-child {
        display: flex;
        flex-direction: column;
        text-align: left;
      }
    }
  }
`;

const CircularAvatar = styled(Box)<{ src?: string }>`
  && {
    height: 45px;
    width: 45px;
    min-width: 45px;
    min-height: 45px;
    border-radius: 50%;
    background-color: #c6c2de;
    margin-right: 20px;
    object-fit: cover;
  }
`;

const StyledTableCell = styled(CustomTableCell)``;
