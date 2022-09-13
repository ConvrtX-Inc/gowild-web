import {ContentTitleTypography, SubTitleTypography} from "../font.text";
import {useLocation} from "react-router";
import {routeToName} from "../../utils/route.utils";
import {TypographyProps} from "@mui/material";

export function PageTitle() {
    const {pathname} = useLocation();
    return (
        <ContentTitleTypography>{routeToName(pathname)}</ContentTitleTypography>
    );
}

export function HistoricalEventsTitle(props: TypographyProps) {
    return (
        <SubTitleTypography {...props}/>
    )
}
