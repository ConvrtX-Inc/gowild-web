import * as Yup from 'yup';
import { useAuth } from '../../../../lib/hooks/use-auth';
import ExpandMoreIcon from '../../../icons/ExpandAccordion';
import FinishingPtIcon from '../../../icons/LocationFinishingPt';
import HistoricalEventIcon from '../../../icons/LocationHistoricalEvent';
import StartingPtIcon from '../../../icons/LocationStartingPt';
import Scrollbar from '../../Scrollbar';
import RouteViewMap from './RouteViewMap';
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
  Grid
} from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import type { FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from 'src/utils/formik.utils';
import { getLogger } from 'src/utils/loggin';
import styled from 'styled-components';

const logger = getLogger('RouteViewForm');

const RouteViewForm: FC<any> = (props) => {
  const { token } = useAuth();
  const { singleRoute } = props;
  const [historicalEvents, setHistoricalEvents] = useState([]);
  const [loadGmapAfterGetEvents, setLoadGmapAfterGetEvents] = useState(false);
  const scrollToEvents = useRef<HTMLSpanElement>();
  const scrollRef = useRef<HTMLSpanElement>();

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);

  const scrollToHistoricalEvents = () => {
    scrollToEvents.current.scrollIntoView();
  };

  const getHistoricalEvents = useCallback(async () => {
    // logger.debug(
    //   `(View-Form) Getting Historical Events of Route-ID#${singleRoute.id}...: `
    // );
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route-historical-events?filter=route_id||$eq||${singleRoute.id}`;
    const CONFIG = {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    };
    setLoadGmapAfterGetEvents(false);
    const apiResponse = await axios.get(URL, CONFIG);
    // logger.debug(
    //   "(View-Form) Historical Events Api Response: ",
    //   apiResponse.data.data
    // );
    setHistoricalEvents(apiResponse.data.data);
    setLoadGmapAfterGetEvents(true);
  }, [singleRoute.id]);

  useEffect(() => {
    if (singleRoute.id) {
      getHistoricalEvents();
    }
  }, [singleRoute.id, getHistoricalEvents]);

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
        startPtLong: Yup.number().max(80).required('This field is required'),
        startPtLat: Yup.number().max(80).required('This field is required'),
        endPtLong: Yup.number().max(80).required('This field is required'),
        endPtLat: Yup.number().max(80).required('This field is required'),
        raceTitle: Yup.string().max(80).required('This field is required'),
        description: Yup.string().max(255).required('This field is required'),
        histoLong: Yup.number().max(80),
        histoLat: Yup.number().max(80),
        histoTitle: Yup.string().max(80),
        histoSubTitle: Yup.string().max(80),
        histoDescription: Yup.string().max(80)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
        try {
          logger.info(`Values: ${values}`);
          // Note: Upload Img to API service
          // REDUNDANT
          // NOTE: Make API request
          // REDUNDANT
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
      {({ errors, handleSubmit, values }): JSX.Element => (
        <StyledForm onSubmit={handleSubmit} {...props}>
          <span ref={scrollRef} />
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
                      <Box sx={{ mt: '26px' }}>
                        <SubLabel sx={{ mb: '6px' }}>Longitude</SubLabel>
                        <ViewField>
                          {values.startPtLong ? (
                            `${values.startPtLong}°`
                          ) : (
                            <StyledCircularProgress size={17.7561} />
                          )}
                        </ViewField>
                      </Box>
                      <Box sx={{ mt: '20px', mb: '20px' }}>
                        <SubLabel sx={{ mb: '6px' }}>Latitude</SubLabel>
                        <ViewField>
                          {values.startPtLat ? (
                            `${values.startPtLat}°`
                          ) : (
                            <CircularProgress size={17.7561} />
                          )}
                        </ViewField>
                      </Box>
                      <FieldLabel>End Point</FieldLabel>
                      <Box sx={{ mt: '26px' }}>
                        <SubLabel sx={{ mb: '6px' }}>Longitude</SubLabel>
                        <ViewField>
                          {values.endPtLong ? (
                            `${values.endPtLong}°`
                          ) : (
                            <CircularProgress size={17.7561} />
                          )}
                        </ViewField>
                      </Box>
                      <Box sx={{ mt: '20px', mb: '20px' }}>
                        <SubLabel sx={{ mb: '6px' }}>Latitude</SubLabel>
                        <ViewField>
                          {values.endPtLat ? (
                            `${values.endPtLat}°`
                          ) : (
                            <CircularProgress size={17.7561} />
                          )}
                        </ViewField>
                      </Box>
                      <Box
                        sx={{
                          width: '289px',
                          height: '89.98px'
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            mb: '20px'
                          }}
                        >
                          {singleRoute.img_url ? (
                            <img
                              height='90px'
                              width='90px'
                              src={singleRoute.img_url}
                              alt='route-img'
                            />
                          ) : (
                            <StyledCircularProgress
                              size={17.7561}
                              sx={{
                                opacity: '0.4'
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <FieldLabel sx={{ mt: '14px' }}>Title</FieldLabel>
                      <ViewField sx={{ mt: '26px', mb: '40px' }}>
                        {values.raceTitle ? values.raceTitle : <CircularProgress size={17.7561} />}
                      </ViewField>
                      <FieldLabel>Description</FieldLabel>
                      <ViewField
                        sx={{
                          height: '100px',
                          mt: '26px',
                          pr: '70px'
                        }}
                      >
                        <Scrollbar>
                          {values.description ? (
                            <Box>{values.description}</Box>
                          ) : (
                            <CircularProgress size={17.7561} />
                          )}
                        </Scrollbar>
                      </ViewField>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mt: '16px'
                        }}
                      >
                        {/* <SaveButton
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                        >
                          {isSubmitting ? (
                            <>
                              <CircularProgress
                                sx={{
                                  color: "#FBF1DA",
                                  position: "absolute",
                                  right: "60px",
                                }}
                              />
                              {progress === 100
                                ? "Saving"
                                : `Uploading image ${progress}%   `}
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </SaveButton> */}
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
                        <RouteViewMap
                          loadRouteMarkers={singleRoute}
                          loadEventMarkers={historicalEvents}
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
                  {/* -----------------------------HISTORICAL------------------- */}

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
                          🔺 Scroll Up
                        </Button>
                      </Box>
                    </ToolbarBox>
                    <Box sx={{ height: '457px' }}>
                      <Scrollbar>
                        {/* ---------------------------- ACCORDION */}
                        <span ref={scrollToEvents} />
                        {historicalEvents.length > 0 ? (
                          historicalEvents.map((historical) => (
                            <StyledAccordion square key={historical.id}>
                              <AccordionSummary
                                sx={{
                                  pl: '36px'
                                }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
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
                                      mb: '15px'
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
                                    mr: '81px'
                                  }}
                                >
                                  <AccordionTitle
                                    sx={{
                                      mb: '15px'
                                    }}
                                  >
                                    Title
                                  </AccordionTitle>
                                  <AccordionValue>{historical.event_title}</AccordionValue>
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
                                      mb: '15px'
                                    }}
                                  >
                                    Sub Title
                                  </AccordionTitle>
                                  <AccordionValue>{historical.event_subtitle}</AccordionValue>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails
                                sx={{
                                  pl: '36px',
                                  pt: '16px'
                                }}
                              >
                                {historical.description}
                              </AccordionDetails>
                            </StyledAccordion>
                          ))
                        ) : loadGmapAfterGetEvents ? (
                          'No Historical Events'
                        ) : (
                          <StyledCircularProgress sx={{ opacity: '0.4' }} size={17.7561} />
                        )}
                        {/* ----------------------------------- ACCORDION END */}
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

export default RouteViewForm;

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

const SubLabel = styled(Box)`
  && {
    font-family: 'Gilroy Medium';
    font-style: normal;
    font-weight: 400;
    font-size: 17.7561px;
    line-height: 27px;
    color: #000000;
    opacity: 0.4;
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

const ViewField = styled(Box)`
  && {
    font-family: 'Gilroy Semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 17.7561px;
    line-height: 27px;
    color: #000000;
    opacity: 0.4;
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