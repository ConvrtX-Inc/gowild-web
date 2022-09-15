import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const center = { lat: 49.438293, lng: 11.079267 };
const zoom = 15;

const googleApiKey: string = process.env.REACT_APP_GOOGLE_KEY!;

interface MapProps {
  onClick: (value: google.maps.MapMouseEvent) => void;
  infoWindows?: JSX.Element[] | JSX.Element;
  markers?: JSX.Element[] | JSX.Element;
  polylines?: JSX.Element[] | JSX.Element;
}

export function AppMap({ onClick, markers, polylines, infoWindows }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        center={center}
        zoom={zoom}
        onClick={onClick}
        options={{
          scrollwheel: true,
          fullscreenControl: false,
          zoomControl: false
        }}
        mapContainerStyle={{ width: '100%', height: '100%' }}
      >
        {polylines}
        {markers}
        {infoWindows}
      </GoogleMap>
    </LoadScript>
  );
}
