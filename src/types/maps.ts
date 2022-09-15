import { AppPoint } from '../lib/api/go-wild.api';

export interface RoutePoint {
  point: AppPoint;
  type: PointerType;
}

export type PointerType = 'start' | 'end' | 'middle';

export type InfoWindowData = {
  point: RoutePoint;
  text: string;
};
