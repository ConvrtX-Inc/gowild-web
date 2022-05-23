import { FC } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GuidelineType } from "src/enums";
import format from "date-fns/format";

interface LogItemProps {
  date: string;
  type: GuidelineType;
}

const typeToString = (type: GuidelineType) => {
  switch (type) {
    case GuidelineType.TERMS_AND_CONDITIONS:
      return "Terms & Conditions";
    case GuidelineType.FAQ:
      return "FAQ";
    case GuidelineType.E_WAIVER:
      return "E - Waiver";
  }
};

const LogItem: FC<LogItemProps> = ({ date, type }) => {
  return (
    <LogItemBox py={1}>
      <DateText variant="subtitle2">
        {format(new Date(date), "MM/dd/yyyy")}
      </DateText>
      <Typography fontFamily="Poppins"> {typeToString(type)} </Typography>
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
