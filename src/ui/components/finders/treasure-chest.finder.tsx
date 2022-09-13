import {FinderProps} from "../../../types/finder";
import {
    Route,
    TreasureChest,
    useGetOneBaseRouteControllerRouteQuery,
    useGetOneBaseTreasureChestControllerTreasureChestQuery
} from "../../../lib/api/go-wild.api";
import {Loader} from "../loader";

export function TreasureChestFinder({id, OnFound, OnError, OnLoading}: FinderProps<TreasureChest>) {
    const {data, error, isError, isLoading} = useGetOneBaseTreasureChestControllerTreasureChestQuery({id});

    if (isLoading) return OnLoading ? <OnLoading/> : <Loader/>;

    if (isError) return <OnError error={error}/>;

    return <OnFound item={data!}/>;
}
