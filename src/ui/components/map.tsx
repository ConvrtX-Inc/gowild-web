import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';

const defaultCenter = { lat: 0, lng: 0 };
const defaultZoom = 15;

const googleApiKey: string = process.env.REACT_APP_GOOGLE_KEY!;

interface MapProps {
  onClick: (value: google.maps.MapMouseEvent) => void;
  infoWindows?: JSX.Element[] | JSX.Element;
  markers?: JSX.Element[] | JSX.Element;
  polylines?: JSX.Element[] | JSX.Element;
  view: boolean;
  onLoad?: (map: google.maps.Map) => void | Promise<void>;
}

export function AppMap({ onClick, markers, polylines, infoWindows, view, onLoad }: MapProps) {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
  });

  useEffect(() => {
    if (coords && !view) {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude
      });
    }
  }, [view, coords]);

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        center={center}
        zoom={defaultZoom}
        onClick={onClick}
        onLoad={onLoad}
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
