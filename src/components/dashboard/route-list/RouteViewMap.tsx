import React from "react";
import type { FC } from "react";
// import { renderToString } from "react-dom/server";
import GoogleMapReact from "google-map-react";
// import { Box, Button } from "@mui/material";
import styled from "styled-components";
// import ReactDOM from "react-dom";
// import $ from "jquery";

const apiIsLoaded = (map, maps, loadRouteMarkers, loadEventMarkers) => {
  // Load One Normal Route Markers 👇
  console.log("(View-Map) Google Map Api is Loaded: ", loadEventMarkers);

  const startPtLatLng = new maps.LatLng(
    Number(loadRouteMarkers.start_point_lat),
    Number(loadRouteMarkers.start_point_long)
  );

  const endPtLatLng = new maps.LatLng(
    Number(loadRouteMarkers.stop_point_lat),
    Number(loadRouteMarkers.stop_point_long)
  );

  const startingPtMarker = new maps.Marker({
    position: startPtLatLng,
    icon: "/static/route-list/start-pt.png",
    map,
    draggable: false,
  });

  const finishingPtMarker = new maps.Marker({
    position: endPtLatLng,
    icon: "/static/route-list/end-pt.png",
    map,
    draggable: false,
  });

  startingPtMarker.addListener("click", () => {
    const lat = startingPtMarker.getPosition().lat();
    const long = startingPtMarker.getPosition().lng();
    console.log(`(View-Map) Starting Pt Lat: ${lat}, Long: ${long}`);
  });

  finishingPtMarker.addListener("click", () => {
    const lat = finishingPtMarker.getPosition().lat();
    const long = finishingPtMarker.getPosition().lng();
    console.log(`(View-Map) Finishing Pt Lat: ${lat}, Long: ${long}`);
  });

  // Automatically zoom and fit google map viewport based on available markers
  maps.event.addListenerOnce(map, "tilesloaded", () => {
    console.log(
      "(View-Map) Google Map Tiles loaded [Automatically zoom and fit based on all markers]"
    );
    const bounds = new maps.LatLngBounds();
    bounds.extend(startPtLatLng);
    bounds.extend(endPtLatLng);
    for (let i = 0; i < loadEventMarkers.length; i++) {
      bounds.extend({
        lat: Number(loadEventMarkers[i].event_lat),
        lng: Number(loadEventMarkers[i].event_long),
      });
    }
    map.fitBounds(bounds);
  });

  // Creating Historical Event Markers👇
  const markers = [];
  const drawingManager = new maps.drawing.DrawingManager({
    drawingMode: maps.drawing.OverlayType.MARKER,
    drawingControl: false,
    drawingControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      drawingModes: ["marker"],
    },
  });
  drawingManager.setMap(map);
  drawingManager.setDrawingMode(null);

  console.log("(View-Map) Placing Event Markers....  ");
  if (loadEventMarkers.length === 0) {
    console.log("(View-Map) No Events found!");
  }
  for (let i = 0; i < loadEventMarkers.length; i++) {
    markers.push(
      new maps.Marker({
        icon: "/static/route-list/event-pt.png",
        position: {
          lat: Number(loadEventMarkers[i].event_lat),
          lng: Number(loadEventMarkers[i].event_long),
        },
        map,
        id: loadEventMarkers[i].closure_uid,
      })
    );
    console.log(
      "(View-Map) Total Num of Event Markers: ",
      loadEventMarkers.length
    );
    if (i === loadEventMarkers.length - 1) {
      console.log("(View-Map) Placing Event Markers Complete  ");
    }

    maps.event.addListener(markers[i], "click", function () {
      console.log(
        `(View-Map) Event Marker ${loadEventMarkers[i].closure_uid} clicked`
      );
    });
  }

  // maps.event.addListener(drawingManager, "markercomplete", function (marker) {
  //   //Disable Add Marker Controls after first drop on the map
  //   console.log("THE DRAWING MANAGER: ", drawingManager);
  //   drawingManager.setDrawingMode(null);

  //   //Extracting Google Map Marker UID object key
  //   const propertyNamesArr = Object.getOwnPropertyNames(marker);
  //   const extractedPropName = propertyNamesArr.find((element) =>
  //     element.includes("closure_uid")
  //   );
  //   const closureUidName = extractedPropName.slice(12); //from closure_uid_ to end
  //   const closureUidValue = marker[`${extractedPropName}`].toString();
  //   const combinedString = closureUidName.concat(`-${closureUidValue}`);

  //   const firstLat = marker.position.lat();
  //   const firstLong = marker.position.lng();
  //   // setHistoricalEventPt(firstLat, firstLong, combinedString);
  //   console.log(`ADDED MARKER: `, extractedPropName);
  //   console.log("UID to be stored: ", combinedString);

  //   //Change Event Marker Position
  //   maps.event.addListener(marker, "dragend", function () {
  //     var lat = marker.getPosition().lat();
  //     var long = marker.getPosition().lng();
  //     console.log(
  //       `Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
  //     );
  //     // setHistoricalEventPt(lat, long, combinedString);
  //   });

  //   //Delete Current Marker
  //   var prev_infoWindow;
  //   maps.event.addListener(marker, "click", function () {
  //     var lat = marker.getPosition().lat();
  //     var long = marker.getPosition().lng();
  //     console.log(
  //       `Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
  //     );

  //     const handleClick = () => {
  //       console.log("Marker Clicked", closureUidName);
  //       //Remove the selected Marker
  //       marker.setMap(null);
  //     };

  //     //Use Any Component to render in info window(pop-up)
  //     const popUpComponent = (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "column",
  //           justifyContent: "center",
  //           p: 1,
  //         }}
  //       >
  //         <Box sx={{ mb: "6px" }}>
  //           <PopUpTitle>Marker UID:</PopUpTitle>
  //           <PopUpValue>{closureUidValue}</PopUpValue>
  //         </Box>
  //         <RowBox>
  //           <Box sx={{ mr: "6px" }}>
  //             <PopUpTitle>Lat:</PopUpTitle>
  //             <PopUpValue>{lat.toFixed(4)}</PopUpValue>
  //           </Box>
  //           <Box>
  //             <PopUpTitle>Long:</PopUpTitle>
  //             <PopUpValue>{long.toFixed(4)}</PopUpValue>
  //           </Box>
  //         </RowBox>
  //         <DeleteButton onClick={handleClick} variant="contained">
  //           Delete
  //         </DeleteButton>
  //       </Box>
  //     );
  //     const infoWindow = new maps.InfoWindow({
  //       content: renderToString(popUpComponent),
  //     });
  //     if (prev_infoWindow) {
  //       prev_infoWindow.close();
  //     }
  //     console.log("prev_infoWindow", prev_infoWindow);
  //     console.log("infoWindow ", infoWindow);
  //     prev_infoWindow = infoWindow;
  //     infoWindow.open(map, marker);

  //     // setTimeout(() => {
  //     //   ReactDOM.render(myComponent, $(".gm-style-iw > div > div").get(0));
  //     // }, 100);

  //     maps.event.addListener(infoWindow, "domready", function (e) {
  //       if (typeof document === "undefined") {
  //         React.useLayoutEffect = React.useEffect;
  //       }
  //       ReactDOM.render(popUpComponent, $(".gm-style-iw > div > div").get(0));
  //     });
  //   });
  // });
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

const RouteViewMap: FC<any> = (props) => {
  const { loadRouteMarkers, loadEventMarkers } = props;
  console.log("(View-Map) Load route markers props: ", loadRouteMarkers);
  console.log("(View-Map) Load event markers props: ", loadEventMarkers);

  const startToEndDiffLong =
    Number(loadRouteMarkers.start_point_long) -
    Number(loadRouteMarkers.stop_point_long);
  const betweenStartToEndLong =
    Number(loadRouteMarkers.start_point_long) - startToEndDiffLong / 2;

  const startToEndDiffLat =
    Number(loadRouteMarkers.start_point_lat) -
    Number(loadRouteMarkers.stop_point_lat);
  const betweenStartToEndLat =
    Number(loadRouteMarkers.start_point_lat) - startToEndDiffLat / 2;

  const location = {
    lat: betweenStartToEndLat,
    lng: betweenStartToEndLong,
  };

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_KEY}`,
          libraries: ["drawing"],
        }}
        defaultCenter={location}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) =>
          apiIsLoaded(map, maps, loadRouteMarkers, loadEventMarkers)
        }
        options={createMapOptions}
      ></GoogleMapReact>
    </MapWrapper>
  );
};

export default React.memo(RouteViewMap);

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

// const PopUpTitle = styled(Box)`
//   && {
//     font-family: "Gilroy Regular";
//     font-size: 14px;
//     line-height: 18px;
//     color: #22333b;
//   }
// `;

// const PopUpValue = styled(Box)`
//   && {
//     font-family: "Gilroy SemiBold";
//     font-size: 16px;
//     line-height: 18px;
//     color: #22333b;
//   }
// `;

// const RowBox = styled(Box)`
//   && {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//   }
// `;

// const DeleteButton = styled(Button)`
//   && {
//     width: 70px;
//     height: 30px;
//     border-radius: 15px;
//     margin-top: 12px;
//     text-transform: none;
//     background-color: #e01313;
//     &:hover {
//       background-color: #a71010;
//     }
//   }
// `;
