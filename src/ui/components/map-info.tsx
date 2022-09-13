import {InfoWindow} from "@react-google-maps/api";
import {Button, Stack, Typography} from "@mui/material";

export interface MapInfoProps {
    text: string;
    lat: number;
    lng: number;
    onRemoveClick?: () => void;
    onCloseClick?: () => void;
}

export function PointMapInfo({lat, lng, text, onCloseClick, onRemoveClick}: MapInfoProps) {
    return (
        <InfoWindow onCloseClick={onCloseClick} position={{lat, lng}}>
            <Stack direction='column'>
                <Typography variant='body1'>{text}</Typography>
                <Button onClick={onRemoveClick} fullWidth variant='outlined'>Remove</Button>
            </Stack>
        </InfoWindow>
    );
}
