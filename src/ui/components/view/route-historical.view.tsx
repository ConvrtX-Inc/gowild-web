import { RouteHistoricalEvent } from '../../../lib/api/go-wild.api';
import { FieldLabel } from '../text-field';
import { CoordEntryView } from './coord-entry.view';
import { Accordion, AccordionDetails, Grid, Typography } from '@mui/material';

export interface RouteHistoricalViewProps {
  event: RouteHistoricalEvent;
}

export function RouteHistoricalView({ event }: RouteHistoricalViewProps) {
  return (
    <Accordion>
      <AccordionDetails>
        <Grid my={6} container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Grid container>
                  <CoordEntryView point={event.point} title='Coordinates' size='small' />
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <FieldLabel>Title</FieldLabel>
                    <Typography id='title'>{event.description}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FieldLabel>Sub-title</FieldLabel>
                    <Typography id='title'>{event.description}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FieldLabel>Description</FieldLabel>
                <Typography id='title'>{event.description}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <img height='90px' width='90px' src={event.image?.path ?? ''} alt='route-img' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
