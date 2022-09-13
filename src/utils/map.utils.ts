import {AppPoint} from "../lib/api/go-wild.api";
import {RoutePoint} from "../types/maps";

export function checkPoints(points: RoutePoint[]): boolean {
    if (points.findIndex(({type}) => type === 'start') === -1) {
        return false;
    }
    if (points.findIndex(({type}) => type === 'end') === -1) {
        return false;
    }
    return true;
}

export function routeTypeToMapsColor(type: "start" | "end" | "middle") {
    switch (type) {
        case "start":
            return '/static/route-list/control-start-pt.png';
        case "end":
            return '/static/route-list/control-end-pt.png';
        case "middle":
            return '/static/route-list/control-event-pt.png';
    }
}

export function fromAppPoint({coordinates: [lat, lng]}: AppPoint): google.maps.LatLng {
    return new google.maps.LatLng({lng, lat});
}
