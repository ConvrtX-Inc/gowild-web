import { AppPoint, RouteHistoricalEvent } from '../../../lib/api/go-wild.api';
import { RoutePoint } from '../../../types/maps';
import { toAppPoint } from '../../../utils/route.utils';
import { MapsRoute } from '../maps-route';
import { Box } from '@mui/material';
import { useField } from 'formik';
import { useEffect, useMemo, useState } from 'react';

export interface RouteMapFormProps {
  isNew?: boolean;
}

export function RouteMapForm({isNew}: RouteMapFormProps) {
  const [fStart, , hStart] = useField<AppPoint | undefined>('start');
  const [fEnd, , hEnd] = useField<AppPoint | undefined>('end');
  const [fH, , hH] = useField<RouteHistoricalEvent[] | undefined>('historicalEvents');

  const [start, setStart] = useState<AppPoint | undefined>(fStart.value);
  const [end, setEnd] = useState<AppPoint | undefined>(fEnd.value);
  const [historicalPoints, setHistoricalPoints] = useState<RouteHistoricalEvent[]>(
    () => fH.value ?? []
  );
  const points = useMemo(
    () =>
      [
        start ? toAppPoint('start', start) : undefined,
        ...historicalPoints.map(({ point }) => toAppPoint('middle', point)),
        end ? toAppPoint('end', end) : undefined
      ].filter((i) => !!i),
    [end, historicalPoints, start]
  );

  useEffect(() => {
    setHistoricalPoints(fH.value);
  }, [fH.value]);

  useEffect(() => {
    setStart(fStart.value);
  }, [fStart]);

  useEffect(() => {
    setEnd(fEnd.value);
  }, [fEnd]);

  return (
    <Box
      width='100%'
      height='100%'
      component={MapsRoute}
      view={!isNew}
      allPoints={points}
      onPoint={(a: RoutePoint) => {
        if (!!a) {
          if (a.type === 'start') {
            setStart(a.point);
            hStart.setValue(a.point);
          } else if (a.type === 'end') {
            setEnd(a.point);
            hEnd.setValue(a.point);
          } else {
            const event: RouteHistoricalEvent = {
              id: undefined as any,
              createdDate: undefined as any,
              updatedDate: undefined as any,
              route: undefined as any,
              closureUid: undefined as any,
              point: a.point,
              title: '',
              subtitle: '',
              description: '',
              image: undefined as any,
              medias: []
            };

            const tmp = [...historicalPoints, event];

            setHistoricalPoints(tmp);
            hH.setValue(tmp);
          }
        }
      }}
      onRemovePoint={(a: RoutePoint) => {
        if (!!a) {
          if (a.type === 'start') {
            setStart(undefined);
            hStart.setValue(undefined);
          } else if (a.type === 'end') {
            setEnd(undefined);
            hEnd.setValue(undefined);
          } else {
            const tmp = historicalPoints;
            const idx = tmp.findIndex((p) => p.point === a.point);
            if (idx >= 0) {
              tmp.splice(idx, 1);
              setHistoricalPoints((prev) => prev.filter(({ point }) => point !== a.point));
              hH.setValue(tmp);
            }
          }
        }
      }}
    />
  );
}
