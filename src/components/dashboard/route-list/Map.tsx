import "dotenv/config";
import React from "react";
import GoogleMapReact from "google-map-react";
// import { Box } from "@mui/material";
import styled from "styled-components";
// import StartingPtIcon from "../../../icons/RouteListStartPt";
// import StartPtImg from "/static/route-list/start-pt.png";

// const LocationPin = ({ text }) => (
//   <Box sx={{ display: "flex", alignItems: "center" }}>
//     <StartingPtIcon />
//     <p>{text}</p>
//   </Box>
// );
let startingPt;
let finishingPt;
let histoEventPt;
const apiIsLoaded = (map, maps, startPt, endPt, historicalEventPt) => {
  startingPt = new maps.Marker({
    position: { lat: 54.06547503649533, lng: -128.64594232540892 },
    icon: "/static/route-list/start-pt.png",
    map,
    draggable: true,
  });

  finishingPt = new maps.Marker({
    position: { lat: 54.06459354113623, lng: -128.64242326718139 },
    icon: "/static/route-list/finish-pt.png",
    map,
    draggable: true,
  });

  histoEventPt = new maps.Marker({
    position: { lat: 54.06262899845068, lng: -128.64484798413085 },
    icon: "/static/route-list/event-pt.png",
    map,
    draggable: true,
  });

  startingPt.addListener("dragend", () => {
    const lat = startingPt.getPosition().lat();
    const long = startingPt.getPosition().lng();
    startPt(lat, long);
    console.log("Normal Route Start Pt: ", lat, long);
  });

  finishingPt.addListener("dragend", () => {
    const lat = finishingPt.getPosition().lat();
    const long = finishingPt.getPosition().lng();
    endPt(lat, long);
    console.log("Normal Route End Pt: ", lat, long);
  });

  histoEventPt.addListener("dragend", () => {
    const lat = histoEventPt.getPosition().lat();
    const long = histoEventPt.getPosition().lng();
    historicalEventPt(lat, long);
    console.log("Historical Event Pt ", lat, long);
  });
};

const Map = (props) => {
  const { startPt, endPt, historicalEventPt } = props;
  const location = {
    address: "7 Carlson St, Kitimat, BC V8C 1A9, Canada",
    lat: 54.06291864840513,
    lng: -128.6423159788208,
  };
  // console.log(process.env.REACT_APP_GOOGLE_KEY);
  return (
    <GoogleMapReactCore
      bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_KEY}` }}
      defaultCenter={location}
      defaultZoom={16}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) =>
        apiIsLoaded(map, maps, startPt, endPt, historicalEventPt)
      }
      options={{ scrollwheel: true }}
    >
      {/* <LocationPin
        // @ts-ignore
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      /> */}
    </GoogleMapReactCore>
  );
};

export default Map;

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
