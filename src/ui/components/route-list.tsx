import {
    GetManyBaseRouteControllerRouteApiArg,
    Route,
    useGetManyBaseRouteControllerRouteQuery
} from "../../lib/api/go-wild.api";
import {Box, Card, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {StyledTablePagination, TableTitle, ToolbarBox} from "./table-cell";
import {Scrollbar} from "./scrollbar";
import {CenteredBox} from "./table-centered-box";
import {ActionButton} from "./buttons";
import {Link as RouterLink} from 'react-router-dom';
import {RouteListItem} from "./route-list-item";
import {PaginationProps} from "../../types/finder";

export function RouteList({params, onPageChange, onLimitChange}: PaginationProps<GetManyBaseRouteControllerRouteApiArg>) {
    const {data, isLoading} = useGetManyBaseRouteControllerRouteQuery(params, { pollingInterval: 3000 });
    const routes: Route[] = data?.data ?? [];
    return (
        <Card component={Paper}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    m: 0,
                    padding: '33px 16px 13px 66px'
                }}
            >
                <ToolbarBox>
                    <TableTitle>Route Lists</TableTitle>
                    <Box sx={{ml: 'auto'}}>
                        <ActionButton
                            component={RouterLink}
                            to='/dashboard/route-lists/new'
                            variant='contained'
                            disableElevation
                        >
                            Create
                        </ActionButton>
                    </Box>
                </ToolbarBox>
            </Box>
            <Scrollbar>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: '322px',
                                        maxWidth: '322px',
                                        minWidth: '322px'
                                    }}
                                >
                                    <CenteredBox>NAME</CenteredBox>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '140px',
                                        minWidth: '140px',
                                        maxWidth: '140px'
                                    }}
                                >
                                    <CenteredBox>DATE CREATED</CenteredBox>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '234px',
                                        minWidth: '234px',
                                        maxWidth: '234px'
                                    }}
                                >
                                    <Box display='flex' justifyContent='center' alignItems='center'
                                         flexDirection='column'>
                                        <Box>STARTING POINT</Box>
                                        <Box>LONG / LAT</Box>
                                    </Box>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '266.85px',
                                        minWidth: '266.85px',
                                        maxWidth: '266.85px'
                                    }}
                                >
                                    <CenteredBox>
                                        <Box>END POINT</Box>
                                        <Box>LONG / LAT</Box>
                                    </CenteredBox>
                                </TableCell>
                                <TableCell align='left'/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {routes.length === 0 && isLoading === false && (
                                <TableRow>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>
                            )}

                            {isLoading && (
                                <TableRow sx={{width: '100%'}}>
                                    <TableCell
                                        sx={{
                                            borderBottom: 'none',
                                            position: 'relative',
                                            height: '142px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '48.49px',
                                                left: 'calc(19vw + 239px)'
                                            }}
                                        >
                                            <CircularProgress sx={{color: '#2995A8'}}/>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}

                            {routes.map((route) => <RouteListItem key={route.id} route={route}/>)}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>

            <StyledTablePagination
                component='div'
                count={routes.length}
                onPageChange={(_, newPage) => onPageChange && onPageChange(newPage)}
                page={params.page}
                rowsPerPage={params.limit}
                rowsPerPageOptions={[10, 30, 50]}
                onRowsPerPageChange={(event) => onLimitChange && onLimitChange(parseInt(event.target.value, 10))}
            />
        </Card>
    );
}
