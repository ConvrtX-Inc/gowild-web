import {TableCellStyled} from "./table-cell";
import {CenteredBox, GroupBox} from "./table-centered-box";
import {Box, CardMedia, CircularProgress, IconButton, ListItem, ListItemText, TableRow} from "@mui/material";
import {Typography400} from "./typography";
import {formatDate} from "typescript-logging";
import {StyledPopOver} from "./popover";
import {Route, useDeleteOneBaseRouteControllerRouteMutation} from "../../lib/api/go-wild.api";
import ThreeDots from "../icons/ThreeDots";
import {useCallback, useMemo, useState} from "react";
import RouteListDelete from "../icons/RouteListDelete";
import RouteListEdit from "../icons/RouteListEdit";
import RouteListView from "../icons/RouteListView";
import {useNavigate} from "react-router-dom";
import {getLogger} from "../../lib/logging";
import {routePoles} from "../../utils/route.utils";

const logger = getLogger('route-list-item');

export interface RouteListItemProps {
    route: Route;
}

type RowAction = 'delete' | 'edit' | 'view';

const actionOptions = [
    {
        label: 'View',
        value: 'view' as RowAction,
        icon: <RouteListView fontSize='large'/>
    },
    {
        label: 'Edit',
        value: 'edit' as RowAction,
        icon: <RouteListEdit fontSize='large'/>
    },
    {
        label: 'Delete',
        value: 'delete' as RowAction,
        icon: <RouteListDelete fontSize='large'/>
    }
];

export function RouteListItem({route}: RouteListItemProps) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [deleteRoute, {isLoading: isDeleting}] = useDeleteOneBaseRouteControllerRouteMutation();
    const {start, end} = route;

    const handleClickPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const handleRowAction = useCallback(
        async (action: RowAction) => {

            if (action === 'delete') {
                logger.debug('Will delete ' + route.id);
                const result = await deleteRoute({id: route.id})
                if ('error' in result) {
                    logger.error('Could not delete route', result.error);
                } else {
                    logger.info('Route deleted');
                    setAnchorEl(null);
                }
                return;
            }

            if (action === 'edit') {
                logger.debug('Will edit ' + route.id);
                navigate(`/dashboard/route-lists/${route.id}/edit`);
                return;
            }

            if (action === 'view') {
                logger.debug('Will view ' + route.id);
                navigate(`/dashboard/route-lists/${route.id}`);
                return;
            }
        },
        [deleteRoute, navigate, route.id]
    );

    return (
        <TableRow hover key={route.id}>
            <TableCellStyled>
                <GroupBox>
                    <CardMedia
                        sx={{
                            width: '85px',
                            height: '96.01px',
                            mr: '26px',
                            borderRadius: '20px',
                            // border: "0.2px solid rgba(0, 0, 0, 0.2)",
                            boxSizing: 'border-box'
                        }}
                        image={route.picture?.path}
                    />
                    <Typography400>{route.title}</Typography400>
                </GroupBox>
            </TableCellStyled>
            <TableCellStyled>
                <CenteredBox>
                    <Typography400>{formatDate(new Date(route.createdDate).getTime())}</Typography400>
                </CenteredBox>
            </TableCellStyled>
            <TableCellStyled>
                <CenteredBox>
                    <Typography400>{`${start.coordinates[1]}/${start.coordinates[0]}`}</Typography400>
                </CenteredBox>
            </TableCellStyled>
            <TableCellStyled>
                <CenteredBox>
                    <Typography400>{`${end.coordinates[1]}/${end.coordinates[0]}`}</Typography400>
                </CenteredBox>
            </TableCellStyled>
            <TableCellStyled align='right'>
                <Box>
                    <IconButton
                        aria-describedby={route.id}
                        onClick={handleClickPopOver}
                    >
                        <ThreeDots/>
                    </IconButton>
                    <StyledPopOver
                        id={route.id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        {!isDeleting ? (actionOptions.map((option) => (
                            <ListItem
                                key={option.value}
                                onClick={() => handleRowAction(option.value)}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        {option.icon}
                                    </IconButton>
                                }
                            >
                                <ListItemText id={option.label + '-' + route.id} primary={option.label}/>
                            </ListItem>
                        ))) : (
                            <CircularProgress/>
                        )}
                    </StyledPopOver>
                </Box>
            </TableCellStyled>
        </TableRow>
    );
}
