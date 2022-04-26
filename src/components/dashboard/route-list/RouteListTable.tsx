import React, { useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
// import { Link as RouterLink } from "react-router-dom";
// import numeral from "numeral";
import PropTypes from "prop-types";
import {
  // Avatar,
  Box,
  Button,
  Card,
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
import type { Jurisdiction } from "../../../types/jurisdiction";
import Scrollbar from "../../Scrollbar";
import formatDate from "../../../utils/formatDate";

interface RouteListTableProps {
  normalRoutes: Jurisdiction[];
}

type Sort = "updatedAt|desc" | "updatedAt|asc";

interface SortOption {
  value: Sort;
  label: string;
}

const sortOptions: SortOption[] = [
  {
    label: "Date posted (oldest)",
    value: "updatedAt|asc",
  },
  {
    label: "Date posted (newest)",
    value: "updatedAt|desc",
  },
];

const applyFilters = (
  normalRoutes: Jurisdiction[],
  query: string,
  filters: any
): Jurisdiction[] =>
  normalRoutes.filter((jurisdiction) => {
    let matches = true;

    if (query) {
      const properties = [
        "email",
        "name",
        "caseIdNo",
        "caseTitle",
        "jurisdiction",
        "updatedAt",
      ];
      let containsQuery = false;

      if (typeof query === "string") {
        console.log("Query is string");
        properties.forEach((property) => {
          console.log(property);
          if (property !== "caseIdNo") {
            //Query Date with dateStyle: medium
            // if (jurisdiction["updatedAt"])
            console.log(jurisdiction["updatedAt"]);

            //Query all Strings
            if (
              jurisdiction[property].toLowerCase().includes(query.toLowerCase())
            ) {
              containsQuery = true;
            }
          }
          // Query the number value of property
          if (typeof jurisdiction["caseIdNo"] === "number") {
            console.log("Query is number");
            if (
              jurisdiction["caseIdNo"].toString().includes(query.toString())
            ) {
              containsQuery = true;
            }
          }
        });
      }
      // properties.forEach((property) => {
      //   console.log(jurisdiction["caseTitle"]);
      //   if (
      //     jurisdiction[property].toLowerCase().includes(query.toLowerCase())
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

      if (value && jurisdiction[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = (
  normalRoutes: Jurisdiction[],
  page: number,
  limit: number
): Jurisdiction[] => normalRoutes.slice(page * limit, page * limit + limit);

const descendingComparator = (
  a: Jurisdiction,
  b: Jurisdiction,
  orderBy: string
): number => {
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
    ? (a: Jurisdiction, b: Jurisdiction) => descendingComparator(a, b, orderBy)
    : (a: Jurisdiction, b: Jurisdiction) =>
        -descendingComparator(a, b, orderBy);

const applySort = (
  normalRoutes: Jurisdiction[],
  sort: Sort
): Jurisdiction[] => {
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
  const { normalRoutes, ...other } = props;
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(6);
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

  const handleSelectAllJurisdictions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedJurisdictions(
      event.target.checked
        ? normalRoutes.map((jurisdiction) => jurisdiction.id)
        : []
    );
  };

  const handleSelectOneJurisdiction = (
    event: ChangeEvent<HTMLInputElement>,
    jurisdictionId: string
  ): void => {
    if (!selectedJurisdictions.includes(jurisdictionId)) {
      setSelectedJurisdictions((prevSelected) => [
        ...prevSelected,
        jurisdictionId,
      ]);
    } else {
      setSelectedJurisdictions((prevSelected) =>
        prevSelected.filter((id) => id !== jurisdictionId)
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

  const filteredJurisdictions = applyFilters(normalRoutes, query, filters);
  const sortedJurisdictions = applySort(filteredJurisdictions, sort);
  const paginatedJurisdictions = applyPagination(
    sortedJurisdictions,
    page,
    limit
  );
  // const enableBulkActions = selectedJurisdictions.length > 0;
  const selectedSomeJurisdictions =
    selectedJurisdictions.length > 0 &&
    selectedJurisdictions.length < normalRoutes.length;
  const selectedAllJurisdictions =
    selectedJurisdictions.length === normalRoutes.length;

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
            <Box>
              <TableTitle>Route Lists</TableTitle>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <CreateNormalRouteButton variant="contained" disableElevation>
                Create
              </CreateNormalRouteButton>
            </Box>
          </ToolbarBox>
        </Box>
        <Scrollbar>
          <Box sx={{ minWidth: 700, pl: "36px", pr: "32px" }}>
            <Table>
              <TableHead sx={{ borderTop: "1px solid #EFEFEF" }}>
                <TableRow>
                  <HeaderCheckbox padding="checkbox" sx={{ width: "34px" }}>
                    <StyledCheckbox
                      checked={selectedAllJurisdictions}
                      indeterminate={selectedSomeJurisdictions}
                      onChange={handleSelectAllJurisdictions}
                    />
                  </HeaderCheckbox>
                  <TableHeaderCell sx={{ width: "146px" }}>
                    NAME
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "209px" }}>
                    DATE CREATED
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "127px" }}>
                    STARTING POINT LONG/LAT
                  </TableHeaderCell>
                  <TableHeaderCell sx={{ width: "144px" }}>
                    ENDPOINT LONG/LAT
                  </TableHeaderCell>
                  <TableHeaderCell
                    align="left"
                    sx={{ width: "161px" }}
                  ></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedJurisdictions.map((jurisdiction) => {
                  const isJurisdictionSelected = selectedJurisdictions.includes(
                    jurisdiction.id
                  );

                  return (
                    <StyledTableRow
                      hover
                      key={jurisdiction.id}
                      selected={isJurisdictionSelected}
                    >
                      <TableCellStyled padding="checkbox">
                        <StyledCheckbox
                          checked={isJurisdictionSelected}
                          onChange={(event) =>
                            handleSelectOneJurisdiction(event, jurisdiction.id)
                          }
                          value={isJurisdictionSelected}
                        />
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography500>{`${jurisdiction.jurisdiction}`}</Typography500>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>
                          {formatDate(jurisdiction.updatedAt)}
                        </Typography400>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>32.4832°/12.4233°</Typography400>
                      </TableCellStyled>
                      <TableCellStyled>
                        <Typography400>65.5234°/12.4233°</Typography400>
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
                              horizontal: "left",
                            }}
                          >
                            <PopOverTitle>Filter By</PopOverTitle>
                            {sortOptions.map((option) => (
                              <StyledOption
                                // onClick={handleSortChange}
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </StyledOption>
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
          count={filteredJurisdictions.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[6, 10, 25]}
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
          checked={selectedAllJurisdictions}
          color="primary"
          indeterminate={selectedSomeJurisdictions}
          onChange={handleSelectAllJurisdictions}
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
    color: rgba(9, 17, 14, 0.5);
    &.Mui-checked {
      color: #2955a0;
    }
    &.MuiCheckbox-indeterminate {
      color: #2955a0;
    }
  }
`;

const TableTitle = styled(Box)`
  && {
    font-family: "Samsung Sharp Sans";
    font-style: normal;
    font-weight: 700;
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

const ToolbarBox = styled(Box)`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledPopOver = styled(Popover)`
  && .MuiPopover-paper {
    background: #f1f3f6;
    border: 1px solid #2955a0;
    border-radius: 10px;
  }
`;

const PopOverTitle = styled(Box)`
  && {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 18px;
    color: #09110e;
    margin-top: 15px;
    margin-bottom: 7px;
    margin-left: 19px;
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
    border-color: #efefef;
    padding-top: 26px;
    padding-bottom: 26px;
    padding-left: 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #09110e;
    /* opacity: 0.4; */
  }
`;

const TableHeaderCell = styled(TableCell)`
  && {
    border-color: #efefef;
    padding-top: 26px;
    padding-bottom: 26px;
    padding-left: 0;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #09110e;
    opacity: 0.4;
  }
`;

const TableCellStyled = styled(TableCell)`
  && {
    border-color: #efefef;
    padding-top: 42.5px;
    padding-bottom: 49.5px;
    padding-left: 0;
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
    font-family: "Gilroy-Bold";
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
    background: #2955a0;
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
