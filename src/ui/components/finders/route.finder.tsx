import {FinderProps} from "../../../types/finder";
import {Route, useGetOneBaseRouteControllerRouteQuery} from "../../../lib/api/go-wild.api";
import {Loader} from "../loader";

export function RouteFinder({id, OnFound, OnError, OnLoading}: FinderProps<Route>) {
    const {data, error, isError, isLoading} = useGetOneBaseRouteControllerRouteQuery({id}, {
        pollingInterval: 3000,
    });

    if (isLoading) return OnLoading ? <OnLoading/> : <Loader/>;

    if (isError) return <OnError error={error}/>;

    return <OnFound item={data!}/>;
}
