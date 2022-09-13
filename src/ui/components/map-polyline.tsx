import {DirectionsService, Polyline} from '@react-google-maps/api';
import {fromAppPoint} from "../../utils/map.utils";
import {useCallback, useEffect, useState} from "react";
import {RoutePoint} from "../../types/maps";

export interface MapPolylineProps {
    origin: RoutePoint;
    destination: RoutePoint;
    waypoints: RoutePoint[];
    options?: google.maps.PolygonOptions | undefined;
}

export function MapPolyline({origin, destination, waypoints, options}: MapPolylineProps) {
    const [show, setShow] = useState(false);
    const [paths, setPath] = useState<google.maps.MVCArray<google.maps.LatLng>>();
    const onFound = useCallback((
        result: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus) => {

        if (result.routes.length > 0) {
            setPath(new google.maps.MVCArray(result.routes[0].overview_path));
        }
        setShow(true);
    }, []);

    useEffect(() => {
        setShow(false);
    }, [origin, destination, waypoints]);

    return (
        <>
            {!show && (
                <DirectionsService
                    callback={onFound}
                    options={{
                        origin: fromAppPoint(origin.point),
                        destination: fromAppPoint(destination.point),
                        waypoints: waypoints.map((v) => ({
                            location: fromAppPoint(v.point)
                        })),
                        travelMode: google.maps.TravelMode.WALKING,
                        optimizeWaypoints: false,
                        provideRouteAlternatives: false,
                    }}
                />
            )}
            {show && (
                <Polyline path={paths} options={options}/>
            )}
        </>
    );
}
