import {useParams} from "react-router-dom";
import {RouteFinder} from "../../components/finders/route.finder";
import {RouteFormEdit} from "../../components/edit/route-form.edit";
import {RouteNotFound} from "../../components/route.not-found";

export function EditRouteScreen() {
    const {id} = useParams();
    if (!id) return <RouteNotFound error={'no id found'}/>;

    return (
        <RouteFinder id={id} OnError={RouteNotFound} OnFound={RouteFormEdit}/>
    );
}
