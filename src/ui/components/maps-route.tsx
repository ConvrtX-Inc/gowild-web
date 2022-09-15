import { InfoWindowData, PointerType, RoutePoint } from '../../types/maps';
import { checkPoints, findBounds, titleFrom } from '../../utils/map.utils';
import { routePoles } from '../../utils/route.utils';
import Minus from '../icons/Minus';
import { AppMap } from './map';
import { PointMapInfo } from './map-info';
import { MapItem } from './map-items';
import { MapMarker } from './map-marker';
import { MapPolyline } from './map-polyline';
import { Add, Place } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

export interface MapsRouteProps {
  onRemovePoint?: (point: RoutePoint) => void;
  onPoint?: (point: RoutePoint) => void;
  allPoints: RoutePoint[];
  view?: boolean;
}

export function MapsRoute({ allPoints, onPoint, onRemovePoint, view }: MapsRouteProps) {
  const [pointType, selectPointType] = useState<PointerType | undefined>();
  const [infoWindow, setInfoWindow] = useState<InfoWindowData | undefined>();
  const onMarkerClick = useCallback(
    (e: RoutePoint) => {
      if (view) {
        return;
      }

      setInfoWindow({
        point: e,
        text: 'Click to remove point'
      });
    },
    [view]
  );

  const infoWindows = useMemo(() => {
    if (!infoWindow) {
      return undefined;
    }

    return (
      <PointMapInfo
        view={view}
        text={infoWindow.text}
        lat={infoWindow.point.point.coordinates[0]}
        lng={infoWindow.point.point.coordinates[1]}
        onCloseClick={() => setInfoWindow(undefined)}
        onRemoveClick={() => {
          setInfoWindow(undefined);
          onRemovePoint && onRemovePoint(infoWindow.point);
        }}
      />
    );
  }, [view, infoWindow, onRemovePoint]);

  const markers = useMemo(
    () =>
      allPoints.map((p) => {
        return (
          <MapMarker
            title={titleFrom(p.type, 'Event')}
            onClick={() => onMarkerClick(p)}
            type={p.type}
            key={p.point.type + '-' + p.point.coordinates.join(',')}
            lat={p.point.coordinates[0]}
            lng={p.point.coordinates[1]}
          />
        );
      }),
    [onMarkerClick, allPoints]
  );

  const polyline = useMemo(() => {
    if (checkPoints(allPoints)) {
      const { end, waypoints, start } = routePoles(allPoints ?? []);
      return (
        <MapPolyline
          origin={start.point}
          waypoints={waypoints.map(({ point }) => point)}
          destination={end.point}
        />
      );
    } else return undefined;
  }, [allPoints]);

  const onClick = useCallback(
    ({ latLng }: google.maps.MapMouseEvent) => {
      if (!!infoWindow) {
        setInfoWindow(undefined);
        return;
      }

      if (!pointType || !latLng) {
        return;
      }

      onPoint &&
      onPoint({
        point: {
          type: 'Point',
          coordinates: [latLng.lat(), latLng.lng()]
        },
        type: pointType
      });
    },
    [infoWindow, onPoint, pointType]
  );

  const onOptionChose = useCallback(
    (type: PointerType) => () => {
      if (pointType === type) {
        selectPointType(undefined);
      } else {
        selectPointType(type);
      }
    },
    [pointType]
  );

  const onLoad = useCallback((map: google.maps.Map) => {
    if (!view) {
      return;
    }

    const bound = findBounds(allPoints);
    if (!bound) {
      return;
    }

    map.fitBounds(bound);
  }, [view, allPoints]);

  return (
    <Box position='relative' width='100%' height='100%'>
      <AppMap
        onLoad={onLoad}
        view={view}
        infoWindows={infoWindows}
        markers={markers}
        onClick={onClick}
        polylines={polyline}
      />
      <Stack position='absolute' right={8} top={8} spacing={0.5} direction='column'>
        <MapItem value={false} color='black'>
          <Add />
        </MapItem>
        <MapItem value={false} color='black'>
          <Minus />
        </MapItem>
        <MapItem value={pointType === 'start'} onClick={onOptionChose('start')} color='black'>
          <Place />
        </MapItem>
        <MapItem value={pointType === 'end'} onClick={onOptionChose('end')} color='red'>
          <Place />
        </MapItem>
        <MapItem value={pointType === 'middle'} onClick={onOptionChose('middle')} color='yellow'>
          <Place />
        </MapItem>
      </Stack>
    </Box>
  );
}
