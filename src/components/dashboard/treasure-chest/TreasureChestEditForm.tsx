import { Box, Grid } from "@material-ui/core";
import { Formik } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import {
  DashboardButton,
  StyledTextField,
  TextFieldLabel,
} from "src/shared-styled-components/dashboard";
import { Sponsor, TreasureChest } from "src/types/treasurechest";
import styled from "styled-components";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TMap from "./TreasureChestMap";
import { CircularProgress } from "@mui/material";
import { uploadImgToFirebase } from "src/utils/firebaseUtils";
import { imageFileToB64 } from "src/utils/imageUtils";
import EditUploadImage from "./EditUploadImage";
import format from "date-fns/format";
import useMounted from "src/hooks/useMounted";
import EditSponsorList, { SponsorState } from "./EditSponsorList";

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
  thumbnailImage: Yup.mixed().notRequired(),
  augmentImage: Yup.mixed().notRequired(),
});

type ChestFormObject = Yup.InferType<typeof TreasureChestSchema>;

interface TreasureChestEditFormProps {
  editTreasure: TreasureChest;
}

const accessToken = sessionStorage.getItem("token");
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;

const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
};

const TreasureChestEditForm: FC<TreasureChestEditFormProps> = ({
  editTreasure,
}) => {
  const mounted = useMounted();
  const navigate = useNavigate();

  const [replaceThumbnailImg, setReplaceThumbnail] = useState<boolean>(false);

  const [sponsors, setSponsors] = useState<SponsorState[]>([]);

  useEffect(() => {
    getSponsors(editTreasure);
  }, []);
  const getSponsors = useCallback(
    async (chestData: TreasureChest) => {
      const sponsorsAPIResponse = await axios.get(
        `${BASE_URL}/sponsor?fields=&s=%7B%22treasure_chest_id%22%3A%22${chestData.id}%22%7D&filter=`,
        CONFIG
      );
      if (sponsorsAPIResponse.status === 200) {
        setSponsors(sponsorsAPIResponse.data.data);
      }
    },
    [editTreasure, mounted]
  );
  const editChest = async (values: ChestFormObject): Promise<boolean> => {
    const TREASURE_URL = `${BASE_URL}/treasure-chest`;
    const SPONSOR_URL = `${BASE_URL}/sponsor`;
    try {
      const thumbnailImgUrl = values?.thumbnailImage
        ? await uploadImgToFirebase(values.thumbnailImage)
        : "";

      const DATA: TreasureChest = {
        title: values.title,
        description: values.description,
        location_long: values.tLocationLong,
        location_lat: values.tLocationLat,
        event_date: values.eventDate,
        event_time: values.eventTime,
        no_of_participants: values.numParticipants,
        thumbnail_img: thumbnailImgUrl
          ? await imageFileToB64(values.thumbnailImage)
          : editTreasure.thumbnail_img,
        img_url: thumbnailImgUrl || editTreasure.img_url,
        a_r: "", //TODO: Update AR image upload when supported.
      };

      await axios.patch(`${TREASURE_URL}/${editTreasure.id}`, DATA, CONFIG);

      if (sponsors.length > 0)
        await Promise.all(
          sponsors.map(async (sponsor) => {
            if (sponsor?.deleted && sponsor?.id) {
              await axios.delete(`${SPONSOR_URL}/${sponsor.id}`, CONFIG);
            } else if (sponsor?.id && sponsor?.updated) {
              let updatedImgLink = sponsor.imageFile
                ? await uploadImgToFirebase(sponsor.imageFile)
                : "";

              await axios.patch(
                `${SPONSOR_URL}/${sponsor.id}`,
                {
                  treasure_chest_id: editTreasure.id,
                  img: updatedImgLink
                    ? await imageFileToB64(sponsor.imageFile)
                    : (sponsor as Sponsor).img,
                  link: sponsor.link,
                  img_url: updatedImgLink || sponsor.img_url,
                },
                CONFIG
              );
            } else if (!sponsor.id) {
              let imgLink = sponsor.imageFile
                ? await uploadImgToFirebase(sponsor.imageFile)
                : "";
              await axios.post(
                SPONSOR_URL,
                {
                  treasure_chest_id: editTreasure.id,
                  img: imgLink ? await imageFileToB64(sponsor.imageFile) : "",
                  link: sponsor.link,
                  img_url: imgLink,
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
      initialValues={{
        title: editTreasure.title,
        description: editTreasure.description,
        tLocationLat: editTreasure.location_lat,
        tLocationLong: editTreasure.location_long,
        eventDate: editTreasure.event_date,
        eventTime: editTreasure.event_time,
        numParticipants: editTreasure.no_of_participants,
        thumbnailImage: null,
        augmentImage: null,
      }}
      validationSchema={TreasureChestSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const created = await editChest(values as any);
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
                placeholder="First on the list"
                onChange={handleChange}
                name="title"
                value={values.title}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
              <TextFieldLabel>Description</TextFieldLabel>
              <StyledTextField
                multiline={true}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                onChange={handleChange}
                name="description"
                value={values.description}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
              <TextFieldLabel>Treasure Location</TextFieldLabel>
              <StyledTextField
                placeholder="65.5234°"
                onChange={handleChange}
                name="tLocationLat"
                value={values.tLocationLat}
                error={Boolean(errors.tLocationLat)}
                helperText={errors.tLocationLat}
              />
              <StyledTextField
                placeholder="1.12378°"
                onChange={handleChange}
                name="tLocationLong"
                value={values.tLocationLong}
                error={Boolean(errors.tLocationLong)}
                helperText={errors.tLocationLong}
              />
              <TextFieldLabel>Sponsors</TextFieldLabel>
              <EditSponsorList sponsors={sponsors} setSponsors={setSponsors} />
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
                      value={format(new Date(values.eventDate), "yyyy-MM-dd")}
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
                      placeholder="10"
                    />
                    {isSubmitting ? (
                      <SubmitLoadingBox>
                        <CircularProgress />
                      </SubmitLoadingBox>
                    ) : (
                      <SubmitButton type="submit">Update</SubmitButton>
                    )}
                  </Grid>
                  <Grid container item xs={6} direction="column">
                    <EditUploadImage
                      label="Upload Thumbnail"
                      onImgUpload={(file) =>
                        setFieldValue("thumbnailImage", file)
                      }
                      imageFile={values.thumbnailImage}
                      error={errors.thumbnailImage}
                      imgURL={editTreasure.img_url}
                      onReplaceImage={(value) => setReplaceThumbnail(value)}
                      replaceImage={replaceThumbnailImg}
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

export default TreasureChestEditForm;

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
