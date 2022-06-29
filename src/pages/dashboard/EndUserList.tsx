import { Box } from "@mui/material";
import { FC } from "react";
import DashboardContentWrapper from "src/components/dashboard/DashboardContentWrapper";
import { EndUserListContent } from "src/components/dashboard/user-list";

const EndUserList: FC = () => {
  return (
    <DashboardContentWrapper title="Users">
      <Box sx={{ mt: "27px" }}>
        <EndUserListContent />
      </Box>
    </DashboardContentWrapper>
  );
};

export default EndUserList;
