import { Button, Stack, Typography } from '@mui/material';
import { InfoWindow } from '@react-google-maps/api';

export interface MapInfoProps {
  text: string;
  lat: number;
  lng: number;
  onRemoveClick?: () => void;
  onCloseClick?: () => void;
  view?: boolean;
}

export function PointMapInfo({ lat, lng, text, onCloseClick, onRemoveClick, view }: MapInfoProps) {
  return (
    <InfoWindow onCloseClick={onCloseClick} position={{ lat, lng }}>
      <Stack direction='column'>
        <Typography variant='body1'>{text}</Typography>

        {view && (
          <Button onClick={onRemoveClick} fullWidth variant='outlined'>
            Remove
          </Button>
        )}
      </Stack>
    </InfoWindow>
  );
}
