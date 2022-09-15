import { routeTypeToMapsColor } from '../../utils/map.utils';
import { Marker } from '@react-google-maps/api';
import { useMemo } from 'react';

export interface MapMarkerProps {
  lat: number;
  lng: number;
  type: 'start' | 'end' | 'middle';
  onClick?: ((e: google.maps.MapMouseEvent) => void) | undefined;
  title: string;
}

export function MapMarker({ type, lng, lat, onClick, title }: MapMarkerProps) {
  const path = useMemo(() => routeTypeToMapsColor(type), [type]);
  return (
    <Marker
      onClick={onClick}
      icon={{ url: path, scaledSize: new google.maps.Size(36, 45) }}
      position={{ lng, lat }}
      title={title}
    />
  );
}
