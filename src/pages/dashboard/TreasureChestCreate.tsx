import { Box } from "@material-ui/core";
import { FC } from "react";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";
import { TreasureChestCreateForm } from "src/components/dashboard/treasure-chest";
import { StyledCard } from "src/shared-styled-components/dashboard";

const pageTitle = "New Treasure Chest";
const TreasureChestCreate: FC = () => {
  return (
    <DashboardContentWrapper title={pageTitle}>
      <StyledCard sx={{ minHeight: "500px", height: "calc(100% - 87.5px)" }}>
        <Box pt={2} px={2}>
          <TreasureChestCreateForm />
        </Box>
      </StyledCard>
    </DashboardContentWrapper>
  );
};

export default TreasureChestCreate;
