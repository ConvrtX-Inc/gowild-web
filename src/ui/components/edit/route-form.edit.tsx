import {FoundComponent} from "../../../types/finder";
import {AppPoint, Route, RouteHistoricalEvent} from "../../../lib/api/go-wild.api";
import {Helmet} from "react-helmet-async";
import {useMemo, useRef, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from "@mui/material";
import * as Yup from 'yup';
import {FieldArray, Form, Formik} from "formik";
import {MapsRoute} from "../maps-route";
import {Place} from "@mui/icons-material";
import {toAppPoint} from "../../../utils/route.utils";
import {RoutePoint} from "../../../types/maps";
import {AppTextField, FieldLabel} from "../text-field";
import {ActionButton} from "../buttons";
import {CoordEntry} from "../coord.entry";
import {HistoricalEventsTitle} from "../title";
import {OrangeBorder} from "../orange-banner";
import {RouteHistoricalForm} from "../route-historical.form";
import {FileForm} from "../file-form";

const appPointValidationSchema = Yup.object().shape({
    type: Yup.string().oneOf(['Point']).required('This field is required'),
    coordinates: Yup.array(Yup.number()).required('This field is required'),
});

const historicalEventsValidationSchema = Yup.object().shape({
    title: Yup.string().max(80).required('This field is required'),
    subtitle: Yup.string().max(80).required('This field is required'),
    description: Yup.string().max(80).required('This field is required'),
    point: appPointValidationSchema,
});

const routeValidationSchema = Yup['object']().shape({
    title: Yup.string().max(80).required('This field is required'),
    start: appPointValidationSchema,
    end: appPointValidationSchema,
    historicalEvents: Yup.array(historicalEventsValidationSchema),
    description: Yup.string().max(255).required('This field is required'),
});

export function RouteFormEdit({item}: FoundComponent<Route | undefined>) {
    const isNew = useMemo(() => !!item?.id, [item?.id]);
    const scrollRef = useRef<HTMLSpanElement>();
    const scrollToEvents = useRef<HTMLSpanElement>();

    // Point
    const [start, setStart] = useState<AppPoint | undefined>();
    const [end, setEnd] = useState<AppPoint | undefined>();
    const [historicalPoints, setHistoricalPoints] = useState<RouteHistoricalEvent[]>(() => item?.historicalEvents ?? []);
    const points = useMemo(() => [
        start ? toAppPoint('start', start) : undefined,
        ...historicalPoints.map(({point}) => toAppPoint('middle', point)),
        end ? toAppPoint('end', end) : undefined
    ].filter(i => !!i), [end, historicalPoints, start]);

    // Scrollable
    const scrollToHistoricalEvents = () => {
        scrollToEvents.current.scrollIntoView();
    };
    const scrollToHistoricalForm = () => {
        scrollRef.current.scrollIntoView();
    };

    return (
        <>
            <Helmet>
                <title>{isNew ? 'Edit' : 'Create'} | Go Wild</title>
            </Helmet>

            <Formik
                validationSchema={routeValidationSchema}
                initialValues={{
                    title: item?.title,
                    start: item?.start,
                    end: item?.end,
                    description: item?.description,
                    historicalEvents: item?.historicalEvents,
                }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {({isSubmitting, setFieldValue}) => (
                    <Container>
                        <Card component={Paper}>
                            <CardContent>
                                <Grid component={Form} container spacing={4}>
                                    <Grid order={{xs: 0, md: 1, lg: 0}} item lg={3} md={12}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <List>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'black'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Starting point'/>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'red'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Finishing point'/>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'yellow'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Historical point'/>
                                                    </ListItem>
                                                </List>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <CoordEntry
                                                        title='Starting Point'
                                                        name='start'
                                                        size='small'
                                                    />

                                                    <CoordEntry
                                                        title='End Point'
                                                        name='end'
                                                        size='small'
                                                    />

                                                    <Grid item xs={12}>
                                                        <Box width='100%' height='100px'>
                                                            <FileForm
                                                                accept={{'image/*': []}}
                                                                maxFiles={1}
                                                                name='picture'
                                                            />
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FieldLabel htmlFor='title'>Title</FieldLabel>
                                                        <AppTextField
                                                            autoComplete='off'
                                                            placeholder='My race title'
                                                            name='title'
                                                            size='small'
                                                            id='title'
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                                                        <AppTextField
                                                            autoComplete='off'
                                                            placeholder='Write something here...'
                                                            name='description'
                                                            size='small'
                                                            id='description'
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Box display='flex' justifyContent='center'>
                                                            <ActionButton disabled={isSubmitting} type='submit'
                                                                          variant='contained'>
                                                                {isSubmitting ? (
                                                                    <>
                                                                        <CircularProgress
                                                                            sx={{
                                                                                color: '#FBF1DA',
                                                                                position: 'absolute',
                                                                                right: '60px'
                                                                            }}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    'Save'
                                                                )}
                                                            </ActionButton>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid order={{xs: 1, md: 0, lg: 1}} item lg={9} md={12} minHeight='70vh'>
                                        <Box
                                            width='100%'
                                            height='100%'
                                            component={MapsRoute}
                                            allPoints={points}
                                            onPoint={(a: RoutePoint) => {
                                                if (!!a) {
                                                    if (a.type === 'start') {
                                                        setStart(a.point);
                                                        setFieldValue('start', a.point);
                                                    } else if (a.type === 'end') {
                                                        setEnd(a.point);
                                                        setFieldValue('end', a.point);
                                                    } else {
                                                        const tmp = [...historicalPoints, ({
                                                            point: a.point,
                                                        } as any)];

                                                        setHistoricalPoints(tmp);
                                                        setFieldValue('historicalEvents', tmp);
                                                    }
                                                }
                                            }}
                                            onRemovePoint={(a) => {
                                                if (!!a) {
                                                    if (a.type === 'start') {
                                                        setStart(undefined);
                                                        setFieldValue('start', undefined);
                                                    } else if (a.type === 'end') {
                                                        setEnd(undefined);
                                                        setFieldValue('end', undefined);
                                                    } else {
                                                        const tmp = points;
                                                        const idx = points.findIndex(p => p.type === a.type)
                                                        if (idx >= 0) {
                                                            tmp.splice(idx, 1);
                                                            setHistoricalPoints(prev => prev.filter(({point}) => point !== a.point));
                                                            setFieldValue('historicalEvents', tmp);
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid order={2} item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box display='flex' alignItems='center' borderBottom='3px solid #d4e0f1'
                                                     position='relative' justifyContent='flex-start'>
                                                    <HistoricalEventsTitle
                                                        sx={{cursor: 'pointer'}}>Historical</HistoricalEventsTitle>
                                                    <OrangeBorder/>
                                                    <Box sx={{ml: 'auto'}} onClick={scrollToHistoricalEvents}>
                                                        <Button
                                                            sx={{
                                                                color: '#0E5753',
                                                                borderColor: '#0E5753'
                                                            }}
                                                            variant='outlined'
                                                        >
                                                            🔺 Scroll to Events
                                                        </Button>
                                                    </Box>
                                                    <Box sx={{ml: '20px'}} onClick={scrollToHistoricalForm}>
                                                        <Button
                                                            sx={{
                                                                color: '#0E5753',
                                                                borderColor: '#0E5753'
                                                            }}
                                                            variant='outlined'
                                                        >
                                                            🔻 Scroll to Form
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FieldArray
                                                    name='historicalEvents'
                                                    render={(arrayHelpers) => (
                                                        <Box>
                                                            {historicalPoints.map((event, index) => (
                                                                <RouteHistoricalForm
                                                                    key={index}
                                                                    name={`historicalEvents.${index}`}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                )}
            </Formik>
        </>
    );
}
