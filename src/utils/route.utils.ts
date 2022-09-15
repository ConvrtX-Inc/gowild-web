import { AppPoint } from '../lib/api/go-wild.api';
import { PointerType, RoutePoint } from '../types/maps';

export function routeToName(route: string): string {
  switch (route) {
    case '/dashboard/route-lists':
      return 'Route';
    case '/dashboard/route-lists/new':
      return 'Create route';
  }
  return '';
}

export interface RoutePoles {
  start: RoutePoint;
  end: RoutePoint;
  waypoints: RoutePoint[];
}

export function toAppPoint(type: PointerType, point: AppPoint): RoutePoint {
  return { type, point };
}

export function routePoles(points: RoutePoint[]): RoutePoles {
  let start: RoutePoint;
  let end: RoutePoint;
  const waypoints: RoutePoint[] = [];
  for (const point of points) {
    if (point.type === 'start') {
      start = point;
    } else if (point.type === 'end') {
      end = point;
    } else {
      waypoints.push(point);
    }
  }
  return { start, end, waypoints };
}
