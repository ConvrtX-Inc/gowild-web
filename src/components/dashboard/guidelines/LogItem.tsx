import { FC } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

interface LogItemProps {
  date: Date;
  type: string;
}

const LogItem: FC<LogItemProps> = ({ date, type }) => {
  return (
    <LogItemBox py={1}>
      <DateText variant="subtitle2">{date.toLocaleDateString()}</DateText>
      <Typography fontFamily="Poppins"> {type} </Typography>
    </LogItemBox>
  );
};

export default LogItem;

const LogItemBox = styled(Box)`
  && {
    border-bottom: 1px solid #efefef;
  }
`;

const DateText = styled(Typography)`
  && {
    color: #979797;
    font-weight: 600;
    font-family: "Poppins";
  }
`;
