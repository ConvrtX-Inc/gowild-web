import {Box, styled, TableCell, TablePagination} from "@mui/material";
import {TablePaginationBaseProps} from "@mui/material/TablePagination/TablePagination";

export const TableCellStyled = styled(TableCell)(({theme}) => ({
    borderColor: 'rgba(255, 120, 81, 1)',
    py: 24
}))

export const ToolbarBox = styled(Box)(({}) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
}));

export const TableTitle = styled(Box)(() => ({
    fontFamily: 'Samsung Sharp Sans Bold',
    fontSize: '1.875rem',
    lineHeight: '38px',
    color: 'black',
}));

export interface StyledTablePaginationProps extends TablePaginationBaseProps {
    component: any;
}

export const StyledTablePagination = styled(TablePagination)(({}: StyledTablePaginationProps) => ({}));
