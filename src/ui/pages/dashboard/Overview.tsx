import useSettings from '../../../lib/hooks/useSettings';
import { Box, Container, Grid, Typography } from '@mui/material';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Overview: FC = () => {
  const { settings } = useSettings();
  return (
    <>
      <Helmet>
        <title>Dashboard: Overview | Go Wild</title>
      </Helmet>
      <Box
        sx={{
          // backgroundColor: "background.default",
          backgroundColor: '#FAFBFC',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid container spacing={3}>
            <Grid
              alignItems='center'
              container
              justifyContent='space-between'
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography color='textSecondary' variant='overline'>
                  Dashboard
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Overview;
