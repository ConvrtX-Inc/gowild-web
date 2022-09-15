import { NotFoundOrErrorComponent } from '../../types/finder';
import { Typography } from '@mui/material';

export function RouteNotFound({ error }: NotFoundOrErrorComponent) {
  console.error(error);
  return <Typography>Route not found</Typography>;
}
