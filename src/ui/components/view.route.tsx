import {FoundComponent} from "../../types/finder";
import {Route} from "../../lib/api/go-wild.api";

export function ViewRoute({item}: FoundComponent<Route>) {
    return (
        <>
            View route: {item.id}
        </>
    );
}
