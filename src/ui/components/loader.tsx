import {Box, CircularProgress} from "@mui/material";

export function Loader() {
    return (
        <Box display='flex'>
            <CircularProgress/>
        </Box>
    );
}
