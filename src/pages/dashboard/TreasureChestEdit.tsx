import { Box, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";
import { TreasureChestEditForm } from "src/components/dashboard/treasure-chest";
import {
  AbsCircularLoadingBox,
  StyledCard,
} from "src/shared-styled-components/dashboard";
import { TreasureChest } from "src/types/treasurechest";

const pageTitle = "Edit Treasure Chest";
const accessToken = sessionStorage.getItem("token");
const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
const CONFIG = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
};

const TreasureChestEdit: FC = () => {
  let { id } = useParams();
  const [editTreasureChest, setEditChest] = useState<TreasureChest>(null);

  useEffect(() => {
    const getEditTreasureChest = async () => {
      const TREASURE_URL = `${BASE_URL}/treasure-chest/${id}`;

      const chestAPIResponse = await axios.get(TREASURE_URL, CONFIG);
      if (chestAPIResponse.status === 200) {
        setEditChest(chestAPIResponse.data);
      }
    };
    getEditTreasureChest();
  }, [id]);
  
  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard
        sx={{
          minHeight: "500px",
          height: "calc(100% - 87.5px)",
          position: "relative",
        }}
      >
        <Box pt={2} px={2}>
          {!editTreasureChest ? (
            <AbsCircularLoadingBox>
              <CircularProgress size={100} />
            </AbsCircularLoadingBox>
          ) : (
            <TreasureChestEditForm editTreasure={editTreasureChest} />
          )}
        </Box>
      </StyledCard>
    </DashboardContentWrapper>
  );
};

export default TreasureChestEdit;
