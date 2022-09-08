import { Box, Button } from '@mui/material';
import 'dotenv/config';
import GoogleMapReact from 'google-map-react';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('Map');

let initialLocation;
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
  setHistoricalEventPt
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      initialLocation = new maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }
  logger.debug('INSIDE API IS LOADED END PT: ', onChangeEndPtLat, onChangeEndPtLong);
  // Set the variable into latest value
  startLat = onChangeStartPtLat;
  startLong = onChangeStartPtLong;
  endLat = onChangeEndPtLat;
  endLong = onChangeEndPtLong;

  // Creating START POINT Marker👇 ==================================================
  // Overlay Button Control
  const startPtButton = document.createElement('button');
  let startPtMarker;
  startPtButton.classList.add('starting-pt-control-button');
  startPtButton.setAttribute('type', 'button');

  // Connect START PT LAT/LONG FIELD
  const inputStartLatField = document.getElementsByName('startPtLat')[0];
  const inputStartLongField = document.getElementsByName('startPtLong')[0];

  const handleChangeStartPtMarkerPosition = () => {
    if (startPtMarker !== undefined) {
      startPtMarker.setPosition(new maps.LatLng(startLat, startLong));
      map.panTo(new maps.LatLng(startLat, startLong));
    }
  };
  // Receive Current Position not the Previous Position
  inputStartLatField.addEventListener('input', () => {
    setTimeout(handleChangeStartPtMarkerPosition, 500);
  });
  inputStartLongField.addEventListener('input', () => {
    setTimeout(handleChangeStartPtMarkerPosition, 500);
  });

  startPtButton.addEventListener('click', () => {
    logger.debug('Start Pt Button Clicked:', startPtMarker);
    if (startPtMarker === undefined) {
      maps.event.addListener(map, 'click', (event) => {
        logger.debug('Triggered Start PT listener', event.latLng);
        placeStartPtMarker(event.latLng);

        setStartPt(event.latLng.lat(), event.latLng.lng());
        maps.event.clearListeners(map);
      });
    }
  });

  // Function to Add START PT Marker
  const placeStartPtMarker = (location) => {
    startPtMarker = new maps.Marker({
      position: location,
      icon: '/static/route-list/start-pt.png',
      map,
      draggable: true
    });
    startPtMarker.setMap(map);

    // Delete Marker
    maps.event.addListener(startPtMarker, 'click', () => {
      logger.debug('START PT MARKER IS CLICKED');
      startPtMarker.setMap(null);
      startPtMarker = undefined;
      setStartPt('', '');
    });

    startPtMarker.addListener('dragend', () => {
      const lat = startPtMarker.getPosition().lat();
      const long = startPtMarker.getPosition().lng();
      setStartPt(lat, long);
    });
  };
  map.controls[maps.ControlPosition.RIGHT_TOP].push(startPtButton);

  // Creating END POINT Marker👇 ==================================================
  // Overlay Button Control
  const endPtButton = document.createElement('button');
  let endPtMarker;
  endPtButton.classList.add('ending-pt-control-button');
  endPtButton.setAttribute('type', 'button');

  // Connect START PT LAT/LONG FIELD
  const inputEndLatField = document.getElementsByName('endPtLat')[0];
  const inputEndLongField = document.getElementsByName('endPtLong')[0];

  const handleChangeEndPtMarkerPosition = () => {
    if (endPtMarker !== undefined) {
      endPtMarker.setPosition(new maps.LatLng(endLat, endLong));
      map.panTo(new maps.LatLng(endLat, endLong));
    }
  };
  // Receive Current Position not the Previous Position
  inputEndLatField.addEventListener('input', () => {
    setTimeout(handleChangeEndPtMarkerPosition, 500);
  });
  inputEndLongField.addEventListener('input', () => {
    setTimeout(handleChangeEndPtMarkerPosition, 500);
  });

  endPtButton.addEventListener('click', () => {
    logger.debug('End Pt Button Clicked:', endPtMarker);
    if (endPtMarker === undefined) {
      maps.event.addListener(map, 'click', (event) => {
        logger.debug('Triggered End PT listener', event.latLng);
        placeEndPtMarker(event.latLng);
        setEndPt(event.latLng.lat(), event.latLng.lng());
        maps.event.clearListeners(map);
      });
    }
  });

  // Function to Add End PT Marker
  const placeEndPtMarker = (location) => {
    endPtMarker = new maps.Marker({
      position: location,
      icon: '/static/route-list/end-pt.png',
      map,
      draggable: true
    });
    endPtMarker.setMap(map);
    // Delete Marker
    maps.event.addListener(endPtMarker, 'click', () => {
      logger.debug('END PT MARKER IS CLICKED');
      endPtMarker.setMap(null);
      endPtMarker = undefined;
      setEndPt('', '');
    });

    endPtMarker.addListener('dragend', () => {
      const lat = endPtMarker.getPosition().lat();
      const long = endPtMarker.getPosition().lng();
      setEndPt(lat, long);
      logger.debug('End Pt Marker: ', lat, long);
    });
  };
  map.controls[maps.ControlPosition.RIGHT_TOP].push(endPtButton);

  // Creating Historical Event Markers👇 ==================================================
  const drawingManager = new maps.drawing.DrawingManager({
    drawingMode: maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      drawingModes: ['marker']
    },
    markerOptions: {
      icon: '/static/route-list/event-pt.png',
      draggable: true
    }
  });
  drawingManager.setMap(map);
  drawingManager.setDrawingMode(null);

  maps.event.addListener(drawingManager, 'markercomplete', (marker) => {
    // Disable Add Marker Controls after first drop on the map
    logger.debug('THE DRAWING MANAGER: ', drawingManager);
    drawingManager.setDrawingMode(null);

    // Extracting Google Map Marker UID object key
    const propertyNamesArr = Object.getOwnPropertyNames(marker);
    const extractedPropName = propertyNamesArr.find((element) => element.includes('closure_uid'));
    const closureUidName = extractedPropName.slice(12); // from closure_uid_ to end
    const closureUidValue = marker[`${extractedPropName}`].toString();
    const combinedString = closureUidName.concat(`-${closureUidValue}`);

    const firstLat = marker.position.lat();
    const firstLong = marker.position.lng();
    setHistoricalEventPt(firstLat, firstLong, combinedString);
    logger.debug('ADDED MARKER: ', extractedPropName);
    logger.debug('UID to be stored: ', combinedString);

    // Change Event Marker Position
    maps.event.addListener(marker, 'dragend', () => {
      const lat = marker.getPosition().lat();
      const long = marker.getPosition().lng();
      logger.debug(`Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`);
      setHistoricalEventPt(lat, long, combinedString);
    });

    // Delete Current Marker
    let prevInfoWindow;
    maps.event.addListener(marker, 'click', () => {
      const lat = marker.getPosition().lat();
      const long = marker.getPosition().lng();
      logger.debug(`Marker Selected: ${closureUidValue}, Lat: ${lat} Long: ${long}`);

      const handleClick = () => {
        logger.debug('Marker Clicked', closureUidName);
        // Remove the selected Marker
        marker.setMap(null);
      };

      // Use Any Component to render in info window(pop-up)
      const popUpComponent = (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1
          }}
        >
          <Box sx={{ mb: '6px' }}>
            <PopUpTitle>Marker UID:</PopUpTitle>
            <PopUpValue>{closureUidValue}</PopUpValue>
          </Box>
          <RowBox>
            <Box sx={{ mr: '6px' }}>
              <PopUpTitle>Lat:</PopUpTitle>
              <PopUpValue>{lat.toFixed(4)}</PopUpValue>
            </Box>
            <Box>
              <PopUpTitle>Long:</PopUpTitle>
              <PopUpValue>{long.toFixed(4)}</PopUpValue>
            </Box>
          </RowBox>
          <DeleteButton onClick={handleClick} variant='contained'>
            Delete
          </DeleteButton>
        </Box>
      );
      const infoWindow = new maps.InfoWindow({
        content: renderToString(popUpComponent)
      });
      if (prevInfoWindow) {
        prevInfoWindow.close();
      }
      logger.debug('prev_infoWindow', prevInfoWindow);
      logger.debug('infoWindow ', infoWindow);
      prevInfoWindow = infoWindow;
      infoWindow.open(map, marker);

      // setTimeout(() => {
      //   ReactDOM.render(myComponent, $(".gm-style-iw > div > div").get(0));
      // }, 100);

      maps.event.addListener(infoWindow, 'domready', () => {
        if (typeof document === 'undefined') {
          React.useLayoutEffect = React.useEffect;
        }
        const gmS = document.getElementsByClassName('gm-style-iw').item(0);
        const div = gmS.getElementsByTagName('div').item(0).getElementsByTagName('div').item(0);
        ReactDOM.render(popUpComponent, div);
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
      position: maps.ControlPosition.RIGHT_TOP
    }
  };
};

const Map: React.FC<any> = (props) => {
  const {
    onChangeStartPtLat,
    onChangeStartPtLong,
    onChangeEndPtLat,
    onChangeEndPtLong,
    setStartPt,
    setEndPt,
    setHistoricalEventPt
  } = props;
  const [mapAPI, setMap] = useState(null);
  const [mapsAPI, setMaps] = useState(null);
  const startPtMarker = useRef(null);

  const setUp = useCallback(
    debounce((map, maps) => {
      if (startPtMarker) {
        // startPtMarker.current.setMap(null);
        startPtMarker.current = apiIsLoaded(
          map,
          maps,
          onChangeStartPtLat,
          onChangeStartPtLong,
          onChangeEndPtLat,
          onChangeEndPtLong,
          setStartPt,
          setEndPt,
          setHistoricalEventPt
        );
      }
    }, 500),
    [onChangeStartPtLat, onChangeStartPtLong, onChangeEndPtLat, onChangeEndPtLong]
  );

  useEffect(() => {
    if (mapAPI && mapsAPI) {
      setUp(mapAPI, mapsAPI);
    }
  }, [mapAPI, mapsAPI, setUp]);

  const location = {
    address: '7 Carlson St, Kitimat, BC V8C 1A9, Canada',
    lat: 54.06291864840513,
    lng: -128.6423159788208
  };

  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_KEY}`,
          libraries: ['drawing']
        }}
        defaultCenter={location}
        defaultZoom={16}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          startPtMarker.current = apiIsLoaded(
            map,
            maps,
            onChangeStartPtLat,
            onChangeStartPtLong,
            onChangeEndPtLat,
            onChangeEndPtLong,
            setStartPt,
            setEndPt,
            setHistoricalEventPt
          );
          setMap(map);
          setMaps(maps);
        }}
        options={createMapOptions}
      />
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

  button[title='Zoom in'] {
    height: 27px !important;
    width: 27px !important;
    background-color: #c4c4c4 !important;
    margin-bottom: 5px !important;
  }

  button[title='Zoom out'] {
    height: 27px !important;
    width: 27px !important;
    background-color: #c4c4c4 !important;
    margin-bottom: 5px !important;
  }

  div.gmnoprint[role='menubar'] {
    top: 134px !important;
  }

  //START POINT OVERLAY CONTROL
  button[class='starting-pt-control-button'] {
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
  button[class='starting-pt-control-button'] span {
    display: none !important;
  }
  button[class='starting-pt-control-button']::before {
    content: url('/static/route-list/control-start-pt.png');
  }

  //END POINT OVERLAY CONTROL
  button[class='ending-pt-control-button'] {
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
  button[class='ending-pt-control-button'] span {
    display: none !important;
  }
  button[class='ending-pt-control-button']::before {
    content: url('/static/route-list/control-end-pt.png');
  }

  //HISTORICAL EVENT POINT OVERLAY CONTROL
  button[title='Stop drawing'] {
    display: none !important;
  }
  button[title='Add a marker'] {
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
  button[title='Add a marker'] span {
    display: none !important;
  }
  button[title='Add a marker']::before {
    content: url('/static/route-list/control-event-pt.png');
  }
`;

const PopUpTitle = styled(Box)`
  && {
    font-family: 'Gilroy Regular';
    font-size: 14px;
    line-height: 18px;
    color: #22333b;
  }
`;

const PopUpValue = styled(Box)`
  && {
    font-family: 'Gilroy SemiBold';
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