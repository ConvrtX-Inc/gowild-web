import { Box, Grid } from "@material-ui/core";
import { Formik } from "formik";
import { FC, useState } from "react";
import {
  DashboardButton,
  StyledTextField,
  TextFieldLabel,
} from "src/shared-styled-components/dashboard";
import { TreasureChest } from "src/types/treasurechest";
import styled from "styled-components";
import SponsorList, { SponsorState } from "./SponsorList";
import UploadImage from "./UploadImage";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TMap from "./TreasureChestMap";
import { CircularProgress } from "@mui/material";
import { uploadImgToFirebase } from "src/utils/firebaseUtils";

const TreasureChestSchema = Yup.object().shape({
  title: Yup.string().required("Please enter a title."),
  description: Yup.string().required("Please enter a description."),
  tLocationLat: Yup.number()
    .min(-90, "Valid value range -90 to 90")
    .max(90, "Valid value range -90 to 90")
    .typeError("Must be a number")
    .required("Please enter a latitude"),
  tLocationLong: Yup.number()
    .min(-180, "Valid value range -180 to 180")
    .max(180, "Valid value range -180 to 180")
    .typeError("Must be a number")
    .required("Please enter a longitude"),
  eventDate: Yup.string().required("Please enter the event date"),
  eventTime: Yup.string().required("Please enter the event time"),
  numParticipants: Yup.number()
    .min(1)
    .typeError("Must be a number")
    .required("Please enter the number of participants"),
  thumbnailImage: Yup.mixed().required("Please upload an image."),
  augmentImage: Yup.mixed().notRequired(), // TODO: Update when AR is supported
});

type ChestFormObject = Yup.InferType<typeof TreasureChestSchema>;

const initFormObject = {
  title: "",
  description: "",
  tLocationLat: "",
  tLocationLong: "",
  eventDate: "",
  eventTime: "",
  numParticipants: "",
  thumbnailImage: null,
  augmentImage: null,
};

const TreasureChestCreateForm: FC = (props) => {
  const navigate = useNavigate();

  const [sponsors, setSponsors] = useState<SponsorState[]>([]);

  const createNewChest = async (values: ChestFormObject): Promise<boolean> => {
    const accessToken = sessionStorage.getItem("token");
    const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
    const TREASURE_URL = `${BASE_URL}/treasure-chest`;
    const SPONSOR_URL = `${BASE_URL}/sponsor`;

    try {
      const fbThumbnailLink = await uploadImgToFirebase(values.thumbnailImage);
      const DATA: TreasureChest = {
        title: values.title,
        description: values.description,
        location_long: values.tLocationLong,
        location_lat: values.tLocationLat,
        event_date: values.eventDate,
        event_time: values.eventTime,
        no_of_participants: values.numParticipants,
        thumbnail_img: "",
        img_url: fbThumbnailLink,
        a_r: "", //TODO: Update AR image upload when supported.
      };
      const CONFIG = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const chestAPIResponse = await axios.post(TREASURE_URL, DATA, CONFIG);
      const treasureChestId = chestAPIResponse.data.id;

      if (sponsors.length > 0)
        await Promise.all(
          sponsors.map(async (sponsor) => {
            if (sponsor.imageFile) {
              const fbImageLink = await uploadImgToFirebase(sponsor.imageFile);
              await axios.post(
                SPONSOR_URL,
                {
                  treasure_chest_id: treasureChestId,
                  img: "",
                  link: sponsor.link,
                  img_url: fbImageLink,
                },
                CONFIG
              );
            }
          })
        );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <Formik
      initialValues={initFormObject}
      validationSchema={TreasureChestSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const created = await createNewChest(values as any);
        setSubmitting(false);
        if (created) navigate("/dashboard/treasure-chest-list");
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <FormContainer>
            <ColumnLeft mr={2}>
              <TextFieldLabel>Title</TextFieldLabel>
              <StyledTextField
                onChange={handleChange}
                name="title"
                value={values.title}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
              <TextFieldLabel>Description</TextFieldLabel>
              <StyledTextField
                multiline={true}
                onChange={handleChange}
                name="description"
                value={values.description}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
              <TextFieldLabel>Treasure Location</TextFieldLabel>
              <StyledTextField
                onChange={handleChange}
                name="tLocationLat"
                value={values.tLocationLat}
                error={Boolean(errors.tLocationLat)}
                helperText={errors.tLocationLat}
              />
              <StyledTextField
                onChange={handleChange}
                name="tLocationLong"
                value={values.tLocationLong}
                error={Boolean(errors.tLocationLong)}
                helperText={errors.tLocationLong}
              />
              <TextFieldLabel>Sponsors</TextFieldLabel>
              <SponsorList sponsors={sponsors} setSponsors={setSponsors} />
            </ColumnLeft>
            <ColumnRight>
              <Box sx={{ height: "539px", width: "100%" }} mb={1}>
                <TMap
                  handleChestLoc={(lat, long) => {
                    setFieldValue("tLocationLat", lat.toFixed(4));
                    setFieldValue("tLocationLong", long.toFixed(4));
                  }}
                />
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid container item xs={6} direction="column">
                    <TextFieldLabel>Event Date</TextFieldLabel>
                    <StyledTextField
                      type="date"
                      onChange={handleChange}
                      name="eventDate"
                      value={values.eventDate}
                      error={Boolean(errors.eventDate)}
                      helperText={errors.eventDate}
                    />

                    <TextFieldLabel>Time</TextFieldLabel>
                    <StyledTextField
                      type="time"
                      onChange={handleChange}
                      name="eventTime"
                      value={values.eventTime}
                      error={Boolean(errors.eventTime)}
                      helperText={errors.eventTime}
                    />

                    <TextFieldLabel>Number of Participants</TextFieldLabel>
                    <StyledTextField
                      onChange={handleChange}
                      name="numParticipants"
                      value={values.numParticipants}
                      error={Boolean(errors.numParticipants)}
                      helperText={errors.numParticipants}
                    />
                    {isSubmitting ? (
                      <SubmitLoadingBox>
                        <CircularProgress />
                      </SubmitLoadingBox>
                    ) : (
                      <SubmitButton type="submit" disabled={isSubmitting}>
                        Submit
                      </SubmitButton>
                    )}
                  </Grid>
                  <Grid container item xs={6} direction="column">
                    {/* <UploadImage
                      label="Upload Augmented Reality"
                      onImgUpload={(file) =>
                        setFieldValue("augmentImage", file)
                      }
                      disable={true}
                      imageFile={values.augmentImage}
                      error={errors.augmentImage}
                    /> */}
                    <UploadImage
                      label="Upload Thumbnail"
                      onImgUpload={(file) =>
                        setFieldValue("thumbnailImage", file)
                      }
                      imageFile={values.thumbnailImage}
                      error={errors.thumbnailImage}
                    />
                  </Grid>
                </Grid>
              </Box>
            </ColumnRight>
          </FormContainer>
        </form>
      )}
    </Formik>
  );
};

export default TreasureChestCreateForm;

const SubmitLoadingBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;

    && .MuiCircularProgress-svg {
      color: #2995a8;
    }
  }
`;

const SubmitButton = styled(DashboardButton)`
  && {
    height: 60px;
    width: 100%;
    background-size: contain;
  }
`;

const FormContainer = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    font-family: "Gilroy SemiBold", "Gilroy Bold";
  }
`;
const ColumnLeft = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;
const ColumnRight = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    flex: 3;
  }
`;

export const StyledComponents = {
  SubmitLoadingBox,
  SubmitButton,
  FormContainer,
  ColumnLeft,
  ColumnRight,
};
