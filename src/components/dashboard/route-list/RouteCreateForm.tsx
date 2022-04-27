import { useState } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import FileDropzone from "../../FileDropzone";
import StartingPtIcon from "../../../icons/LocationStartingPt";
import FinishingPtIcon from "../../../icons/LocationFinishingPt";
import HistoricalEventIcon from "../../../icons/LocationHistoricalEvent";

const RouteCreateForm: FC = (props) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);

  const handleDrop = (newFiles: any): void => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = (): void => {
    setFiles([]);
  };

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
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        images: Yup.array(),
        startPtLong: Yup.string().max(80).required(),
        startPtLat: Yup.string().max(80).required(),
        endPtLong: Yup.string().max(80).required(),
        endPtLat: Yup.string().max(80).required(),
        raceTitle: Yup.string().max(80).required(),
        description: Yup.string().max(80).required(),
        histoLong: Yup.number().min(0),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting }
      ): Promise<void> => {
        try {
          // NOTE: Make API request
          setStatus({ success: true });
          setSubmitting(false);
          toast.success("Route created!");
          navigate("/dashboard/route-list");
        } catch (err) {
          console.error(err);
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
                        sx={{ mt: "0 !important" }}
                        error={Boolean(touched.startPtLat && errors.startPtLat)}
                        fullWidth
                        helperText={touched.startPtLat && errors.startPtLat}
                        placeholder="Latitude"
                        name="startPtLat"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.startPtLat}
                        variant="outlined"
                      />
                      <FieldLabel>End Point</FieldLabel>
                      <StyledTextField
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
                      <FileDropzone
                        accept="image/*"
                        files={files}
                        onDrop={handleDrop}
                        onRemove={handleRemove}
                        onRemoveAll={handleRemoveAll}
                      />
                      <FieldLabel>Title</FieldLabel>
                      <StyledTextField
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
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        fullWidth
                        multiline
                        rows={7}
                        helperText={touched.description && errors.description}
                        placeholder="Write something here..."
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ height: "982px" }}>
                      <img
                        src="/static/route-list/sample-map.png"
                        alt="sample-map"
                      />
                    </Box>
                  </RowBox>
                </CardContent>
              </Card>
              <Box sx={{ mt: 3 }}>
                <Card>
                  <CardHeader title="Historical" />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item lg={12} md={6} xs={12}>
                        <TextField
                          error={Boolean(touched.histoLong && errors.histoLong)}
                          fullWidth
                          helperText={touched.histoLong && errors.histoLong}
                          label="Longitude"
                          name="histoLong"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.histoLong}
                          variant="outlined"
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 3,
                          }}
                        >
                          <Button
                            color="primary"
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                          >
                            Save
                          </Button>
                        </Box>
                        {errors.submit && (
                          <Box sx={{ mt: 3 }}>
                            <FormHelperText error>
                              {errors.submit}
                            </FormHelperText>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
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
    font-family: "Gilroy";
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
      bottom: -20px;
    }
  }
`;

const FieldLabel = styled(Box)`
  && {
    font-family: "Gilroy Semibold";
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    text-transform: capitalize;
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
    font-family: "Gilroy-Medium";
    font-size: 18px;
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
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: "Gilroy Semibold";
        font-weight: 500;
        font-size: 17.7561px;
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
    font-family: "Gilroy-Medium";
    font-size: 16px;
    line-height: 24px;
    border-radius: 22.1951px;
    && .MuiInputBase-multiline {
      padding: 0;
    }
    && .Mui-focused fieldset {
      height: 100%;
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
      border-radius: 22.1951px;
    }
    && textarea {
      padding: 20px 13px 19px 33px;
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      border: 2px solid #f3f3f3;
      border-radius: 22.1951px;
      &::placeholder {
        font-family: "Gilroy Semibold";
        font-weight: 500;
        font-size: 17.7561px;
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
