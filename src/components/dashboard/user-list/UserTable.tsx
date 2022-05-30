import { FC, useEffect, useState } from "react";
import { EndUser } from "src/types/end-user";
import TableList from "../TableList";
import {
  OptionsBox,
  StyledOption,
  TableCellStyled as CustomTableCell,
} from "../../../shared-styled-components/dashboard";
import styled from "styled-components";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserOutline from "src/icons/UserOutline";
import DisableCircle from "src/icons/DisableCircle";
import UserModal from "./UserModal";
import { RootState, useDispatch } from "src/store";
import { fetchUsers, onViewUser } from "src/slices/user-list";
import { useSelector } from "react-redux";
import { AccountStatus } from "src/enums/user-list";

const headers = ["NAME", "ONLINE STATUS", "LOCATION", "ACCOUNT STATUS"];
const sampleData: EndUser[] = [
  {
    id: "be86ae83-5c91-475d-a79d-2560e52e465c",
    full_name: "john doe",
    username: "johndoe",
    email: "johndoe@example.com",
    phone_no: "+639506703401",
    address_line1: null,
    address_line2: "7 Carlson St, Kitimat, BC V8C 1A9, Canada",
    profile_photo: null,
    img_url:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80",
    created_date: "2022-05-12T14:35:37.316Z",
    updated_date: "2022-05-12T14:38:33.598Z",
    deleted_date: null,
  },
];

enum RowAction {
  DISABLE = "Disable",
  VIEW = "View",
}
const rowOptions = [
  {
    label: RowAction.VIEW,
    icon: <UserOutline fontSize="small" viewBox="0 0 12 12" />,
    value: "View Profile",
  },
  {
    label: RowAction.DISABLE,
    icon: <DisableCircle fontSize="small" viewBox="0 0 13 13" />,
    value: "Disable User",
  },
];

const elementsBuilder = (item: EndUser) => {
  return [
    <StyledTableCell>
      <FlexBox>
        <NameBox>
          <CircularAvatar component="img" src={item?.img_url}></CircularAvatar>
          <Box sx={{
            wordBreak: "break-all"
          }}>
            <NameTypography>{item.full_name}</NameTypography>
            <EmailTypography>{item.email}</EmailTypography>
          </Box>
        </NameBox>
      </FlexBox>
    </StyledTableCell>,
    <StyledTableCell>
      <FlexBox>
        <OnlineStatusBox>
          <CircleStatus $inactive={!item?.status?.is_active} />
          <OnlineTypography $inactive={!item?.status?.is_active}>
            {item?.status?.is_active ? "Active" : "Inactive"}
          </OnlineTypography>
        </OnlineStatusBox>
      </FlexBox>
    </StyledTableCell>,
    <StyledTableCell>
      <LocationTypography>
        {item?.address_line1
          ? item.address_line1
          : item?.address_line2
          ? item.address_line2
          : ""}
      </LocationTypography>
    </StyledTableCell>,
    <StyledTableCell>
      <AccountTypography
        $inactive={item?.status?.status_name !== AccountStatus.ACTIVE}
      >
        {item?.status?.status_name === AccountStatus.ACTIVE
          ? "ACTIVE"
          : "DISABLED"}
      </AccountTypography>
    </StyledTableCell>,
  ];
};

const UserTable: FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { users, filteredUsers, isFiltered, isLoading } = useSelector(
    (state: RootState) => state.userList
  );
  const dispatch = useDispatch();

  const handleOpen = (id: string) => {
    dispatch(onViewUser(id));
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const rowOptionsBuilder = (tc: EndUser, handleClose) => {
    return tc
      ? actionLoading
        ? [
            <ActionLoadingBox>
              <CircularProgress color="success" />
              Deleting
            </ActionLoadingBox>,
          ]
        : rowOptions.map((option) => (
            <OptionsBox
              key={`${tc.id}-${option.label}`}
              onClick={async (e) => {
                if (option.label === RowAction.VIEW) handleOpen(tc.id);
                handleClose();
              }}
            >
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
        items={!isFiltered ? users : filteredUsers}
        rowElementsBuilder={elementsBuilder}
        rowOptionsBuilder={rowOptionsBuilder}
        loading={isLoading}
      />
      <UserModal open={open} handleClose={handleClose} />
    </>
  );
};

export default UserTable;

const OptionIconBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10.0882px;
    padding: 5px 12px;
    background-color: ${(props) => {
      switch (props.label) {
        case RowAction.VIEW:
          return "#062D62";
        case RowAction.DISABLE:
          return "#FE7171";
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
    font-family: "Gilroy Regular";
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
    font-family: "Gilroy Medium";
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

const CircleStatus = styled(Box)`
  && {
    width: 6px;
    height: 6px;
    background: ${(props) => (props.$inactive ? "#6E6893" : "#ff7851")};
    border-radius: 50%;
    margin-right: 5px;
  }
`;

const NameTypography = styled(Typography)`
  && {
    font-family: "Inter";
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #25213b;
    margin-bottom: 5px;
  }
`;
const EmailTypography = styled(Typography)`
  && {
    font-family: "Inter";
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #6e6893;
  }
`;
const LocationTypography = styled(Typography)`
  && {
    font-family: "Gilroy SemiBold";
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;

    text-align: center;
    text-transform: uppercase;

    color: #25213b;
  }
`;
const OnlineTypography = styled(Typography)`
  && {
    font-family: "Inter";
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    color: ${(props) => (props.$inactive ? "#6E6893" : "#ff7851")};
  }
`;
const AccountTypography = styled(Typography)`
  && {
    font-family: "Gilroy SemiBold";
    font-size: 14px;
    line-height: 12px;

    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    color: ${(props) => (props.$inactive ? "#FF2F6D" : "#00cc52")};
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

const CircularAvatar = styled(Box)`
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
