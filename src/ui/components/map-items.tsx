import {memo} from "react";
import {Box, Paper, ToggleButton, ToggleButtonProps} from "@mui/material";

export interface MapItemProps extends Omit<ToggleButtonProps, 'color'> {
    color: string;
}

export const MapItem = memo(({children, color, ...props}: MapItemProps) => (
    <Box bgcolor={props.value ? '#cdcdcd' : 'grey'} component={Paper} elevation={0}>
        <ToggleButton size="small" sx={{color}} {...props}>
            {children}
        </ToggleButton>
    </Box>
));
