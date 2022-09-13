import {Outlet} from "react-router-dom";
import {Helmet} from "react-helmet-async";

export function RouteListWrapper() {
    return (
        <>
            <Helmet>
                <title>Routes | Go Wild</title>
            </Helmet>

            <Outlet/>
        </>
    );
}
