import { AppPoint } from '../../../lib/api/go-wild.api';
import { FieldLabel } from '../text-field';
import { Grid, TextField } from '@mui/material';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import { OverridableStringUnion } from '@mui/types';
import { useField } from 'formik';
import { useMemo } from 'react';

export interface CoordEntryProps {
  name: string;
  title: string;
  prefix?: string;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

export function CoordEntryForm({ title, name, size, prefix }: CoordEntryProps) {
  const [field, , { setTouched }] = useField<AppPoint | undefined>(name);

  const { lat, lng } = useMemo(() => {
    if (!field.value) {
      return { lat: undefined, lng: undefined };
    } else {
      return { lat: field.value.coordinates[0], lng: field.value.coordinates[1] };
    }
  }, [field.value]);

  return (
    <Grid xs={12} item>
      <FieldLabel>{title}</FieldLabel>
      <TextField
        sx={{ mb: 3 }}
        size={size}
        autoComplete='off'
        placeholder={(prefix ?? '') + 'Longitude'}
        type='number'
        onTouchEnd={() => setTouched(true)}
        value={lng}
        fullWidth
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        autoComplete='off'
        placeholder={(prefix ?? '') + 'Latitude'}
        size={size}
        value={lat}
        type='number'
        onTouchEnd={() => setTouched(true)}
        fullWidth
        InputProps={{
          readOnly: true
        }}
      />
    </Grid>
  );
}
