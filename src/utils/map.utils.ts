import { AppPoint } from '../lib/api/go-wild.api';
import { RoutePoint } from '../types/maps';
import { getBoundingBox } from 'geolocation-utils';

export function checkPoints(points: RoutePoint[]): boolean {
  if (points.findIndex(({ type }) => type === 'start') === -1) {
    return false;
  }
  if (points.findIndex(({ type }) => type === 'end') === -1) {
    return false;
  }
  return true;
}

export function routeTypeToMapsColor(type: 'start' | 'end' | 'middle') {
  switch (type) {
    case 'start':
      return '/static/route-list/control-start-pt.png';
    case 'end':
      return '/static/route-list/control-end-pt.png';
    case 'middle':
      return '/static/route-list/control-event-pt.png';
  }
}


export function findBounds(allPoints: RoutePoint[]): google.maps.LatLngBoundsLiteral | undefined {
  const {
    topLeft,
    bottomRight
  }: any = getBoundingBox(allPoints.map(({ point: { coordinates: [lat, lng] } }) => ({ lng, lat })), 500);
  if (!topLeft || !bottomRight) {
    return undefined;
  }

  return {
    east: bottomRight.lng,
    north: topLeft.lat,
    south: bottomRight.lat,
    west: topLeft.lng
  };
}

export function titleFrom(type: 'start' | 'end' | 'middle', title?: string) {
  switch (type) {
    case 'start':
      return 'Start';
    case 'end':
      return 'End';
    case 'middle':
      return title;
  }
}

export function fromAppPoint({ coordinates: [lat, lng] }: AppPoint): google.maps.LatLng {
  return new google.maps.LatLng({ lng, lat });
}
