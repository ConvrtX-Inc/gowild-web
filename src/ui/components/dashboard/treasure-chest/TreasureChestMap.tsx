import 'dotenv/config';
import GoogleMapReact from 'google-map-react';
import { debounce } from 'lodash';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const createMarker = (map, maps, lat, lng, callback: (lat: number, lng: number) => void) => {
  const marker = new maps.Marker({
    position: {
      lat,
      lng
    },
    icon: '/static/treasure-chest/chest.svg',
    map,
    draggable: true
  });

  marker.addListener('dragend', () => {
    const mLat = marker.getPosition().lat();
    const mLong = marker.getPosition().lng();
    callback(mLat, mLong);
  });
  return marker;
};

interface TreasureChestMapProps {
  handleChestLoc: (lat, long) => void;
  lat?: number;
  lng?: number;
  defaultLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}

const TMap: FC<TreasureChestMapProps> = ({ handleChestLoc, lat, lng, defaultLocation }) => {
  const [mapAPI, setMap] = useState(null);
  const [mapsAPI, setMaps] = useState(null);
  const chestMarker = useRef(null);
  const setUp = useCallback(
    debounce((map, maps) => {
      if (chestMarker) {
        chestMarker.current.setMap(null);
        chestMarker.current = createMarker(map, maps, lat, lng, handleChestLoc);
      }
    }, 1000),
    [lat, lng]
  );

  useEffect(() => {
    if (mapAPI && mapsAPI) setUp(mapAPI, mapsAPI);
  }, [setUp, mapAPI, mapsAPI]);

  return (
    <GoogleMapReactCore
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
      defaultCenter={defaultLocation}
      center={{
        lat: lat || defaultLocation.lat,
        lng: lng || defaultLocation.lng
      }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => {
        chestMarker.current = createMarker(
          map,
          maps,
          lat || defaultLocation.lat,
          lng || defaultLocation.lng,
          handleChestLoc
        );
        setMap(map);
        setMaps(maps);
      }}
      options={{ scrollwheel: true }}
    />
  );
};

export default TMap;

const GoogleMapReactCore = styled(GoogleMapReact)`
  && {
    & div .gm-style {
      border-radius: 20px;
    }
    div.gm-bundled-control-on-bottom {
      bottom: 300px !important;
    }
  }
`;
