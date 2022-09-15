import { Route } from '../../lib/api/go-wild.api';
import { FoundComponent } from '../../types/finder';
import { toAppPoint } from '../../utils/route.utils';
import { MapsRoute } from './maps-route';
import { OrangeBorder } from './orange-banner';
import { FieldLabel } from './text-field';
import { HistoricalEventsTitle } from './title';
import { CoordEntryView } from './view/coord-entry.view';
import { RouteHistoricalView } from './view/route-historical.view';
import { Place } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

export function ViewRoute({ item }: FoundComponent<Route>) {
  const points = useMemo(
    () => [
      toAppPoint('start', item.start),
      ...(item.historicalEvents ?? []).map(({ point }) => toAppPoint('middle', point)),
      toAppPoint('end', item.end)
    ],
    [item]
  );

  return (
    <>
      <Helmet>
        <title>{item.title} | Route | Go Wild</title>
      </Helmet>

      <Container>
        <Card component={Paper}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid order={{ xs: 0, md: 1, lg: 0 }} item lg={3} md={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <List>
                      <ListItem>
                        <ListItemIcon sx={{ color: 'black' }}>
                          <Place />
                        </ListItemIcon>
                        <ListItemText primary='Starting point' />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ color: 'red' }}>
                          <Place />
                        </ListItemIcon>
                        <ListItemText primary='Finishing point' />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ color: 'yellow' }}>
                          <Place />
                        </ListItemIcon>
                        <ListItemText primary='Historical point' />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                      <CoordEntryView point={item.start} title='Starting Point' size='small' />

                      <CoordEntryView point={item.end} title='End Point' size='small' />

                      <Grid item xs={12}>
                        <Box width='100%' height='100px'>
                          <img
                            height='90px'
                            width='90px'
                            src={item?.picture ? item?.picture!.path : ''}
                            alt='route-img'
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <FieldLabel htmlFor='title'>Title</FieldLabel>
                        <Typography id='title'>{item.description}</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                        <Typography id='description'>{item.description}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid order={{ xs: 1, md: 0, lg: 1 }} item lg={9} md={12} minHeight='70vh'>
                <Box width='100%' height='100%' component={MapsRoute} allPoints={points} />
              </Grid>

              <Grid order={2} item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      display='flex'
                      alignItems='center'
                      borderBottom='3px solid #d4e0f1'
                      position='relative'
                      justifyContent='flex-start'
                    >
                      <HistoricalEventsTitle sx={{ cursor: 'pointer' }}>
                        Historical
                      </HistoricalEventsTitle>
                      <OrangeBorder />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      {item.historicalEvents.map((event, index) => (
                        <RouteHistoricalView key={index} event={event} />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
