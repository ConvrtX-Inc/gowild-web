import React, { useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import numeral from "numeral";
import PropTypes from "prop-types";
import {
  // Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  // InputAdornment,
  Popover,
  // Link,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  // TextField,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import ThreeDotsIcon from "../../../icons/ThreeDots";
import ViewIcon from "../../../icons/RouteListView";
import EditIcon from "../../../icons/RouteListEdit";
import DeleteIcon from "../../../icons/RouteListDelete";
import type { NormalRoute } from "../../../types/route-lists";
import Scrollbar from "../../Scrollbar";
import formatDate from "../../../utils/formatDate";

interface RouteListTableProps {
  // normalRoutes: NormalRoute[];
  normalRoutes: NormalRoute[];
}

type Sort = "updatedAt|desc" | "updatedAt|asc" | "deleteAt|asc";

interface SortOption {
  value: Sort;
  label: string;
  icon: any;
}

const sortOptions: SortOption[] = [
  {
    label: "View",
    value: "updatedAt|asc",
    icon: <ViewIcon />,
  },
  {
    label: "Edit",
    value: "updatedAt|desc",
    icon: <EditIcon />,
  },
  {
    label: "Delete",
    value: "deleteAt|asc",
    icon: <DeleteIcon />,
  },
];

const applyFilters = (
  normalRoutes: any[],
  query: string,
  filters: any
): NormalRoute[] =>
  normalRoutes.filter((normalRoute) => {
    let matches = true;

    if (query) {
      const properties = ["route_name"];
      let containsQuery = false;

      if (typeof query === "string") {
        console.log("Query is string");
        properties.forEach((property) => {
          //Query all Strings
          if (
            normalRoute[property].toLowerCase().includes(query.toLowerCase())
          ) {
            containsQuery = true;
          }
        });
      }
      // properties.forEach((property) => {
      //   console.log(normalRoute["caseTitle"]);
      //   if (
      //     normalRoute[property].toLowerCase().includes(query.toLowerCase())
      //   ) {
      //     containsQuery = true;
      //   }
      // });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && normalRoute[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = (
  normalRoutes: any[],
  page: number,
  limit: number
): any[] => normalRoutes.slice(page * limit, page * limit + limit);

const descendingComparator = (a: any, b: any, orderBy: string): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order: "asc" | "desc", orderBy: string) =>
  order === "desc"
    ? (a: NormalRoute, b: NormalRoute) => descendingComparator(a, b, orderBy)
    : (a: NormalRoute, b: NormalRoute) => -descendingComparator(a, b, orderBy);

const applySort = (normalRoutes: NormalRoute[], sort: Sort): NormalRoute[] => {
  const [orderBy, order] = sort.split("|") as [string, "asc" | "desc"];
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = normalRoutes.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // @ts-ignore
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    // @ts-ignore
    return a[1] - b[1];
  });

  // @ts-ignore
  return stabilizedThis.map((el) => el[0]);
};

const RouteListTable: FC<RouteListTableProps> = (props) => {
  const navigate = useNavigate();
  const { normalRoutes, ...other } = props;
  const [selectedNormalRoutes, setSelectedNormalRoutes] = useState<string[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [
    query,
    // setQuery
  ] = useState<string>("");
  const [
    sort,
    // setSort
  ] = useState<Sort>(sortOptions[1].value);
  const [filters] = useState<any>({
    hasAcceptedMarketing: null,
    isProspect: null,
    isReturning: null,
  });

  const handleRedirectPath = () => {
    navigate("/dashboard/route-list/new");
  };
  // const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setQuery(event.target.value);
  // };

  // const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
  //   setSort(event.target.value as Sort);
  // };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // const handleSortChange = (event: any): void => {
  //   setSort(event.target.value as Sort);
  //   setAnchorEl(null);
  // };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectAllNormalRoutes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedNormalRoutes(
      event.target.checked
        ? normalRoutes.map((normalRoute) => normalRoute.id)
        : []
    );
  };

  const handleSelectOneNormalRoute = (
    event: ChangeEvent<HTMLInputElement>,
    normalRouteId: string
  ): void => {
    if (!selectedNormalRoutes.includes(normalRouteId)) {
      setSelectedNormalRoutes((prevSelected) => [
        ...prevSelected,
        normalRouteId,
      ]);
    } else {
      setSelectedNormalRoutes((prevSelected) =>
        prevSelected.filter((id) => id !== normalRouteId)
      );
    }
  };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredNormalRoutes = applyFilters(normalRoutes, query, filters);
  const sortedNormalRoutes = applySort(filteredNormalRoutes, sort);
  const paginatedNormalRoutes = applyPagination(
    sortedNormalRoutes,
    page,
    limit
  );
  // const enableBulkActions = selectedNormalRoutes.length > 0;
  const selectedSomeNormalRoutes =
    selectedNormalRoutes.length > 0 &&
    selectedNormalRoutes.length < normalRoutes.length;
  const selectedAllNormalRoutes =
    selectedNormalRoutes.length === normalRoutes.length;

  return (
    <>
      <StyledCard {...other}>
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
              <TableTitle>Route Lists</TableTitle>
            </TableTitleWrapper>
            <Box sx={{ ml: "auto" }}>
              <CreateNormalRouteButton
                onClick={handleRedirectPath}
                variant="contained"
                disableElevation
              >
                Create
              </CreateNormalRouteButton>
            </Box>
          </ToolbarBox>
        </Box>
        <Scrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <HeaderCheckbox padding="checkbox">
                    <StyledCheckbox
                      checked={selectedAllNormalRoutes}
                      indeterminate={selectedSomeNormalRoutes}
                      onChange={handleSelectAllNormalRoutes}
                    />
                  </HeaderCheckbox>
                  <TableHeaderCell sx={{ width: "340px" }}>
                    NAME
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "140px" }}>
                    DATE CREATED
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "234px" }}>
                    STARTING POINT LONG/LAT
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "166px" }}>
                    ENDPOINT LONG/LAT
                  </TableHeaderCell>
                  <TableHeaderCell
                    align="left"
                    sx={{ width: "161px" }}
                  ></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedNormalRoutes.map((normalRoute) => {
                  const isNormalRouteselected = selectedNormalRoutes.includes(
                    normalRoute.id
                  );

                  return (
                    <StyledTableRow
                      hover
                      key={normalRoute.id}
                      selected={isNormalRouteselected}
                    >
                      <TableCellStyled>
                        <StyledCheckbox
                          sx={{ ml: "20px" }}
                          checked={isNormalRouteselected}
                          onChange={(event) =>
                            handleSelectOneNormalRoute(event, normalRoute.id)
                          }
                          value={isNormalRouteselected}
                        />
                      </TableCellStyled>
                      <TableCellStyled>
                        <GroupBox>
                          <CardMedia
                            sx={{
                              width: "85px",
                              height: "96.01px",
                              mr: "26px",
                              borderRadius: "20px",
                              border: "0.2px solid rgba(0, 0, 0, 0.2)",
                              boxSizing: "border-box",
                            }}
                            src={normalRoute.route_photo}
                          />
                          <Typography500>{`${normalRoute.route_name}`}</Typography500>
                        </GroupBox>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>
                          {formatDate(normalRoute.created_date)}
                        </Typography400>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>{`${normalRoute.start_point_long}/${normalRoute.start_point_lat}`}</Typography400>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>{`${normalRoute.stop_point_long}/${normalRoute.stop_point_lat}`}</Typography400>
                      </TableCellStyled>
                      <TableCellStyled align="right">
                        <Box>
                          <IconButton
                            aria-describedby={id}
                            onClick={handleClick}
                          >
                            <ThreeDotsIcon />
                          </IconButton>
                          <StyledPopOver
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            {sortOptions.map((option) => (
                              <OptionsBox key={option.value}>
                                {option.icon}
                                <StyledOption
                                  // onClick={handleSortChange}
                                  value={option.value}
                                >
                                  {option.label}
                                </StyledOption>
                              </OptionsBox>
                            ))}
                          </StyledPopOver>
                        </Box>
                      </TableCellStyled>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>

        <StyledTablePagination
          component="div"
          count={filteredNormalRoutes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 30, 50]}
        />
      </StyledCard>
      <Box sx={{ display: "flex", position: "relative" }}>
        {/* <Box
          sx={{
            mt: "23px",
            position: "relative",
            marginLeft: "auto",
            mr: "89px",
            zIndex: 2,
          }}
        > */}
        <HiddenCheckBox
          checked={selectedAllNormalRoutes}
          color="primary"
          indeterminate={selectedSomeNormalRoutes}
          onChange={handleSelectAllNormalRoutes}
        />
        {/* </Box> */}
      </Box>
    </>
  );
};

RouteListTable.propTypes = {
  normalRoutes: PropTypes.array.isRequired,
};

export default RouteListTable;

const StyledCard = styled(Card)`
  && {
    box-shadow: none;
    border-radius: 20px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  && {
    padding: 0;
    color: rgba(255, 228, 220, 1);
    &.Mui-checked {
      color: #2955a0;
    }
    &.MuiCheckbox-indeterminate {
      color: #2955a0;
    }
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

const StyledTableRow = styled(TableRow)`
  && {
    &.Mui-selected {
      background-color: rgba(41, 85, 160, 0.08);
    }
  }
`;

const OptionsBox = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledPopOver = styled(Popover)`
  && .MuiPopover-paper {
    padding: 15px 4px 0 10px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0;
  }
`;

const StyledOption = styled.option`
  && {
    cursor: pointer;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    padding: 9px 24px 9px 19px;
    color: #09110e;
    &:hover {
      background: #e5e7eb;
    }
  }
`;

const HeaderCheckbox = styled(TableCell)`
  && {
    width: 66px;
    height: 45px;
    background-color: #ff7851;
    padding-top: 13px;
    padding-bottom: 12px;
    padding-left: 0;
    display: flex;
    justify-content: center;
  }
`;

const TableHeaderCell = styled(TableCell)`
  && {
    background-color: #ff7851;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 0;
    font-family: "Inter";
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 15px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
`;

const TableCellStyled = styled(TableCell)`
  && {
    border-color: rgba(255, 120, 81, 1);
    padding-top: 23px;
    padding-bottom: 23px;
    padding-left: 0;
  }
`;

const GroupBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const Typography500 = styled(Typography)`
  && {
    font-family: "Poppins";
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #000000;
  }
`;
const Typography400 = styled(Typography)`
  && {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #626262;
  }
`;

const CreateNormalRouteButton = styled(Button)`
  && {
    width: 76px;
    height: 40px;
    background-image: url("/static/route-list/create-btn.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #00755e;
    border-radius: 10px;
    padding: 13px 15px 13px 16px;
    font-family: "Gilroy Bold";
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #ffffff;
  }
`;

const StyledTablePagination = styled(TablePagination)`
  && {
    /* padding: 0 0 0 0; */
    height: 43px;
    background: #ff7851;
    border-radius: 0px 0px 20px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & .css-1cnh8g5-MuiInputBase-root-MuiTablePagination-select {
      /* background: red; */
      /* margin-left: 0 !important; */
      margin-right: 84px;
    }
    & .MuiTablePagination-toolbar {
      min-height: 43px;
      color: #ffffff;
      & .Mui-disabled {
        color: #ffffff;
        opacity: 0.5;
      }
      & .MuiTablePagination-select {
        padding-top: 4px;
      }
      & .MuiSelect-icon {
        color: white;
      }
    }
    & p {
      font-family: "Gilroy SemiBold";
      font-size: 16px;
      line-height: 19px;
      margin: 0 0 0 0;
      color: #ffffff;
    }
    div.MuiTablePagination-select {
      font-family: "Gilroy SemiBold";
      font-size: 16px;
      line-height: 19px;
      padding: 0 25px 0 0;
      color: #ffffff;
    }
    div.MuiTablePagination-actions {
      margin-left: 92.17px;
    }
    div.MuiTablePagination-actions button:nth-child(2) {
      margin-left: 68.16px;
      margin-right: 26.5px;
      & svg {
        height: 100%;
      }
    }
  }
`;

const HiddenCheckBox = styled(Checkbox)`
  && {
    display: none;
  }
`;
