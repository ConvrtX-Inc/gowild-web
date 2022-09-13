import {Typography} from "@mui/material";
import {NotFoundOrErrorComponent} from "../../types/finder";

export function RouteNotFound({error}: NotFoundOrErrorComponent) {
    console.error(error);
    return <Typography>Route not found</Typography>;
}
