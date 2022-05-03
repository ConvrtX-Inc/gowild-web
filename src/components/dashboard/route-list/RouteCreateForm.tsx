import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import type { FC } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import Scrollbar from "../../Scrollbar";
import Map from "./Map";
import FileDropzone from "../../FileDropzone";
import FileDropzoneHistorical from "../../FileDropzoneHistorical";
import StartingPtIcon from "../../../icons/LocationStartingPt";
import FinishingPtIcon from "../../../icons/LocationFinishingPt";
import HistoricalEventIcon from "../../../icons/LocationHistoricalEvent";
import AddHistoricalIcon from "../../../icons/RouteListAddHistorical";
import ExpandMoreIcon from "../../../icons/ExpandAccordion";
import { setRouteListIsLoading } from "../../../slices/route-list";
import { useDispatch } from "../../../store";

const RouteCreateForm: FC = (props) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [b64files, setB64files] = useState<any>("");
  const [files, setFiles] = useState<any[]>([]);
  const [b64historicalFiles, setB64historicalFiles] = useState<any>("");
  const [historicalFiles, setHistoricalFiles] = useState<any[]>([]);
  const [routeId, setRouteId] = useState<string>("");
  const [historicalEvents, setHistoricalEvents] = useState([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLSpanElement>();
  const scrollToEvents = useRef<HTMLSpanElement>();

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);

  const scrollToHistoricalEvents = () => {
    scrollToEvents.current.scrollIntoView();
  };

  const scrollToHistoricalForm = () => {
    scrollRef.current.scrollIntoView();
  };

  const handleDrop = (newFiles: any): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const file = newFiles.find((f) => f);
    console.log(file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("OBJ SRC & DATA ", {
        src: file.preview,
        data: reader.result,
      });
      setB64files(reader.result);
    };
  };

  if (files.length > 0) {
    console.log("Base 64 ", b64files);
  }

  const handleRemove = (file): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

  const handleHistoricalDrop = (newFiles: any): void => {
    setHistoricalFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const file = newFiles.find((f) => f);
    console.log("Historical Img Drop ", file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("OBJ SRC & DATA ", {
        src: file.preview,
        data: reader.result,
      });
      setB64historicalFiles(reader.result);
    };
  };

  const handleHistoricalRemove = (file): void => {
    setHistoricalFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleHistoricalRemoveAll = (): void => {
    setHistoricalFiles([]);
  };

  const uploadImgToFirebase = async (file) => {
    if (!file) return console.log("No Image File Attached");
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `web/storageTest/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      //on(next, error, complete)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => {
          console.log("FIREBASE ERROR: ", err);
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url));
        }
      );
    });
  };

  const handleAddHistorical = async (
    histoLong,
    histoLat,
    histoTitle,
    histoSubTitle,
    histoDescription
  ) => {
    console.log("SHOW CURRENT route_id: ", routeId);
    const accessToken = sessionStorage.getItem("token");
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route-clues`;
    const DATA = {
      route_id: routeId,
      location_point_long: 32.4832,
      location_point_lat: 32.4832,
      clue_point_long: histoLong,
      clue_point_lat: histoLat,
      clue_title: histoTitle,
      description: histoDescription,
      clue_img: {
        type: "Buffer",
        data: [b64historicalFiles],
      },
      video_url: "video",
      ar_clue: "augmented reality",
    };
    const CONFIG = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const apiResponse = await axios.post(URL, DATA, CONFIG);
    console.log("Add Historical Event response: ", apiResponse);
    getHistoricalEvents();
    scrollToHistoricalEvents();
    setHistoricalFiles([]);
    setB64historicalFiles("");
  };

  const getHistoricalEvents = useCallback(async () => {
    console.log("Get Historical Events by ID loaded: ", routeId);
    const accessToken = sessionStorage.getItem("token");
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route-clues/all-clues/${routeId}`;
    const CONFIG = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const apiResponse = await axios.get(URL, CONFIG);
    console.log("GET Historical Events", apiResponse.data);
    setHistoricalEvents(apiResponse.data);
  }, [routeId]);

  useEffect(() => {
    if (routeId) {
      getHistoricalEvents();
    }
  }, [routeId, getHistoricalEvents]);

  return (
    <Formik
      initialValues={{
        images: [],
        startPtLong: "",
        startPtLat: "",
        endPtLong: "",
        endPtLat: "",
        raceTitle: "",
        description: "",
        histoLong: "",
        histoLat: "",
        histoTitle: "",
        histoSubTitle: "",
        histoDescription: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        images: Yup.array(),
        startPtLong: Yup.number().max(80).required(),
        startPtLat: Yup.number().max(80).required(),
        endPtLong: Yup.number().max(80).required(),
        endPtLat: Yup.number().max(80).required(),
        raceTitle: Yup.string().max(80).required(),
        description: Yup.string().max(255).required(),
        histoLong: Yup.number().max(80),
        histoLat: Yup.number().max(80),
        histoTitle: Yup.string().max(80),
        histoSubTitle: Yup.string().max(80),
        histoDescription: Yup.string().max(80),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ): Promise<void> => {
        try {
          //Note: Upload Img to Firebase
          console.log("ON SUBMIT IMAGE", files[0]);
          const firebaseImgUrl = await uploadImgToFirebase(files[0]);
          console.log("FIREBASE IMG URL: ", firebaseImgUrl);

          // NOTE: Make API request
          const accessToken = sessionStorage.getItem("token");
          const userId = sessionStorage.getItem("user_id");
          const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/route`;
          const DATA = {
            user_id: userId,
            route_name: values.raceTitle,
            route_photo: b64files,
            start_point_long: values.startPtLong,
            start_point_lat: values.startPtLat,
            stop_point_long: values.endPtLong,
            stop_point_lat: values.endPtLat,
            img_url: firebaseImgUrl,
            description: values.description,
          };
          const CONFIG = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const apiResponse = await axios.post(URL, DATA, CONFIG);
          console.log("ONSUBMIT API RESPONSE: ", apiResponse);
          setRouteId(apiResponse.data.id);

          setStatus({ success: true });

          //Make the RouteList Table Reload
          dispatch(setRouteListIsLoading(true));

          //Clear Form and Current States
          resetForm();
          setFiles([]);
          setHistoricalFiles([]);
          setB64files("");
          setSubmitting(false);
          toast.success("Route created!");
        } catch (err) {
          console.error(err);
          if (err.response.status === 413) {
            err.message = `Image ${err.response.statusText} (${err.response.status})`;
          }
          if (err.response.status === 500) {
            err.message = `${err.response.statusText} (${err.response.status})`;
          }

          toast.error("Something went wrong!");
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
        setFieldError,
        setFieldTouched,
        touched,
        values,
      }): JSX.Element => (
        <StyledForm onSubmit={handleSubmit} {...props}>
          <Grid container spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <Card>
                <CardContent>
                  <RowBox>
                    <Box sx={{ width: "293px", mr: "18px" }}>
                      <LegendBox>
                        <FlexiBox sx={{ mb: "17px" }}>
                          <StartingPtIcon fontSize="small" />
                          <LegendItem>Starting Point</LegendItem>
                        </FlexiBox>
                        <FlexiBox sx={{ mb: "17px" }}>
                          <FinishingPtIcon fontSize="small" />
                          <LegendItem>Finishing Point</LegendItem>
                        </FlexiBox>
                        <FlexiBox>
                          <HistoricalEventIcon fontSize="small" />
                          <LegendItem>Historical Event</LegendItem>
                        </FlexiBox>
                      </LegendBox>
                      <FieldLabel>Starting Point</FieldLabel>
                      <StyledTextField
                        autoComplete="off"
                        error={Boolean(
                          touched.startPtLong && errors.startPtLong
                        )}
                        fullWidth
                        helperText={touched.startPtLong && errors.startPtLong}
                        placeholder="Longitude"
                        name="startPtLong"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startPtLong}
                        variant="outlined"
                      />
                      <StyledTextField
                        autoComplete="off"
                        sx={{ mt: "0 !important" }}
                        error={Boolean(touched.startPtLat && errors.startPtLat)}
                        fullWidth
                        helperText={touched.startPtLat && errors.startPtLat}
                        placeholder="Latitude"
                        name="startPtLat"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          console.log("Text Field Value", values.startPtLat);
                        }}
                        value={values.startPtLat}
                        variant="outlined"
                      />
                      <FieldLabel>End Point</FieldLabel>
                      <StyledTextField
                        autoComplete="off"
                        error={Boolean(touched.endPtLong && errors.endPtLong)}
                        fullWidth
                        helperText={touched.endPtLong && errors.endPtLong}
                        placeholder="Longitude"
                        name="endPtLong"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endPtLong}
                        variant="outlined"
                      />
                      <StyledTextField
                        autoComplete="off"
                        sx={{ mt: "0 !important" }}
                        error={Boolean(touched.endPtLat && errors.endPtLat)}
                        fullWidth
                        helperText={touched.endPtLat && errors.endPtLat}
                        placeholder="Latitude"
                        name="endPtLat"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.endPtLat}
                        variant="outlined"
                      />
                      <Box sx={{ width: "289px", height: "89.98px" }}>
                        <FileDropzone
                          accept={["image/png", ".jpg", "image/gif"]}
                          maxFiles={1}
                          files={files}
                          onDrop={handleDrop}
                          onRemove={handleRemove}
                          onRemoveAll={handleRemoveAll}
                        />
                      </Box>
                      <FieldLabel>Title</FieldLabel>
                      <StyledTextField
                        autoComplete="off"
                        error={Boolean(touched.raceTitle && errors.raceTitle)}
                        fullWidth
                        helperText={touched.raceTitle && errors.raceTitle}
                        placeholder="My race title"
                        name="raceTitle"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.raceTitle}
                        variant="outlined"
                      />
                      <FieldLabel>Description</FieldLabel>
                      <StyledMultiTextField
                        autoComplete="off"
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        fullWidth
                        multiline
                        rows={4}
                        helperText={touched.description && errors.description}
                        placeholder="Write something here..."
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: "16px",
                        }}
                      >
                        <SaveButton
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
                            "Save"
                          )}
                        </SaveButton>
                      </Box>
                      {errors.submit && (
                        <Box sx={{ mt: 3, position: "relative" }}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        height: "982px",
                        width: "100%",
                        borderRadius: "20px",
                      }}
                    >
                      <Map
                        startPt={(lat, long) => {
                          console.log("StartPt props", lat, long);
                          setFieldValue("startPtLat", lat.toFixed(4));
                          setFieldValue("startPtLong", long.toFixed(4));
                        }}
                        endPt={(lat, long) => {
                          console.log("EndPt props", lat, long);
                          setFieldValue("endPtLat", lat.toFixed(4));
                          setFieldValue("endPtLong", long.toFixed(4));
                        }}
                        historicalEventPt={(lat, long) => {
                          console.log("Event Pt props", lat, long);
                          setFieldValue("histoLat", lat.toFixed(4));
                          setFieldValue("histoLong", long.toFixed(4));
                        }}
                      />
                    </Box>
                  </RowBox>
                  {/* -----------------------------HISTORICAL------------------------------------- */}

                  <HistoricalBox>
                    <ToolbarBox>
                      <Title sx={{ cursor: "pointer" }}>Historical</Title>
                      <OrangeBorder></OrangeBorder>
                      <Box
                        sx={{ ml: "auto" }}
                        onClick={scrollToHistoricalEvents}
                      >
                        <Button
                          sx={{ color: "#0E5753", borderColor: "#0E5753" }}
                          variant="outlined"
                        >
                          🔺 Scroll to Events
                        </Button>
                      </Box>
                      <Box sx={{ ml: "20px" }} onClick={scrollToHistoricalForm}>
                        <Button
                          sx={{ color: "#0E5753", borderColor: "#0E5753" }}
                          variant="outlined"
                        >
                          🔻 Scroll to Form
                        </Button>
                      </Box>
                      <Box sx={{ ml: "auto", mb: "20px" }}>
                        <AddHistoricalButton
                          sx={{
                            opacity: `${
                              values.histoLong &&
                              values.histoLat &&
                              values.histoTitle &&
                              values.histoSubTitle &&
                              values.histoDescription
                                ? 1
                                : "0.2"
                            }`,
                          }}
                          disabled={
                            values.histoLong &&
                            values.histoLat &&
                            values.histoTitle &&
                            values.histoSubTitle &&
                            values.histoDescription
                              ? false
                              : true
                          }
                          variant="contained"
                          onClick={() => {
                            if (
                              !values.histoLong ||
                              !values.histoLat ||
                              !values.histoTitle ||
                              !values.histoSubTitle ||
                              !values.histoDescription
                            ) {
                              console.log("No values added");
                            } else {
                              handleAddHistorical(
                                values.histoLong,
                                values.histoLat,
                                values.histoTitle,
                                values.histoSubTitle,
                                values.histoDescription
                              );
                            }

                            setFieldValue("histoLong", "");
                            setFieldValue("histoLat", "");
                            setFieldValue("histoTitle", "");
                            setFieldValue("histoSubTitle", "");
                            setFieldValue("histoDescription", "");
                          }}
                        >
                          <Box sx={{ mr: "3px" }}>
                            <AddHistoricalIcon fontSize="small" />
                          </Box>
                          Add Historical
                        </AddHistoricalButton>
                      </Box>
                    </ToolbarBox>
                    <Box sx={{ height: "457px" }}>
                      <Scrollbar>
                        {/* ---------------------------------------------------------------- ACCORDION */}
                        <span ref={scrollToEvents} />
                        {historicalEvents.length > 0 &&
                          historicalEvents.map((historical, index) => (
                            <StyledAccordion square={true} key={index}>
                              <AccordionSummary
                                sx={{ pl: "36px" }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    mr: "81px",
                                  }}
                                >
                                  <AccordionTitle sx={{ mb: "15px" }}>
                                    Historical Event
                                  </AccordionTitle>
                                  <Box sx={{ display: "flex" }}>
                                    <AccordionValue sx={{ mr: "23px" }}>
                                      {`${historical.clue_point_long}°`}
                                    </AccordionValue>
                                    <AccordionValue>
                                      {`${historical.clue_point_lat}°`}
                                    </AccordionValue>
                                  </Box>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    mr: "81px",
                                  }}
                                >
                                  <AccordionTitle sx={{ mb: "15px" }}>
                                    Title
                                  </AccordionTitle>
                                  <AccordionValue>
                                    {historical.clue_title}
                                  </AccordionValue>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    mr: "81px",
                                  }}
                                >
                                  <AccordionTitle sx={{ mb: "15px" }}>
                                    Sub Title
                                  </AccordionTitle>
                                  <AccordionValue>{`Dolor Lorem Elit`}</AccordionValue>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails sx={{ pl: "36px", pt: "16px" }}>
                                <HistoricalMultiField
                                  autoComplete="off"
                                  error={Boolean(
                                    touched.description && errors.description
                                  )}
                                  fullWidth
                                  multiline
                                  rows={2}
                                  helperText={
                                    touched.description && errors.description
                                  }
                                  placeholder="Write something here.."
                                  name="description"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={historical.description}
                                  variant="outlined"
                                />
                              </AccordionDetails>
                              <SaveChangesButton variant="contained">
                                Save Changes
                              </SaveChangesButton>
                            </StyledAccordion>
                          ))}
                        {/* ----------------------------------------------------------------------- ACCORDION END */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            position: "relative",
                            mt: "33px",
                          }}
                        >
                          <span ref={scrollRef} />
                          <RowBox sx={{ width: "688.31px" }}>
                            <ColumnBox>
                              <Box sx={{ width: "293px", pl: "13px" }}>
                                <FieldLabel>Historical Event</FieldLabel>
                                <StyledTextField
                                  sx={{ mb: "35px !important" }}
                                  error={Boolean(
                                    touched.histoLong && errors.histoLong
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.histoLong && errors.histoLong
                                  }
                                  placeholder="Longitude"
                                  name="histoLong"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoLong}
                                  variant="outlined"
                                />
                                <StyledTextField
                                  sx={{ mt: 0 }}
                                  error={Boolean(
                                    touched.histoLat && errors.histoLat
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.histoLat && errors.histoLat
                                  }
                                  placeholder="Latitude"
                                  name="histoLat"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoLat}
                                  variant="outlined"
                                />
                              </Box>
                              <Box sx={{ width: "293px", ml: "39px" }}>
                                <FieldLabel>Title</FieldLabel>
                                <StyledTextField
                                  error={Boolean(
                                    touched.histoTitle && errors.histoTitle
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.histoTitle && errors.histoTitle
                                  }
                                  placeholder="Historical Item"
                                  name="histoTitle"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoTitle}
                                  variant="outlined"
                                />
                                <FieldLabel>Sub-Title</FieldLabel>
                                <StyledTextField
                                  sx={{ mt: 0 }}
                                  error={Boolean(
                                    touched.histoSubTitle &&
                                      errors.histoSubTitle
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.histoSubTitle &&
                                    errors.histoSubTitle
                                  }
                                  placeholder="Write something here..."
                                  name="histoSubTitle"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.histoSubTitle}
                                  variant="outlined"
                                />
                              </Box>
                            </ColumnBox>
                          </RowBox>

                          <Box
                            sx={{
                              width: "296px",
                              height: "470px",
                              position: "absolute",
                              right: "0",
                              top: "0",
                            }}
                          >
                            <Scrollbar>
                              <FileDropzoneHistorical
                                accept="image/*"
                                files={historicalFiles}
                                onDrop={handleHistoricalDrop}
                                onRemove={handleHistoricalRemove}
                                onRemoveAll={handleHistoricalRemoveAll}
                              />
                            </Scrollbar>
                          </Box>
                        </Box>
                        <Box sx={{ width: "622px", pl: "16px" }}>
                          <FieldLabel>Description</FieldLabel>
                          <StyledMultiTextField
                            error={Boolean(
                              touched.histoDescription &&
                                errors.histoDescription
                            )}
                            fullWidth
                            multiline
                            rows={7}
                            helperText={
                              touched.histoDescription &&
                              errors.histoDescription
                            }
                            placeholder="Write something here..."
                            name="histoDescription"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.histoDescription}
                            variant="outlined"
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

export default RouteCreateForm;

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
    font-family: "Gilroy Medium";
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
    font-family: "Gilroy SemiBold";
    font-size: 16px;
    line-height: 18px;
    color: #22333b;
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
    font-family: "Gilroy Medium";
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
      font-family: "Gilroy Medium";
      font-size: 1.11rem;
      line-height: 27px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: "Gilroy Medium";
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
    font-family: "Gilroy Medium";
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
      font-family: "Gilroy Medium";
      font-size: 1.11rem;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: "Gilroy Medium";
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

//---------------------------------HISTORICAL EVENTS
const HistoricalBox = styled(Box)`
  && {
    margin-top: 46px;
  }
`;

const Title = styled(Box)`
  && {
    margin-left: 128px;
    margin-bottom: 21px;
    font-family: "Circular Std Bold";
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
    font-family: "Gilroy SemiBold";
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

const AccordionTitle = styled(Box)`
  && {
    font-family: "Gilroy Regular";
    font-size: 16px;
    line-height: 18px;
    color: #22333b;
  }
`;

const AccordionValue = styled(Box)`
  && {
    font-family: "Gilroy Semibold";
    font-weight: 400;
    font-size: 20px;
    line-height: 18px;
    color: #22333b;
  }
`;

const HistoricalMultiField = styled(TextField)`
  && {
    background: #ffffff;
    color: #22333b;
    font-family: "Gilroy Medium";
    font-size: 17.7561px;
    line-height: 27px;
    border-radius: 10px;
    && .MuiInputBase-multiline {
      padding: 0;
    }
    && .Mui-focused fieldset {
      border-width: 1px !important;
      border-color: rgba(255, 177, 78, 1);
      border-style: solid;
      border-radius: 10px;
    }
    && textarea {
      padding: 16px 7px 20px 16px;
      font-family: "Gilroy Medium";
      font-size: 17.7561px;
      line-height: 27px;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      border: 1px solid #f3f3f3;
      border-radius: 10px;
      &::placeholder {
        font-family: "Gilroy Medium";
        font-size: 17.7561px;
        line-height: 27px;
        color: #000000;
        opacity: 0.4;
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      border-style: hidden;
      border-radius: 10px;
      /* border: 0; */
    }
  }
`;

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
    font-family: "Gilroy SemiBold";
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
    background-image: url("/static/route-list/save-btn.png");
    background-color: #00755e;
    border-radius: 10px;
    font-family: "Gilroy Bold";
    font-size: 1rem;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
  }
`;
