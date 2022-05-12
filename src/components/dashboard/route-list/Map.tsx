import "dotenv/config";
import React from "react";
import { renderToString } from "react-dom/server";
import GoogleMapReact from "google-map-react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import ReactDOM from "react-dom";
import $ from "jquery";

let startingPt;
let finishingPt;
let initialLocation;
let initialLat = [];
let initialLong = [];
console.log(initialLat);
const apiIsLoaded = (map, maps, setStartPt, setEndPt, setHistoricalEventPt) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initialLocation = new maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      map.setCenter(initialLocation);
      initialLat.push(initialLocation.lat());
      initialLong.push(initialLocation.lng());
      console.log("Geo Initial Lat", initialLat[0]);

      startingPt = new maps.Marker({
        position: { lat: initialLat[0] + 0.002, lng: initialLong[0] },
        icon: "/static/route-list/start-pt.png",
        map,
        draggable: true,
      });

      startingPt.addListener("dragend", () => {
        const lat = startingPt.getPosition().lat();
        const long = startingPt.getPosition().lng();
        setStartPt(lat, long);
        console.log("Normal Route Start Pt: ", lat, long);
      });

      finishingPt = new maps.Marker({
        position: { lat: initialLat[0], lng: initialLong[0] },
        icon: "/static/route-list/finish-pt.png",
        map,
        draggable: true,
      });

      finishingPt.addListener("dragend", () => {
        const lat = finishingPt.getPosition().lat();
        const long = finishingPt.getPosition().lng();
        setEndPt(lat, long);
        console.log("Normal Route End Pt: ", lat, long);
      });
    });
  }
  const toggleButton = document.createElement("button");

  var startPtMarker;
  toggleButton.textContent = "Start Pt";
  toggleButton.classList.add("custom-map-control-button");
  toggleButton.addEventListener("click", () => {
    maps.event.addListener(map, "click", (event) => {
      console.log("Triggered Start PT listener");
      placeMarker(event.latLng);
      maps.event.clearListeners(map);
    });
  });
  function placeMarker(location) {
    startPtMarker = new maps.Marker({
      position: location,
      icon: "/static/route-list/start-pt.png",
      map: map,
      draggable: true,
    });
  }

  map.controls[maps.ControlPosition.TOP_LEFT].push(toggleButton);
  // // Creating START POINT Marker👇
  // const drawingManager2 = new maps.drawing.DrawingManager({
  //   drawingMode: maps.drawing.OverlayType.MARKER,
  //   drawingControl: true,
  //   drawingControlOptions: {
  //     position: maps.ControlPosition.LEFT_TOP,
  //     drawingModes: ["marker"],
  //   },
  //   markerOptions: {
  //     icon: "/static/route-list/start-pt.png",
  //     draggable: true,
  //   },
  // });
  // drawingManager2.setMap(map);
  // drawingManager2.setDrawingMode(null);
  // maps.event.addListener(
  //   drawingManager2,
  //   "overlaycomplete",
  //   function (marker) {}
  // );

  // Creating Historical Event Markers👇
  const drawingManager = new maps.drawing.DrawingManager({
    drawingMode: maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      drawingModes: ["marker"],
    },
    markerOptions: {
      icon: "/static/route-list/event-pt.png",
      draggable: true,
    },
  });
  drawingManager.setMap(map);
  drawingManager.setDrawingMode(null);

  maps.event.addListener(drawingManager, "markercomplete", function (marker) {
    //Disable Add Marker Controls after first drop on the map
    console.log("THE DRAWING MANAGER: ", drawingManager);
    drawingManager.setDrawingMode(null);

    //Extracting Google Map Marker UID object key
    const propertyNamesArr = Object.getOwnPropertyNames(marker);
    const extractedPropName = propertyNamesArr.find((element) =>
      element.includes("closure_uid")
    );
    const closureUidName = extractedPropName.slice(12); //from closure_uid_ to end
    const closureUidValue = marker[`${extractedPropName}`].toString();
    const combinedString = closureUidName.concat(`-${closureUidValue}`);

    const firstLat = marker.position.lat();
    const firstLong = marker.position.lng();
    setHistoricalEventPt(firstLat, firstLong, combinedString);
    console.log(`ADDED MARKER: `, extractedPropName);
    console.log("UID to be stored: ", combinedString);

    //Change Event Marker Position
    maps.event.addListener(marker, "dragend", function () {
      var lat = marker.getPosition().lat();
      var long = marker.getPosition().lng();
      console.log(
        `Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
      );
      setHistoricalEventPt(lat, long, combinedString);
    });

    //Delete Current Marker
    var prev_infoWindow;
    maps.event.addListener(marker, "click", function () {
      var lat = marker.getPosition().lat();
      var long = marker.getPosition().lng();
      console.log(
        `Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
      );

      const handleClick = () => {
        console.log("Marker Clicked", closureUidName);
        //Remove the selected Marker
        marker.setMap(null);
      };

      //Use Any Component to render in info window(pop-up)
      const popUpComponent = (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 1,
          }}
        >
          <Box sx={{ mb: "6px" }}>
            <PopUpTitle>Marker UID:</PopUpTitle>
            <PopUpValue>{closureUidValue}</PopUpValue>
          </Box>
          <RowBox>
            <Box sx={{ mr: "6px" }}>
              <PopUpTitle>Lat:</PopUpTitle>
              <PopUpValue>{lat.toFixed(4)}</PopUpValue>
            </Box>
            <Box>
              <PopUpTitle>Long:</PopUpTitle>
              <PopUpValue>{long.toFixed(4)}</PopUpValue>
            </Box>
          </RowBox>
          <DeleteButton onClick={handleClick} variant="contained">
            Delete
          </DeleteButton>
        </Box>
      );
      const infoWindow = new maps.InfoWindow({
        content: renderToString(popUpComponent),
      });
      if (prev_infoWindow) {
        prev_infoWindow.close();
      }
      console.log("prev_infoWindow", prev_infoWindow);
      console.log("infoWindow ", infoWindow);
      prev_infoWindow = infoWindow;
      infoWindow.open(map, marker);

      // setTimeout(() => {
      //   ReactDOM.render(myComponent, $(".gm-style-iw > div > div").get(0));
      // }, 100);

      maps.event.addListener(infoWindow, "domready", function (e) {
        if (typeof document === "undefined") {
          React.useLayoutEffect = React.useEffect;
        }
        ReactDOM.render(popUpComponent, $(".gm-style-iw > div > div").get(0));
      });
    });
  });
};

const createMapOptions = (maps: any) => {
  return {
    scrollwheel: true,
    fullscreenControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
    },
  };
};

const Map = (props) => {
  const { setStartPt, setEndPt, setHistoricalEventPt } = props;
  const location = {
    address: "7 Carlson St, Kitimat, BC V8C 1A9, Canada",
    lat: 54.06291864840513,
    lng: -128.6423159788208,
  };

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_KEY}`,
          libraries: ["drawing"],
        }}
        defaultCenter={location}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          apiIsLoaded(map, maps, setStartPt, setEndPt, setHistoricalEventPt)
        }
        options={createMapOptions}
      ></GoogleMapReact>
    </MapWrapper>
  );
};

export default Map;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;

  div.gmnoprint > :first-child {
    box-shadow: none !important;
    background-color: transparent !important;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
  }

  button[title="Zoom in"] {
    height: 27px !important;
    width: 27px !important;
    background-color: #c4c4c4 !important;
    margin-bottom: 5px !important;
  }

  button[title="Zoom out"] {
    height: 27px !important;
    width: 27px !important;
    background-color: #c4c4c4 !important;
    margin-bottom: 5px !important;
  }

  div.gmnoprint[role="menubar"] {
    top: 70px !important;
  }

  button[title="Stop drawing"] {
    display: none !important;
  }

  button[title="Add a marker"] {
    height: 27px;
    width: 27px;
    background-color: #c4c4c4 !important;
    cursor: pointer;
    display: flex !important;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
    margin-right: 5px !important;
  }

  /* Remove Content inside button tag*/
  button[title="Add a marker"] span {
    display: none !important;
  }
  button[title="Add a marker"]::before {
    content: url("/static/route-list/control-event-pt.png");
  }
`;

const PopUpTitle = styled(Box)`
  && {
    font-family: "Gilroy Regular";
    font-size: 14px;
    line-height: 18px;
    color: #22333b;
  }
`;

const PopUpValue = styled(Box)`
  && {
    font-family: "Gilroy SemiBold";
    font-size: 16px;
    line-height: 18px;
    color: #22333b;
  }
`;

const RowBox = styled(Box)`
  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const DeleteButton = styled(Button)`
  && {
    width: 70px;
    height: 30px;
    border-radius: 15px;
    margin-top: 12px;
    text-transform: none;
    background-color: #e01313;
    &:hover {
      background-color: #a71010;
    }
  }
`;
