import { RouteFinder } from '../../components/finders/route.finder';
import { RouteNotFound } from '../../components/route.not-found';
import { ViewRoute } from '../../components/view.route';
import { useParams } from 'react-router-dom';

export function ViewRouteScreen() {
  const { id } = useParams();

  if (!id) return <RouteNotFound error={'no id found'} />;

  return <RouteFinder id={id} OnError={RouteNotFound} OnFound={ViewRoute} />;
}
