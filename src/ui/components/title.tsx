import { routeToName } from '../../utils/route.utils';
import { ContentTitleTypography, SubTitleTypography } from '../font.text';
import { TypographyProps } from '@mui/material';
import { useLocation } from 'react-router';

export function PageTitle() {
  const { pathname } = useLocation();
  return <ContentTitleTypography>{routeToName(pathname)}</ContentTitleTypography>;
}

export function HistoricalEventsTitle(props: TypographyProps) {
  return <SubTitleTypography {...props} />;
}
