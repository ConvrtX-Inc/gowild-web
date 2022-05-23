import React, { cloneElement, useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";
import {
  Box,
  Checkbox,
  Popover,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import ThreeDotsIcon from "../../icons/ThreeDots";
import ViewIcon from "../../icons/RouteListView";
import EditIcon from "../../icons/RouteListEdit";
import DeleteIcon from "../../icons/RouteListDelete";
import { NormalRoute } from "../../types/route-lists";
import Scrollbar from "../Scrollbar";
import { TreasureChest } from "src/types/treasurechest";
import { TableCellStyled } from "src/shared-styled-components/dashboard";

type TableItems = NormalRoute[] | TreasureChest[];
type TableItem = NormalRoute | TreasureChest;
interface TableListProps {
  headers: string[];
  items: TableItems;
  rowElementsBuilder: (item: TableItem) => JSX.Element[];
  rowOptionsBuilder: (
    item: TableItem | null,
    handleClose: () => void
  ) => JSX.Element[] | null;
  loading?: boolean;
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
  items: any[],
  query: string,
  filters: any
): TableItems[] =>
  items.filter((item) => {
    let matches = true;

    if (query) {
      const properties = ["route_name"];
      let containsQuery = false;

      if (typeof query === "string") {
        console.log("Query is string");
        properties.forEach((property) => {
          //Query all Strings
          if (item[property].toLowerCase().includes(query.toLowerCase())) {
            containsQuery = true;
          }
        });
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && item[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });

const applyPagination = (items: any[], page: number, limit: number): any[] =>
  items.slice(page * limit, page * limit + limit);

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
    ? (a: TableItems, b: TableItems) => descendingComparator(a, b, orderBy)
    : (a: TableItems, b: TableItems) => -descendingComparator(a, b, orderBy);

const applySort = (items: TableItems[], sort: Sort): TableItems[] => {
  const [orderBy, order] = sort.split("|") as [string, "asc" | "desc"];
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = items.map((el, index) => [el, index]);

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

const TableList: FC<TableListProps> = (props) => {
  const { items, headers, rowElementsBuilder, rowOptionsBuilder, loading } =
    props;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

  const [rowItem, setRowItem] = useState<TableItem>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item) => {
    setRowItem(item);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSelectAllItems = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedItems(event.target.checked ? items.map((item) => item.id) : []);
  };

  // const handleSelectOneItem = (
  //   event: ChangeEvent<HTMLInputElement>,
  //   itemId: string
  // ): void => {
  //   if (!selectedItems.includes(itemId)) {
  //     setSelectedItems((prevSelected) => [...prevSelected, itemId]);
  //   } else {
  //     setSelectedItems((prevSelected) =>
  //       prevSelected.filter((id) => id !== itemId)
  //     );
  //   }
  // };

  const handlePageChange = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredItems = applyFilters(items, query, filters);
  const sortedItems = applySort(filteredItems, sort);
  const paginatedItems = applyPagination(sortedItems, page, limit);

  const selectedSomeItems =
    selectedItems.length > 0 && selectedItems.length < items.length;
  const selectedAllItems = selectedItems.length === items.length;
  return (
    <>
      <Scrollbar>
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableHeaderCell
                  padding="checkbox"
                  sx={{
                    padding: "0 !important",
                  }}
                >
                  <StyledCheckbox
                    checked={selectedAllItems}
                    indeterminate={selectedSomeItems}
                    onChange={handleSelectAllItems}
                  />
                </TableHeaderCell> */}
                {headers.map((header) => (
                  <TableHeaderCell key={header}>{header}</TableHeaderCell>
                ))}
                <TableHeaderCell
                  align="left"
                  sx={{ width: "161px" }}
                ></TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                items.length > 0 &&
                paginatedItems.map((item) => {
                  const isItemSelected = selectedItems.includes(item.id);
                  return (
                    <StyledTableRow
                      hover
                      key={item.id}
                      selected={isItemSelected}
                    >
                      {/* <TableCellStyled padding="checkbox">
                        <Box
                          sx={{
                            width: 66,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <StyledCheckbox
                            checked={isItemSelected}
                            onChange={(event) =>
                              handleSelectOneItem(event, item.id)
                            }
                            value={isItemSelected}
                          />
                        </Box>
                      </TableCellStyled> */}

                      {rowElementsBuilder(item).map((elem, i) =>
                        cloneElement(elem, {
                          key: `${item}-${i}`,
                        })
                      )}

                      <TableCellStyled align="right">
                        <Box
                          sx={{
                            textAlign: "right",
                          }}
                        >
                          <IconButton
                            aria-describedby={id}
                            onClick={(e) => handleClick(e, item)}
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
                            {rowOptionsBuilder(rowItem, handleClose)}
                          </StyledPopOver>
                        </Box>
                      </TableCellStyled>
                    </StyledTableRow>
                  );
                })
              ) : (
                <TableRow sx={{ width: "100%" }}>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      position: "relative",
                      height: "142px",
                    }}
                  >
                    <DefaultLoadingBox>
                      <CircularProgress />
                    </DefaultLoadingBox>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!loading && items.length === 0 && (
            <EmptyTableBox m={2}>
              <Typography variant="h5">Empty...</Typography>
            </EmptyTableBox>
          )}
        </Box>
      </Scrollbar>
      <StyledTablePagination
        component="div"
        count={filteredItems.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[6, 10, 25]}
      />
      <Box sx={{ display: "flex", position: "relative" }}>
        <HiddenCheckBox
          checked={selectedAllItems}
          color="primary"
          indeterminate={selectedSomeItems}
          onChange={handleSelectAllItems}
        />
        {/* </Box> */}
      </Box>
    </>
  );
};

export default TableList;

const EmptyTableBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const DefaultLoadingBox = styled(Box)`
  && {
    position: absolute;
    top: 48.49px;
    left: calc(19vw + 239px);
    && .MuiCircularProgress-svg {
      color: #2995a8;
    }
  }
`;

// const StyledCheckbox = styled(Checkbox)`
//   && {
//     padding: 0;
//     color: #ffe4dc;
//     &.Mui-checked {
//       color: #2955a0;
//     }
//     &.MuiCheckbox-indeterminate {
//       color: #2955a0;
//     }
//   }
// `;

const StyledTableRow = styled(TableRow)`
  && {
    &.Mui-selected {
      background-color: rgba(41, 85, 160, 0.08);
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

const TableHeaderCell = styled(TableCell)`
  && {
    background-color: #ff7851;
    padding: 15px 18px;
    text-align: center;
    font-family: "Inter";
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 15px;
    letter-spacing: 0.05em;
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
