import {AppMap} from "./map";
import {useCallback, useMemo, useState} from "react";
import {Box, Stack} from "@mui/material";
import {Add, Place} from "@mui/icons-material";
import Minus from "../icons/Minus";
import {MapItem} from "./map-items";
import {MapMarker} from "./map-marker";
import {routePoles} from "../../utils/route.utils";
import {checkPoints, titleFrom} from "../../utils/map.utils";
import {MapPolyline} from "./map-polyline";
import {PointMapInfo} from "./map-info";
import {InfoWindowData, PointerType, RoutePoint} from "../../types/maps";

export interface MapsRouteProps {
    onRemovePoint: (point: RoutePoint) => void;
    onPoint: (point: RoutePoint) => void;
    allPoints: RoutePoint[];
}

export function MapsRoute({allPoints, onPoint, onRemovePoint}: MapsRouteProps) {
    const [pointType, selectPointType] = useState<PointerType | undefined>();
    const [infoWindow, setInfoWindow] = useState<InfoWindowData | undefined>();
    const onMarkerClick = useCallback((e: RoutePoint) => {
        setInfoWindow({
            point: e,
            text: 'Click to remove point'
        });
    }, []);

    const infoWindows = useMemo(() => {
        if (!infoWindow) {
            return undefined;
        }

        return (
            <PointMapInfo
                text={infoWindow.text}
                lat={infoWindow.point.point.coordinates[0]}
                lng={infoWindow.point.point.coordinates[1]}
                onCloseClick={() => setInfoWindow(undefined)}
                onRemoveClick={() => {
                    setInfoWindow(undefined);
                    onRemovePoint(infoWindow.point);
                }}
            />
        );
    }, [infoWindow, onRemovePoint]);

    const markers = useMemo(() => allPoints.map((p) => {
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
    }), [onMarkerClick, allPoints]);

    const polyline = useMemo(() => {
        if (checkPoints(allPoints)) {
            const {end, waypoints, start} = routePoles(allPoints ?? []);
            return <MapPolyline origin={start} waypoints={waypoints} destination={end}/>;
        } else
            return undefined;
    }, [allPoints]);

    const onClick = useCallback(({latLng}: google.maps.MapMouseEvent) => {
        if (!!infoWindow) {
            setInfoWindow(undefined);
            return;
        }

        if (!pointType || !latLng) {
            return;
        }

        !!onPoint && onPoint({
            point: {
                type: 'Point',
                coordinates: [latLng.lat(), latLng.lng()]
            },
            type: pointType,
        });
    }, [infoWindow, onPoint, pointType]);

    const onOptionChose = useCallback((type: PointerType) => () => {
        if (pointType === type) {
            selectPointType(undefined);
        } else {
            selectPointType(type);
        }
    }, [pointType]);

    return (
        <Box position='relative' width='100%' height='100%'>
            <AppMap infoWindows={infoWindows} markers={markers} onClick={onClick} polylines={polyline}/>
            <Stack position='absolute' right={8} top={8} spacing={0.5} direction='column'>
                <MapItem value={false} color='black'>
                    <Add/>
                </MapItem>
                <MapItem value={false} color='black'>
                    <Minus/>
                </MapItem>
                <MapItem value={pointType === 'start'} onClick={onOptionChose('start')} color='black'>
                    <Place/>
                </MapItem>
                <MapItem value={pointType === 'end'} onClick={onOptionChose('end')} color='red'>
                    <Place/>
                </MapItem>
                <MapItem value={pointType === 'middle'} onClick={onOptionChose('middle')} color='yellow'>
                    <Place/>
                </MapItem>
            </Stack>
        </Box>
    );
}
