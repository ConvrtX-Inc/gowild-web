import { Box, CircularProgress } from '@mui/material';
import type { FC } from 'react';

const LoadingScreen: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        minHeight: '100%'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
