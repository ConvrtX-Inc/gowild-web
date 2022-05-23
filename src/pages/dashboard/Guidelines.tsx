import { Box } from "@material-ui/core";
import { FC, useEffect } from "react";
import { GuidelinesContent } from "src/components/dashboard/guidelines";
import gtm from "../../lib/gtm";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";

const Guidelines: FC = () => {

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <DashboardContentWrapper title="Guidelines" metaDataTitle="Guidelines">
      <Box sx={{ mt: "27px", height: "calc(100vh - 157px)" }}>
        <GuidelinesContent />
      </Box>
    </DashboardContentWrapper>
  );
};

export default Guidelines;
