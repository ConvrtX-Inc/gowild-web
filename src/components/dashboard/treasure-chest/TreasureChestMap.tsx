import "dotenv/config";
import { FC } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

const location = {
  address: "7 Carlson St, Kitimat, BC V8C 1A9, Canada",
  lat: 54.06291864840513,
  lng: -128.6423159788208,
};

let chestLocPoint;
const apiIsLoaded = (map, maps, lat, lng, handleChestLoc) => {
  chestLocPoint = new maps.Marker({
    position: {
      lat: lat,
      lng: lng,
    },
    icon: "/static/treasure-chest/chest.svg",
    map,
    draggable: true,
  });

  chestLocPoint.addListener("dragend", () => {
    const lat = chestLocPoint.getPosition().lat();
    const long = chestLocPoint.getPosition().lng();
    handleChestLoc(lat, long);
  });
};

interface TreasureChestMapProps {
  handleChestLoc: (lat, long) => void;
  lat?: number;
  lng?: number;
}

const TMap: FC<TreasureChestMapProps> = ({ handleChestLoc, lat, lng }) => {
  return (
    <GoogleMapReactCore
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
      defaultCenter={location}
      center={{
        lat: lat || location.lat,
        lng: lng || location.lng,
      }}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) =>
        apiIsLoaded(
          map,
          maps,
          lat || location.lat,
          lng || location.lng,
          handleChestLoc
        )
      }
      options={{ scrollwheel: true }}
    ></GoogleMapReactCore>
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
