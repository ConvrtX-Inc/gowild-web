import { fromAppPoint } from '../../utils/map.utils';
import { DirectionsService, Polyline } from '@react-google-maps/api';
import { memo, useCallback, useEffect, useState } from 'react';
import { AppPoint } from '../../lib/api/go-wild.api';

export interface MapPolylineProps {
  origin: AppPoint;
  destination: AppPoint;
  waypoints: AppPoint[];
  options?: google.maps.PolygonOptions | undefined;
}

export const MapPolyline = memo(({ origin, destination, waypoints, options }: MapPolylineProps) => {
  const [show, setShow] = useState(false);
  const [paths, setPath] = useState<google.maps.MVCArray<google.maps.LatLng>>();
  const onFound = useCallback(
    (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (result.routes.length > 0) {
        setPath(new google.maps.MVCArray(result.routes[0].overview_path));
      }
      setShow(true);
    },
    []
  );

  useEffect(() => {
    setShow(false);
  }, [origin, destination, waypoints]);

  return (
    <>
      {!show && (
        <DirectionsService
          callback={onFound}
          options={{
            origin: fromAppPoint(origin),
            destination: fromAppPoint(destination),
            waypoints: waypoints.map((v) => ({
              location: fromAppPoint(v)
            })),
            travelMode: google.maps.TravelMode.WALKING,
            optimizeWaypoints: false,
            provideRouteAlternatives: false
          }}
        />
      )}
      {show && <Polyline path={paths} options={options} />}
    </>
  );
});
MapPolyline.displayName = 'MapPolyline';
