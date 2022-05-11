import React, { useState, useCallback } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  CircularProgress,
  Popover,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
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
import { refreshListOnDelete } from "../../../slices/route-list";
import { useDispatch, useSelector } from "../../../store";

interface RouteListTableProps {
  normalRoutes: NormalRoute[];
}

type Sort = "updated_date|desc" | "updated_date|asc" | "deleteAt|asc";
type Action = "view" | "edit" | "delete" | null;

interface SortOption {
  value: Sort;
  label: string;
  icon: any;
}

interface actionOption {
  value: Action;
  label: string;
  icon: any;
}

const sortOptions: SortOption[] = [
  {
    label: "View",
    value: "updated_date|asc",
    icon: <ViewIcon fontSize="large" />,
  },
  {
    label: "Edit",
    value: "updated_date|desc",
    icon: <EditIcon fontSize="large" />,
  },
  {
    label: "Delete",
    value: "deleteAt|asc",
    icon: <DeleteIcon fontSize="large" />,
  },
];

const actionOptions: actionOption[] = [
  {
    label: "View",
    value: "view",
    icon: <ViewIcon fontSize="large" />,
  },
  {
    label: "Edit",
    value: "edit",
    icon: <EditIcon fontSize="large" />,
  },
  {
    label: "Delete",
    value: "delete",
    icon: <DeleteIcon fontSize="large" />,
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
  const dispatch = useDispatch();
  const setIsLoading = useSelector((state) => state.routeList.setIsLoading);
  const [isDeleting, setIsDeleting] = useState(false);
  const { normalRoutes, ...other } = props;
  const [selectedNormalRoutes, setSelectedNormalRoutes] = useState<string[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [query] = useState<string>("");
  const [sort] = useState<Sort>(sortOptions[0].value);
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");
  const [filters] = useState<any>({
    dummy: null,
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

  // const handleSortChange = (event: any): void => {
  //   setSort(event.target.value as Sort);
  //   setAnchorEl(null);
  // };

  const handleRowAction = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, action) => {
      const { value } = event.target;
      const accessToken = sessionStorage.getItem("token");

      if (value === "delete" || action === "delete") {
        console.log(`ROW ACTION fn: ${value}, id: ${selectedRouteId}`);
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route/${selectedRouteId}`;
        const CONFIG = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        };
        setIsDeleting(true);
        const apiResponse = await axios.delete(URL, CONFIG);
        if (apiResponse.status === 200) {
          //Trigger Refresh Route List Table in Route List Page
          dispatch(refreshListOnDelete(true));
          setIsDeleting(false);
        }

        setAnchorEl(null);
      }

      if (value === "edit" || action === "edit") {
        navigate("/dashboard/route-list/edit", {
          state: { routeId: selectedRouteId },
        });
      }

      if (value === "view" || action === "view") {
        navigate("/dashboard/route-list/view", {
          state: { routeId: selectedRouteId },
        });
      }
    },
    [dispatch, navigate, selectedRouteId]
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClickPopOver = (
    event: React.MouseEvent<HTMLButtonElement>,
    routeId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRouteId(routeId);
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
                  <HeaderCheckbox>
                    <StyledCheckbox
                      sx={{ visibility: "hidden" }}
                      checked={
                        normalRoutes.length > 0
                          ? selectedAllNormalRoutes
                          : false
                      }
                      indeterminate={selectedSomeNormalRoutes}
                      onChange={handleSelectAllNormalRoutes}
                    />
                  </HeaderCheckbox>
                  <TableHeaderCell
                    sx={{
                      width: "322px",
                      maxWidth: "322px",
                      minWidth: "322px",
                    }}
                  >
                    <CenteredBox>NAME</CenteredBox>
                  </TableHeaderCell>
                  <TableHeaderCell
                    sx={{
                      width: "140px",
                      minWidth: "140px",
                      maxWidth: "140px",
                    }}
                  >
                    <CenteredBox>DATE CREATED</CenteredBox>
                  </TableHeaderCell>
                  <TableHeaderCell
                    sx={{
                      width: "234px",
                      minWidth: "234px",
                      maxWidth: "234px",
                    }}
                  >
                    <CenteredBox>
                      <Box>STARTING POINT</Box>
                      <Box>LONG / LAT</Box>
                    </CenteredBox>
                  </TableHeaderCell>
                  <TableHeaderCell
                    sx={{
                      width: "266.85px",
                      minWidth: "266.85px",
                      maxWidth: "266.85px",
                    }}
                  >
                    <CenteredBox>
                      <Box>END POINT</Box>
                      <Box>LONG / LAT</Box>
                    </CenteredBox>
                  </TableHeaderCell>
                  <TableHeaderCell align="left"></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {normalRoutes.length === 0 && setIsLoading === false && (
                  <TableRow>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                )}
                {setIsLoading && (
                  <TableRow sx={{ width: "100%" }}>
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        position: "relative",
                        height: "142px",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "48.49px",
                          left: "calc(19vw + 239px)",
                        }}
                      >
                        <CircularProgress sx={{ color: "#2995A8" }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
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
                        {/* <Box sx={{ ml: "20px" }}></Box> */}
                        <StyledCheckbox
                          sx={{ ml: "20px", visibility: "hidden" }}
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
                              // border: "0.2px solid rgba(0, 0, 0, 0.2)",
                              boxSizing: "border-box",
                            }}
                            image={normalRoute.img_url}
                          />
                          <Typography400>{`${normalRoute.route_name}`}</Typography400>
                        </GroupBox>
                      </TableCellStyled>
                      <TableCellStyled>
                        <CenteredBox>
                          <Typography400>
                            {formatDate(normalRoute.created_date)}
                          </Typography400>
                        </CenteredBox>
                      </TableCellStyled>
                      <TableCellStyled>
                        <CenteredBox>
                          <Typography400>{`${normalRoute.start_point_long}/${normalRoute.start_point_lat}`}</Typography400>
                        </CenteredBox>
                      </TableCellStyled>
                      <TableCellStyled>
                        <CenteredBox>
                          <Typography400>{`${normalRoute.stop_point_long}/${normalRoute.stop_point_lat}`}</Typography400>
                        </CenteredBox>
                      </TableCellStyled>
                      <TableCellStyled align="right">
                        <Box>
                          <IconButton
                            aria-describedby={id}
                            onClick={(e) =>
                              handleClickPopOver(e, normalRoute.id)
                            }
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
                            {!isDeleting ? (
                              actionOptions.map((option) => (
                                <OptionsBox
                                  key={option.value}
                                  onClick={(e) => {
                                    // optionRef.current.click()
                                    handleRowAction(e, option.value);
                                  }}
                                >
                                  {option.icon}
                                  <StyledOption
                                    // ref={optionRef}
                                    onClick={handleRowAction}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </StyledOption>
                                </OptionsBox>
                              ))
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "161px",
                                  height: "142.43px",
                                  fontFamily: "Gilroy Medium",
                                  fontSize: "25px",
                                  color: "#878787",
                                }}
                              >
                                <CircularProgress color="success" />
                                Deleting
                              </Box>
                            )}
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
          // count={filteredNormalRoutes.length}
          count={normalRoutes.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 30, 50]}
        />
      </StyledCard>
      <Box sx={{ display: "flex", position: "relative" }}>
        <HiddenCheckBox
          checked={selectedAllNormalRoutes}
          color="primary"
          indeterminate={selectedSomeNormalRoutes}
          onChange={handleSelectAllNormalRoutes}
        />
      </Box>
    </>
  );
};

RouteListTable.propTypes = {
  normalRoutes: PropTypes.array.isRequired,
};

export default React.memo(RouteListTable);
// export default RouteListTable;
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
    padding-left: 6px;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 12.4733px;
    &:hover {
      background-color: #e5e7eb;
    }
  }
`;

const StyledPopOver = styled(Popover)`
  && .MuiPopover-paper {
    width: 171px;
    padding: 7.59px 4px 0 4px;
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
    font-family: "Gilroy Medium";
    font-size: 0.875rem;
    line-height: 16px;
    letter-spacing: 0.02rem;
    color: #878787;
    padding: 4px 24px 4px 5px;
    &:hover {
      background: #e5e7eb;
    }
  }
`;

const HeaderCheckbox = styled(TableCell)`
  && {
    width: 60px;
    height: 45px;
    background-color: #ff7851;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 19px;
  }
`;

const TableHeaderCell = styled(TableCell)`
  && {
    height: 45px;
    background-color: #ff7851;
    padding-top: 9px;
    padding-bottom: 6px;
    padding-left: 0;
    font-family: "Inter";
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 15px;
    letter-spacing: 0.05rem;
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

const CenteredBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

const Typography400 = styled(Typography)`
  && {
    font-family: "Gilroy SemiBold";
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.05rem;
    color: #000000;
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
    height: 43px;
    background: #ff7851;
    border-radius: 0px 0px 20px 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & .css-1cnh8g5-MuiInputBase-root-MuiTablePagination-select {
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
