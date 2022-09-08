import * as Yup from 'yup';
import {
  RouteHistoricalEvent,
  useCreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoMutation,
  useCreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventMutation
} from '../../../../lib/api/go-wild.api';
import { useAuth } from '../../../../lib/hooks/use-auth';
import { useUploadImgFile } from '../../../../lib/hooks/use-upload';
import ExpandMoreIcon from '../../../icons/ExpandAccordion';
import FinishingPtIcon from '../../../icons/LocationFinishingPt';
import HistoricalEventIcon from '../../../icons/LocationHistoricalEvent';
import StartingPtIcon from '../../../icons/LocationStartingPt';
import AddHistoricalIcon from '../../../icons/RouteListAddHistorical';
import CrossIcon from '../../../icons/RouteListCross';
import FileDropzone from '../../FileDropzone';
import FileDropzoneHistorical from '../../FileDropzoneHistorical';
import Scrollbar from '../../Scrollbar';
import RouteEditMap from './RouteEditMap';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const logger = getLogger('RouteEditForm');

const RouteEditForm: FC<any> = (props) => {
  const uploadImgFile = useUploadImgFile();
  const { token, sub } = useAuth();

  const [createRouteHistoricalEventPhoto] =
    useCreateOneBaseRouteHistoricalEventPhotoControllerRouteHistoricalEventPhotoMutation();
  const [createRouteHistoricalEvents] =
    useCreateOneBaseRouteHistoricalEventsControllerRouteHistoricalEventMutation();

  const { singleRoute } = props;
  const [
    ,
    // b64files
    setB64files
  ] = useState<any>('');
  const [files, setFiles] = useState<File[]>([]);
  const [isImgLoaded, setIsImgLoaded] = useState(true);
  const [
    ,
    // b64historicalFiles
    setB64historicalFiles
  ] = useState<any>('');
  const [historicalFiles, setHistoricalFiles] = useState<File[]>([]);
  const [gmapMarkerUid, setGmapMarkerUid] = useState('');
  const [historicalEvents, setHistoricalEvents] = useState([]);
  const [loadGmapAfterGetEvents, setLoadGmapAfterGetEvents] = useState(false);
  const [eventIsEditing, setEventIsEditing] = useState(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLSpanElement>();
  const scrollToEvents = useRef<HTMLSpanElement>();
  const [routeHistoFields, setRouteHistoFields] = useState([]);

  const handleChangeHistoFields = (e, i) => {
    const { value, name } = e.target;

    const newState = [...routeHistoFields];
    newState[i] = {
      ...newState[i],
      [name]: value
    };

    logger.debug('HISTO FIELDS', newState);
    setHistoricalEvents(newState);
  };
  // useEffect(() => {
  //   if (scrollRef?.current) {
  //     scrollRef.current.scrollIntoView();
  //   }
  // }, []);
  const scrollToHistoricalEvents = () => {
    scrollToEvents.current.scrollIntoView();
  };

  const scrollToHistoricalForm = () => {
    scrollRef.current.scrollIntoView();
  };

  const handleDrop = (newFiles: any): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const file = newFiles.find((f) => f);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      logger.debug('OBJ SRC & DATA ', {
        src: file.preview,
        data: reader.result
      });
      setB64files(reader.result);
    };
  };

  const handleRemove = (file): void => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

  const handleHistoricalDrop = (newFiles: any): void => {
    setHistoricalFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const file = newFiles.find((f) => f);
    logger.debug('Historical Img Drop ', file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      logger.debug('OBJ SRC & DATA ', {
        src: file.preview,
        data: reader.result
      });
      setB64historicalFiles(reader.result);
    };
  };

  const handleHistoricalRemove = (file: File): void => {
    setHistoricalFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleHistoricalRemoveAll = (): void => {
    setHistoricalFiles([]);
  };

  const getHistoricalEvents = useCallback(async () => {
    logger.debug('Get Historical Events by ID loaded: ', singleRoute.id);
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route-historical-events?filter=route_id||$eq||${singleRoute.id}`;
    const CONFIG = {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    };
    setLoadGmapAfterGetEvents(false);
    const apiResponse = await axios.get(URL, CONFIG);
    logger.debug('GET Historical Events', apiResponse.data.data);
    setHistoricalEvents(apiResponse.data.data);
    setRouteHistoFields(apiResponse.data.data);
    setLoadGmapAfterGetEvents(true);
  }, [singleRoute.id]);

  useEffect(() => {
    if (singleRoute.id) {
      getHistoricalEvents();
    }
  }, [singleRoute.id, getHistoricalEvents]);

  logger.debug('historicalFiles images : ' + historicalFiles.length);
  // Add HistoricalEvent & Photo
  const handleAddEventPhoto = async (eventId: string) => {
    try {
      if (historicalFiles.length === 0) {
        return;
      }

      logger.debug('Should upload Historical Event Photo');
      const uploaded = await uploadImgFile(historicalFiles[0]);
      const result = await createRouteHistoricalEventPhoto({
        routeHistoricalEventPhoto: {
          route_historical_event_id: eventId,
          event_photo_url: uploaded.path
        } as any
      });

      if ('data' in result) {
        logger.debug('Add Historical Event Photo Response: ', result);
      }
    } catch (err) {
      logger.debug('Handle Add Event Photo Error: ', err);
    }
  };

  const handleAddHistorical = useCallback(
    async (histoLong, histoLat, histoTitle, histoSubTitle, histoDescription) => {
      try {
        const routeHistoricalEvent: RouteHistoricalEvent = {
          route_id: singleRoute.id,
          closure_uid: gmapMarkerUid,
          event_long: histoLong,
          event_lat: histoLat,
          event_title: histoTitle,
          event_subtitle: histoSubTitle,
          description: histoDescription,
          id: undefined,
          createdDate: undefined,
          updatedDate: undefined
        };

        const result = await createRouteHistoricalEvents({ routeHistoricalEvent });
        if ('data' in result) {
          const apiResponse: RouteHistoricalEvent = result.data;

          await handleAddEventPhoto(apiResponse.id);
          getHistoricalEvents();
          scrollToHistoricalEvents();
          setHistoricalFiles([]);
          setB64historicalFiles('');
          logger.debug('Add Historical Event Response: ', apiResponse);
        }
      } catch (err) {
        logger.debug('Adding Historical Event Error: ', err);
      }
    },
    [singleRoute.id, getHistoricalEvents, gmapMarkerUid, historicalFiles]
  );

  const handleEditSelectedEvent = () => {
    setEventIsEditing(true);
  };

  const handleSaveSelectedEvent = () => {
    setEventIsEditing(false);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        startPtLong: singleRoute.start_point_long,
        startPtLat: singleRoute.start_point_lat,
        endPtLong: singleRoute.stop_point_long,
        endPtLat: singleRoute.stop_point_lat,
        raceTitle: singleRoute.route_name,
        description: singleRoute.description,
        histoLong: '',
        histoLat: '',
        histoTitle: '',
        histoSubTitle: '',
        histoDescription: '',
        submit: null
      }}
      validationSchema={Yup['object']().shape({
        startPtLong: Yup.number().required('This field is required'),
        startPtLat: Yup.number().required('This field is required'),
        endPtLong: Yup.number().required('This field is required'),
        endPtLat: Yup.number().required('This field is required'),
        raceTitle: Yup.string().max(80).required('This field is required'),
        description: Yup.string().max(255).required('This field is required'),
        histoLong: Yup.number(),
        histoLat: Yup.number(),
        histoTitle: Yup.string().max(80),
        histoSubTitle: Yup.string().max(80),
        histoDescription: Yup.string().max(80)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          const uploaded = await uploadImgFile(files[0]);

          const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route/${singleRoute.id}`;
          const DATA = {
            user_id: sub,
            route_name: values.raceTitle.trim(),
            route_photo: 'byte64image',
            start_point_long: Number(values.startPtLong),
            start_point_lat: Number(values.startPtLat),
            stop_point_long: Number(values.endPtLong),
            stop_point_lat: Number(values.endPtLat),
            img_url: uploaded.path,
            description: values.description.trim()
          };
          const CONFIG = {
            headers: {
              Authorization: `Bearer ${token?.accessToken}`,
              'Content-Type': 'application/json'
            }
          };
          const apiResponse = await axios.patch(URL, DATA, CONFIG);
          logger.debug('ONSUBMIT API RESPONSE: ', apiResponse);

          setStatus({ success: true });

          // Clear Form and Current States
          // resetForm();
          // setFiles([]);
          setHistoricalFiles([]);
          setB64files('');
          setSubmitting(false);
          toast.success('Route created!');
        } catch (err) {
          logger.error(err);
          if (err.response.status === 413) {
            err.message = `Image ${err.response.statusText} (${err.response.status})`;
          }
          if (err.response.status === 500) {
            err.message = `${err.response.statusText} (${err.response.status})`;
          }

          toast.error('Something went wrong!');
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }): JSX.Element => (
        <StyledForm onSubmit={handleSubmit} {...props}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <Card>
                <CardContent>
                  <RowBox>
                    <Box sx={{ width: '293px', mr: '18px' }}>
                      <LegendBox>
                        <FlexiBox sx={{ mb: '17px' }}>
                          <StartingPtIcon fontSize='small' />
                          <LegendItem>Starting Point</LegendItem>
                        </FlexiBox>
                        <FlexiBox sx={{ mb: '17px' }}>
                          <FinishingPtIcon fontSize='small' />
                          <LegendItem>Finishing Point</LegendItem>
                        </FlexiBox>
                        <FlexiBox>
                          <HistoricalEventIcon fontSize='small' />
                          <LegendItem>Historical Event</LegendItem>
                        </FlexiBox>
                      </LegendBox>
                      <FieldLabel>Starting Point</FieldLabel>
                      <StyledTextField
                        autoComplete='off'
                        error={Boolean(touched.startPtLong && errors.startPtLong)}
                        fullWidth
                        helperText={touched.startPtLong && errorMessage(errors.startPtLong)}
                        placeholder='Longitude'
                        name='startPtLong'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startPtLong}
                        variant='outlined'
                      />
                      <StyledTextField
                        autoComplete='off'
                        sx={{ mt: '0 !important' }}
                        error={Boolean(touched.startPtLat && errors.startPtLat)}
                        fullWidth
                        helperText={touched.startPtLat && errorMessage(errors.startPtLat)}
                        placeholder='Latitude'
                        name='startPtLat'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startPtLat}
                        variant='outlined'
                      />
                      <FieldLabel>End Point</FieldLabel>
                      <StyledTextField
                        autoComplete='off'
                        error={Boolean(touched.endPtLong && errors.endPtLong)}
                        fullWidth
                        helperText={touched.endPtLong && errorMessage(errors.endPtLong)}
                        placeholder='Longitude'
                        name='endPtLong'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endPtLong}
                        variant='outlined'
                      />
                      <StyledTextField
                        autoComplete='off'
                        sx={{ mt: '0 !important' }}
                        error={Boolean(touched.endPtLat && errors.endPtLat)}
                        fullWidth
                        helperText={touched.endPtLat && errorMessage(errors.endPtLat)}
                        placeholder='Latitude'
                        name='endPtLat'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endPtLat}
                        variant='outlined'
                      />
                      <Box
                        sx={{
                          width: '289px',
                          height: '89.98px'
                        }}
                      >
                        {singleRoute.img_url && isImgLoaded ? (
                          <Box
                            sx={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mb: '20px'
                            }}
                          >
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: '76px',
                                top: '-20px'
                              }}
                              onClick={() => setIsImgLoaded(false)}
                            >
                              <CrossIcon fontSize='medium' />
                            </IconButton>
                            <img
                              height='90px'
                              width='90px'
                              src={singleRoute.img_url}
                              alt='route-img'
                            />
                          </Box>
                        ) : (
                          <FileDropzone
                            accept={['image/png', '.jpg', 'image/gif']}
                            maxFiles={1}
                            files={files}
                            onDrop={handleDrop}
                            onRemove={handleRemove}
                            onRemoveAll={handleRemoveAll}
                          />
                        )}
                      </Box>
                      <FieldLabel>Title</FieldLabel>
                      <StyledTextField
                        autoComplete='off'
                        error={Boolean(touched.raceTitle && errors.raceTitle)}
                        fullWidth
                        helperText={touched.raceTitle && errorMessage(errors.raceTitle)}
                        placeholder='My race title'
                        name='raceTitle'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.raceTitle}
                        variant='outlined'
                      />
                      <FieldLabel>Description</FieldLabel>
                      <StyledMultiTextField
                        autoComplete='off'
                        error={Boolean(touched.description && errors.description)}
                        fullWidth
                        multiline
                        rows={4}
                        helperText={touched.description && errorMessage(errors.description)}
                        placeholder='Write something here...'
                        name='description'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant='outlined'
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: '16px'
                        }}
                      >
                        <SaveButton disabled={isSubmitting} type='submit' variant='contained'>
                          {isSubmitting ? (
                            <>
                              <CircularProgress
                                sx={{
                                  color: '#FBF1DA',
                                  position: 'absolute',
                                  right: '60px'
                                }}
                              />
                              {progress === 100 ? 'Saving' : `Uploading image ${progress}%   `}
                            </>
                          ) : (
                            'Save Changes'
                          )}
                        </SaveButton>
                      </Box>
                      {errors.submit && (
                        <Box
                          sx={{
                            mt: 3,
                            position: 'relative'
                          }}
                        >
                          <FormHelperText error>{errorMessage(errors.submit)}</FormHelperText>
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        height: '982px',
                        width: '100%',
                        borderRadius: '20px',
                        position: 'relative',
                        border: '1px solid rgba(0,0,0,0.1)'
                      }}
                    >
                      {Object.keys(singleRoute).length !== 0 && loadGmapAfterGetEvents ? (
                        <RouteEditMap
                          loadRouteMarkers={singleRoute}
                          loadEventMarkers={historicalEvents}
                          onChangeStartPtLat={Number(values.startPtLat)}
                          onChangeStartPtLong={Number(values.startPtLong)}
                          onChangeEndPtLat={Number(values.endPtLat)}
                          onChangeEndPtLong={Number(values.endPtLong)}
                          setStartPt={(lat, long) => {
                            if (lat === '' && long === '') {
                              setFieldValue('startPtLat', '');
                              setFieldValue('startPtLong', '');
                              return;
                            }
                            setFieldValue('startPtLat', lat.toFixed(4));
                            setFieldValue('startPtLong', long.toFixed(4));
                          }}
                          setEndPt={(lat, long) => {
                            if (lat === '' && long === '') {
                              setFieldValue('endPtLat', '');
                              setFieldValue('endPtLong', '');
                              return;
                            }
                            setFieldValue('endPtLat', lat.toFixed(4));
                            setFieldValue('endPtLong', long.toFixed(4));
                          }}
                          setHistoricalEventPt={(lat, long, closureUid) => {
                            if (lat === '' && long === '') {
                              setFieldValue('histoLat', '');
                              setFieldValue('histoLong', '');
                              return;
                            }
                            setFieldValue('histoLat', lat.toFixed(4));
                            setFieldValue('histoLong', long.toFixed(4));
                            setGmapMarkerUid(closureUid);
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '491px',
                            left: '330px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <StyledCircularProgress />
                          Loading Map
                        </Box>
                      )}
                    </Box>
                  </RowBox>
                  {/* ---------------------HISTORICAL------------------------ */}

                  <HistoricalBox>
                    <ToolbarBox>
                      <Title sx={{ cursor: 'pointer' }}>Historical</Title>
                      <OrangeBorder />
                      <Box sx={{ ml: 'auto' }} onClick={scrollToHistoricalEvents}>
                        <Button
                          sx={{
                            color: '#0E5753',
                            borderColor: '#0E5753'
                          }}
                          variant='outlined'
                        >
                          🔺 Scroll to Events
                        </Button>
                      </Box>
                      <Box sx={{ ml: '20px' }} onClick={scrollToHistoricalForm}>
                        <Button
                          sx={{
                            color: '#0E5753',
                            borderColor: '#0E5753'
                          }}
                          variant='outlined'
                        >
                          🔻 Scroll to Form
                        </Button>
                      </Box>
                      <Box sx={{ ml: 'auto', mb: '20px' }}>
                        <AddHistoricalButton
                          sx={{
                            opacity: `${
                              values.histoLong &&
                              values.histoLat &&
                              values.histoTitle &&
                              values.histoSubTitle &&
                              values.histoDescription
                                ? 1
                                : '0.2'
                            }`
                          }}
                          disabled={
                            !(
                              values.histoLong &&
                              values.histoLat &&
                              values.histoTitle &&
                              values.histoSubTitle &&
                              values.histoDescription
                            )
                          }
                          variant='contained'
                          onClick={() => {
                            if (
                              !values.histoLong ||
                              !values.histoLat ||
                              !values.histoTitle ||
                              !values.histoSubTitle ||
                              !values.histoDescription
                            ) {
                              logger.debug('No values added');
                            } else {
                              handleAddHistorical(
                                values.histoLong,
                                values.histoLat,
                                values.histoTitle,
                                values.histoSubTitle,
                                values.histoDescription
                              );
                            }
                            setFieldValue('histoLong', '');
                            setFieldValue('histoLat', '');
                            setFieldValue('histoTitle', '');
                            setFieldValue('histoSubTitle', '');
                            setFieldValue('histoDescription', '');
                          }}
                        >
                          <Box sx={{ mr: '3px' }}>
                            <AddHistoricalIcon fontSize='small' />
                          </Box>
                          Add Historical
                        </AddHistoricalButton>
                      </Box>
                    </ToolbarBox>
                    <Box sx={{ height: '457px' }}>
                      <Scrollbar>
                        {/* -------------------------- ACCORDION */}
                        <span ref={scrollToEvents} />
                        {historicalEvents.length > 0 &&
                          historicalEvents.map((historical, index) => (
                            <StyledAccordion
                              square
                              key={historical.id}
                              expanded={
                                eventIsEditing && expanded === `panel${index}`
                                  ? true
                                  : expanded === `panel${index}`
                              }
                              onChange={handleAccordionChange(`panel${index}`)}
                            >
                              <StyledAccordionSummary
                                sx={{
                                  pl: '36px'
                                }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}a-content`}
                                id={`panel${index}a-header`}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mr: '81px'
                                  }}
                                >
                                  <AccordionTitle
                                    sx={{
                                      mb: `${expanded ? 44 : 15}px`
                                    }}
                                  >
                                    Historical Event
                                  </AccordionTitle>
                                  <Box
                                    sx={{
                                      display: 'flex'
                                    }}
                                  >
                                    <AccordionValue
                                      sx={{
                                        mr: '23px'
                                      }}
                                    >
                                      {`${historical.event_long}°`}
                                    </AccordionValue>
                                    <AccordionValue>{`${historical.event_lat}°`}</AccordionValue>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mr: '81px',
                                    position: 'relative'
                                  }}
                                >
                                  <AccordionTitle
                                    sx={{
                                      mb: `${expanded ? 44 : 15}px`
                                    }}
                                  >
                                    Title
                                  </AccordionTitle>
                                  {eventIsEditing && expanded === `panel${index}` ? (
                                    <Box>
                                      <AccordionValue
                                        sx={
                                          {
                                            // color: "transparent !important",
                                          }
                                        }
                                      >
                                        {historical.event_title}
                                      </AccordionValue>
                                      <EditEventTextField
                                        sx={{
                                          // width: `${
                                          //   historical.event_title.length + 1
                                          // }ch`,
                                          width: '100px'
                                        }}
                                        // error={Boolean(
                                        //   touched.histoTitle &&
                                        //     errors.histoTitle
                                        // )}
                                        fullWidth
                                        // helperText={
                                        //   touched.histoTitle &&
                                        //   errors.histoTitle
                                        // }
                                        // placeholder={historical.event_title}
                                        name='event_title'
                                        onClick={(e) => e.stopPropagation()}
                                        // onBlur={handleBlur}
                                        onChange={(e) => handleChangeHistoFields(e, index)}
                                        value={historical.event_title}
                                        autoComplete='off'
                                        variant='outlined'
                                      />
                                    </Box>
                                  ) : (
                                    <AccordionValue>{historical.event_title}</AccordionValue>
                                  )}
                                </Box>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mr: '81px'
                                  }}
                                >
                                  <AccordionTitle
                                    sx={{
                                      mb: `${expanded ? 44 : 15}px`
                                    }}
                                  >
                                    Sub Title
                                  </AccordionTitle>
                                  <AccordionValue>{historical.event_subtitle}</AccordionValue>
                                </Box>
                              </StyledAccordionSummary>
                              <AccordionDetails
                                sx={{
                                  pl: '36px',
                                  pt: '16px'
                                }}
                              >
                                {historical.description}
                              </AccordionDetails>
                              {eventIsEditing ? (
                                <SaveChangesButton
                                  variant='contained'
                                  onClick={handleSaveSelectedEvent}
                                >
                                  Save Changes
                                </SaveChangesButton>
                              ) : (
                                <SaveChangesButton
                                  variant='contained'
                                  onClick={handleEditSelectedEvent}
                                >
                                  Edit
                                </SaveChangesButton>
                              )}
                            </StyledAccordion>
                          ))}
                        {/* --------------------------------- ACCORDION END */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            position: 'relative',
                            mt: `${historicalEvents.length > 0 ? '33px' : '0'}`
                          }}
                        >
                          <span ref={scrollRef} />
                          <RowBox
                            sx={{
                              width: '688.31px'
                            }}
                          >
                            <ColumnBox>
                              <Box
                                sx={{
                                  width: '293px',
                                  pl: '13px'
                                }}
                              >
                                <FieldLabel>Historical Event</FieldLabel>
                                <StyledTextField
                                  sx={{
                                    mb: '35px !important'
                                  }}
                                  error={Boolean(touched.histoLong && errors.histoLong)}
                                  fullWidth
                                  helperText={touched.histoLong && errors.histoLong}
                                  placeholder='Longitude'
                                  name='histoLong'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoLong}
                                  variant='outlined'
                                />
                                <StyledTextField
                                  sx={{
                                    mt: 0
                                  }}
                                  error={Boolean(touched.histoLat && errors.histoLat)}
                                  fullWidth
                                  helperText={touched.histoLat && errors.histoLat}
                                  placeholder='Latitude'
                                  name='histoLat'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoLat}
                                  autoComplete='off'
                                  variant='outlined'
                                />
                              </Box>
                              <Box
                                sx={{
                                  width: '293px',
                                  ml: '39px'
                                }}
                              >
                                <FieldLabel>Title</FieldLabel>
                                <StyledTextField
                                  error={Boolean(touched.histoTitle && errors.histoTitle)}
                                  fullWidth
                                  helperText={touched.histoTitle && errors.histoTitle}
                                  placeholder='Historical Item'
                                  name='histoTitle'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoTitle}
                                  autoComplete='off'
                                  variant='outlined'
                                />
                                <FieldLabel>Sub-Title</FieldLabel>
                                <StyledTextField
                                  sx={{
                                    mt: 0
                                  }}
                                  error={Boolean(touched.histoSubTitle && errors.histoSubTitle)}
                                  fullWidth
                                  helperText={touched.histoSubTitle && errors.histoSubTitle}
                                  placeholder='Write something here...'
                                  name='histoSubTitle'
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoSubTitle}
                                  autoComplete='off'
                                  variant='outlined'
                                />
                              </Box>
                            </ColumnBox>
                          </RowBox>

                          <Box
                            sx={{
                              width: '296px',
                              height: '470px',
                              position: 'absolute',
                              right: '0',
                              top: '0'
                            }}
                          >
                            <Scrollbar>
                              <FileDropzoneHistorical
                                accept='image/*'
                                files={historicalFiles}
                                onDrop={handleHistoricalDrop}
                                onRemove={handleHistoricalRemove}
                                onRemoveAll={handleHistoricalRemoveAll}
                              />
                            </Scrollbar>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: '622px',
                            pl: '16px'
                          }}
                        >
                          <FieldLabel>Description</FieldLabel>
                          <StyledMultiTextField
                            error={Boolean(touched.histoDescription && errors.histoDescription)}
                            fullWidth
                            multiline
                            rows={7}
                            helperText={touched.histoDescription && errors.histoDescription}
                            placeholder='Write something here...'
                            name='histoDescription'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.histoDescription}
                            variant='outlined'
                          />
                        </Box>
                      </Scrollbar>
                    </Box>
                  </HistoricalBox>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </Formik>
  );
};

export default RouteEditForm;

const LegendBox = styled(Box)`
  && {
    margin-top: 28.67px;
    padding-left: 27px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-bottom: 45.36px;
  }
`;

const LegendItem = styled(Box)`
  && {
    margin-left: 18px;
    font-family: 'Gilroy Medium';
    font-weight: 400;
    font-size: 13.6592px;
    line-height: 14px;
    color: #000000;
  }
`;

const FlexiBox = styled(Box)`
  && {
    height: 14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const StyledForm = styled.form`
  && {
    && p.Mui-error {
      position: absolute;
      bottom: -15px;
    }
  }
`;

const FieldLabel = styled(Box)`
  && {
    font-family: 'Gilroy SemiBold';
    font-size: 16px;
    line-height: 18px;
    color: #22333b;
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  && {
    color: #2995a8;
  }
`;

const RowBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-top: 6px;
    margin-bottom: 20px;
    background: #ffffff;
    color: #22333b;
    font-family: 'Gilroy Medium';
    font-size: 1.11rem;
    line-height: 27px;
    border-radius: 22.1951px;
    && .Mui-focused fieldset {
      height: 67px;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
    }
    && input {
      height: 67px;
      padding: 20px 33px 20px 33px;
      font-family: 'Gilroy Medium';
      font-size: 1.11rem;
      line-height: 27px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: 'Gilroy Medium';
        font-size: 1.11rem;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      height: 67px;
      margin-top: 2px;
      border-style: hidden;
      border-radius: 22.1951px;
      /* border: 0; */
    }
  }
`;

const StyledMultiTextField = styled(TextField)`
  && {
    margin-top: 6px;
    background: #ffffff;
    color: #22333b;
    font-family: 'Gilroy Medium';
    font-size: 1.11rem;
    line-height: 27px;
    border-radius: 22.1951px;
    && .MuiInputBase-multiline {
      padding: 0;
    }
    && .Mui-focused fieldset {
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
      border-radius: 22.1951px;
    }
    && textarea {
      padding: 20px 13px 12px 33px;
      font-family: 'Gilroy Medium';
      font-size: 1.11rem;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: 'Gilroy Medium';
        font-size: 1.11rem;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      margin-top: 2px;
      border-style: hidden;
      border-radius: 22.1951px;
      /* border: 0; */
    }
  }
`;

// ---------------------------------HISTORICAL EVENTS
const HistoricalBox = styled(Box)`
  && {
    margin-top: 46px;
  }
`;

const Title = styled(Box)`
  && {
    margin-left: 128px;
    margin-bottom: 21px;
    font-family: 'Circular Std Bold';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 38px;
    letter-spacing: -0.04em;
    color: #000000;
  }
`;

const ToolbarBox = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 3px solid #d4e0f1;
    position: relative;
    margin-bottom: 44px;
  }
`;

const OrangeBorder = styled(Box)`
  && {
    width: 298px;
    border-bottom: 7px solid #e4572e;
    position: absolute;
    bottom: -4px;
    left: 42px;
  }
`;

const ColumnBox = styled(Box)`
  && {
    width: 688.31px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const AddHistoricalButton = styled(Button)`
  && {
    background-color: #0e5753;
    border-radius: 13.6667px;
    padding: 10px 16.21px 11px 22px;
    font-family: 'Gilroy SemiBold';
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`;

const StyledAccordion = styled(Accordion)`
  && {
    background-color: #f7f7f7;
    padding: 16px auto 22px auto;
    margin: auto 20px 23px 11px;
    border: 1px solid #d8d8d8;
    border-radius: 7px;
    box-sizing: border-box;
    box-shadow: none;
    & .Mui-expanded {
      margin: 12px 0 0 0 0;
    }
    &:before {
      background-color: transparent;
    }
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  && {
    &.Mui-focusVisible {
      background-color: transparent;
    }
  }
`;

const AccordionTitle = styled(Box)`
  && {
    font-family: 'Gilroy Regular';
    font-size: 16px;
    line-height: 18px;
    color: #22333b;
  }
`;

const AccordionValue = styled(Box)`
  && {
    font-family: 'Gilroy Semibold';
    font-weight: 400;
    font-size: 20px;
    line-height: 18px;
    color: #22333b;
  }
`;

const EditEventTextField = styled(TextField)`
  && {
    /* margin-top: 6px;
    margin-bottom: 20px; */
    height: 40px;
    position: absolute;
    top: 51px;
    left: -15px;
    background: #ffffff;
    font-family: 'Gilroy Semibold';
    font-weight: 400;
    font-size: 20px;
    line-height: 18px;
    color: #22333b;
    border-radius: 10px;
    && .Mui-focused fieldset {
      height: 40px !important;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
      border-radius: 10px;
    }
    && input {
      height: 40px !important;
      padding: 10px 14px 10px 13px;
      font-family: 'Gilroy Semibold';
      font-weight: 400;
      font-size: 20px;
      line-height: 18px;
      color: #22333b;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 10px;
      &::placeholder {
        font-family: 'Gilroy Semibold';
        font-weight: 400;
        font-size: 20px;
        line-height: 18px;
        color: #22333b;
        display: flex;
        align-items: center;
        opacity: 1;
      }
    }
    && fieldset {
      height: 40px !important;
      margin-top: 3px;
      border-style: hidden;
      border-radius: 10px;
      /* border: 0; */
    }
  }
`;

// const HistoricalMultiField = styled(TextField)`
//   && {
//     background: #ffffff;
//     color: #22333b;
//     font-family: "Gilroy Medium";
//     font-size: 17.7561px;
//     line-height: 27px;
//     border-radius: 10px;
//     && .MuiInputBase-multiline {
//       padding: 0;
//     }
//     && .Mui-focused fieldset {
//       border-width: 1px !important;
//       border-color: rgba(255, 177, 78, 1);
//       border-style: solid;
//       border-radius: 10px;
//     }
//     && textarea {
//       padding: 16px 7px 20px 16px;
//       font-family: "Gilroy Medium";
//       font-size: 17.7561px;
//       line-height: 27px;
//       color: rgba(0, 0, 0, 0.4);
//       display: flex;
//       align-items: center;
//       border: 1px solid #f3f3f3;
//       border-radius: 10px;
//       &::placeholder {
//         font-family: "Gilroy Medium";
//         font-size: 17.7561px;
//         line-height: 27px;
//         color: #000000;
//         opacity: 0.4;
//         display: flex;
//         align-items: center;
//       }
//     }
//     && fieldset {
//       border-style: hidden;
//       border-radius: 10px;
//       /* border: 0; */
//     }
//   }
// `;

const SaveChangesButton = styled(Button)`
  && {
    background: #0e5753;
    border-radius: 13.6667px;
    padding: 10px 16.21px 11px 22px;
    margin-top: 13px;
    margin-bottom: 32px;
    display: flex;
    margin-left: auto;
    margin-right: 24px;
    font-family: 'Gilroy SemiBold';
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
`;

const SaveButton = styled(Button)`
  && {
    height: 60px;
    width: 303px;
    padding: 20px auto 20px;
    background-image: url('/static/route-list/save-btn.png');
    background-color: #00755e;
    border-radius: 10px;
    font-family: 'Gilroy Bold';
    font-size: 1rem;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }
`;
