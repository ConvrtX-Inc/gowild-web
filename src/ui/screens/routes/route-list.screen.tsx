import {RouteList} from "../../components/route-list";
import {useCallback, useState} from "react";
import {Helmet} from "react-helmet-async";
import {Container} from "@mui/material";
import {GetManyBaseRouteControllerRouteApiArg} from "../../../lib/api/go-wild.api";

export function RouteListScreen() {
    const [params, setParams] = useState<GetManyBaseRouteControllerRouteApiArg>({
        page: 0,
        limit: 10,
    });
    const onPageChange = useCallback((page: number) => setParams(prev => ({
        ...prev, page
    })), [setParams]);
    const onLimitChange = useCallback((limit: number) => setParams(prev => ({
        ...prev, limit
    })), [setParams]);
    return (
        <>
            <Helmet>
                <title>Route List | Go Wild</title>
            </Helmet>

            <Container>
                <RouteList params={params} onPageChange={onPageChange} onLimitChange={onLimitChange}/>
            </Container>
        </>
    );
}
