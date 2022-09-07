import { Box, CircularProgress, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sponsor, TreasureChest } from 'src/types/treasurechest';
import { DashboardContentWrapper } from 'src/ui/components/dashboard/DashboardContentWrapper';
import { ViewTMap } from 'src/ui/components/dashboard/treasure-chest';
import { StyledElements as SponsorStyled } from 'src/ui/components/dashboard/treasure-chest/SponsorList';
import { StyledElements as TreasureChestStyled } from 'src/ui/components/dashboard/treasure-chest/TreasureChestCreateForm';
import WebLink from 'src/ui/icons/WebLink';
import {
  AbsCircularLoadingBox,
  StyledCard,
  TextFieldLabel
} from 'src/ui/shared-styled-components/dashboard';
import styled from 'styled-components';

const pageTitle = 'Treasure Chest Details';
const accessToken = sessionStorage.getItem('token');
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;

const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
};

const getSponsors = async (chestData: TreasureChest) => {
  return await axios.get(`${BASE_URL}/sponsor?s={"treasure_chest_id":"${chestData.id}"}`, CONFIG);
};

const TreasureChestView: FC = () => {
  const { id } = useParams();
  const [treasureData, setTreasureData] = useState<TreasureChest>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>(null);

  useEffect(() => {
    const getTreasureChest = async () => {
      const TREASURE_URL = `${BASE_URL}/treasure-chest/${id}`;

      const chestAPIResponse = await axios.get(TREASURE_URL, CONFIG);
      if (chestAPIResponse.status === 200) {
        setTreasureData(chestAPIResponse.data);
        const sponsorsAPIResponse = await getSponsors(chestAPIResponse.data);
        if (sponsorsAPIResponse.status === 200) {
          setSponsors(sponsorsAPIResponse.data.data);
        }
      }
    };
    getTreasureChest();
  }, [id]);

  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard
        sx={{
          minHeight: '500px',
          height: 'calc(100% - 87.5px)',
          position: 'relative'
        }}
      >
        {!treasureData ? (
          <AbsCircularLoadingBox>
            <CircularProgress size={100} />
          </AbsCircularLoadingBox>
        ) : (
          <TreasureChestStyled.FormContainer pt={2} px={2}>
            <TreasureChestStyled.ColumnLeft mr={2}>
              <TextFieldLabel>Title</TextFieldLabel>
              <StyledTextField
                name='title'
                value={treasureData?.title ?? ''}
                inputProps={{ readOnly: true }}
              />
              <TextFieldLabel>Description</TextFieldLabel>
              <StyledTextField
                multiline
                name='description'
                value={treasureData?.description ?? ''}
                inputProps={{ readOnly: true }}
              />
              <TextFieldLabel>Treasure Location</TextFieldLabel>
              <StyledTextField
                placeholder='65.5234°'
                name='tLocationLat'
                value={treasureData?.location_lat ? `${treasureData.location_lat}°` : ''}
                inputProps={{ readOnly: true }}
              />
              <StyledTextField
                name='tLocationLong'
                value={treasureData?.location_long ? `${treasureData.location_long}°` : ''}
                inputProps={{ readOnly: true }}
              />
              <TextFieldLabel>Sponsors</TextFieldLabel>
              <SponsorStyled.ListBox>
                {sponsors &&
                  sponsors.map((s) => {
                    return (
                      <SponsorStyled.SponsorBox
                        key={s.id}
                        sx={{
                          justifyContent: 'flex-start !important'
                        }}
                      >
                        <SponsorStyled.SponsorLogo component='img' src={s.img_url} />
                        <SponsorTextField
                          InputProps={{
                            startAdornment: <WebLink />,
                            readOnly: true
                          }}
                          placeholder='link'
                          value={s.link}
                        />
                      </SponsorStyled.SponsorBox>
                    );
                  })}
              </SponsorStyled.ListBox>
            </TreasureChestStyled.ColumnLeft>
            <TreasureChestStyled.ColumnRight>
              <Box sx={{ height: '539px', width: '100%' }} mb={1}>
                {treasureData?.location_lat ? (
                  <ViewTMap
                    lat={Number(treasureData.location_lat)}
                    lng={Number(treasureData.location_long)}
                  />
                ) : (
                  <Box
                    component='img'
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
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
                      name='eventDate'
                      value={
                        treasureData?.event_date
                          ? format(new Date(treasureData.event_date), 'yyyy-MM-dd')
                          : ''
                      }
                    />

                    <TextFieldLabel>Time</TextFieldLabel>
                    <StyledTextField
                      type='time'
                      name='eventTime'
                      value={treasureData?.event_time ?? ''}
                    />

                    <TextFieldLabel>Number of Participants</TextFieldLabel>
                    <StyledTextField
                      name='numParticipants'
                      value={treasureData?.no_of_participants ?? ''}
                    />
                  </Grid>
                  <Grid container item xs={6} direction='column'>
                    <TextFieldLabel>Thumbnail</TextFieldLabel>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <UploadBox>
                        <ImgUpload component='img' src={treasureData?.img_url ?? ''} />
                      </UploadBox>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </TreasureChestStyled.ColumnRight>
          </TreasureChestStyled.FormContainer>
        )}
      </StyledCard>
    </DashboardContentWrapper>
  );
};

export default TreasureChestView;

const StyledTextField = styled(TextField)`
  && {
    opacity: 0.4;
    margin-top: 6px;
    margin-bottom: 20px;
    && .Mui-focused fieldset {
      min-height: 67px;
      border: none !important;
    }

    && input {
      padding: 0;
      font-family: 'Gilroy Semibold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border: none;
    }

    && textarea,
    input {
      border: none;
      &::placeholder {
        font-family: 'Gilroy Semibold';
        font-weight: 500;
        font-size: 17.7561px;
        line-height: 27px;
        color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
      }
    }
    && fieldset {
      min-height: 67px;
      margin-top: 2px;
      border: none;
    }

    && .MuiInputBase-multiline {
      padding: 0;
    }

    && .MuiInputBase-multiline.Mui-focused fieldset {
      && textarea {
        min-height: 211px;
      }
    }

    && textarea {
      font-family: 'Gilroy Semibold';
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      min-height: 211px;
      height: 211px;
      max-height: 211px;
      overflow-y: auto !important;
    }
  }
`;

const UploadBox = styled(Box)`
  && {
    height: 178px;
    width: 129px;
    border-radius: 22.2px;
    margin-top: 6px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const ImgUpload = styled(Box)<{ src?: string }>`
  && {
    border-radius: 22.2px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 22.2px;
  }
`;

const SponsorTextField = styled(TextField)`
  && {
    margin-left: 0.5rem;
    && .MuiSvgIcon-root {
      color: #525252;
    }
    && input {
      opacity: 0.4;
      height: 67px;
      padding: 20px 33px 20px 5px;
      font-family: 'Gilroy Regular';
      font-size: 12px;
      line-height: 15.6px;
      letter-spacing: -0.025em;
      color: #000000;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    && fieldset {
      border-radius: 22.1951px;
      border: none;
    }
  }
`;
