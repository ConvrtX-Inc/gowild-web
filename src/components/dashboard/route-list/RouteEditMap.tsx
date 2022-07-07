import "dotenv/config";
import React, { useCallback, useEffect, useState, useRef } from "react";
// import { renderToString } from "react-dom/server";
import GoogleMapReact from "google-map-react";
// import { Box, Button } from "@mui/material";
import styled from "styled-components";
// import ReactDOM from "react-dom";
// import $ from "jquery";
import { debounce } from "lodash";

let startLat;
let startLong;
let endLat;
let endLong;

const apiIsLoaded = (
  map,
  maps,
  onChangeStartPtLat,
  onChangeStartPtLong,
  onChangeEndPtLat,
  onChangeEndPtLong,
  setStartPt,
  setEndPt,
  setHistoricalEventPt,
  loadRouteMarkers,
  loadEventMarkers
) => {
  console.log("(Edit-Map) Google Map Api is Loaded: ", loadEventMarkers);
  //Set the variable into latest value
  startLat = onChangeStartPtLat;
  startLong = onChangeStartPtLong;
  endLat = onChangeEndPtLat;
  endLong = onChangeEndPtLong;

  var startPtLatLng = new maps.LatLng(
    Number(loadRouteMarkers.start_point_lat),
    Number(loadRouteMarkers.start_point_long)
  );

  var endPtLatLng = new maps.LatLng(
    Number(loadRouteMarkers.stop_point_lat),
    Number(loadRouteMarkers.stop_point_long)
  );

  // Creating START POINT Marker👇 ==================================================
  // Overlay Button Control
  const startPtButton = document.createElement("button");
  var startPtMarker;
  console.log("START PT MARKER [before] tiles loaded", startPtMarker);
  startPtButton.classList.add("starting-pt-control-button");
  startPtButton.setAttribute("type", "button");

  //Connect START PT LAT/LONG FIELD
  const inputStartLatField = document.getElementsByName("startPtLat")[0];
  const inputStartLongField = document.getElementsByName("startPtLong")[0];

  const handleChangeStartPtMarkerPosition = () => {
    if (startPtMarker !== undefined) {
      startPtMarker.setPosition(new maps.LatLng(startLat, startLong));
      map.panTo(new maps.LatLng(startLat, startLong));
    }
  };
  // Change the position of Marker on every input in the text field
  inputStartLatField.addEventListener("input", () => {
    setTimeout(handleChangeStartPtMarkerPosition, 500);
  });
  inputStartLongField.addEventListener("input", () => {
    setTimeout(handleChangeStartPtMarkerPosition, 500);
  });

  startPtButton.addEventListener("click", () => {
    console.log("(Edit-Map) Start Pt Button Control Activated:", startPtMarker);
    if (startPtMarker === undefined) {
      maps.event.addListener(map, "click", (event) => {
        console.log("(Edit-Map) Place Start Pt Marker", event.latLng);
        placeStartPtMarker(event.latLng);
        setStartPt(event.latLng.lat(), event.latLng.lng());
        maps.event.clearListeners(map);
      });
    } else {
      return;
    }
  });

  //Function to Add START PT Marker
  const placeStartPtMarker = (location) => {
    startPtMarker = new maps.Marker({
      position: location,
      icon: "/static/route-list/start-pt.png",
      map: map,
      draggable: true,
    });
    startPtMarker.setMap(map);

    //Delete Marker
    maps.event.addListener(startPtMarker, "click", () => {
      console.log("(Edit-Map) Start Pt marker clicked and deleted.");
      startPtMarker.setMap(null);
      startPtMarker = undefined;
      setStartPt("", "");
    });

    startPtMarker.addListener("dragend", () => {
      let lat = startPtMarker.getPosition().lat();
      let long = startPtMarker.getPosition().lng();
      setStartPt(lat, long);
    });
  };

  map.controls[maps.ControlPosition.RIGHT_TOP].push(startPtButton);

  maps.event.addListenerOnce(map, "tilesloaded", () => {
    console.log(
      "(Edit-Map) Google Map Tiles loaded and placed START pt marker."
    );
    placeStartPtMarker(startPtLatLng);
  });

  // // Creating END POINT Marker👇 ==================================================
  // // Overlay Button Control
   const endPtButton = document.createElement("button");
   var endPtMarker;
   endPtButton.classList.add("ending-pt-control-button");
   endPtButton.setAttribute("type", "button");

  // //Connect START PT LAT/LONG FIELD
  // const inputEndLatField = document.getElementsByName("endPtLat")[0];
  // const inputEndLongField = document.getElementsByName("endPtLong")[0];

  // const handleChangeEndPtMarkerPosition = () => {
  //   if (endPtMarker !== undefined) {
  //     endPtMarker.setPosition(new maps.LatLng(endLat, endLong));
  //     map.panTo(new maps.LatLng(endLat, endLong));
  //   }
  // };
  // // Receive Current Position not the Previous Position
  // inputEndLatField.addEventListener("input", () => {
  //   setTimeout(handleChangeEndPtMarkerPosition, 500);
  // });
  // inputEndLongField.addEventListener("input", () => {
  //   setTimeout(handleChangeEndPtMarkerPosition, 500);
  // });

   endPtButton.addEventListener("click", () => {
     console.log("(Edit-Map) End Pt Button Control Activated:", endPtMarker);
     if (endPtMarker === undefined) {
       maps.event.addListener(map, "click", (event) => {
         console.log("(Edit-Map) Triggered End PT listener", event.latLng);
         placeEndPtMarker(event.latLng);
         setEndPt(event.latLng.lat(), event.latLng.lng());
         maps.event.clearListeners(map);
       });
     } else {
       return;
     }
   });

  // //Function to Add End PT Marker
   const placeEndPtMarker = (location) => {
     endPtMarker = new maps.Marker({
       position: location,
       icon: "/static/route-list/end-pt.png",
       map: map,
       draggable: true,
     });
     endPtMarker.setMap(map);
     //Delete Marker
     maps.event.addListener(endPtMarker, "click", () => {
       console.log("(Edit-Map) End pt marker clicked and deleted.");
       endPtMarker.setMap(null);
       endPtMarker = undefined;
       setEndPt("", "");
     });

     endPtMarker.addListener("dragend", () => {
       let lat = endPtMarker.getPosition().lat();
       let long = endPtMarker.getPosition().lng();
       setEndPt(lat, long);
       console.log("(Edit-Map) End Pt Marker: ", lat, long);
     });
   };
   map.controls[maps.ControlPosition.RIGHT_TOP].push(endPtButton);
   maps.event.addListenerOnce(map, "tilesloaded", () => {
     console.log("(Edit-Map) Google Map Tiles loaded and placed END pt marker.");
     placeEndPtMarker(endPtLatLng);
   });

  // // Automatically zoom and fit google map viewport based on available markers
  // maps.event.addListenerOnce(map, "tilesloaded", () => {
  //   console.log("(Edit-Map) Google Map Tiles loaded and FIT BOUNDS.");
  //   const bounds = new maps.LatLngBounds();
  //   bounds.extend(startPtLatLng);
  //   bounds.extend(endPtLatLng);
  //   for (let i = 0; i < loadEventMarkers.length; i++) {
  //     bounds.extend({
  //       lat: Number(loadEventMarkers[i].event_lat),
  //       lng: Number(loadEventMarkers[i].event_long),
  //     });
  //   }
  //   map.fitBounds(bounds);
  // });

  // Creating Historical Event Markers👇 ==================================================
  const markers = [];
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
    //IN PROGRESS LINKING MARKERS
    maps.event.addListener(markers[i], "click", function () {
      console.log(
        "(Edit-Map) Clicked Event marker: ",
        loadEventMarkers[i].closure_uid
      );
    });
  }
  maps.event.addListener(drawingManager, "overlaycomplete", function (event) {
    console.log("(Edit-Map) Triggered Overlay Complete Listener");
    for (var i = 0; i < markers.length; i++) {
      // show current marker/s
      markers[i].setMap(map);
    }
  });

  maps.event.addListener(drawingManager, "markercomplete", function (marker) {
    //Disable Add Marker Controls after first drop on the map
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
    console.log("(Edit Mode) ADDED MARKER: ", extractedPropName);
    console.log("(Edit Mode) UID to be stored: ", combinedString);

    //Change Event Marker Position
    maps.event.addListener(marker, "dragend", function () {
      var lat = marker.getPosition().lat();
      var long = marker.getPosition().lng();
      console.log(
        `(Edit-Map) Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
      );
      setHistoricalEventPt(lat, long, combinedString);
    });

    //Delete Current Marker
    // var prev_infoWindow;
    maps.event.addListener(marker, "click", function () {
      var lat = marker.getPosition().lat();
      var long = marker.getPosition().lng();
      console.log(
        `(Edit-Map) Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`
      );

      // const handleClick = () => {
      //   console.log("Marker Clicked", closureUidName);
      //   //Remove the selected Marker
      //   marker.setMap(null);
      // };

      //Use Any Component to render in info window(pop-up)
      // const popUpComponent = (
      //   <Box
      //     sx={{
      //       display: "flex",
      //       flexDirection: "column",
      //       justifyContent: "center",
      //       p: 1,
      //     }}
      //   >
      //     <Box sx={{ mb: "6px" }}>
      //       <PopUpTitle>Marker UID:</PopUpTitle>
      //       <PopUpValue>{closureUidValue}</PopUpValue>
      //     </Box>
      //     <RowBox>
      //       <Box sx={{ mr: "6px" }}>
      //         <PopUpTitle>Lat:</PopUpTitle>
      //         <PopUpValue>{lat.toFixed(4)}</PopUpValue>
      //       </Box>
      //       <Box>
      //         <PopUpTitle>Long:</PopUpTitle>
      //         <PopUpValue>{long.toFixed(4)}</PopUpValue>
      //       </Box>
      //     </RowBox>
      //     <DeleteButton onClick={handleClick} variant="contained">
      //       Delete
      //     </DeleteButton>
      //   </Box>
      // );
      // const infoWindow = new maps.InfoWindow({
      //   content: renderToString(popUpComponent),
      // });
      // if (prev_infoWindow) {
      //   prev_infoWindow.close();
      // }
      // console.log("prev_infoWindow", prev_infoWindow);
      // console.log("infoWindow ", infoWindow);
      // prev_infoWindow = infoWindow;
      // infoWindow.open(map, marker);

      // setTimeout(() => {
      //   ReactDOM.render(myComponent, $(".gm-style-iw > div > div").get(0));
      // }, 100);

      // maps.event.addListener(infoWindow, "domready", function (e) {
      //   if (typeof document === "undefined") {
      //     React.useLayoutEffect = React.useEffect;
      //   }
      //   ReactDOM.render(popUpComponent, $(".gm-style-iw > div > div").get(0));
      // });
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

const RouteEditMap: React.FC<any> = (props) => {
  const {
    onChangeStartPtLat,
    onChangeStartPtLong,
    onChangeEndPtLat,
    onChangeEndPtLong,
    setStartPt,
    setEndPt,
    setHistoricalEventPt,
    loadRouteMarkers,
    loadEventMarkers,
  } = props;
  const [mapAPI, setMap] = useState(null);
  const [mapsAPI, setMaps] = useState(null);
  const markers = useRef(null);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setUp = useCallback(
    debounce((map, maps) => {
      if (markers) {
        // markers.current.setMap(null);
        markers.current = apiIsLoaded(
          map,
          maps,
          onChangeStartPtLat,
          onChangeStartPtLong,
          onChangeEndPtLat,
          onChangeEndPtLong,
          setStartPt,
          setEndPt,
          setHistoricalEventPt,
          loadRouteMarkers,
          loadEventMarkers
        );
      }
    }, 500),
    [
      onChangeStartPtLat,
      onChangeStartPtLong,
      onChangeEndPtLat,
      onChangeEndPtLong,
    ]
  );

  useEffect(() => {
    console.log("Map and Maps API", mapAPI, mapsAPI);
    if (mapAPI && mapsAPI) {
      setUp(mapAPI, mapsAPI);
    }
  }, [setUp]);

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
        onGoogleApiLoaded={({ map, maps }) => {
          markers.current = apiIsLoaded(
            map,
            maps,
            onChangeStartPtLat,
            onChangeStartPtLong,
            onChangeEndPtLat,
            onChangeEndPtLong,
            setStartPt,
            setEndPt,
            setHistoricalEventPt,
            loadRouteMarkers,
            loadEventMarkers
          );
          setMap(map);
          setMaps(maps);
        }}
        options={createMapOptions}
      ></GoogleMapReact>
    </MapWrapper>
  );
};

// export default RouteEditMap;
export default React.memo(RouteEditMap);

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
    top: 134px !important;
  }

  //START POINT OVERLAY CONTROL
  button[class="starting-pt-control-button"] {
    top: 75px !important;
    right: 10px !important;
    height: 27px;
    width: 27px;
    border: 0;
    background-color: #c4c4c4 !important;
    cursor: pointer;
    display: flex !important;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
  }
  button[class="starting-pt-control-button"] span {
    display: none !important;
  }
  button[class="starting-pt-control-button"]::before {
    content: url("/static/route-list/control-start-pt.png");
  }

  //END POINT OVERLAY CONTROL
  button[class="ending-pt-control-button"] {
    top: 107px !important;
    right: 10px !important;
    height: 27px;
    width: 27px;
    border: 0;
    background-color: #c4c4c4 !important;
    cursor: pointer;
    display: flex !important;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
  }
  button[class="ending-pt-control-button"] span {
    display: none !important;
  }
  button[class="ending-pt-control-button"]::before {
    content: url("/static/route-list/control-end-pt.png");
  }

  //HISTORICAL EVENT POINT OVERLAY CONTROL
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
