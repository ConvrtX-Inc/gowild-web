import 'dotenv/config';
import GoogleMapReact from 'google-map-react';
import { FC } from 'react';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('ViewTMap');

const apiIsLoaded = (map, maps, lat, lng) => {
  const marker = new maps.Marker({
    position: { lat, lng },
    icon: '/static/treasure-chest/chest.svg',
    map,
    draggable: false
  });
  logger.debug(() => `marker is ${marker}`);
};

interface TreasureChestMapProps {
  lat: number;
  lng: number;
}

const ViewTMap: FC<TreasureChestMapProps> = ({ lat, lng }) => {
  const location = {
    address: '7 Carlson St, Kitimat, BC V8C 1A9, Canada',
    lat: 54.06291864840513,
    lng: -128.6423159788208
  };
  return (
    <GoogleMapReactCore
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
      defaultCenter={location}
      defaultZoom={16}
      center={{ lat, lng }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, lat, lng)}
    />
  );
};

export default ViewTMap;

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
