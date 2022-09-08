import * as Yup from 'yup';
import { useAuth } from '../../../../lib/hooks/use-auth';
import { useUploadImgFile } from '../../../../lib/hooks/use-upload';
import EditSponsorList, { SponsorState } from './EditSponsorList';
import EditUploadImage from './EditUploadImage';
import { StyledElements } from './TreasureChestCreateForm';
import TMap from './TreasureChestMap';
import { Box, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import format from 'date-fns/format';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreasureChest } from 'src/types/treasurechest';
import { StyledTextField, TextFieldLabel } from 'src/ui/style/dashboard';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('TreasureChestEditForm');

const location = {
  address: '7 Carlson St, Kitimat, BC V8C 1A9, Canada',
  lat: 54.06291864840513,
  lng: -128.6423159788208
};

const TreasureChestSchema = Yup['object']().shape({
  title: Yup.string().required('Please enter a title.'),
  description: Yup.string().required('Please enter a description.'),
  tLocationLat: Yup.number()
    .min(-90, 'Valid value range -90 to 90')
    .max(90, 'Valid value range -90 to 90')
    .typeError('Must be a number')
    .required('Please enter a latitude'),
  tLocationLong: Yup.number()
    .min(-180, 'Valid value range -180 to 180')
    .max(180, 'Valid value range -180 to 180')
    .typeError('Must be a number')
    .required('Please enter a longitude'),
  eventDate: Yup.string().required('Please enter the event date'),
  eventTime: Yup.string().required('Please enter the event time'),
  numParticipants: Yup.number()
    .min(1)
    .typeError('Must be a number')
    .required('Please enter the number of participants'),
  thumbnailImage: Yup.mixed().notRequired(),
  augmentImage: Yup.mixed().notRequired()
});

type ChestFormObject = Yup.InferType<typeof TreasureChestSchema>;

interface TreasureChestEditFormProps {
  editTreasure: TreasureChest;
}

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;

const TreasureChestEditForm: FC<TreasureChestEditFormProps> = ({ editTreasure }) => {
  const navigate = useNavigate();
  const uploadImgFile = useUploadImgFile();
  const { token } = useAuth();
  const CONFIG = {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  const [replaceThumbnailImg, setReplaceThumbnail] = useState<boolean>(false);

  const [sponsors, setSponsors] = useState<SponsorState[]>([]);

  useEffect(() => {
    const getSponsors = async (chestData: TreasureChest) => {
      const sponsorsAPIResponse = await axios.get(
        `${BASE_URL}/sponsor?s={"treasure_chest_id":"${chestData.id}"}`,
        CONFIG
      );
      if (sponsorsAPIResponse.status === 200) {
        setSponsors(sponsorsAPIResponse.data.data);
      }
    };
    getSponsors(editTreasure);
  }, [editTreasure]);

  const editChest = async (values: ChestFormObject): Promise<boolean> => {
    const TREASURE_URL = `${BASE_URL}/treasure-chest`;
    const SPONSOR_URL = `${BASE_URL}/sponsor`;
    try {
      const thumbnailImg = values?.thumbnailImage
        ? await uploadImgFile(values.thumbnailImage)
        : undefined;

      const DATA: TreasureChest = {
        title: values.title,
        description: values.description,
        location_long: values.tLocationLong,
        location_lat: values.tLocationLat,
        event_date: values.eventDate,
        event_time: values.eventTime,
        no_of_participants: values.numParticipants,
        thumbnail_img: '',
        img_url: thumbnailImg?.path || editTreasure.img_url,
        a_r: '' // TODO: Update AR image upload when supported.
      };

      await axios.patch(`${TREASURE_URL}/${editTreasure.id}`, DATA, CONFIG);

      if (sponsors.length > 0) {
        await Promise.all(
          sponsors.map(async (sponsor) => {
            if (sponsor?.deleted && sponsor?.id) {
              await axios.delete(`${SPONSOR_URL}/${sponsor.id}`, CONFIG);
            } else if (sponsor?.id && sponsor?.updated) {
              const updatedImg = sponsor.imageFile
                ? await uploadImgFile(sponsor.imageFile)
                : undefined;

              await axios.patch(
                `${SPONSOR_URL}/${sponsor.id}`,
                {
                  treasure_chest_id: editTreasure.id,
                  link: sponsor.link,
                  img_url: updatedImg?.path || sponsor.img_url
                },
                CONFIG
              );
            } else if (!sponsor.id) {
              const imgLink = sponsor.imageFile
                ? await uploadImgFile(sponsor.imageFile)
                : undefined;
              await axios.post(
                SPONSOR_URL,
                {
                  treasure_chest_id: editTreasure.id,
                  link: sponsor.link,
                  img_url: imgLink.path
                },
                CONFIG
              );
            }
          })
        );
      }
      return true;
    } catch (err) {
      logger.error(err);
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
        augmentImage: null
      }}
      validationSchema={TreasureChestSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const created = await editChest(values as any);
        setSubmitting(false);
        if (created) navigate('/dashboard/treasure-chest-list');
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          <StyledElements.FormContainer>
            <StyledElements.ColumnLeft mr={2}>
              <TextFieldLabel>Title</TextFieldLabel>
              <StyledTextField
                onChange={handleChange}
                name='title'
                value={values.title}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
              <TextFieldLabel>Description</TextFieldLabel>
              <StyledTextField
                multiline
                onChange={handleChange}
                name='description'
                value={values.description}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
              <TextFieldLabel>Treasure Location</TextFieldLabel>
              <StyledTextField
                onChange={handleChange}
                name='tLocationLat'
                value={values.tLocationLat}
                error={Boolean(errors.tLocationLat)}
                helperText={errors.tLocationLat}
              />
              <StyledTextField
                onChange={handleChange}
                name='tLocationLong'
                value={values.tLocationLong}
                error={Boolean(errors.tLocationLong)}
                helperText={errors.tLocationLong}
              />
              <TextFieldLabel>Sponsors</TextFieldLabel>
              <EditSponsorList sponsors={sponsors} setSponsors={setSponsors} />
            </StyledElements.ColumnLeft>
            <StyledElements.ColumnRight>
              <Box sx={{ height: '539px', width: '100%' }} mb={1}>
                {editTreasure.location_lat ? (
                  <TMap
                    handleChestLoc={(lat, long) => {
                      setFieldValue('tLocationLat', lat.toFixed(4));
                      setFieldValue('tLocationLong', long.toFixed(4));
                    }}
                    lat={Number(values.tLocationLat)}
                    lng={Number(values.tLocationLong)}
                    defaultLocation={location}
                  />
                ) : (
                  <Box
                    component='img'
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover'
                    }}
                    src='/static/route-list/sample-map.png'
                  />
                )}
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid container item xs={6} direction='column'>
                    <TextFieldLabel>Event Date</TextFieldLabel>
                    <StyledTextField
                      type='date'
                      onChange={handleChange}
                      name='eventDate'
                      value={format(new Date(values.eventDate), 'yyyy-MM-dd')}
                      error={Boolean(errors.eventDate)}
                      helperText={errors.eventDate}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0]
                      }}
                    />

                    <TextFieldLabel>Time</TextFieldLabel>
                    <StyledTextField
                      type='time'
                      onChange={handleChange}
                      name='eventTime'
                      value={values.eventTime}
                      error={Boolean(errors.eventTime)}
                      helperText={errors.eventTime}
                    />

                    <TextFieldLabel>Number of Participants</TextFieldLabel>
                    <StyledTextField
                      onChange={handleChange}
                      name='numParticipants'
                      value={values.numParticipants}
                      error={Boolean(errors.numParticipants)}
                      helperText={errors.numParticipants}
                    />
                    {isSubmitting ? (
                      <StyledElements.SubmitLoadingBox>
                        <CircularProgress />
                      </StyledElements.SubmitLoadingBox>
                    ) : (
                      <StyledElements.SubmitButton type='submit' disabled={isSubmitting}>
                        Update
                      </StyledElements.SubmitButton>
                    )}
                  </Grid>
                  <Grid container item xs={6} direction='column'>
                    <EditUploadImage
                      label='Upload Thumbnail'
                      onImgUpload={(file) => setFieldValue('thumbnailImage', file)}
                      imageFile={values.thumbnailImage}
                      error={errors.thumbnailImage}
                      imgURL={editTreasure.img_url}
                      onReplaceImage={(value) => setReplaceThumbnail(value)}
                      replaceImage={replaceThumbnailImg}
                    />
                  </Grid>
                </Grid>
              </Box>
            </StyledElements.ColumnRight>
          </StyledElements.FormContainer>
        </form>
      )}
    </Formik>
  );
};

export default TreasureChestEditForm;