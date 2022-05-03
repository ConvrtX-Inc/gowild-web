import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { FC } from "react";
import { GuidelineLog } from "src/types/guidelines";
import styled from "styled-components";
import LogItem from "./LogItem";

interface LogContentProps {
  logs: GuidelineLog[];
}

const LogContent: FC<LogContentProps> = ({ logs }) => {
  const lastDateUpdated: Date = logs[logs.length - 1].date;

  return (
    <LogBox pl={2}>
      <TitleHeading variant="h5" mb={2}>
        {lastDateUpdated.toLocaleString("default", { month: "long" })}{" "}
        {lastDateUpdated.getDate()}, {lastDateUpdated.getFullYear()}
      </TitleHeading>
      <Typography sx={{ opacity: "0.3", fontFamily: "Poppins" }}>
        Update Logs
      </Typography>
      {logs.map((_, i, logsArr) => {
        const item = logsArr[logsArr.length - 1 - i];
        return (
          <LogItem
            date={item.date}
            type={item.type}
            key={`${item.type}-${i}`}
          />
        );
      })}
    </LogBox>
  );
};

export default LogContent;

const TitleHeading = styled(Typography)`
  && {
    color: #000;
    font-weight: 700;
    font-family: "Gilroy SemiBold", "Gilroy Bold";
  }
`;

const LogBox = styled(Box)`
  && {
    height: 100%;
    border-left: 1px dashed rgba(0, 0, 0, 0.2);
    color: #979797;
    overflow-y: auto;
  }
`;
