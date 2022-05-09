import { Box, CircularProgress, Grid, TextField } from "@material-ui/core";
import axios from "axios";
import { format } from "date-fns";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";
import { ViewTMap } from "src/components/dashboard/treasure-chest";
import useMounted from "src/hooks/useMounted";
import WebLink from "src/icons/WebLink";
import {
  AbsCircularLoadingBox,
  StyledCard,
  TextFieldLabel,
} from "src/shared-styled-components/dashboard";
import { Sponsor, TreasureChest } from "src/types/treasurechest";
import styled from "styled-components";

const pageTitle = "Treasure Chest Details";
const accessToken = sessionStorage.getItem("token");
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;

const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
};
const TreasureChestView: FC = () => {
  const mounted = useMounted();
  let { id } = useParams();
  const [treasureData, setTreasureData] = useState<TreasureChest>(null);
  const [sponsors, setSponsors] = useState<Sponsor[]>(null);
  const getTreasureChest = useCallback(async () => {
    const TREASURE_URL = `${BASE_URL}/treasure-chest/${id}`;

    const chestAPIResponse = await axios.get(TREASURE_URL, CONFIG);
    if (chestAPIResponse.status === 200) {
      setTreasureData(chestAPIResponse.data);

      getSponsors(chestAPIResponse.data);
    }
  }, [mounted]);

  useEffect(() => {
    getTreasureChest();
  }, [getTreasureChest]);

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
    [treasureData]
  );

  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard
        sx={{
          minHeight: "500px",
          height: "calc(100% - 87.5px)",
          position: "relative",
        }}
      >
        {!treasureData ? (
          <AbsCircularLoadingBox>
            <CircularProgress size={100} />
          </AbsCircularLoadingBox>
        ) : (
          <FormContainer pt={2} px={2}>
            <ColumnLeft mr={2}>
              <TextFieldLabel>Title</TextFieldLabel>
              <StyledTextField
                name="title"
                value={treasureData?.title ?? ""}
                readOnly
              />
              <TextFieldLabel>Description</TextFieldLabel>
              <StyledTextField
                multiline={true}
                name="description"
                value={treasureData?.description ?? ""}
                readOnly
              />
              <TextFieldLabel>Treasure Location</TextFieldLabel>
              <StyledTextField
                placeholder="65.5234°"
                name="tLocationLat"
                value={
                  treasureData?.location_lat
                    ? `${treasureData.location_lat}°`
                    : ""
                }
                readOnly
              />
              <StyledTextField
                name="tLocationLong"
                value={
                  treasureData?.location_long
                    ? `${treasureData.location_long}°`
                    : ""
                }
                readOnly
              />
              <TextFieldLabel>Sponsors</TextFieldLabel>
              <ListBox>
                {sponsors &&
                  sponsors.map((s) => {
                    return (
                      <SponsorBox key={s.id}>
                        <SponsorLogo component="img" src={s.img_url} />
                        <SponsorTextField
                          InputProps={{
                            startAdornment: <WebLink />,
                          }}
                          placeholder="link"
                          value={s.link}
                          readOnly
                        />
                      </SponsorBox>
                    );
                  })}
              </ListBox>
            </ColumnLeft>
            <ColumnRight>
              <Box sx={{ height: "539px", width: "100%" }} mb={1}>
                {treasureData?.location_lat ? (
                  <ViewTMap
                    lat={Number(treasureData.location_lat)}
                    lng={Number(treasureData.location_long)}
                  />
                ) : (
                  <Box
                    component="img"
                    sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    src="/static/route-list/sample-map.png"
                  />
                )}
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid container item xs={6} direction="column">
                    <TextFieldLabel>Event Date</TextFieldLabel>
                    <StyledTextField
                      type="date"
                      name="eventDate"
                      value={
                        treasureData?.event_date
                          ? format(
                              new Date(treasureData.event_date),
                              "yyyy-MM-dd"
                            )
                          : ""
                      }
                    />

                    <TextFieldLabel>Time</TextFieldLabel>
                    <StyledTextField
                      type="time"
                      name="eventTime"
                      value={treasureData?.event_time ?? ""}
                    />

                    <TextFieldLabel>Number of Participants</TextFieldLabel>
                    <StyledTextField
                      name="numParticipants"
                      value={treasureData?.no_of_participants ?? ""}
                    />
                  </Grid>
                  <Grid container item xs={6} direction="column">
                    <TextFieldLabel>Thumbnail</TextFieldLabel>
                    <UploadBox>
                      <ImgUpload
                        component="img"
                        src={treasureData?.img_url ?? ""}
                      />
                    </UploadBox>
                  </Grid>
                </Grid>
              </Box>
            </ColumnRight>
          </FormContainer>
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
      font-family: "Gilroy Semibold";
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
      min-height: 67px;
      margin-top: 2px;
      border: none;
    }

    && .MuiInputBase-multiline {
      padding: 0;
    }

    && .MuiInputBase-multiline.Mui-focused fieldset {
      && textarea {
        min-height: 132px;
      }
    }

    && textarea {
      font-family: "Gilroy Semibold";
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.025em;
      color: #242426;
      min-height: 132px;
      height: 132px;
      max-height: 132px;
      overflow-y: auto !important;
    }
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

const UploadBox = styled(Box)`
  && {
    height: 178px;
    border-radius: 22.2px;
    margin-top: 6px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const ImgUpload = styled(Box)`
  && {
    border-radius: 22.2px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ListBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 1rem 0;
    color: #000000;

    && .MuiIconButton-root {
      color: #2995a8;
    }
  }
`;

const SponsorBox = styled(Box)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.25rem 0;
    position: relative;
  }
`;

const SponsorLogo = styled(Box)`
  && {
    border-radius: 22.2px;
    min-width: 67px;
    min-height: 67px;
    height: 67px;
    width: 67px;
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
      font-family: "Gilroy Regular";
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