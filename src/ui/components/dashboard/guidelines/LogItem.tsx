import GuidelineType from '../../../../types/guidelinetype';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import { FC } from 'react';
import styled from 'styled-components';

interface LogItemProps {
  date: string;
  type: GuidelineType;
}

const typeToString = (type: GuidelineType) => {
  switch (type) {
    case GuidelineType.TERMS_AND_CONDITIONS:
      return 'Terms & Conditions';
    case GuidelineType.FAQ:
      return 'FAQ';
    case GuidelineType.E_WAIVER:
      return 'E - Waiver';
    default:
      throw Error(`Not managed guideline type ${type}`);
  }
};

const LogItem: FC<LogItemProps> = ({ date, type }) => {
  return (
    <LogItemBox py={1}>
      <DateText variant='subtitle2'>{format(new Date(date), 'MM/dd/yyyy')}</DateText>
      <Typography fontFamily='Poppins'> {typeToString(type)} </Typography>
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
    font-family: 'Poppins';
  }
`;
