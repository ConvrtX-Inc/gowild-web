import { AppPoint } from '../../../lib/api/go-wild.api';
import { FieldLabel } from '../text-field';
import { Grid, Typography } from '@mui/material';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import { OverridableStringUnion } from '@mui/types';
import { useMemo } from 'react';

export interface CoordEntryViewProps {
  point: AppPoint;
  title: string;
  prefix?: string;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

export function CoordEntryView({ title, point, size, prefix }: CoordEntryViewProps) {
  const { lat, lng } = useMemo(() => {
    if (!point) {
      return { lat: undefined, lng: undefined };
    } else {
      return { lat: point.coordinates[0], lng: point.coordinates[1] };
    }
  }, [point]);

  return (
    <Grid xs={12} item>
      <FieldLabel>{title}</FieldLabel>
      <Typography>{lng}</Typography>
      <Typography>{lat}</Typography>
    </Grid>
  );
}
