import "dotenv/config";
import { FC } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

let chestLocPoint;
const apiIsLoaded = (map, maps, lat,lng, handleChestLoc) => {
  chestLocPoint = new maps.Marker({
    position: { lat, lng },
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
}

const TMap: FC<TreasureChestMapProps> = ({ handleChestLoc }) => {
  const location = {
    address: "7 Carlson St, Kitimat, BC V8C 1A9, Canada",
    lat: 54.06291864840513,
    lng: -128.6423159788208,
  };

  return (
    <GoogleMapReactCore
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
      defaultCenter={location}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) =>
        apiIsLoaded(map, maps,location.lat,location.lng, handleChestLoc)
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
