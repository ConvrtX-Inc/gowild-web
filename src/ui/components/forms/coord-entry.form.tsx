import { AppTextField, FieldLabel } from '../text-field';
import { Grid } from '@mui/material';
import { TextFieldPropsSizeOverrides } from '@mui/material/TextField/TextField';
import { OverridableStringUnion } from '@mui/types';

export interface CoordEntryProps {
  name: string;
  title: string;
  prefix?: string;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

export function CoordEntryForm({ title, name, size, prefix }: CoordEntryProps) {
  return (
    <Grid xs={12} item>
      <FieldLabel htmlFor={`${name}.coordinates.1`}>{title}</FieldLabel>
      <AppTextField
        sx={{ mb: 3 }}
        size={size}
        autoComplete='off'
        placeholder={(prefix ?? '') + 'Longitude'}
        name={`${name}.coordinates.1`}
        id={`${name}.coordinates.1`}
        type='number'
      />
      <AppTextField
        autoComplete='off'
        placeholder={(prefix ?? '') + 'Latitude'}
        name={`${name}.coordinates.0`}
        id={`${name}.coordinates.0`}
        size={size}
        type='number'
      />
    </Grid>
  );
}
