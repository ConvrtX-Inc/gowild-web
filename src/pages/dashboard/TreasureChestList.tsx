import { Box } from "@material-ui/core";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";
import TableList from "src/components/dashboard/TableList";
import useMounted from "src/hooks/useMounted";
import {
  DashboardButton,
  OptionsBox,
  StyledCard,
  StyledOption,
  TableCellStyled,
} from "src/shared-styled-components/dashboard";
import { TreasureChest } from "src/types/treasurechest";
import formatDate from "src/utils/formatDate";
import styled from "styled-components";
import ViewIcon from "../../icons/RouteListView";
import EditIcon from "../../icons/RouteListEdit";
import DeleteIcon from "../../icons/RouteListDelete";

const pageTitle = "Treasure Chest List";
const tableHeaders = [
  "NAME",
  "DATE CREATED",
  "EVENT DATE",
  "STARTING POINT/LAT",
  "STARTING POINT/LONG",
];
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/treasure-chest`;

enum RowAction {
  VIEW = "View",
  EDIT = "Edit",
  DELETE = "Delete",
}
const rowOptions = [
  {
    label: RowAction.VIEW,
    icon: <ViewIcon />,
    value: "View",
  },
  {
    label: RowAction.EDIT,
    icon: <EditIcon />,
    value: "Edit",
  },
  {
    label: RowAction.DELETE,
    icon: <DeleteIcon />,
    value: "Delete",
  },
];

const TreasureChestList: FC = () => {
  const mounted = useMounted();

  const navigate = useNavigate();
  const [treasureChests, setTreasureChests] = useState<TreasureChest[]>([]);
  const [loading, setLoading] = useState(true);

  const getTreasureChests = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");

      const CONFIG = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
      const apiResponse = await axios.get(
        `${API_URL}/?sort=event_date,ASC`,
        CONFIG
      );
      if (mounted.current) {
        setTreasureChests(apiResponse.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [mounted]);

  const handleRowAction = async (actionType: RowAction, id) => {
    try {
      switch (actionType) {
        case RowAction.VIEW: {
          await onView(id);
          break;
        }
        case RowAction.EDIT: {
          await onEdit(id);
          break;
        }
        case RowAction.DELETE: {
          await onDelete(id);
          break;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onView = async (id) => {
    navigate(`/dashboard/treasure-chest-list/view/${id}`);
  };

  const onEdit = async (id) => {
    navigate(`/dashboard/treasure-chest-list/edit/${id}`);
  };

  const onDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const CONFIG = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const res = await axios.delete(`${API_URL}/${id}`, CONFIG);
    if (res.status === 200)
      setTreasureChests((tc) => tc.filter((t) => t.id !== id));
  };

  useEffect(() => {
    getTreasureChests();
  }, [getTreasureChests]);

  const handleRedirectPath = () => {
    navigate("/dashboard/treasure-chest-list/new");
  };

  const rowBuilder = (tc: TreasureChest) => {
    const thumbnail = tc.img_url;
    return [
      <TableCellStyled>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "left",
              width: "225px",
              wordWrap: "break-word",
            }}
          >
            <ImgBox mr={3} border={thumbnail}>
              <TableImg src={thumbnail} />
            </ImgBox>
            {tc.title}
          </Box>
        </Box>
      </TableCellStyled>,
      <TableCellStyled>{formatDate(tc.created_date)}</TableCellStyled>,
      <TableCellStyled>{formatDate(tc.event_date)}</TableCellStyled>,
      <TableCellStyled>{tc.location_lat}°</TableCellStyled>,
      <TableCellStyled>{tc.location_long}°</TableCellStyled>,
    ];
  };

  const rowOptionsBuilder = (tc: TreasureChest | null, handleClose) => {
    return tc
      ? rowOptions.map((option) => (
          <OptionsBox key={`${tc.id}-${option.label}`}>
            {option.icon}
            <StyledOption
              onClick={() => {
                handleRowAction(option.label, tc.id);
                handleClose();
              }}
              value={option.value}
            >
              {option.label}
            </StyledOption>
          </OptionsBox>
        ))
      : null;
  };
  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            m: 0,
            padding: "33px 16px 13px 66px",
          }}
        >
          <ToolbarBox>
            <TableTitleWrapper>
              <TableTitle>{pageTitle}</TableTitle>
            </TableTitleWrapper>
            <Box sx={{ ml: "auto" }}>
              <CreateButton
                onClick={handleRedirectPath}
                variant="contained"
                disableElevation
              >
                Create
              </CreateButton>
            </Box>
          </ToolbarBox>
        </Box>
        <TableList
          headers={tableHeaders}
          rowElementsBuilder={rowBuilder}
          rowOptionsBuilder={rowOptionsBuilder}
          items={treasureChests}
          loading={loading}
        ></TableList>
      </StyledCard>
    </DashboardContentWrapper>
  );
};

export default TreasureChestList;

const ImgBox = styled(Box)`
  && {
    min-width: 85px;
    width: 85px;
    min-height: 96.01px;
    height: 96.01px;
    border-radius: 20px;
    border: ${(props) =>
      props.border ? "none" : "0.2px solid rgba(0, 0, 0, 0.2)"};
    overflow: hidden;
  }
`;

const TableImg = styled.img`
  && {
    height: 100%;
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    border: none;
  }
`;

const CreateButton = styled(DashboardButton)`
  && {
    width: 76px;
    height: 40px;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const ToolbarBox = styled(Box)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
`;

const TableTitleWrapper = styled(Box)`
  && {
    position: absolute;
    top: 13px;
    left: 0;
  }
`;

const TableTitle = styled(Box)`
  && {
    font-family: "Samsung Sharp Sans Bold";
    font-size: 1.875rem;
    line-height: 38px;
    color: #000000;
  }
`;
