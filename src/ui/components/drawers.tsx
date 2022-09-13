import {Drawer, DrawerProps} from "@mui/material";
import React, {memo} from "react";
import {merge} from 'lodash';

export interface MenuDrawerProps extends DrawerProps {
    drawerWidth: number;
}

export const MenuDrawer = memo<MenuDrawerProps>(({drawerWidth, ...props}) => (
    <Drawer
        {...props}
        PaperProps={merge(props.PaperProps ?? {}, {
            sx: {
                backgroundColor: '#2995A8',
                borderRight: 0
            }
        })}
        sx={merge(props.sx, {
            '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
            }
        })}
    />
));
