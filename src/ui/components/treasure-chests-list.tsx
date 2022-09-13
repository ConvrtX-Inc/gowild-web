import {
    GetManyBaseTreasureChestControllerTreasureChestApiArg,
    TreasureChest,
    useGetManyBaseTreasureChestControllerTreasureChestQuery
} from "../../lib/api/go-wild.api";
import {PaginationProps} from "../../types/finder";

export function TreasureChestsList({params}: PaginationProps<GetManyBaseTreasureChestControllerTreasureChestApiArg>) {
    const {data} = useGetManyBaseTreasureChestControllerTreasureChestQuery(params);
    const treasureChests: TreasureChest[] = data?.data ?? [];

    return (
        <>
            Render treasureChest-list {treasureChests.length}
        </>
    );
}
